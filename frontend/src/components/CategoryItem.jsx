import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${mobile({ height: "50vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  padding: 10px;
  font-weight: 600;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: black;
    color: white;
    transform: scale(1.05); /* Slightly enlarge the button */
  }

  &:active {
    transform: scale(1); /* Reset scale on click */
    opacity: 0.9;
  }
`;

function CategoryItem({ item }) {
  return (
    <Container>
      <Link to={`/products/${item.category}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOW NOW</Button>
        </Info>
      </Link>
    </Container>
  );
}

export default CategoryItem;
