import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  fetchAllOrders,
  updateOrder,
  adminDeleteOrder,
} from "../redux/apiCall";
import ConfirmationModal from "./modals/ConfirmationModal";
import { Link } from "react-router-dom";
import { mobile, tablet } from "../responsive";
import SearchIcon from "@mui/icons-material/Search";

const Section = styled.div`
  width: 100%;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  row-gap: 10px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 50px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;

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

  ${mobile({ maxHeight: "50vh", padding: "10px", borderRadius: "0" })}
  ${tablet({ maxHeight: "55vh", padding: "15px", borderRadius: "0" })}
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  ${mobile({ flexDirection: "column", rowGap: "10px" })}
  ${tablet({ flexDirection: "row", rowGap: "10px" })}
`;

const SectionName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;

  ${mobile({ fontSize: "1.2rem" })}
  ${tablet({ fontSize: "1.3rem" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background: #f1f1f1;
  padding: 5px 10px;
  border-radius: 8px;

  ${mobile({ padding: "5px" })}
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

  ${mobile({ width: "200px", padding: "0" })}
`;

const Orders = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  row-gap: 10px;
  margin-bottom: 10px;
  padding: 20px;
  font-size: 15px;
  border-radius: 10px;
  border: 1px solid lightgray;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;

  ${mobile({ fontSize: "12px", padding: "10px" })}
`;

const Info = styled.span``;

const Select = styled.select`
  cursor: pointer;

  ${mobile({ fontSize: "12px" })}
`;

const Option = styled.option`
  ${mobile({ fontSize: "12px" })}
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  column-gap: 10px;
  padding-bottom: 5px;
  overflow-x: auto;
  overflow-y: hidden;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    height: 10px; /* Scrollbar height for horizontal scrolling */
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

  ${mobile({ flexWrap: "nowrap", justifyContent: "start" })}
  ${tablet({ flexWrap: "nowrap", justifyContent: "start" })}
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  white-space: nowrap;
`;

const ProductImage = styled.img`
  width: 100px;
`;

const ProductTitle = styled.p``;

const ProductSize = styled.span`
  color: #656464;
`;

const ProductQuantity = styled.span``;

const ProductPrice = styled.span``;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 10px;
  padding: 10px;
  background-color: #ff4040;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  ${mobile({ padding: "8px", fontSize: "12px" })}
`;

function OrderManagement() {
  const orders = useSelector((state) => state.admin.allOrders);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  // For confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  // For search input
  const [search, setSearch] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Fetch all orders
  useEffect(() => {
    const getAllOrders = async () => {
      await fetchAllOrders(dispatch);
    };

    if (currentUser?.isAdmin) getAllOrders();
  }, [currentUser?.isAdmin, dispatch]);

  // Filter orders based on email search
  useEffect(() => {
    setFilteredOrders(
      orders.filter(
        (order) =>
          order.email.toLowerCase().includes(search.toLowerCase()) ||
          order._id.toLowerCase().includes(search.toLowerCase()) ||
          order.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [orders, search]);

  async function handleStatusChange(orderId, e) {
    const value = e.target.value;
    await updateOrder(orderId, { status: value });
    await fetchAllOrders(dispatch);
  }

  async function handleCancelOrder(orderId) {
    setSelectedOrderId(orderId);
    setShowModal(true);
  }

  async function confirmCancelOrder() {
    await adminDeleteOrder(dispatch, currentUser.id, selectedOrderId);
    setShowModal(false);
  }

  return (
    <Section>
      <Header>
        <SectionName>Order Management</SectionName>
        <SearchContainer>
          <SearchIcon />
          <SearchBar
            placeholder="Search by Email, Order ID, Username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </Header>

      {filteredOrders?.map((order) => (
        <Orders key={order._id}>
          <Info>
            <strong>Order ID :</strong> {order._id}
          </Info>
          <Info>
            <strong>Email :</strong> {order.email}
          </Info>
          <Info>
            <strong>Username :</strong> {order.username}
          </Info>
          <Info>
            <strong>Shipping Fee :</strong> ${order.shippingPrice.toFixed(2)}
          </Info>
          <Info>
            <strong>Order Total :</strong> ${order.orderTotal.toFixed(2)}
          </Info>
          <Info>
            <strong>Status : </strong>
            <Select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e)}
            >
              <Option value="Processing">Processing</Option>
              <Option value="Out for Delivery">Out for Delivery</Option>
              <Option value="Delivered">Delivered</Option>
            </Select>
          </Info>

          <Card>
            {order.products.map((product) => (
              <Product key={product.productId}>
                <Link to={`/product/${product.productId}`}>
                  <ProductImage src={product.img} />
                </Link>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductSize>Size : {product.size}</ProductSize>
                <ProductQuantity>x {product.quantity}</ProductQuantity>
                <ProductPrice>${product.totalPrice}</ProductPrice>
              </Product>
            ))}
          </Card>

          <DeleteButton onClick={() => handleCancelOrder(order._id)}>
            Cancel Order
          </DeleteButton>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showModal}
            onConfirm={confirmCancelOrder}
            onCancel={() => setShowModal(false)}
            message={"Cancel this order?"}
          />
        </Orders>
      ))}
    </Section>
  );
}

export default OrderManagement;
