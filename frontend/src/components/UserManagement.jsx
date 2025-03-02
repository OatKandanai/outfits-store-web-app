import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteCart,
  deleteUser,
  fetchAllUsers,
  updateUser,
} from "../redux/apiCall";
import ConfirmationModal from "./modals/ConfirmationModal";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { mobile, tablet } from "../responsive";

const Section = styled.div`
  width: 100%;
  max-height: 60vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserCard = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  justify-content: space-between;

  ${mobile({
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: "10px",
  })}
  ${tablet({ flexDirection: "row", alignItems: "center" })}
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  ${mobile({ fontSize: "14px" })}
  ${tablet({ fontSize: "16px" })}
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  ${mobile({ width: "100%", justifyContent: "space-between" })}
`;

const Select = styled.select`
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;

  ${mobile({ width: "100%" })}
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;

  &:hover {
    background-color: #cc0000;
  }

  &:disabled {
    background-color: lightgray;
    cursor: not-allowed;
  }

  ${mobile({ width: "100%", justifyContent: "center" })}
`;

function UserManagement() {
  const allUsers = useSelector((state) => state.admin.allUsers);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  // For confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // For search input
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Fetch all users
  useEffect(() => {
    if (currentUser?.isAdmin) fetchAllUsers(dispatch);
  }, [currentUser?.isAdmin, dispatch]);

  // Filter users based on email, id, username search
  useEffect(() => {
    setFilteredUsers(
      allUsers.filter(
        (user) =>
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user._id.toLowerCase().includes(search.toLowerCase()) ||
          user.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [allUsers, search]);

  async function handleAdminChange(userId, e) {
    await updateUser(dispatch, userId, { isAdmin: e.target.value });
  }

  function handleDeleteClick(userId) {
    setSelectedUserId(userId);
    setShowModal(true);
  }

  async function confirmDelete() {
    await deleteUser(dispatch, selectedUserId);
    await deleteCart(dispatch, selectedUserId);
    setShowModal(false);
    setSearch("");
  }

  return (
    <Section>
      <Header>
        <Title>User Management</Title>
        <SearchContainer>
          <SearchIcon />
          <SearchBar
            placeholder="Search by ID, Email, Username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchContainer>
      </Header>

      <UserList>
        {filteredUsers?.map((user) => (
          <UserCard key={user._id}>
            <UserInfo>
              <Info>
                <strong>ID:</strong> {user._id}
              </Info>
              <Info>
                <strong>Email:</strong> {user.email}
              </Info>
              <Info>
                <strong>Username:</strong> {user.username}
              </Info>
              <Info>
                <strong>Joined Date:</strong> {user.createdAt}
              </Info>
            </UserInfo>
            <UserActions>
              <Select
                value={user.isAdmin}
                onChange={(e) => handleAdminChange(user._id, e)}
                disabled={user._id === currentUser.id}
              >
                <option value={true}>Admin</option>
                <option value={false}>User</option>
              </Select>
              <DeleteButton
                disabled={user._id === currentUser.id}
                onClick={() => handleDeleteClick(user._id)}
              >
                <DeleteIcon fontSize="small" /> Delete
              </DeleteButton>
            </UserActions>
          </UserCard>
        ))}
      </UserList>

      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowModal(false)}
        message="Delete this user? (This will also delete their cart)"
      />
    </Section>
  );
}

export default UserManagement;
