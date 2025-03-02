import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile, tablet } from "../responsive";
import Announcement from "../components/Announcement";
import { fetchUserOrders } from "../redux/apiCall";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  max-width: 95vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  padding: 20px;

  ${mobile({ maxWidth: "80vw", padding: "10px" })}
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-weight: 300;
  color: #333;

  ${mobile({ fontSize: "20px", marginBottom: "10px" })}
`;

const OrderQuantity = styled.h2`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: normal;
  color: #333;

  ${mobile({ fontSize: "16px" })}
`;

const Orders = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  row-gap: 30px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  font-size: 18px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${mobile({ fontSize: "14px" })}
  ${tablet({ borderRadius: "0" })}
`;

const Id = styled.span`
  font-size: 18px;
  font-weight: bold;

  ${mobile({ fontSize: "14px" })}
`;

const Products = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  column-gap: 30px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 150px;

  ${mobile({ width: "90px" })}
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

const ProductTitle = styled.p``;

const ProductSize = styled.span`
  color: #656464;
`;

const ProductQuantity = styled.span``;

const ProductPrice = styled.span``;

const Summary = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ fontSize: "12px" })}
`;

const Status = styled.span`
  font-weight: bold;
  color: darkblue;
`;

const ShippingPrice = styled.span`
  font-weight: bold;
`;

const Total = styled.span`
  font-weight: bold;
`;

const Text = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
`;

function OrderPage() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const ordersData = await fetchUserOrders(currentUser.id);
      setOrders(ordersData);
      setIsLoading(false);
    };

    if (currentUser) fetchOrders();
  }, [currentUser]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your {orders.length > 1 ? "Orders" : "Order"}</Title>

        {orders.length > 0 && (
          <OrderQuantity>
            {orders.length} {orders.length > 1 ? "Orders" : "Order"}
          </OrderQuantity>
        )}

        {isLoading ? (
          <RefreshIcon style={{ fontSize: "60px" }} />
        ) : orders.length === 0 ? (
          <Text>No order found</Text>
        ) : (
          orders?.map((order) => (
            <Orders key={order._id}>
              <Id>Order ID : {order._id}</Id>

              {order.products.map((product) => (
                <Products key={product.productId}>
                  <LeftSection>
                    <ProductImage src={product.img} />
                    <ProductDetails>
                      <ProductTitle>{product.title}</ProductTitle>
                      <ProductSize>Size : {product.size}</ProductSize>
                      <ProductQuantity>x {product.quantity}</ProductQuantity>
                    </ProductDetails>
                  </LeftSection>
                  <RightSection>
                    <ProductPrice>${product.totalPrice}</ProductPrice>
                  </RightSection>
                </Products>
              ))}

              <Summary>
                <Status>Status : {order.status}</Status>
                <ShippingPrice>
                  Shipping Fee : ${order.shippingPrice.toFixed(2)}
                </ShippingPrice>
                <Total>Order Total : ${order.orderTotal.toFixed(2)}</Total>
              </Summary>
            </Orders>
          ))
        )}
      </Wrapper>
    </Container>
  );
}

export default OrderPage;
