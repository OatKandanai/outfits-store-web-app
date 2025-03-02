import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile, tablet } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { userRequest } from "../baseUrl";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { handleProductQuantity, removeProductFromCart } from "../redux/apiCall";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 100vw;
  margin: 0 auto;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
  color: #333;

  ${mobile({ fontSize: "24px", marginBottom: "10px" })}
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  ${mobile({ flexDirection: "column", gap: "0", padding: "10px" })}
`;

const TopTexts = styled.div`
  display: flex;

  ${mobile({ gap: "0" })}
`;

const TopText = styled.span`
  font-size: 16px;
  color: #555;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${mobile({ flexDirection: "column" })}
  ${tablet({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
  margin-right: 20px;

  ${mobile({ marginRight: "0" })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${mobile({ flexDirection: "column", rowGap: "15px", padding: "10px" })}
`;

const ProductDetail = styled.div`
  flex: 8;
  display: flex;
  gap: 20px;

  ${mobile({ flexDirection: "column", alignItems: "center" })}
  ${tablet({ flex: "2" })}
`;

const Image = styled.img`
  width: 150px;
  border-radius: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${mobile({ alignItems: "center", textAlign: "center", rowGap: "15px" })}
`;

const ProductName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333;

  ${mobile({ fontSize: "14px" })}
  ${tablet({ fontSize: "16px" })}
`;

const ProductId = styled.span`
  color: #888;

  ${mobile({ fontSize: "14px" })}
`;

const ProductSize = styled.span`
  color: #555;

  ${mobile({ fontSize: "13px" })}
`;

const Controls = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  ${mobile({
    flexDirection: "column",
    rowGap: "20px",
  })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  ${mobile({ rowGap: "15px" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProductAmount = styled.span`
  font-size: 20px;
  color: #333;
  font-weight: 500;

  ${mobile({ fontSize: "15px" })}
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 300;
  color: #333;

  ${mobile({ fontSize: "15px" })}
`;

const Summary = styled.div`
  flex: 1;
  height: fit-content;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${mobile({ marginTop: "20px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;

  ${mobile({ fontSize: "18px" })}
`;

const SummaryItem = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => (props.type === "total" ? "18px" : "16px")};
  font-weight: ${(props) => (props.type === "total" ? "600" : "400")};
  color: #555;

  ${mobile({ fontSize: "14px" })}
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: white;
    color: #333;
  }
`;

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

  // Total Price
  const shippingRate = 0.15; // 15% shipping rate
  const shippingPrice = parseFloat((cart.totalPrice * shippingRate).toFixed(2));
  const total =
    cart.totalPrice >= 100
      ? parseFloat(cart.totalPrice.toFixed(2))
      : parseFloat((cart.totalPrice + shippingPrice).toFixed(2));

  // Checkout button
  async function makePayment() {
    try {
      const stripe = await stripePromise;
      const { data } = await userRequest.post("/checkout/payment", {
        userId: cart.currentUserId,
        products: cart.products,
      });

      const result = await stripe.redirectToCheckout({ sessionId: data.id });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  }

  // Adjust product quantity in the cart
  async function handleQuantity(productId, productSize, type) {
    if (cart.isFetching) return; // Prevent multiple clicks

    await handleProductQuantity(dispatch, {
      userId: cart.currentUserId,
      productId: productId,
      productSize: productSize,
      type: type,
    });
  }

  // Remove product from cart
  async function handleRemoveProduct(productId, productSize) {
    if (cart.isFetching) return; // Prevent multiple clicks

    await removeProductFromCart(dispatch, {
      userId: cart.currentUserId,
      productId: productId,
      productSize: productSize,
    });
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your cart</Title>

        <Top>
          <TopTexts>
            <TopText>Shopping Cart({cart.cartQuantity})</TopText>
          </TopTexts>
        </Top>

        <Bottom>
          <Info>
            {/* the key is id and size of product */}
            {cart?.products?.map((product) => (
              <Product key={`${product._id}-${product.size}`}>
                <ProductDetail>
                  <Link
                    to={`/product/${product._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Image src={product.img} />
                  </Link>
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>

                <Controls>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon
                        style={{
                          cursor: cart.isFetching ? "not-allowed" : "pointer",
                        }}
                        disabled={cart.isFetching}
                        onClick={() =>
                          handleQuantity(product._id, product.size, "increase")
                        }
                      />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <RemoveIcon
                        style={{
                          visibility:
                            product.quantity === 1 ? "hidden" : "visible",
                          cursor: cart.isFetching ? "not-allowed" : "pointer",
                        }}
                        disabled={product.quantity === 1 || cart.isFetching}
                        onClick={() =>
                          handleQuantity(product._id, product.size, "decrease")
                        }
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ${parseFloat(product.price * product.quantity).toFixed(2)}{" "}
                      ({product.quantity})
                    </ProductPrice>
                  </PriceDetail>

                  <DeleteIcon
                    style={{
                      cursor: cart.isFetching ? "not-allowed" : "pointer",
                    }}
                    disabled={cart.isFetching}
                    onClick={() =>
                      handleRemoveProduct(product._id, product.size)
                    }
                  />
                </Controls>
              </Product>
            ))}
          </Info>

          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryItem>
              <SummaryItemText>Subtotal:</SummaryItemText>
              <SummaryItemPrice>
                ${parseFloat(cart.totalPrice.toFixed(2))}
              </SummaryItemPrice>
            </SummaryItem>

            <SummaryItem>
              <SummaryItemText>Estimated Shipping (15%):</SummaryItemText>
              <SummaryItemPrice>${shippingPrice}</SummaryItemPrice>
            </SummaryItem>

            {cart.totalPrice >= 100 && (
              <SummaryItem>
                <SummaryItemText>Shipping Discount:</SummaryItemText>
                <SummaryItemPrice>-${shippingPrice}</SummaryItemPrice>
              </SummaryItem>
            )}

            <SummaryItem type="total">
              <SummaryItemText>Total:</SummaryItemText>
              <SummaryItemPrice>${total}</SummaryItemPrice>
            </SummaryItem>

            {cart.cartQuantity > 0 ? (
              <Button onClick={makePayment}>Checkout</Button>
            ) : (
              <Button disabled style={{ cursor: "not-allowed" }}>
                No Product
              </Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
}

export default Cart;
