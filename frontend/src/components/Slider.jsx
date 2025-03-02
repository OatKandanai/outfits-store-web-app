import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useState } from "react";
import { sliderItems } from "../data";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden; // Hide overflow slide

  ${mobile({ height: "50vh", marginBottom: "10px" })}
  ${tablet({ height: "70vh", marginBottom: "10px" })}
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  z-index: 2;

  background-color: #f5f3f3;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.7;

  ${mobile({
    width: "30px",
    height: "30px",
  })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(
    ${(props) => props.slideIndex * -100}vw
  ); // For horizontal transform
  transition: all 0.7s;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};

  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
    height: "50vh",
    backgroundImage: (props) => `url(${props.bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  })}
  ${tablet({
    flexDirection: "column",
    justifyContent: "center",
    height: "70vh",
    backgroundImage: (props) => `url(${props.bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  })}
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
`;

const Image = styled.img`
  height: 100%;

  ${mobile({ display: "none" })}
  ${tablet({ display: "none" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;

  ${mobile({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
    padding: "10px",
    textAlign: "center", // Centers text horizontally
    height: "100%", // Ensures it takes full height
  })}
  ${tablet({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Centers content vertically
    padding: "10px",
    textAlign: "center", // Centers text horizontally
    height: "100%", // Ensures it takes full height
  })}
`;

const Title = styled.h1`
  font-size: 70px;

  ${mobile({
    fontSize: "24px",
    textShadow: "white 0px 0px 8px",
  })}
  ${tablet({
    fontSize: "60px",
    textShadow: "white 0px 0px 8px",
  })}
`;

const Desc = styled.p`
  margin: 50px 0;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;

  ${mobile({
    margin: "10px 0",
    fontSize: "14px",
    letterSpacing: "0.5px",
    textShadow: "white 0px 0px 10px",
  })}
  ${tablet({
    margin: "10px 0",
    fontSize: "25px",
    letterSpacing: "0.5px",
    textShadow: "white 0px 0px 10px",
  })}
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #000;
    color: #fff;
  }

  &:active {
    background-color: #444;
  }

  ${mobile({
    fontSize: "12px",
    padding: "8px 16px",
  })}
`;

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  function handleSlide(direction) {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.length - 1);
    } else if (direction === "right") {
      setSlideIndex(slideIndex < sliderItems.length - 1 ? slideIndex + 1 : 0);
    }
  }

  return (
    <Container>
      {/*Left Arrow */}
      <Arrow direction="left" onClick={() => handleSlide("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>

      {/* Horizontal Slide */}
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} bgImage={item.img} key={item.id}>
            <ImageContainer>
              <Image src={item.img} />
            </ImageContainer>

            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Link
                to={item.productLink}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Button>SHOW NOW</Button>
              </Link>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>

      {/*Right Arrow */}
      <Arrow direction="right" onClick={() => handleSlide("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Container>
  );
}

export default Slider;
