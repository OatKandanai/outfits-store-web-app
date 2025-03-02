import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333;
  color: #fff;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 70px;
  color: #fff;

  ${mobile({ fontSize: "30px" })}
`;

const Description = styled.div`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 300;
  color: #ccc;

  ${mobile({ textAlign: "center", fontSize: "18px" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #fff;
  background-color: #222;

  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  flex: 8;
  border: none;
  padding-left: 10px;
  background-color: #222;
  color: #fff;

  &::placeholder {
    color: #fff;
  }

  ${mobile({ flex: "6" })}
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #fff;
  color: #000;
  cursor: pointer;
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>

      <Description>Get timely updates from your favorite products.</Description>

      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
