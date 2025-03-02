import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";

const Container = styled.div`
  min-width: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 1;
  position: relative;
  margin: 5px;
  border: 1px solid lightgray;

  ${mobile({ height: "250px" })}
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;

  ${mobile({ height: "60%" })}
`;

const Button = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0;
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 20px;
  z-index: 999;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: bold;

  ${mobile({ fontSize: "12px" })}
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: bold;

  ${mobile({ fontSize: "12px" })}
`;

function Product({ product }) {
  return (
    <Container>
      <Image src={product.img} />

      <Button>
        <Icon>
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <SearchOutlinedIcon />
          </Link>
        </Icon>
      </Button>

      <Info>
        <Name>{product.title}</Name>
        <Price>${product.price}</Price>
      </Info>
    </Container>
  );
}

export default Product;
