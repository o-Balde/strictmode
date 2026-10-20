/**
 * OTP INPUT: your workspace. Spec on the prep page; run it with
 *   npm run level -- otp-input
 */
export interface OtpInputProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export function OtpInput({ length = 6 }: OtpInputProps) {
  return (
    <div>
      {Array.from({ length }, (_, index) => (
        <input key={index} aria-label={`Digit ${index + 1}`} inputMode="numeric" />
      ))}
    </div>
  );
}
