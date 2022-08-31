import React from "react";

import RTO from "../RTO";
import ColumnComp from "../components/Column";
import { makeRTO } from "./utils";

export default {
  title: "Blocks/Column",
  component: ColumnComp,
};

const Template = ({ columns }: { columns: number }) => (
  <ColumnComp.List>
    {Array(columns)
      .fill(0)
      .map((n, i) => (
        <ColumnComp>
          <h2>
            <RTO objects={makeRTO(`Column ${i + 1}`)} />
          </h2>
          <RTO objects={makeRTO("Hello world")} />
        </ColumnComp>
      ))}
  </ColumnComp.List>
);

export const Column = Template.bind({});
Column.args = {
  columns: 2,
};
