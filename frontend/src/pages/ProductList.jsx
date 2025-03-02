import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({ margin: "15px", fontSize: "28px", textAlign: "center" })}
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mobile({ flexDirection: "column" })}
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  column-gap: 10px;

  ${mobile({ margin: "10px" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;

  ${mobile({ fontSize: "15px" })}
`;

const Select = styled.select`
  padding: 10px;
  cursor: pointer;

  ${mobile({ padding: "5px" })}
`;

const Option = styled.option``;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid black;
  background-color: white;
  transition: all 0.3s;

  &:focus-within {
    border-color: #333;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  ${mobile({ padding: "5px" })}
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

  ${mobile({ padding: "0" })}
`;

const ResetButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 1px solid black;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
  }

  ${mobile({ padding: "5px", fontSize: "14px" })}
`;

function ProductList() {
  // Get category name from URL
  const { category } = useParams();

  // Get search terms and result limit from nav bar
  const location = useLocation();
  const { searchTerms, limit } = location.state || {};

  // States
  const [filters, setFilters] = useState({
    title: searchTerms || "",
    size: "",
  });
  const [sort, setSort] = useState("newest");

  function handleFilters(event) {
    const { name, value } = event.target;
    setFilters((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function handleSort(event) {
    const sortOption = event.target.value;
    setSort(sortOption);
  }

  // Reset filters and sort
  function reset() {
    setFilters({
      title: "",
      size: "",
    });
    setSort("newest");
  }

  return (
    <Container>
      <Navbar />

      <Announcement />

      <Title>{category && category.toUpperCase()}</Title>

      {/* Filter and Sort Section */}
      <FilterContainer>
        <LeftSection>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            {/* Sizes Filter */}
            <Select name="size" onChange={handleFilters} value={filters.size}>
              <Option value="">Any Size</Option>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
              <Option value="XXL">XXL</Option>
            </Select>
          </Filter>

          <SearchContainer>
            <Input
              placeholder="Search"
              required
              name="title"
              onChange={handleFilters}
              value={filters.title}
            />
            <SearchIcon
              style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
            />
          </SearchContainer>
        </LeftSection>

        {/* Reset button */}
        <ResetButton onClick={reset}>Reset Filters</ResetButton>

        {/* Sort Products */}
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={handleSort} value={sort}>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
            <Option value="highToLow">Price (High to Low)</Option>
            <Option value="lowToHigh">Price (Low to High)</Option>
          </Select>
        </Filter>
      </FilterContainer>

      <Products
        category={category}
        filters={filters}
        sort={sort}
        limit={limit}
      />

      <Newsletter />

      <Footer />
    </Container>
  );
}

export default ProductList;
