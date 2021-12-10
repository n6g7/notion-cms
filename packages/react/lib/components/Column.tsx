import styled from "styled-components";

interface ColType extends React.FC {
  List?: React.FC;
}

const Column: ColType = styled.div`
  flex-grow: 1;
`;

Column.List = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 0;
  padding: 0;
`;

export default Column;
