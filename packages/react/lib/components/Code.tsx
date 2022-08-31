import React, { useMemo } from "react";
import debug from "debug";
import { CodeBlock, TextRTO } from "@notion-cms/types";
import hljs from "highlight.js";

const log = debug("notion-cms:react");

interface Props {
  block: CodeBlock;
}

const Code = ({ block }: Props) => {
  if (
    block.code.rich_text.length !== 1 ||
    block.code.rich_text[0].type !== "text"
  ) {
    log("Ignoring weird code block: %O", block);
    return;
  }

  const rto = block.code.rich_text[0] as TextRTO;

  const highlighted = useMemo(
    () =>
      hljs.highlight(rto.text.content, {
        language: block.code.language,
      }),
    [rto.text.content]
  );

  return (
    <pre className="hljs">
      <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
    </pre>
  );
};

export default Code;
