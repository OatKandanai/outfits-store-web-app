import { useEffect, useState } from "react";
import styled from "styled-components";
import { addProduct, deleteProduct, fetchProducts } from "../redux/apiCall";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmationModal from "./modals/ConfirmationModal";
import NotificationModal from "./modals/NotificationModal";
import { mobile, tablet } from "../responsive";

const Container = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const AddProduct = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${mobile({ width: "98%", flexDirection: "column" })}
  ${tablet({ width: "100%" })}
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${mobile({ width: "100%" })}
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({ width: "100%" })}
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const Label = styled.label`
  font-weight: bold;

  ${mobile({ fontSize: "14px" })}
  ${tablet({ fontSize: "15px" })}
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #333;
  }

  ${mobile({ fontSize: "14px" })}
  ${tablet({ fontSize: "15px" })}
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CategoryLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  cursor: pointer;

  ${mobile({ fontSize: "12px" })}
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 5px;
`;

const Tag = styled.span`
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
`;

const ImagePreview = styled.img`
  width: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 10px;

  ${mobile({ width: "150px" })}
  ${tablet({ width: "200px" })}
`;

const Button = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;

  &:hover {
    background-color: #111;
  }

  ${mobile({ fontSize: "14px" })}
  ${tablet({ fontSize: "15px" })}
`;

const AllProducts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 50px;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  ${mobile({
    width: "98%",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  })}
`;

const ProductCategory = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
`;

const CategoryTitle = styled.span`
  font-size: 18px;
  font-weight: 500;

  ${mobile({ fontWeight: "bold" })}
  ${tablet({ fontWeight: "bold" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 5px;

  ${mobile({ flexDirection: "column", rowGap: "10px" })}
  ${tablet({ flexDirection: "column", rowGap: "15px" })}
`;

const SearchTitle = styled.span`
  font-size: 15px;
`;

const SearchBar = styled.input`
  padding: 2px 5px;
  font-size: 13px;

  ${mobile({ width: "100%" })}
  ${tablet({ width: "100%" })}
`;

const Products = styled.div`
  width: 100%;
  height: 50vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px; /* Scrollbar height for horizontal scrolling */
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

  ${mobile({ padding: "20px" })}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  padding: 10px;
  border-radius: 10px;
  white-space: nowrap;

  &:hover {
    background-color: #f1f1f1;
  }

  ${mobile({ rowGap: "15px" })}
`;

const ProductImage = styled.img`
  width: 200px;
  cursor: pointer;

  ${mobile({ width: "100px" })}
  ${tablet({ width: "120px" })}
`;

const Info = styled.span`
  font-size: 14px;

  ${mobile({ fontSize: "14px", whiteSpace: "wrap", textAlign: "center" })}
  ${tablet({ whiteSpace: "wrap" })}
`;

const RemoveButton = styled.button`
  padding: 3px 8px;
  background-color: #ff4040;
  color: white;
  font-weight: 500;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const categoryOptions = ["tops", "bottoms", "footwear", "accessories"];

  // For adding product
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://i.imgur.com/OFAi5Du.png");
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [price, setPrice] = useState("");
  const [showNotification, setShowNotification] = useState(false); // Notification Modal

  // For deleting product
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Confirmation Modal
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [searchTerms, setSearchTerms] = useState({
    tops: "",
    bottoms: "",
    footwear: "",
    accessories: "",
  });

  // Fetch all products
  useEffect(() => {
    const getAllProducts = async () => {
      await fetchProducts({}).then(setProducts);
    };

    if (currentUser?.isAdmin) getAllProducts();
  }, [currentUser?.isAdmin]);

  function handleImageChange(e) {
    if (e.target.value === "") {
      setImage("https://i.imgur.com/OFAi5Du.png");
      return;
    }
    setImage(e.target.value);
  }

  function handleCategoryChange(e) {
    const value = e.target.value;
    setCategories((prevCategories) =>
      prevCategories.includes(value)
        ? prevCategories.filter((category) => category !== value)
        : [...prevCategories, value]
    );
  }

  function handleSizeKeyDown(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !sizes.includes(value)) {
        setSizes([...sizes, value]);
        e.target.value = "";
      }
    }
  }

  function removeSize(index) {
    setSizes(sizes.filter((_, i) => i !== index));
  }

  async function handleAddProduct() {
    const response = await addProduct({
      title,
      desc: description,
      img: image,
      category: categories,
      size: sizes,
      price,
    });

    setTitle("");
    setDescription("");
    setImage("https://i.imgur.com/OFAi5Du.png");
    setCategories([]);
    setSizes([]);
    setPrice("");

    if (response?.status === 201) {
      setShowNotification(true);
      await fetchProducts({}).then(setProducts);
    }
  }

  function handleDeleteProduct(productId) {
    setSelectedProductId(productId);
    setShowConfirmationModal(true);
  }

  async function confirmDeleteProduct() {
    await deleteProduct(selectedProductId);
    await fetchProducts({}).then(setProducts);
    setShowConfirmationModal(false);
    setSelectedProductId(null);
  }

  function handleSearchProduct(e) {
    const { name, value } = e.target;
    setSearchTerms((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <Container>
      <AddProduct>
        <LeftSection>
          <InputGroup>
            <Label>Title:</Label>
            <Input
              type="text"
              placeholder="Enter product title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>Description:</Label>
            <Input
              type="text"
              placeholder="Enter product description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>

          <InputGroup>
            <Label>Image URL:</Label>
            <Input
              type="text"
              required
              placeholder="Enter image link"
              onChange={handleImageChange}
            />
          </InputGroup>

          <InputGroup>
            <Label>Category:</Label>
            <CategoryContainer>
              {categoryOptions.map((category) => (
                <CategoryLabel key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    checked={categories.includes(category)}
                    onChange={handleCategoryChange}
                  />
                  {category}
                </CategoryLabel>
              ))}
            </CategoryContainer>
          </InputGroup>

          <InputGroup>
            <Label>Size:</Label>
            <Input
              type="text"
              placeholder="Type & press Enter"
              onKeyDown={handleSizeKeyDown}
            />
            <TagContainer>
              {sizes.map((size, index) => (
                <Tag key={index}>
                  {size}{" "}
                  <RemoveTag onClick={() => removeSize(index)}>×</RemoveTag>
                </Tag>
              ))}
            </TagContainer>
          </InputGroup>

          <InputGroup>
            <Label>Price:</Label>
            <Input
              type="number"
              step="0.01"
              placeholder="Enter product price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </InputGroup>

          <Button onClick={handleAddProduct}>Add Product</Button>
        </LeftSection>

        <RightSection>
          <ImagePreview src={image} alt="Product Preview" />
        </RightSection>
      </AddProduct>

      <AllProducts>
        {categoryOptions.map((category) => (
          <ProductCategory key={category}>
            <CategoryTitle>
              {category.charAt(0).toUpperCase() + category.slice(1)} (
              {
                products.filter((product) =>
                  product.category.includes(category)
                ).length
              }
              )
            </CategoryTitle>

            <SearchContainer>
              <SearchTitle>Search Product by Name or ID :</SearchTitle>
              <SearchBar
                placeholder="Search..."
                name={category}
                onChange={handleSearchProduct}
                value={searchTerms.category}
              />
            </SearchContainer>

            <Products>
              {products
                .filter(
                  (product) =>
                    product.category.includes(category) &&
                    (product.title
                      .toLowerCase()
                      .includes(searchTerms[category].toLowerCase()) ||
                      product._id
                        .toLowerCase()
                        .includes(searchTerms[category].toLowerCase()))
                )
                .map((product) => (
                  <Card key={product._id}>
                    <Link to={`/product/${product._id}`}>
                      <ProductImage src={product.img} />
                    </Link>
                    <Info>
                      <strong>ID :</strong> {product._id}
                    </Info>
                    <Info>{product.title}</Info>
                    <RemoveButton
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </RemoveButton>
                  </Card>
                ))}
            </Products>
          </ProductCategory>
        ))}
      </AllProducts>

      {/* Notification Modal */}
      <NotificationModal
        isShowNotification={showNotification}
        setIsShowNotification={setShowNotification}
        message={"Added Product"}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={confirmDeleteProduct}
        onCancel={() => {
          setShowConfirmationModal(false);
          setSelectedProductId(null);
        }}
        message={`Delete this product?`}
      />
    </Container>
  );
}

export default ProductManagement;
