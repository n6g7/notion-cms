import React, {
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Block } from "@notion-cms/types";
import styled from "styled-components";
import hljs from "highlight.js";

const DebugContainer = styled.div`
  margin: 0;
  padding: 0;
  transition: background 1s ease 0s;

  &:hover {
    background: #cacaca45;
    transition-delay: 1s;
  }
`;
const DebugCode = styled.aside`
  background: #3f3f3fdf;
  color: white;
  border-radius: 3px;
  position: fixed;
  top: 10px;
  right: 10px;
  padding: 5px;
  margin: 0;
  max-width: 40%;
  overflow-y: scroll;
  max-height: calc(100% - 20px);
  z-index: 10;

  p {
    margin: 0;
  }

  pre {
    background: none;
    font-size: 12px;
    margin: 0;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
`;

interface Props {
  block: Block;
  children: ReactElement;
}

const DebugWrapper: React.FC<Props> = ({ block, children }) => {
  const [showDebug, setShowDebug] = useState(false);
  const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!e.altKey) return;
    setShowDebug((s) => !s);
  }, []);
  const stringified = useMemo(() => JSON.stringify(block, null, 2), [block]);
  const highlighted = useMemo(
    () => hljs.highlight(stringified, { language: "json" }),
    [stringified]
  );

  return (
    <DebugContainer onClick={onClick}>
      {children}
      {showDebug && (
        <DebugCode>
          <p>
            Block <code>{block.id.substr(0, 6)}</code>
          </p>
          <pre className="hljs">
            <code dangerouslySetInnerHTML={{ __html: highlighted.value }} />
          </pre>
        </DebugCode>
      )}
    </DebugContainer>
  );
};

export default DebugWrapper;
