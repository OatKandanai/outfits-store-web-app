import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import PinterestIcon from "@mui/icons-material/Pinterest";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;

  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Logo = styled.h1`
  ${mobile({ fontSize: "20px", textAlign: "center" })}
`;

const Description = styled.p`
  margin: 20px 0px;

  ${mobile({ fontSize: "14px", textAlign: "center" })}
`;

const SocialContainer = styled.div`
  display: flex;
  align-items: center;

  ${mobile({ justifyContent: "space-evenly" })}
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.5s ease;

  &:hover {
    background-color: lightgray;
  }

  ${mobile({ width: "10px", height: "10px" })}
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h3`
  margin-bottom: 20px;

  ${mobile({ fontSize: "18px", textAlign: "center" })}
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;

  ${mobile({ display: "grid", gridTemplateColumns: "1fr 1fr" })}
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  ${mobile({ fontSize: "15px", width: "100%", textAlign: "center" })}
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 20px;

  ${mobile({ fontSize: "15px", columnGap: "5px", justifyContent: "center" })}
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>The Outfits Store</Logo>

        <Description>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quod
          aliquam corporis ab dicta nam omnis nulla itaque, quia alias laborum
          commodi voluptates beatae sint. Nulla voluptatum corporis molestias
          molestiae?
        </Description>

        <SocialContainer>
          <SocialIcon>
            <FacebookIcon />
          </SocialIcon>

          <SocialIcon>
            <InstagramIcon />
          </SocialIcon>

          <SocialIcon>
            <XIcon />
          </SocialIcon>

          <SocialIcon>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "initial",
              }}
            >
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/cart"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "initial",
              }}
            >
              Cart
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/tops"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "initial",
              }}
            >
              Tops
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/bottoms"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "initial",
              }}
            >
              Bottoms
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/footwear"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "initial",
              }}
            >
              Footwear
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/products/accessories"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "initial",
              }}
            >
              Accessories
            </Link>
          </ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <PlaceIcon /> Sample Address
        </ContactItem>
        <ContactItem>
          <PhoneIcon /> +66123456789
        </ContactItem>
        <ContactItem>
          <EmailIcon /> contact@outfitsstore.dev
        </ContactItem>
      </Right>
    </Container>
  );
}

export default Footer;
