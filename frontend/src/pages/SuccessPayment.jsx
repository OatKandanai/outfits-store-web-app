import styled from "styled-components";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { clearUserCart } from "../redux/apiCall";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #555;
  }
`;

export function SuccessPayment() {
  // Get userId from the query parameters in the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  // Clear all products in the cart
  useEffect(() => {
    const clearCart = async () => {
      clearUserCart(userId);
    };

    if (userId) clearCart();
  }, [userId]);

  return (
    <Wrapper>
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1">
        Your order has been placed successfully.
      </Typography>
      <Link to="/">
        <StyledButton variant="contained">Back to Home</StyledButton>
      </Link>
    </Wrapper>
  );
}

export default SuccessPayment;
