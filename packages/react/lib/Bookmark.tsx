import React, { useMemo } from "react";
import { BookmarkBlockValues } from "@notion-cms/types";

interface Props {
  block: BookmarkBlockValues;
}

const urlRegExp = /^(?<scheme>https?):\/\/(?<host>(?<hostname>[a-z0-9.]+)(:(?<port>\d+))?)(?<path>\/[a-zA-Z0-9_/.-]*)?(?<query>\?((?<name>[a-zA-Z0-9_-]+)=(?<value>[a-zA-Z0-9-]+)&?)*)?$/;

function Bookmark({ block }: Props) {
  const {
    properties: { link, caption },
  } = block;
  const hostname = useMemo(() => {
    const match = urlRegExp.exec(link[0][0]);
    if (!match) return null;
    return match.groups.hostname;
  }, [link[0][0]]);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "stretch",
      }}
    >
      <a
        href={link[0][0]}
        target="blank"
        style={{
          borderRadius: "3px",
          padding: "12px 14px 14px",
          // backgroundColor: colours[colour],
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "stretch",
          transition: "background 20ms ease-in 0s",
          cursor: "pointer",
          width: "100%",
          border: "1px solid rgba(55, 53, 47, 0.16)",
        }}
      >
        <span style={{ fontSize: "0.9em" }}>{hostname}</span>
        <span style={{ fontSize: "0.8em" }}>{link[0][0]}</span>
      </a>
      {caption && (
        <p
          style={{
            width: "100%",
            fontSize: "0.9em",
            // line-height: '1.4',
            color: "rgba(55, 53, 47, 0.6)",
            padding: "6px 0 6px 2px",
          }}
        >
          {caption[0][0]}
        </p>
      )}
    </div>
  );
}

export default Bookmark;
