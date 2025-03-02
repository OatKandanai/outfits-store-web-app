import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "../data";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${mobile({ flexDirection: "column", padding: "0px" })}
  ${tablet({ flexDirection: "column", padding: "0px" })}
`;

function Categories() {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
}

export default Categories;
