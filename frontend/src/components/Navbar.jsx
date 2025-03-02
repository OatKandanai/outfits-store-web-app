import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile, tablet } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserModal from "./modals/UserModal";
import { fetchUserCart } from "../redux/apiCall";
import CategoriesModal from "./modals/CategoriesModal";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Container = styled.div`
  height: 60px;
  align-content: center;

  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
`;

//  Left section
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;

  &:focus-within {
    border-color: #333;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  ${tablet({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  padding: 5px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #333;
    font-size: 14px;
  }
`;

// Middle section
const Center = styled.div`
  flex: 1;
  text-align: center;

  ${mobile({ textAlign: "left" })}
`;

const Logo = styled.h1`
  font-weight: bold;

  ${mobile({ fontSize: "15px" })}
  ${tablet({ fontSize: "25px" })}
`;

// Right section
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ flex: 2 })}
`;

const MenuItem = styled.div`
  position: relative; // For modal
  margin-left: 25px;
  font-size: 16px;
  color: #333;
  cursor: pointer;

  ${mobile({ fontSize: "12px" })}
  ${tablet({ fontSize: "15px" })}
`;

const Username = styled.span`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);

  // States
  const [searchTerms, setSearchTerms] = useState(""); // For search input
  const [showCategoriesModal, setShowCategoriesModal] = useState(false); // For categories menu
  const [showUserModal, setShowUserModal] = useState(false); // For user menu

  // Fetch user cart
  useEffect(() => {
    const getUserCart = async () => {
      await fetchUserCart(dispatch, currentUser.id);
    };

    if (currentUser?.id) getUserCart();
  }, [dispatch, currentUser]);

  // Search product by title
  function handleSearch() {
    if (!searchTerms.trim()) return; // Prevent empty search
    const limit = 30; // limit the search result
    navigate("/products/search", { state: { searchTerms, limit } });
    setSearchTerms("");
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input
              placeholder="Search"
              onChange={(e) => {
                setSearchTerms(e.target.value);
              }}
              value={searchTerms}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <SearchIcon
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
              onClick={handleSearch}
            />
          </SearchContainer>

          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>Home</MenuItem>
          </Link>

          <MenuItem
            onMouseOver={() => setShowCategoriesModal(true)}
            onMouseLeave={() => setShowCategoriesModal(false)}
          >
            Categories
            <CategoriesModal
              showCategoriesModal={showCategoriesModal}
              setShowCategoriesModal={setShowCategoriesModal}
            />
          </MenuItem>
        </Left>

        <Center>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>The Outfits Store</Logo>
          </Link>
        </Center>

        <Right>
          <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            <MenuItem>
              <Badge badgeContent={cartQuantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>

          {currentUser && (
            <MenuItem
              onMouseEnter={() => setShowUserModal(true)}
              onMouseLeave={() => setShowUserModal(false)}
            >
              <Username>
                {currentUser.username}
                <ArrowDropDownIcon />
              </Username>
              <UserModal showUserModal={showUserModal} />
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
