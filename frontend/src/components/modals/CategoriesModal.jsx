import styled from "styled-components";
import { Link } from "react-router-dom";
import { categories } from "../../data";

const Container = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const Category = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding: 15px;

  &:hover {
    background-color: lightgrey;
  }
`;

function CategoriesModal({ showCategoriesModal, setShowCategoriesModal }) {
  return (
    <Container
      style={{
        opacity: showCategoriesModal ? 1 : 0,
        visibility: showCategoriesModal ? "visible" : "hidden",
      }}
    >
      {categories.map((item) => (
        <Link
          to={`/products/${item.category}`}
          style={{ textDecoration: "none", color: "inherit" }}
          key={item.id}
          onClick={() => setShowCategoriesModal(false)}
        >
          <Category>{item.title}</Category>
        </Link>
      ))}
    </Container>
  );
}

export default CategoriesModal;
