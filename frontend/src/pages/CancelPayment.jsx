import styled from "styled-components";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { deleteOrder } from "../redux/apiCall";
import { useSelector } from "react-redux";

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
    background-color: #333;
  }
`;

export function CancelPayment() {
  const currentUser = useSelector((state) => state.user.currentUser);

  // Get orderId from the query parameters in the URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");

  // Cancel the order
  useEffect(() => {
    const cancelOrder = async () => {
      await deleteOrder(currentUser.id, orderId);
    };

    if (orderId) cancelOrder();
  }, [currentUser, orderId]);

  return (
    <Wrapper>
      <Typography variant="h4" gutterBottom>
        Payment Canceled
      </Typography>
      <Typography variant="body1">Your payment was not completed.</Typography>
      <Link to="/">
        <StyledButton variant="contained">Back to Home</StyledButton>
      </Link>
    </Wrapper>
  );
}

export default CancelPayment;
