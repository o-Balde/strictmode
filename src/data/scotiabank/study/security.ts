import { concept, http, java, js, output, pair, qa, steps, table, trap, ts, yaml } from "./authoring";
import type { StudyTopic } from "./types";

export const SECURITY: StudyTopic = {
  id: "security",
  short: "Security",
  title: "Security: SSL/TLS, OAuth 2.0 and JWT",
  jd: "Security: awareness of SSL/TLS, OAuth2, JWT; security-first development",
  weight: "core",
  summary:
    "At a bank, security is part of every answer, not a separate topic. The posting names three technologies. **TLS** protects data on the wire. **OAuth 2.0** decides what an app may do on a user's behalf. **JWTs** carry that decision between services. Know what each one does and doesn't do, and connect them: the user signs in with OIDC, the app gets an access token, and every API verifies it over TLS.",
  concepts: [
    concept("TLS, and what happened to SSL", "TLS protects data in transit with **confidentiality** (encryption), **integrity** (tampering is detected) and **authentication** (you're talking to the real server). SSL was its predecessor; every SSL version and TLS 1.0 and 1.1 are deprecated, leaving TLS 1.2 and 1.3. People still say 'SSL certificate'."),
    concept("Symmetric vs asymmetric cryptography", "**Symmetric** (AES-GCM, ChaCha20): one shared key encrypts and decrypts; fast, used for the actual data. **Asymmetric** (RSA, elliptic curves): a public and a private key; slow, used to agree on keys and to sign. TLS uses asymmetric cryptography to set up a symmetric session."),
    concept("Certificates and the chain of trust", "An X.509 certificate binds a public key to a domain name and is signed by a certificate authority. The server sends its certificate plus intermediates; the client checks the chain up to a root it already trusts, the hostname, the validity dates and revocation."),
    concept("The TLS 1.3 handshake", "The client sends supported ciphers and a key share; the server answers with its key share, and both derive the session keys. The server then proves it owns the certificate's private key by signing the handshake, and both confirm with `Finished` messages. One round trip, then encrypted data."),
    concept("Forward secrecy", "Each session's keys come from fresh, ephemeral Diffie-Hellman values (ECDHE), so stealing the server's private key later can't decrypt traffic recorded earlier. TLS 1.3 requires it; it dropped static RSA key exchange entirely."),
    concept("Mutual TLS (mTLS)", "Both sides present certificates, so the server also authenticates the client machine. Used for service-to-service traffic inside a mesh, and for partner and banking APIs. It identifies a workload, not a user."),
    concept("TLS termination and HSTS", "TLS usually ends at a load balancer or gateway, which can re-encrypt to the service behind it. The `Strict-Transport-Security` header tells browsers to use HTTPS only for the domain, preventing downgrade to plain HTTP."),
    concept("OAuth 2.0", "A framework for **delegated authorisation**: an app gets an access token, limited by **scopes**, to call an API on a user's behalf, without ever seeing the user's password. On its own it doesn't say who the user is; that's OpenID Connect."),
    concept("The four OAuth roles", "**Resource owner**: the user. **Client**: the app asking for access. **Authorisation server**: authenticates the user, gets consent, issues tokens (Microsoft Entra ID, Okta, Ping). **Resource server**: the API that accepts the tokens."),
    concept("Authorisation code flow with PKCE", "The app redirects the user to the authorisation server with a hashed random secret (the code challenge). After login it gets back a one-time code, and exchanges code plus the original secret (the verifier) for tokens. A stolen code is useless without the verifier. The standard flow for web, single-page and mobile apps."),
    concept("Client credentials flow", "A service authenticates as itself (client ID and secret, a certificate, or a signed assertion) and gets a token for another API. Machine to machine, no user involved: a batch job calling the accounts API."),
    concept("Access, refresh and ID tokens", "The **access token** goes to APIs, short-lived (minutes). The **refresh token** gets new access tokens without a new login; long-lived, kept secret, rotated on use. The **ID token** (OIDC) tells the client who signed in, and is never sent to APIs."),
    concept("OpenID Connect", "An identity layer on OAuth 2.0: adding the `openid` scope returns an ID token, a JWT with the user's identity. It standardises discovery (`/.well-known/openid-configuration`), signing keys (JWKS) and a userinfo endpoint. 'Sign in with...' is OIDC."),
    concept("Deprecated OAuth grants", "The **implicit** grant returned tokens in the URL, and the **password** grant handed the user's password to the app. RFC 9700, the OAuth security best practice from January 2025, says not to use them: use the authorisation code flow with PKCE."),
    concept("JWT anatomy", "Three base64url parts joined by dots: **header** (algorithm, key ID), **payload** (claims) and **signature**. A signed JWT (JWS) is readable by anyone who has it: it proves who issued it and that it wasn't changed, but hides nothing. Encrypted JWTs (JWE) exist but are rarer."),
    concept("Registered claims", "`iss` (issuer), `sub` (subject: the user or client), `aud` (audience: which API it's for), `exp` (expiry), `nbf` (not before), `iat` (issued at), `jti` (unique ID). Apps add claims such as `scope` or `roles`."),
    concept("Validating a JWT", "Verify the signature with the issuer's public key (picked from its JWKS by `kid`) and only with the algorithm you expect; then check `iss`, `aud`, `exp` and `nbf`; then authorise using the scopes or roles. Never trust a token you only decoded."),
    concept("HS256 vs RS256", "**HS256** signs with a shared secret, so anyone who can verify can also mint tokens: fine inside one service. **RS256** or **ES256** sign with a private key held only by the issuer; every API verifies with the public key, which is what you want across many services."),
    concept("Where a browser should keep tokens", "Not in `localStorage`, where any injected script can read them. Prefer a backend-for-frontend that holds the tokens server-side and gives the browser an `HttpOnly`, `Secure`, `SameSite` session cookie; otherwise keep the access token in memory only."),
    concept("Revoking JWTs", "A JWT stays valid until it expires, since APIs check it without calling anyone. So keep access tokens short-lived (5 to 15 minutes), revoke the refresh token, rotate refresh tokens on use, and for urgent cases keep a deny-list of `jti` values or use introspection."),
    concept("Encoding, encryption and hashing", "**Encoding** (base64, URL encoding) changes format and is reversible by anyone. **Encryption** (AES, RSA) is reversible only with a key, and protects confidentiality. **Hashing** (SHA-256) is one-way, and proves integrity. Passwords get slow, salted hashes: Argon2id, bcrypt."),
    concept("Injection", "Untrusted input interpreted as code: SQL, NoSQL operators, shell commands, LDAP. The fix is structural: parameterised queries or prepared statements, ORMs used properly, and never concatenating input into a query or command."),
    concept("XSS and CSRF", "**XSS**: attacker script runs in your page, so encode output (React escapes by default; `dangerouslySetInnerHTML` doesn't) and add a Content Security Policy. **CSRF**: another site makes the browser send your cookies, so use `SameSite` cookies and anti-CSRF tokens. Bearer tokens in headers aren't sent automatically, so they're not exposed to CSRF."),
    concept("CORS", "The browser blocks a page from reading responses from another origin unless that server allows it with `Access-Control-Allow-Origin`. CORS relaxes the browser's same-origin policy; it doesn't protect the server, since `curl` ignores it. Never combine `*` with credentials."),
    concept("Security-first development", "Least privilege everywhere, validated input at every boundary, secrets in a vault, dependencies scanned and patched (SCA), static analysis (SAST) in the pipeline, threat modelling for new features, security headers, no secrets or personal data in logs, and an audit trail for sensitive actions."),
  ],
  parts: [
    {
      id: "security-tls",
      title: "TLS, step by step",
      blocks: [
        steps(
          "**ClientHello**: TLS versions, cipher suites, and a key share, an ephemeral public key (today often the post-quantum hybrid X25519MLKEM768).",
          "**ServerHello**: the chosen cipher and the server's key share. Both sides now compute the same secret (ECDHE) and derive the session keys. Everything after this is encrypted.",
          "**Certificate** and **CertificateVerify**: the server's certificate chain, and a signature over the handshake made with the certificate's private key, proving it owns it.",
          "**Finished** from both sides: a hash of the whole handshake, so any tampering is detected.",
          "The client has verified the chain, the hostname and the dates. Application data flows, protected by AES-GCM or ChaCha20-Poly1305. One round trip in total (TLS 1.2 took two).",
        ),
        table(
          ["", "Symmetric", "Asymmetric"],
          ["Keys", "One shared secret key", "A public and private key pair"],
          ["Speed", "Fast", "Slow"],
          ["Examples", "AES-GCM, ChaCha20-Poly1305", "RSA, ECDSA, ECDHE, ML-KEM"],
          ["In TLS", "Encrypts the application data", "Key agreement and certificate signatures"],
        ),
        table(
          ["TLS property", "Protects against", "Comes from"],
          ["Confidentiality", "Eavesdropping on Wi-Fi or a network hop", "Symmetric encryption with the session keys"],
          ["Integrity", "Modified requests or responses", "Authenticated encryption (AEAD)"],
          ["Authentication", "A fake server in the middle", "The certificate chain and the handshake signature"],
          ["Forward secrecy", "Decrypting recorded traffic after a key leak", "Ephemeral key exchange per session"],
        ),
      ],
    },
    {
      id: "security-oauth",
      title: "OAuth 2.0 and OpenID Connect",
      blocks: [
        table(
          ["Flow", "Who uses it", "Status"],
          ["Authorisation code + PKCE", "Web apps, SPAs, mobile apps: a user is present", "The standard"],
          ["Client credentials", "Service to service, no user", "Standard for machine-to-machine"],
          ["Refresh token", "Any client holding a refresh token", "Standard; rotate on every use"],
          ["Device authorisation", "TVs, CLIs: devices without a browser", "Standard"],
          ["Implicit", "Old SPAs", "Don't use (RFC 9700)"],
          ["Resource owner password", "Old first-party apps", "Must not be used (RFC 9700)"],
        ),
        table(
          ["Token", "Audience", "Lifetime", "Format"],
          ["Access token", "The API (resource server)", "Minutes", "Often a JWT; can be opaque"],
          ["Refresh token", "The authorisation server only", "Hours to days, rotated", "Opaque"],
          ["ID token (OIDC)", "The client app", "Minutes", "Always a JWT"],
        ),
        table(
          ["", "Answers", "Example"],
          ["Authentication", "Who are you?", "Signing in with a password and MFA, through OIDC"],
          ["Authorisation", "What may you do?", "The access token's scope allows `accounts.read`, not `transfers.write`"],
          ["OAuth 2.0", "Delegated authorisation", "An app calls the accounts API on your behalf"],
          ["OpenID Connect", "Authentication on top of OAuth", "'Sign in with Microsoft'"],
          ["JWT", "A token format, not a protocol", "Carries the claims of an access or ID token"],
          ["SAML", "Older XML-based single sign-on", "Enterprise SSO into internal tools"],
        ),
        http(`
# 1. The app sends the browser to the authorisation server
GET /authorize?response_type=code&client_id=onboarding-web
    &redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback
    &scope=openid%20profile%20accounts.read&state=af0ifjsldkj
    &code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256 HTTP/1.1
Host: login.example.com

# 2. After login and consent, it redirects back with a one-time code
HTTP/1.1 302 Found
Location: https://app.example.com/callback?code=SplxlOBeZQQYbYS6WxSbIA&state=af0ifjsldkj

# 3. The app's server swaps the code, plus the original verifier, for tokens
POST /token HTTP/1.1
Host: login.example.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=SplxlOBeZQQYbYS6WxSbIA&client_id=onboarding-web
&redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback
&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk

HTTP/1.1 200 OK
Content-Type: application/json

{"access_token": "eyJ...", "token_type": "Bearer", "expires_in": 300, "refresh_token": "8xLOxBtZp8", "id_token": "eyJ..."}
`, { caption: "The authorisation code flow with PKCE, on the wire" }),
        js(`
import { createHash } from "node:crypto";

// RFC 7636's example verifier; real code uses 32 random bytes, base64url-encoded
const verifier = "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk";
const challenge = createHash("sha256").update(verifier).digest("base64url");
console.log(challenge);
`, { caption: "PKCE: only the hash of the verifier travels in the redirect" }),
        output(`
E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
`),
        trap("`state` protects the redirect against CSRF, and must match what you sent. PKCE protects the code against interception. They solve different problems: send both."),
      ],
    },
    {
      id: "security-jwt",
      title: "JWTs in practice",
      blocks: [
        js(`
const encode = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");
const decode = (part) => JSON.parse(Buffer.from(part, "base64url").toString("utf8"));

const header = { alg: "RS256", typ: "JWT", kid: "2026-11" };
const payload = { iss: "https://login.example.com", sub: "client-42", aud: "onboarding-api", scope: "accounts.read", exp: 1798761600 };
const token = \`\${encode(header)}.\${encode(payload)}.signature\`;

const [headerPart, payloadPart] = token.split(".");
const claims = decode(payloadPart);
console.log(decode(headerPart).alg, claims.sub, claims.scope);
console.log(new Date(claims.exp * 1000).toISOString());
`, { caption: "Anyone holding a JWT can read it: decoding needs no key" }),
        output(`
RS256 client-42 accounts.read
2027-01-01T00:00:00.000Z
`),
        ts(`
import { createRemoteJWKSet, jwtVerify } from "jose";

const keys = createRemoteJWKSet(new URL("https://login.example.com/.well-known/jwks.json"));

export async function authenticate(authorization: string | undefined) {
  const token = authorization?.replace(/^Bearer /, "");
  if (!token) throw new Error("401: missing token");
  const { payload } = await jwtVerify(token, keys, {
    issuer: "https://login.example.com",
    audience: "onboarding-api",
    algorithms: ["RS256"], // never accept "none", or an algorithm you didn't expect
  });
  return payload; // signature, exp and nbf are checked too
}
`, { caption: "Verifying a JWT in Node with `jose`" }),
        yaml(`
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://login.example.com # keys from its JWKS; iss and exp checked
          audiences: onboarding-api
`, { caption: "The same in Spring Boot: an OAuth2 resource server" }),
        table(
          ["", "JWT access token", "Server-side session"],
          ["State lives", "In the token: the API keeps nothing", "On the server, in memory, Redis or a database"],
          ["Verification", "Signature check, no lookup", "A session lookup per request"],
          ["Revocation", "Hard: wait for expiry, or keep a deny-list", "Easy: delete the session"],
          ["Size", "Hundreds of bytes per request", "A small cookie"],
          ["Fits", "APIs called by many services and clients", "A single web app, a BFF"],
        ),
        table(
          ["", "Encoding", "Encryption", "Hashing"],
          ["Purpose", "Represent data in another format", "Keep data secret", "Fingerprint data, check integrity"],
          ["Reversible", "Yes, by anyone", "Only with the key", "No"],
          ["Examples", "Base64, URL encoding, UTF-8", "AES-GCM, RSA-OAEP", "SHA-256; Argon2id and bcrypt for passwords"],
          ["Mistake to avoid", "Treating base64 as protection", "Hard-coding the key", "Fast, unsalted hashes for passwords"],
        ),
      ],
    },
    {
      id: "security-before-after",
      title: "Before and after: insecure habits to current practice",
      pairs: [
        pair("The implicit grant to the authorisation code flow with PKCE", "RFC 7636 (PKCE, 2015), RFC 9700 (2025)", "The implicit grant put the access token in the URL fragment, exposed to browser history, logs and any script on the page. With the code flow, the token comes from a back-channel request that requires the verifier.", {
          before: http(`
GET /authorize?response_type=token&client_id=onboarding-web&redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback HTTP/1.1
Host: login.example.com

HTTP/1.1 302 Found
Location: https://app.example.com/callback#access_token=eyJhbGciOi...&token_type=Bearer
`),
          after: http(`
GET /authorize?response_type=code&client_id=onboarding-web&redirect_uri=https%3A%2F%2Fapp.example.com%2Fcallback
    &state=af0ifjsldkj&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256 HTTP/1.1
Host: login.example.com

HTTP/1.1 302 Found
Location: https://app.example.com/callback?code=SplxlOBeZQQYbYS6WxSbIA&state=af0ifjsldkj
`),
        }),
        pair("A token in `localStorage` to an `HttpOnly` session cookie", "Backend-for-frontend pattern", "Any script that runs on the page, through an XSS bug or a compromised dependency, can read `localStorage`. An `HttpOnly` cookie is invisible to JavaScript; the BFF keeps the real tokens on the server and attaches them to API calls.", {
          before: js(`
localStorage.setItem("accessToken", token);

await fetch("/api/accounts", {
  headers: { Authorization: \`Bearer \${localStorage.getItem("accessToken")}\` },
});
`),
          after: http(`
HTTP/1.1 200 OK
Set-Cookie: session=7f3c9a...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=1800

# the browser sends the cookie automatically; scripts can't read it
GET /api/accounts HTTP/1.1
Cookie: session=7f3c9a...
`),
        }),
        pair("String-built SQL to a prepared statement", "JDBC `PreparedStatement`", "With concatenation, an email of `' OR '1'='1` returns every client. With a placeholder, the input is always data, never SQL.", {
          before: java(`
String sql = "SELECT * FROM clients WHERE email = '" + email + "'";
ResultSet rows = connection.createStatement().executeQuery(sql);
`),
          after: java(`
PreparedStatement query = connection.prepareStatement("SELECT * FROM clients WHERE email = ?");
query.setString(1, email);
ResultSet rows = query.executeQuery();
`),
        }),
        pair("A fast hash for passwords to an adaptive one", "bcrypt (1999), Argon2 (2015)", "SHA-256 is designed to be fast, so a leaked table of hashes can be guessed at billions per second, and identical passwords share a hash. bcrypt and Argon2id are deliberately slow, salted per password, and tunable as hardware improves.", {
          before: java(`
MessageDigest digest = MessageDigest.getInstance("SHA-256");
String stored = HexFormat.of().formatHex(digest.digest(password.getBytes(StandardCharsets.UTF_8)));
`),
          after: java(`
PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
String stored = encoder.encode(password); // "{bcrypt}$2a$10$...": salted, slow, upgradable
boolean matches = encoder.matches(attempt, stored);
`),
        }),
      ],
    },
  ],
  questions: [
    qa("What happens in a TLS handshake?", "The client offers TLS versions, ciphers and a key share; the server picks a cipher and sends its own key share, so both derive the same session keys. The server sends its certificate and signs the handshake to prove it holds the private key; the client verifies the chain and hostname. In TLS 1.3 that's one round trip, then everything is encrypted with fast symmetric keys."),
    qa("SSL vs TLS?", "TLS is the successor to SSL; every SSL version is broken and disabled, and TLS 1.0 and 1.1 were deprecated in 2021. Use TLS 1.2 at minimum and TLS 1.3 by default. 'SSL certificate' survives as a name; it's an X.509 certificate used by TLS."),
    qa("How does a browser decide to trust a certificate?", "It builds a chain from the server's certificate through intermediates to a root certificate authority in its trust store, checks each signature, checks that the name matches the host, that the dates are valid, and that it isn't revoked. Any failure is a hard error."),
    qa("What is mTLS, and when would you use it?", "Mutual TLS: the client presents a certificate too, so both ends are authenticated at the connection level. Used between internal services (often automated by a service mesh) and for partner or banking APIs, where only known systems may connect."),
    qa("What is forward secrecy?", "Each session uses fresh ephemeral keys for the key exchange, so compromising the server's long-term private key later doesn't let anyone decrypt traffic recorded in the past. TLS 1.3 makes it mandatory."),
    qa("Explain OAuth 2.0 in plain words.", "It's the valet-key pattern: instead of giving an app your password, you sign in with the provider and approve limited access; the app receives a token that allows only those actions (scopes), for a limited time, and can be revoked. The API checks the token, not your password."),
    qa("Why the authorisation code flow with PKCE?", "The browser only ever sees a one-time code; the tokens come back over a direct server-to-server (or app-to-server) request that must include the PKCE verifier. An attacker who intercepts the code can't redeem it. It's recommended for every client type, including SPAs and mobile apps."),
    qa("When would you use the client credentials flow?", "When no user is involved: a scheduled job or one microservice calling another. The service authenticates as itself to get a token scoped to the target API. Prefer certificate or federated credentials over a shared secret, and grant the narrowest scopes."),
    qa("OAuth 2.0 vs OpenID Connect?", "OAuth 2.0 is about authorisation: what an app may access. OIDC adds authentication: an ID token saying who the user is, plus standard discovery and userinfo endpoints. If you're implementing 'sign in', you want OIDC; to call an API, you need an OAuth access token."),
    qa("Access token vs refresh token vs ID token?", "The access token is sent to APIs and expires in minutes. The refresh token gets new access tokens from the authorisation server without a new login, lives longer, must be stored securely, and should rotate on each use. The ID token tells the client app who logged in, and is never sent to APIs."),
    qa("What's inside a JWT, and is it encrypted?", "A header (algorithm, key ID), a payload of claims (`iss`, `sub`, `aud`, `exp`, scopes) and a signature, each base64url-encoded. A normal signed JWT isn't encrypted: anyone can decode it, so never put secrets or sensitive personal data in it. The signature only proves who issued it and that it's unchanged."),
    qa("How do you validate a JWT?", "Verify the signature with the issuer's public key from its JWKS, matched by `kid`, accepting only the expected algorithm. Then check the issuer, the audience is your API, it isn't expired or not-yet-valid, and finally authorise on its scopes or roles. Use a well-tested library, not hand-written parsing."),
    qa("Where should a single-page app store tokens?", "Ideally nowhere in the browser: a backend-for-frontend completes the OAuth flow, keeps the tokens server-side, and gives the browser an `HttpOnly`, `Secure`, `SameSite` cookie. Otherwise, keep the access token in memory and use refresh-token rotation. Not `localStorage`, which any XSS can read."),
    qa("How do you revoke a JWT before it expires?", "You can't, directly: APIs verify it offline. Design around that: short access-token lifetimes, revoke the refresh token so no new access tokens are issued, and for emergencies a deny-list of token IDs (`jti`) or a 'tokens before this time are invalid' marker per user, checked by the APIs."),
    qa("JWT vs session cookie?", "A session cookie points at state stored on the server: easy to revoke, but every request needs a lookup and services must share the store. A JWT carries signed claims itself: any service can verify it without a lookup, which suits microservices, but it's bigger and hard to revoke."),
    qa("HS256 vs RS256?", "HS256 uses one shared secret to sign and verify, so every verifier could also forge tokens. RS256 (or ES256) signs with a private key only the issuer holds; APIs verify with the public key from the JWKS. Across many services, use asymmetric signing."),
    qa("Encoding vs encryption vs hashing?", "Encoding changes representation and is reversible by anyone: base64 isn't security. Encryption is reversible with a key, and provides confidentiality: AES, RSA. Hashing is one-way: SHA-256 for integrity and fingerprints, and slow salted algorithms like Argon2id or bcrypt for passwords."),
    qa("How should passwords be stored?", "Never in plain text or with a fast hash. Use Argon2id, bcrypt or scrypt: a unique salt per password and a tunable work factor, through a library such as Spring Security's `PasswordEncoder`. Better still, for staff apps, delegate sign-in to the bank's identity provider."),
    qa("How do you prevent SQL injection?", "Parameterised queries everywhere (`PreparedStatement`, `$1` placeholders, ORM parameters), never concatenating input into SQL. Add input validation, least-privilege database accounts, and SAST in the pipeline to catch mistakes."),
    qa("What are XSS and CSRF, and how do you prevent them?", "XSS runs attacker script in your page: escape output (React does by default), sanitise any HTML you must render, and set a Content Security Policy. CSRF makes a victim's browser send an authenticated request from another site: `SameSite` cookies, anti-CSRF tokens, and checking the `Origin` header."),
    qa("What is CORS, and does it protect my API?", "It's a browser rule: a page can only read cross-origin responses the server explicitly allows with `Access-Control-Allow-*` headers. It doesn't protect the API from anything except other browser pages; `curl` and servers ignore it. Authentication and authorisation still protect the API."),
    qa("What does security-first development mean to you?", "Thinking about abuse while designing, not after: validate input at every boundary, authorise every request against the resource, least privilege for services and people, secrets in Key Vault, dependencies scanned and patched, no personal data in logs, and security tests and scans in CI, so the pipeline blocks the mistakes I'd otherwise miss."),
  ],
  news: [
    { text: "RFC 9700 (January 2025) is the OAuth 2.0 security best current practice: PKCE for every client, exact redirect URI matching, no implicit or password grants, and sender-constrained or rotated refresh tokens.", url: "https://www.rfc-editor.org/rfc/rfc9700" },
    { text: "OAuth 2.1, which folds those practices into one specification, is still an IETF draft (revision 17, October 2026).", url: "https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/" },
    { text: "Chrome (131+) and Firefox (132+) negotiate the hybrid post-quantum key exchange X25519MLKEM768 by default in TLS 1.3, protecting recorded traffic against future quantum computers.", url: "https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-support/" },
    { text: "Public TLS certificates are getting shorter lives: 200 days maximum from March 2026, dropping to 47 days by 2029. Automated renewal is no longer optional.", url: "https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/" },
  ],
  docs: [
    { label: "RFC 8446: TLS 1.3", url: "https://www.rfc-editor.org/rfc/rfc8446" },
    { label: "RFC 6749: OAuth 2.0", url: "https://www.rfc-editor.org/rfc/rfc6749" },
    { label: "RFC 7636: PKCE", url: "https://www.rfc-editor.org/rfc/rfc7636" },
    { label: "RFC 7519: JSON Web Token", url: "https://www.rfc-editor.org/rfc/rfc7519" },
    { label: "RFC 8725: JWT best current practices", url: "https://www.rfc-editor.org/rfc/rfc8725" },
    { label: "OWASP Top 10", url: "https://owasp.org/Top10/" },
  ],
  bank: ["sb-security"],
};
