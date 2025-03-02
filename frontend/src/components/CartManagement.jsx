import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  adminRemoveProductFromCart,
  deleteCart,
  fetchAllCarts,
} from "../redux/apiCall";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "./modals/ConfirmationModal";
import SearchIcon from "@mui/icons-material/Search";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  max-height: 60vh;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px; /* Scrollbar height for horizontal scrolling */

    ${mobile({ width: "0" })}
  }

  &::-webkit-scrollbar-thumb {
    background: #000000; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Rounded edges for the thumb */
    background-clip: padding-box; /* Makes the border transparent */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #898989; /* Darker color when hovered */
  }

  &::-webkit-scrollbar-track {
    background: lightgray; /* Track background color */
    border-radius: 4px; /* Rounded edges for the track */
  }

  ${mobile({ maxHeight: "80vh", padding: "10px", borderRadius: "0" })}
  ${tablet({ maxHeight: "70vh", padding: "15px", borderRadius: "0" })}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  ${mobile({ flexDirection: "column", rowGap: "10px" })}
  ${tablet({ flexDirection: "row", alignItems: "center" })}
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;

  ${mobile({ fontSize: "1.2rem" })}
  ${tablet({ fontSize: "1.4rem" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 8px;

  ${mobile({ width: "100%", padding: "5px" })}
  ${tablet({ width: "80%" })}
`;

const SearchBar = styled.input`
  width: 250px;
  border: none;
  background: transparent;
  padding: 5px;
  outline: none;
  flex: 1;

  &::placeholder {
    ${mobile({ fontSize: "12px" })}
  }

  ${mobile({ width: "100%", fontSize: "14px" })}
  ${tablet({ width: "80%" })}
`;

const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CartCard = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${mobile({ padding: "10px" })}
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  ${mobile({
    flexDirection: "column",
    rowGap: "10px",
    alignItems: "flex-start",
  })}
`;

const CartInfo = styled.div`
  font-size: 14px;
  color: #333;

  ${mobile({ fontSize: "12px" })}
`;

const DeleteButton = styled.button`
  background-color: #ff4040;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${mobile({ padding: "6px 10px", fontSize: "12px" })}
`;

const ProductList = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-top: 10px;
  padding-bottom: 5px;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 8px; /* Scrollbar height for horizontal scrolling */
  }

  &::-webkit-scrollbar-thumb {
    background: #000000; /* Color of the scrollbar thumb */
    border-radius: 4px; /* Rounded edges for the thumb */
    background-clip: padding-box; /* Makes the border transparent */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #898989; /* Darker color when hovered */
  }

  &::-webkit-scrollbar-track {
    background: lightgray; /* Track background color */
    border-radius: 4px; /* Rounded edges for the track */
  }

  ${mobile({ gap: "5px", paddingTop: "5px" })}
`;

const ProductCard = styled.div`
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 10px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;

  ${mobile({ minWidth: "120px", padding: "8px" })}
`;

const ProductImage = styled.img`
  width: 80px;

  ${mobile({ width: "60px" })}
`;

const RemoveButton = styled.button`
  background-color: #ff4040;
  color: white;
  padding: 5px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${mobile({ padding: "4px 6px", fontSize: "12px" })}
`;

function CartManagement() {
  const carts = useSelector((state) => state.admin.allCarts);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // For confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // For search input
  const [search, setSearch] = useState("");
  const [filteredCarts, setFilteredCarts] = useState([]);

  // Fetch all carts
  useEffect(() => {
    const getAllCarts = async () => {
      await fetchAllCarts(dispatch);
    };

    if (currentUser?.isAdmin) getAllCarts();
  }, [currentUser?.isAdmin, dispatch]);

  // Filter carts based on search
  useEffect(() => {
    setFilteredCarts(
      carts.filter(
        (cart) =>
          cart.userId.email.toLowerCase().includes(search.toLowerCase()) ||
          cart._id.toLowerCase().includes(search.toLowerCase()) ||
          cart.userId._id.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [carts, search]);

  function handleDeleteCart(userId) {
    setSelectedUserId(userId);
    setShowModal(true);
  }

  async function confirmDeleteCart() {
    await deleteCart(dispatch, selectedUserId);
    setShowModal(false);
    setSearch("");
  }

  async function handleRemoveProduct(userId, productId, productSize) {
    await adminRemoveProductFromCart({ userId, productId, productSize });
    await fetchAllCarts(dispatch);
  }

  return (
    <Container>
      <Header>
        <Title>Cart Management</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchBar
            placeholder="Search by Email, Cart ID, User ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <CartList>
        {filteredCarts?.map((cart) => (
          <CartCard key={cart._id}>
            <CartHeader>
              <CartInfo>
                <strong>Cart ID:</strong> {cart._id} <br />
                <strong>User ID:</strong> {cart.userId._id} <br />
                <strong>Email:</strong> {cart.userId.email} <br />
                <strong>Total Price:</strong> ${cart.totalPrice.toFixed(2)}{" "}
                <br />
                <strong>Quantity:</strong> {cart.cartQuantity}
              </CartInfo>
              <DeleteButton onClick={() => handleDeleteCart(cart.userId._id)}>
                Delete Cart
              </DeleteButton>
            </CartHeader>

            <ProductList>
              {cart.products.map((product) => (
                <ProductCard key={`${product._id}-${product.size}`}>
                  <Link to={`/product/${product._id}`}>
                    <ProductImage src={product.img} alt={product.title} />
                  </Link>
                  <CartInfo>
                    <strong>{product.title}</strong>
                    <br />
                    <small>ID: {product._id}</small>
                    <br />
                    <small>Size: {product.size}</small>
                    <br />
                    <small>Price: ${product.price.toFixed(2)}</small>
                    <br />
                    <small>Qty: {product.quantity}</small>
                    <br />
                    <small>
                      Total: ${(product.price * product.quantity).toFixed(2)}
                    </small>
                  </CartInfo>
                  <RemoveButton
                    onClick={() =>
                      handleRemoveProduct(
                        cart.userId._id,
                        product._id,
                        product.size
                      )
                    }
                  >
                    Remove
                  </RemoveButton>
                </ProductCard>
              ))}
            </ProductList>
          </CartCard>
        ))}
      </CartList>

      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmDeleteCart}
        onCancel={() => setShowModal(false)}
        message={"Delete this cart?"}
      />
    </Container>
  );
}

export default CartManagement;
