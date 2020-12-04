import React, { useMemo } from "react";
import { BookmarkBlockValues } from "@notion-cms/types";

interface Props {
  block: BookmarkBlockValues;
}

const urlRegExp = /^(?<scheme>https?):\/\/(?<host>(?<hostname>[a-z0-9.]+)(:(?<port>\d+))?)(?<path>\/[a-zA-Z0-9_/.-]*)?(?<query>\?((?<name>[a-zA-Z0-9_-]+)=(?<value>[a-zA-Z0-9-]+)&?)*)?(?<anchor>#([a-zA-Z0-9_-]*))?$/;

function Bookmark({ block }: Props) {
  const {
    properties: { link, caption, title, description },
    format,
  } = block;
  const hostname = useMemo(() => {
    if (title && title[0] && title[0][0]) return title[0][0];
    const match = urlRegExp.exec(link[0][0]);
    if (!match) return null;
    return match.groups.hostname;
  }, [title, link[0][0]]);

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row nowrap",
        borderRadius: "3px",
        border: "1px solid rgba(55, 53, 47, 0.16)",
        marginBottom: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          color: "rgb(55, 53, 47)",
          flexFlow: "column nowrap",
          alignItems: "stretch",
        }}
      >
        <a
          href={link[0][0]}
          target="blank"
          style={{
            padding: "12px 14px 14px",
            // backgroundColor: colours[colour],
            display: "flex",
            flexFlow: "column nowrap",
            alignItems: "stretch",
            transition: "background 20ms ease-in 0s",
            cursor: "pointer",
            width: "100%",
          }}
        >
          <span style={{ fontSize: "0.9em", marginBottom: "2px" }}>
            {hostname}
          </span>
          {description && (
            <span style={{ fontSize: "0.8em", color: "rgba(55, 53, 47, 0.6)" }}>
              {description}
            </span>
          )}
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
      {format && format.bookmark_cover && (
        <img src={format.bookmark_cover} style={{ width: "30%" }} />
      )}
    </div>
  );
}

export default Bookmark;
