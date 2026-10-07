import { parsePrepInline, type PrepInline } from "@lib";

export interface PrepTextProps {
  text: string;
}

/**
 * Prose from the prep sheet, with its `code` and **emphasis** markers rendered.
 * Code spans look the way an option's inline code does elsewhere in the app,
 * but through the `prep-code` class: the sheet renders thousands of them.
 */
export function PrepText({ text }: Readonly<PrepTextProps>) {
  return <>{parsePrepInline(text).map(renderToken)}</>;
}

function renderToken(token: PrepInline, index: number): React.ReactNode {
  if (token.kind === "text") return token.text;

  if (token.kind === "strong") {
    return (
      <strong key={index} className="text-paper font-semibold">
        {token.children.map(renderToken)}
      </strong>
    );
  }

  return (
    <code key={index} className="prep-code">
      {token.text}
    </code>
  );
}
