import styled from "styled-components";
import Navbar from "../components/Navbar";
import UserManagement from "../components/UserManagement";
import CartManagement from "../components/CartManagement";
import OrderManagement from "../components/OrderManagement";
import ProductManagement from "../components/ProductManagement";
import { useState } from "react";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  margin: 0 auto;

  ${tablet({ rowGap: "20px" })}
`;

const Title = styled.h1`
  color: #333;

  ${mobile({ fontSize: "20px" })}
  ${tablet({ fontSize: "24px" })}
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FirstButton = styled.button`
  background-color: white;
  padding: 10px 20px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: none;
  font-size: 15px;
  cursor: pointer;

  ${mobile({ padding: "8px", fontSize: "12px" })}
`;

const SecondButton = styled.button`
  background-color: white;
  padding: 10px 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 15px;
  cursor: pointer;

  ${mobile({ padding: "8px", fontSize: "12px" })}
`;

function AdminDashboard() {
  const [show, setShow] = useState(true);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>Admin Dashboard</Title>
        <ButtonContainer>
          <FirstButton
            style={{
              backgroundColor: show && "#333",
              color: show && "white",
            }}
            onClick={() => setShow(true)}
          >
            Users, Carts, Orders Management
          </FirstButton>
          <SecondButton
            style={{
              backgroundColor: !show && "#333",
              color: !show && "white",
            }}
            onClick={() => setShow(false)}
          >
            Products Management
          </SecondButton>
        </ButtonContainer>
        {show && <UserManagement />}
        {show && <CartManagement />}
        {show && <OrderManagement />}
        {!show && <ProductManagement />}
      </Wrapper>
    </Container>
  );
}

export default AdminDashboard;
