import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { mobile, tablet } from "../responsive";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, fetchProduct } from "../redux/apiCall";
import NotificationModal from "../components/modals/NotificationModal";

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  ${mobile({ flexDirection: "column", padding: "0" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 70%;
  object-fit: cover;

  ${mobile({ width: "50%" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;

  ${mobile({ padding: "0 25px", textAlign: "center" })}
`;

const Title = styled.h1`
  font-weight: 200;

  ${mobile({ fontSize: "18px", fontWeight: "500" })}
`;

const Description = styled.p`
  margin: 20px 0;
  line-height: 30px;

  ${mobile({ fontSize: "14px", fontWeight: "300", lineHeight: "25px" })}
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;

  ${mobile({ fontSize: "25px" })}
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0px;

  ${mobile({ width: "100%", justifyContent: "center" })}
  ${tablet({ width: "100%", justifyContent: "start" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;

  ${mobile({ fontSize: "15px" })}
`;

const FilterSize = styled.select`
  padding: 5px;
  cursor: pointer;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ width: "100%", marginBottom: "20px" })}
  ${tablet({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  font-weight: 700px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #333;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #333;
  background-color: white;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #333;
    color: white;
  }

  ${mobile({ padding: "10px", fontSize: "13px" })}
`;

function ProductPage() {
  // Get product id from URL
  const { productId } = useParams();

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);

  // States
  const [product, setProduct] = useState({});
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isShowNotification, setIsShowNotification] = useState(false); // For add to cart notice

  // Fetch product data
  useEffect(() => {
    const fetchData = async () => {
      const fetchedProduct = await fetchProduct(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);

        // Set default size to the first available option
        if (fetchedProduct.size?.length > 0) {
          setSize(fetchedProduct.size[0]);
        }
      }
    };

    fetchData();
  }, [productId]);

  // Quantity Input
  function handleQuantity(type) {
    setQuantity((prevQuantity) => {
      if (type === "increase") {
        return prevQuantity + 1;
      } else if (type === "decrease" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  }

  // Add to cart button
  async function handleAddToCart() {
    if (cart.isFetching) return; // Prevent multiple clicks

    const response = await addProductToCart(dispatch, currentUser.id, {
      ...product,
      quantity,
      size,
    });
    // add quantity value to product object
    // size is replacement for size arrays of fetched product

    // Show notification if product is successfully add to cart
    if (response?.status === 200) setIsShowNotification(true);
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>

        <InfoContainer>
          <Title>{product.title}</Title>
          <Description>{product.desc}</Description>
          <Price>${product.price}</Price>

          <FilterContainer>
            <Filter>
              <FilterTitle>Size:</FilterTitle>
              <FilterSize onChange={(event) => setSize(event.target.value)}>
                {product.size?.map((size, index) => {
                  return (
                    <FilterSizeOption key={index}>{size}</FilterSizeOption>
                  );
                })}
              </FilterSize>
            </Filter>
          </FilterContainer>

          <AddContainer>
            <AmountContainer>
              <AddIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("increase")}
              />
              <Amount>{quantity}</Amount>
              <RemoveIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleQuantity("decrease")}
              />
            </AmountContainer>

            <Button
              style={{
                cursor: cart.isFetching ? "not-allowed" : "pointer",
              }}
              disabled={cart.isFetching}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />

      {/* Notification Modal */}
      <NotificationModal
        isShowNotification={isShowNotification}
        setIsShowNotification={setIsShowNotification}
        message={"Product has been added to your cart"}
      />
    </Container>
  );
}

export default ProductPage;
