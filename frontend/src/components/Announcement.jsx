import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background-color: #333;
  color: white;
  font-size: 14px;
  font-weight: 500;

  ${mobile({ fontSize: "12px" })}
`;

function Announcement() {
  return <Container>Free Shipping on Orders Over $100!</Container>;
}

export default Announcement;
