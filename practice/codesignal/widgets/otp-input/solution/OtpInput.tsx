import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";

/**
 * OTP INPUT: reference solution.
 *
 * The digits live in one array; the inputs only display it. Typing goes
 * through onChange (keeping the last digit typed, so typing into a filled box
 * replaces it), Backspace and the arrows through onKeyDown, paste through
 * onPaste. Focus moves with refs, never with state.
 */
export interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

const DIGIT = /\d/;

export function OtpInput({ length = 6, onComplete }: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length }, () => ""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const focus = (index: number) => inputs.current[Math.max(0, Math.min(length - 1, index))]?.focus();

  function update(next: string[]) {
    setDigits(next);
    if (next.every((digit) => digit !== "")) onCompleteRef.current?.(next.join(""));
  }

  function handleChange(index: number, value: string) {
    const typed = [...value].reverse().find((character) => DIGIT.test(character));
    if (!typed) return;
    const next = [...digits];
    next[index] = typed;
    update(next);
    focus(index + 1);
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const next = [...digits];
      if (next[index] !== "") {
        next[index] = "";
      } else if (index > 0) {
        next[index - 1] = "";
        focus(index - 1);
      }
      update(next);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focus(index - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      focus(index + 1);
    }
  }

  function handlePaste(index: number, event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = [...event.clipboardData.getData("text")].filter((character) => DIGIT.test(character));
    if (pasted.length === 0) return;
    const next = [...digits];
    pasted.slice(0, length - index).forEach((digit, offset) => {
      next[index + offset] = digit;
    });
    update(next);
    focus(index + pasted.length);
  }

  return (
    <div role="group" aria-label="One-time code">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputs.current[index] = element;
          }}
          aria-label={`Digit ${index + 1}`}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          value={digit}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  );
}
