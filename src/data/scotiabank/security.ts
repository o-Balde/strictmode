import { http, list, output, p, say, steps, table, trap, ts } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_SECURITY: PrepSection = {
  id: "sb-security",
  track: "security",
  title: "Security: TLS, OAuth2, JWT and secure coding",
  blurb:
    "Unusually for an entry-level posting, this one asks for awareness of SSL/TLS, OAuth2 and JWT, and for 'security-first' development. A 2026 candidate was asked the difference between encoding, encryption and hashing. Expect these to be asked as concepts, through a bank's lens.",
  questions: [
    {
      id: "sb-sec-encoding-encryption-hashing",
      question: "What's the difference between encoding, encryption and hashing?",
      level: "junior",
      short:
        "**Encoding** changes the representation of data for transport (Base64, URL encoding). It has no key and anyone can reverse it, so it is not security. **Encryption** makes data unreadable without a key (AES, RSA), and the key holder can reverse it. Use it for data that has to be read again. **Hashing** is a one-way fingerprint (SHA-256) that can't be reversed. Use it for integrity checks, and, with a slow salted algorithm such as bcrypt or Argon2, for passwords.",
      body: [
        table(
          ["", "Reversible?", "Needs a key?", "Use for"],
          ["Encoding (Base64)", "Yes, by anyone", "No", "Transport (a JWT's parts, binary data in JSON)"],
          ["Encryption (AES-GCM, RSA)", "Yes, with the key", "Yes", "Personal data at rest, TLS in transit"],
          ["Hashing (SHA-256)", "No", "No (HMAC adds one)", "Integrity, deduplication, signatures"],
          ["Password hashing (bcrypt, Argon2)", "No", "Salted, deliberately slow", "Storing credentials"],
        ),
        ts(`
const payload = btoa(JSON.stringify({ sub: "c-123", role: "client" }));
console.log(payload);
console.log(atob(payload)); // anyone can decode it: Base64 is not encryption
`),
        output(`
eyJzdWIiOiJjLTEyMyIsInJvbGUiOiJjbGllbnQifQ==
{"sub":"c-123","role":"client"}
`),
        say("A JWT's payload is only Base64url-encoded, so I never put anything secret in it. It's signed, not encrypted."),
      ],
    },
    {
      id: "sb-sec-tls",
      question: "What does TLS give you? Walk through the handshake.",
      level: "junior",
      short:
        "TLS gives **confidentiality** (encryption), **integrity** (tampering is detected) and **server authentication** (a certificate proves you are talking to the real host). In the handshake, the client says hello with the versions and ciphers it supports, and the server replies with its certificate chain. The client checks the chain up to a trusted certificate authority (CA) and that the hostname matches. Both sides run an ephemeral key exchange (ECDHE) to derive symmetric session keys. TLS 1.3 does all this in one round trip.",
      body: [
        steps(
          "ClientHello: TLS versions, cipher suites, a key share, and SNI (the hostname).",
          "ServerHello: the chosen cipher, the server's key share, and its certificate, with a signature proving it holds the private key.",
          "The client validates the certificate: a trusted CA chain, not expired, not revoked, and a hostname that matches.",
          "Both derive the same symmetric keys from ECDHE. Everything after this is encrypted with AES-GCM or ChaCha20.",
        ),
        list(
          "**mTLS:** the client presents a certificate too. It is common for service-to-service calls inside a bank, and in service meshes.",
          "**Forward secrecy:** because the keys are ephemeral, a stolen server key can't decrypt traffic recorded earlier.",
          "\"SSL\" is the deprecated predecessor. People still say SSL, but they mean TLS 1.2 or 1.3.",
        ),
        trap("Turning off certificate validation to 'fix' an error in development (`rejectUnauthorized: false`, a trust-all `TrustManager`) and shipping it. Fix the trust store instead."),
      ],
    },
    {
      id: "sb-sec-oauth2",
      question: "Explain OAuth2. Which flow would a React app and a backend service each use?",
      level: "intermediate",
      short:
        "OAuth2 is a framework for **delegated authorisation**: a client gets an **access token** from an **authorisation server**, so it can call a **resource server** (the API) on someone's behalf without handling their password. A browser app uses the **Authorization Code flow with PKCE**: the user signs in at the identity provider, the app receives a one-time code, and exchanges it for tokens. A service with no user involved uses **Client Credentials**. The Implicit and Password flows are deprecated.",
      body: [
        steps(
          "The app redirects to `/authorize` with `response_type=code`, `client_id`, `redirect_uri`, `scope`, `state` and a PKCE `code_challenge`.",
          "The user signs in, completes MFA, and consents at the identity provider. The app never sees the password.",
          "The identity provider redirects back with `code` and `state`. The app checks that `state` matches the one it sent (CSRF protection).",
          "The app, or better a BFF, POSTs the code with the PKCE `code_verifier` to `/token` and gets an access token, plus an ID token and a refresh token.",
          "The app calls APIs with `Authorization: Bearer <access token>`. Each API validates the token.",
        ),
        table(
          ["Client", "Flow"],
          ["SPA / Next.js app with a user", "Authorization Code + PKCE (ideally the BFF holds the tokens)"],
          ["Spring service calling another service", "Client Credentials (or mTLS, or a workload identity)"],
          ["CLI on a device without a browser", "Device Authorization"],
          ["Anything new", "Never Implicit or Resource Owner Password"],
        ),
      ],
      docs: "https://oauth.net/2/pkce/",
    },
    {
      id: "sb-sec-oidc-tokens",
      question: "OAuth2 vs OpenID Connect? Access, ID and refresh tokens?",
      level: "intermediate",
      short:
        "OAuth2 is about **authorisation**: what the app may access. **OpenID Connect** adds **authentication** on top: who the user is, carried in an **ID token** (a JWT for the client app, never sent to APIs). The **access token** goes to APIs and is short-lived, minutes rather than hours. The **refresh token** is long-lived, is sent only to the authorisation server to get new access tokens, and should be rotated on each use and stored very carefully.",
      body: [],
    },
    {
      id: "sb-sec-jwt",
      question: "What is a JWT, and how should an API validate one?",
      level: "intermediate",
      short:
        "A JWT is three Base64url parts, `header.payload.signature`. The payload holds claims (`sub`, `iss`, `aud`, `exp`, `scope`), and the signature proves who issued it and that nobody changed it. To validate one: allow-list the algorithm (RS256 or ES256, never `none`, never whatever the header says), find the public key by `kid` in the issuer's JWKS, verify the signature, then check `iss`, `aud`, `exp` and `nbf`, with a little clock skew allowed. Then authorise against its scopes and the user's ownership of the resource.",
      body: [
        ts(`
function decodeJwtPayload(token: string): Record<string, unknown> {
  const [, payload] = token.split(".");
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/"); // base64url → base64
  return JSON.parse(atob(base64)) as Record<string, unknown>;
}

const header = btoa(JSON.stringify({ alg: "RS256", kid: "k1" })).replace(/=+$/, "");
const body = btoa(JSON.stringify({ sub: "c-123", aud: "onboarding-api", exp: 1767225600 })).replace(/=+$/, "");
const claims = decodeJwtPayload(\`\${header}.\${body}.signature\`);
console.log(claims.sub, claims.aud);
`),
        output("c-123 onboarding-api"),
        p("Decoding is not validating: the code above checks nothing. In production, let a library verify the token (Spring Security's resource server, `jose` in Node), configured with the issuer and the audience."),
        trap("Treating a JWT as revocable. It stays valid until `exp`. Keep access tokens short-lived, rotate refresh tokens, and keep a denylist (by `jti`) for emergencies."),
      ],
    },
    {
      id: "sb-sec-token-storage",
      question: "Where should a browser app keep its tokens?",
      level: "intermediate",
      short:
        "Ideally, not in JavaScript at all. With a **backend-for-frontend**, the server does the OAuth exchange, keeps the tokens, and gives the browser a session cookie that is `HttpOnly`, `Secure` and `SameSite=Lax` or `Strict`. Any XSS can read `localStorage`, so a stolen token there works anywhere. Memory-only tokens are a middle ground, but they are lost on reload and are still exposed to XSS while the page runs.",
      body: [
        http(`
Set-Cookie: __Host-session=9f3c...; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=900
`),
        p("The `__Host-` prefix makes the browser enforce `Secure`, `Path=/` and no `Domain` attribute. With cookies you need CSRF protection: `SameSite`, plus a CSRF token or an Origin check on requests that change state."),
      ],
    },
    {
      id: "sb-sec-owasp",
      question: "Which OWASP Top 10 risks matter most for a banking web app?",
      level: "junior",
      short:
        "**Broken access control** is number one: an IDOR is changing `/accounts/123` to `/accounts/124` and getting someone else's data, so check ownership on the server for every object. Then **injection** (SQL, commands), **cryptographic failures** (personal data not encrypted, weak TLS), **security misconfiguration** (verbose errors, open storage buckets, default credentials), **vulnerable and outdated components** (unpatched dependencies), **authentication failures**, and **SSRF**.",
      body: [
        table(
          ["Risk", "Onboarding example", "Defence"],
          ["Broken access control / IDOR", "`GET /applications/{id}` returns another client's application", "Check that the caller owns it (or is their advisor) on every request"],
          ["Injection", "A search field concatenated into SQL", "Parameterised queries"],
          ["XSS", "An advisor's note rendered as HTML", "React's escaping, no `dangerouslySetInnerHTML`, a Content Security Policy"],
          ["Sensitive data exposure", "A SIN in logs or in a JWT", "Masking, encryption, minimal claims"],
          ["Vulnerable components", "An old library with a known CVE", "SCA scans (BlackDuck, Dependabot), patching"],
          ["SSRF", "A 'fetch logo from URL' feature reaching cloud metadata", "Allow-list destinations"],
        ),
      ],
      docs: "https://owasp.org/Top10/",
    },
    {
      id: "sb-sec-xss-csrf",
      question: "How do XSS and CSRF work, and how do React and Next.js help?",
      level: "junior",
      short:
        "**XSS:** an attacker gets script to run in your page, usually through untrusted data rendered as HTML, and it can then do anything the user can. React escapes everything you render by default. The risks are `dangerouslySetInnerHTML`, `href={userInput}` (a `javascript:` URL), and third-party scripts. Add a Content Security Policy. **CSRF:** another site makes the user's browser send an authenticated request that changes something. Defend with `SameSite` cookies, CSRF tokens, and checking the Origin. Next.js Server Actions check the Origin for you.",
      body: [],
    },
    {
      id: "sb-sec-authn-authz",
      question: "Authentication vs authorisation? How do you model who can do what?",
      level: "junior",
      short:
        "Authentication answers 'who are you?' (sign-in, MFA, a valid token). Authorisation answers 'what may you do?'. **RBAC** grants permissions by role (client, advisor, operations, compliance). **ABAC** adds attributes, such as 'advisors can view only their own book of clients' or 'only from managed devices'. Enforce it on the server, at the API and the service layer, and deny by default. Hiding a button in the UI is not authorisation.",
      body: [
        say("For onboarding I'd check three things on every request: who is calling, whether their role allows the action, and whether they have a relationship with this specific client."),
      ],
    },
    {
      id: "sb-sec-secure-coding",
      question: "What does 'security-first development' mean to you day to day?",
      level: "junior",
      short:
        "Validate all input on the server with allow-lists. Encode output. Use parameterised queries. Give each component least privilege. Never log personal data or secrets. Keep dependencies patched, and fix what the scanners find. Keep secrets in a vault. Handle errors without leaking internals. Think about how a feature could be abused during design, not after. In code review, look for missing authorisation checks as hard as for bugs.",
      body: [
        list(
          "Data classification: know which fields are sensitive (SIN, date of birth, account numbers, income, ID images) and treat them accordingly: mask in the UI, encrypt at rest, keep for a limited time.",
          "Privacy law: PIPEDA federally, and Quebec's Law 25 for Quebec residents. Collect only what you need for a stated purpose.",
          "Pipeline gates: SAST (Fortify), software composition analysis (BlackDuck), secret scanning, container image scanning.",
        ),
      ],
    },
  ],
};
