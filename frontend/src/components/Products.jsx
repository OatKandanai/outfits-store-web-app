import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { fetchProducts } from "../redux/apiCall";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  min-height: 40vh;
`;

const Text = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #555;
`;

function Products({ category, filters, sort, limit }) {
  // State
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products
  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const productsData = await fetchProducts({
        category,
        filters,
        sort,
        limit,
      });
      setProducts(productsData);
      setIsLoading(false);
    };

    getProducts();
  }, [category, filters, sort, limit]);

  return (
    <Container>
      {isLoading ? (
        <RefreshIcon style={{ fontSize: "60px" }} />
      ) : products.length > 0 ? (
        products.map((product) => (
          <Product key={product._id} product={product} />
        ))
      ) : (
        <Text>No product found</Text>
      )}
    </Container>
  );
}

export default Products;
