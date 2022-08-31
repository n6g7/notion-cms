import React from "react";
import {
  RichTextObject,
  TextRTO as TextRTOType,
  MentionRTO as MentionRTOType,
  Color,
} from "@notion-cms/types";
import debug from "debug";

const log = debug("notion-cms:react");

const colorMap: Record<Color, string> = {
  default: "#000000",
  gray: "rgba(120, 119, 116, 1)",
  brown: "rgba(159, 107, 83, 1)",
  orange: "rgba(217, 115, 13, 1)",
  yellow: "rgba(203, 145, 47, 1)",
  green: "rgba(68, 131, 97, 1)",
  blue: "rgba(51, 126, 169, 1)",
  purple: "rgba(144, 101, 176, 1)",
  pink: "rgba(193, 76, 138, 1)",
  red: "rgba(212, 76, 71, 1)",
  gray_background: "rgba(241, 241, 239, 1)",
  brown_background: "rgba(244, 238, 238, 1)",
  orange_background: "rgba(251, 236, 221, 1)",
  yellow_background: "rgba(251, 243, 219, 1)",
  green_background: "rgba(237, 243, 236, 1)",
  blue_background: "rgba(231, 243, 248, 1)",
  purple_background: "rgba(244, 240, 247, 0.8)",
  pink_background: "rgba(249, 238, 243, 0.8)",
  red_background: "rgba(253, 235, 236, 1)",
};

// Text RTO
interface TextProps {
  object: TextRTOType;
}

const TextRTO: React.FC<TextProps> = ({ object }) => {
  const { text, annotations } = object;

  let result: React.ReactElement = (
    <React.Fragment key="base">
      {text.content
        .split("\n")
        .flatMap((val, index) =>
          index > 0 ? [<br key={`br-${index}`} />, val] : [val]
        )}
    </React.Fragment>
  );

  if (text.link)
    result = (
      <a key="link" href={text.link.url}>
        {result}
      </a>
    );
  if (annotations.bold) result = <strong key="bold">{result}</strong>;
  if (annotations.italic) result = <em key="italic">{result}</em>;
  if (annotations.code) result = <code key="code">{result}</code>;
  if (annotations.color !== "default")
    result = (
      <span key="color" style={{ color: colorMap[annotations.color] }}>
        {result}
      </span>
    );
  if (annotations.strikethrough)
    result = (
      <span key="strikethrough" style={{ textDecoration: "line-through" }}>
        {result}
      </span>
    );
  if (annotations.underline)
    result = (
      <span key="underline" style={{ textDecoration: "underline" }}>
        {result}
      </span>
    );

  return result;
};

// Mention RTO
interface MentionProps {
  object: MentionRTOType;
}

const MentionRTO: React.FC<MentionProps> = ({ object }) => {
  switch (object.mention.type) {
    case "page":
      return (
        <a href={object.href} target="blank">
          {object.plain_text}
        </a>
      );
    case "database":
      return (
        <a href={object.href} target="blank">
          {object.plain_text}
        </a>
      );
    default:
      log("Unknown RTO mention type %s: %o", object.mention.type, object);
      return null;
  }
};

// Rich text object
interface Props {
  objects: RichTextObject[];
}

interface RTOComponent extends React.FC<Props> {
  Text: typeof TextRTO;
  Mention: typeof MentionRTO;
}

const RTO: RTOComponent = ({ objects }) => {
  if (!objects) return null;

  return (
    <>
      {objects.map((object, index) => {
        switch (object.type) {
          case "text":
            return <TextRTO object={object} key={index} />;
          case "mention":
            return <MentionRTO object={object} key={index} />;
          default:
            log(
              "Ignoring unknown rich text object type %s: %o",
              object.type,
              object
            );
            return null;
        }
      })}
    </>
  );
};

RTO.Text = TextRTO;
RTO.Mention = MentionRTO;

export default RTO;
