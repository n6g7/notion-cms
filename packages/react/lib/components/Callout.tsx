import React from "react";
import { Color } from "@notion-cms/types";
import { EmojiObject, FileObject } from "@notion-cms/types";

const colours: Record<Color, string> = {
  default: "rgba(235, 236, 237, 0.3)",
  gray: "rgba(235, 236, 237, 0.3)",
  brown: "rgba(235, 236, 237, 0.3)",
  red: "rgba(235, 236, 237, 0.3)",
  orange: "rgba(235, 236, 237, 0.3)",
  yellow: "rgba(235, 236, 237, 0.3)",
  green: "rgba(235, 236, 237, 0.3)",
  blue: "rgba(235, 236, 237, 0.3)",
  purple: "rgba(235, 236, 237, 0.3)",
  pink: "rgba(235, 236, 237, 0.3)",
  gray_background: "rgba(235, 236, 237, 0.3)",
  brown_background: "rgba(235, 236, 237, 0.3)",
  red_background: "rgba(235, 236, 237, 0.3)",
  orange_background: "rgba(235, 236, 237, 0.3)",
  yellow_background: "rgba(235, 236, 237, 0.3)",
  green_background: "rgba(235, 236, 237, 0.3)",
  blue_background: "rgba(235, 236, 237, 0.3)",
  purple_background: "rgba(235, 236, 237, 0.3)",
  pink_background: "rgba(235, 236, 237, 0.3)",
};

interface Props {
  children?: React.ReactNode;
  colour?: Color;
  icon?: FileObject | EmojiObject;
}

function Callout({ children, colour = "default", icon }: Props) {
  const iconContent =
    icon.type == "emoji" ? (
      icon.emoji
    ) : icon.type == "file" ? (
      <img src={icon.file.url} />
    ) : (
      <img src={icon.external.url} />
    );
  return (
    <aside
      style={{
        borderRadius: "3px",
        padding: "16px 16px 16px 12px",
        backgroundColor: colours[colour],
        display: "flex",
      }}
    >
      {icon && <div style={{ flexGrow: 0 }}>{iconContent}</div>}
      <div style={{ flexGrow: 1, marginLeft: "8px" }}>{children}</div>
    </aside>
  );
}

export default Callout;
