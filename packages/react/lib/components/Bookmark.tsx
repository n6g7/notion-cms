import React, { useMemo } from "react";
import { BookmarkBlock } from "@notion-cms/types";
import RTO from "../RTO";

interface Props {
  block: BookmarkBlock;
}

const urlRegExp =
  /^(?<scheme>https?):\/\/(?<host>(?<hostname>[a-z0-9.]+)(:(?<port>\d+))?)(?<path>\/[a-zA-Z0-9_/.-]*)?(?<query>\?((?<name>[a-zA-Z0-9_-]+)=(?<value>[a-zA-Z0-9-]+)&?)*)?(?<anchor>#([a-zA-Z0-9_-]*))?$/;

function Bookmark({ block }: Props) {
  const hostname = useMemo(() => {
    const match = urlRegExp.exec(block.bookmark.url);
    if (!match) return null;
    return match.groups.hostname;
  }, [block.bookmark.url]);

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
          href={block.bookmark.url}
          target="blank"
          style={{
            padding: "12px 14px 14px",
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

          <span style={{ fontSize: "0.8em" }}>{block.bookmark.url}</span>
        </a>
        {block.bookmark.caption && (
          <p
            style={{
              width: "100%",
              fontSize: "0.9em",
              color: "rgba(55, 53, 47, 0.6)",
              padding: "6px 0 6px 2px",
            }}
          >
            <RTO objects={block.bookmark.caption} />
          </p>
        )}
      </div>
    </div>
  );
}

export default Bookmark;
