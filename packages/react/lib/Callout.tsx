import React from "react";
import { Color } from "@notion-cms/types";

const colours: Record<Color, string> = {
  gray_background: "rgba(235, 236, 237, 0.3)",
};

interface Props {
  children?: React.ReactNode;
  colour: Color;
  icon?: string;
}

function Callout({ children, colour, icon }: Props) {
  return (
    <aside
      style={{
        borderRadius: "3px",
        padding: "16px 16px 16px 12px",
        backgroundColor: colours[colour],
        display: "flex",
      }}
    >
      {icon && <div style={{ flexGrow: 0 }}>{icon}</div>}
      <div style={{ flexGrow: 1, marginLeft: "8px" }}>{children}</div>
    </aside>
  );
}

export default Callout;
