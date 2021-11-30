import React, { useCallback } from "react";
import { Blocks, RichTextObject } from "@notion-cms/types";
import { useState } from "react";
import styled, { css } from "styled-components";
import RTO from "../RTO";
import { Block } from "..";

const Wrapper = styled.p`
  margin: 0;
`;

interface ButtonProps {
  active: boolean;
}
const ToggleButton = styled.button<ButtonProps>`
  background: #cccccc00;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  height: 20px;
  margin-right: 5px;
  padding: 3px 0 0 1px;
  transition: 0.4s;
  width: 20px;

  &:hover {
    background: #cccccc84;
  }

  ${(p) =>
    p.active &&
    css`
      transform: rotate(90deg);
    `}
  ${(p) =>
    p.disabled &&
    css`
      opacity: 0.4;
    `}
`;
const ContentWrapper = styled.section`
  margin-left: 25px;
`;

interface Props {
  title: RichTextObject[];
  content: Blocks;
}

const Toggle: React.FC<Props> = ({ title, content }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen((o) => !o), [setOpen]);

  return (
    <>
      <Wrapper>
        <ToggleButton onClick={toggleOpen} active={open} disabled={!content}>
          ▶
        </ToggleButton>
        <RTO objects={title} />
      </Wrapper>
      {open && content && (
        <ContentWrapper>
          {content.map((block) => (
            <Block block={block} />
          ))}
        </ContentWrapper>
      )}
    </>
  );
};

export default Toggle;
