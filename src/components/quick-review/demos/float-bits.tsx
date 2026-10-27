"use client";

/**
 * The 64 bits of a JavaScript number: sign, exponent and fraction, read
 * straight out of a Float64Array, and the exact decimal value those bits
 * stand for, worked out with BigInt so nothing is rounded on the way.
 */
import { useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton } from "./ui";

const PRESETS: { label: string; value: number }[] = [
  { label: "0.1", value: 0.1 },
  { label: "0.2", value: 0.2 },
  { label: "0.1 + 0.2", value: 0.1 + 0.2 },
  { label: "0.3", value: 0.3 },
  { label: "1 / 3", value: 1 / 3 },
  { label: "0.5", value: 0.5 },
  { label: "2 ** 53", value: 2 ** 53 },
  { label: "2 ** 53 + 1", value: 2 ** 53 + 1 },
  { label: "-0", value: -0 },
  { label: "Infinity", value: Infinity },
  { label: "NaN", value: NaN },
];

interface Decoded {
  bits: string;
  sign: number;
  exponentBits: number;
  fraction: bigint;
}

function decode(value: number): Decoded {
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  const raw = view.getBigUint64(0);
  const bits = raw.toString(2).padStart(64, "0");
  return {
    bits,
    sign: Number(raw >> 63n),
    exponentBits: Number((raw >> 52n) & 0x7ffn),
    fraction: raw & ((1n << 52n) - 1n),
  };
}

/** The exact value of a finite double, as a decimal string. */
export function exactDecimal(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  const { sign, exponentBits, fraction } = decode(value);
  // Normal numbers have an implicit leading 1; subnormals don't, and use the minimum exponent.
  const significand = exponentBits === 0 ? fraction : (1n << 52n) | fraction;
  const power = (exponentBits === 0 ? 1 : exponentBits) - 1075;
  let digits: string;
  if (power >= 0) {
    digits = (significand << BigInt(power)).toString();
  } else {
    // m / 2^k = m · 5^k / 10^k: multiply by 5^k, then put the point k digits from the right.
    const k = -power;
    const scaled = (significand * 5n ** BigInt(k)).toString().padStart(k + 1, "0");
    const whole = scaled.slice(0, scaled.length - k);
    const decimals = scaled.slice(scaled.length - k).replace(/0+$/, "");
    digits = decimals ? `${whole}.${decimals}` : whole;
  }
  return (sign ? "-" : "") + digits;
}

/** "1.5e-7" → "0.00000015": the shortest form JavaScript prints, without exponent notation. */
function plainDecimal(text: string): string {
  const match = /^(-?)(\d+)(?:\.(\d+))?e([+-]\d+)$/.exec(text);
  if (!match) return text;
  const [, sign, whole, fraction = "", exponentText] = match;
  const exponent = Number(exponentText);
  const digits = whole + fraction;
  const point = whole.length + exponent;
  if (point <= 0) return `${sign}0.${"0".repeat(-point)}${digits}`.replace(/0+$/, "");
  if (point >= digits.length) return sign + digits + "0".repeat(point - digits.length);
  return `${sign}${digits.slice(0, point)}.${digits.slice(point)}`;
}

function neighbour(value: number, direction: 1 | -1): number {
  if (!Number.isFinite(value)) return value;
  const view = new DataView(new ArrayBuffer(8));
  view.setFloat64(0, value);
  const raw = view.getBigUint64(0);
  if (value === 0) {
    view.setBigUint64(0, 1n);
    const tiny = view.getFloat64(0);
    return direction === 1 ? tiny : -tiny;
  }
  const away = (value > 0) === (direction === 1);
  view.setBigUint64(0, away ? raw + 1n : raw - 1n);
  return view.getFloat64(0);
}

export function FloatBits() {
  const [input, setInput] = useState("0.1");
  const value = input.trim() === "" ? NaN : Number(input);
  const decoded = decode(value);
  const exponent = decoded.exponentBits - 1023;
  const special = decoded.exponentBits === 0x7ff ? (decoded.fraction === 0n ? "Infinity" : "NaN") : decoded.exponentBits === 0 ? (decoded.fraction === 0n ? "zero" : "subnormal") : null;
  const exact = exactDecimal(value);
  // The shortest decimal JavaScript prints is the stored value itself only for sums of powers of two.
  const isExact = Number.isFinite(value) && (value === 0 || exact === plainDecimal(String(value)));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2">
          <span className="text-ash text-[12px]">number</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
            className="border-line-3 bg-surface text-paper w-44 rounded-md border px-2.5 py-1.5 font-mono text-[13px] outline-none focus:border-flame"
          />
        </label>
        {PRESETS.map((preset) => (
          <DemoButton key={preset.label} onClick={() => setInput(String(Object.is(preset.value, -0) ? "-0" : preset.value))} className="font-mono">
            {preset.label}
          </DemoButton>
        ))}
      </div>

      <div className="scrollbar-hairline overflow-x-auto">
        <div className="flex w-max gap-px font-mono text-[11px]" aria-label={`Bits: ${decoded.bits}`} role="img">
          {decoded.bits.split("").map((bit, index) => (
            <span
              key={index}
              className={cn(
                "grid h-7 w-3.5 place-items-center rounded-[2px]",
                index === 0 ? "bg-rust-bg text-rust" : index < 12 ? "bg-binary-deep text-binary-soft" : "bg-mint-deep text-mint-soft",
                bit === "1" && "font-bold",
                (index === 1 || index === 12) && "ml-1.5",
              )}
            >
              {bit}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="sign (1 bit)" tone="text-rust" value={decoded.sign ? "1 → negative" : "0 → positive"} />
        <Field
          label="exponent (11 bits)"
          tone="text-binary-soft"
          value={special ? `${decoded.exponentBits} (${special})` : `${decoded.exponentBits} − 1023 = ${exponent}`}
        />
        <Field label="fraction (52 bits)" tone="text-mint-soft" value={`0x${decoded.fraction.toString(16).padStart(13, "0")}`} />
      </div>

      <div className="border-line-3 bg-surface rounded-lg border p-3">
        <div className={DEMO_LABEL}>the value actually stored</div>
        <p className="text-paper m-0 mt-1 font-mono text-[13px] break-all">{exact}</p>
        <p className={cn("m-0 mt-2 text-[12px]", isExact ? "text-mint-soft" : "text-peach")}>
          {!Number.isFinite(value)
            ? "Not a finite number: the exponent is all ones."
            : isExact
              ? "Exactly representable: this number is a sum of powers of two."
              : `Not exactly representable. JavaScript prints it as ${String(value)}, the shortest decimal that rounds back to these bits.`}
        </p>
      </div>

      {Number.isFinite(value) ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="next double below" tone="text-stone" value={String(neighbour(value, -1))} />
          <Field label="next double above" tone="text-stone" value={String(neighbour(value, 1))} />
        </div>
      ) : null}
    </div>
  );
}

function Field({ label, value, tone }: Readonly<{ label: string; value: string; tone: string }>) {
  return (
    <div className="border-line-2 bg-surface-2 min-w-0 rounded-md border px-3 py-2">
      <div className={DEMO_LABEL}>{label}</div>
      <div className={cn("font-mono text-[12.5px] break-all", tone)}>{value}</div>
    </div>
  );
}
