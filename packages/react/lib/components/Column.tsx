import styled, { StyledComponent } from "styled-components";

const List = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

type ColType = StyledComponent<"div", any, {}, never> & {
  List?: typeof List;
};

const Column: ColType = styled.div`
  flex-grow: 1;
`;

export default Column;
