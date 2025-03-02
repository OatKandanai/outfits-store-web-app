import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";
import { persistor } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/cartRedux";
import { clearAdminState } from "../../redux/adminRedux";

const Container = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 999;
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  opacity: 0;
  visibility: hidden; // Removed from layout, prevents interaction
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
`;

const AdminDashboardButton = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: #111;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: lightgray;
  }
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: #111;
  color: #ffffff;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    color: lightgray;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 8px;
  border: none;
  background-color: crimson;
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: darkred;
  }
`;

const Username = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
`;

function UserModal({ showUserModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = () => {
    dispatch(logout());

    // Clear Redux states
    dispatch(clearCart());
    dispatch(clearAdminState());

    // Clear persisted Redux state
    persistor.purge();

    navigate("/login");
  };

  return (
    <Container
      style={{
        opacity: showUserModal ? 1 : 0,
        visibility: showUserModal ? "visible" : "hidden",
        transform: showUserModal ? "translateY(0px)" : "translateY(20px)",
      }}
    >
      <Wrapper>
        <Username>My Account</Username>

        {currentUser.isAdmin && (
          <AdminDashboardButton onClick={() => navigate("/admin")}>
            Admin Dashboard
          </AdminDashboardButton>
        )}

        <OrderButton onClick={() => navigate("/order")}>My Order</OrderButton>

        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Wrapper>
    </Container>
  );
}

export default UserModal;
