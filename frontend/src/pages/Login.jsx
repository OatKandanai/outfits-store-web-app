import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCall";
import { clearLoginError } from "../redux/userRedux";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/images/backgrounds/login_background.jpg");
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
    backdrop-filter: blur(2px);
  }
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 40px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
  z-index: 2;

  ${mobile({ width: "75vw" })}
  ${tablet({ width: "75vw" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 30px;

  ${mobile({ fontSize: "24px" })}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const Input = styled.input`
  height: 45px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  background-color: #f9f9f9;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #333;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    font-size: 16px;
    color: #aaa;

    ${mobile({ fontSize: "14px" })}
  }
`;

const Button = styled.button`
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: white;
  font-size: 18px;
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

const LinkContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
`;

const Span = styled.span`
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.span`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: #ea5858;
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // Login
  async function handleLogin(e) {
    e.preventDefault();
    await login(dispatch, { email, password });
  }

  // Clear previous error when rendering the page
  useEffect(() => {
    dispatch(clearLoginError());
  }, [dispatch]);

  return (
    <Container>
      <Wrapper>
        <Title>Login to Your Account</Title>

        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {/* Disable login button when logging in */}
          <Button disabled={user.isFetching}>Login</Button>
        </Form>

        {/* Error msg */}
        {user.loginError && <ErrorMsg>{user.loginError}</ErrorMsg>}

        <LinkContainer>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Span>Create an account</Span>
          </Link>
        </LinkContainer>
      </Wrapper>
    </Container>
  );
}

export default Login;
