import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

type Div = typeof List;

type ColType = Div & {
  List?: Div;
};

const Column: ColType = styled.div`
  flex-grow: 1;
`;

Column.List = List;

export default Column;
