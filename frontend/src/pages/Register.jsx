import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCall";
import { clearRegisterError } from "../redux/userRedux";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/images/backgrounds/register_background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
  }
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 30px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  box-shadow: rgba(0, 0, 0, 0.15) 0px 6px 24px;
  z-index: 2;

  ${mobile({ width: "75vw" })}
  ${tablet({ width: "75vw" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Input = styled.input`
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #333;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: #aaa;
    ${mobile({ fontSize: "14px" })}
  }
`;

const Button = styled.button`
  height: 45px;
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: #333;
    border: 1px solid #333;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }

  ${mobile({ fontSize: "14px" })}
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #333;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.span`
  margin: 10px 0;
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #ea5858;
`;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  async function handleSubmit(e) {
    e.preventDefault();
    await register(dispatch, { username, email, password, confirmPassword });
  }

  // Clear previous error when rendering the page
  useEffect(() => {
    dispatch(clearRegisterError());
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Input
            type="password"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Input
            type="text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {/* Disable button when registering */}
          <Button disabled={user.isFetching}>Create Account</Button>
        </Form>

        {/* Error msg */}
        {user.registerError && <ErrorMsg>{user.registerError}</ErrorMsg>}

        <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
          <Span>Already have an account? Login</Span>
        </Link>
      </Wrapper>
    </Container>
  );
}

export default Register;
