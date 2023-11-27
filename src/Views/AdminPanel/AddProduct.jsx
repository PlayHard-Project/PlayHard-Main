import React, { useState } from "react";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";
import { useNavigate  } from "react-router-dom";
import SelectWithAddButton from "./SelectWithAddButton";
import BrandsSelect from "./BrandsSelect";
import "../../css/AdminPanelStyle/simpleDataComponentStyle.css";
import "../../css/AdminPanelStyle/addProductStyle.css";
import RightSide from "./Sides/RightSide";
import {addElement} from "../../Components/ApiRestHandler/requestHandler";


/**
 * AddProduct Component
 *
 * A component for adding a new product with various details.
 *
 * @component
 */
const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState('654c41ca1754c5a319281642');
  const [selectedBrandHarcode, setSelectedBrandHardcode] = useState('654c41ca1754c5a319281642');
  const [price, setPrice] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [selectedTarget, setSelectedTarget] = useState([]);
  const [targetInput, setTargetInput] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [sportInput, setSportInput] = useState("");
  const [sizeInformation, setSizeInformation] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [colorInformation, setColorInformation] = useState([]);
  const [stockInformation, setStockInformation] = useState([[]]);
  const navigate  = useNavigate ();
  const [isProductAdded, setIsProductAdded] = useState(false);



  //Validation for each input.
  const handleProductNameChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 35) {
      setProductName(inputValue);
    } else {
      toast.error("Product name must be 35 characters or less.", {
        position: "bottom-right",
      });
    }
  };

  const handleProductDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 200) {
      setProductDescription(inputValue);
    } else {
      toast.error("Product description must be 200 characters or less.", {
        position: "bottom-right",
      });
    }
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };

  const handlePriceChange = (e) => {
    const enteredValue = e.target.value;
  
    // Check if the entered value complies with the required format (up to two digits after the decimal point).
    if (/^\d+(\.\d{0,2})?$/.test(enteredValue) || enteredValue === "") {
      setPrice(enteredValue);
    } else {
      toast.error("Please enter a valid positive number with up to two decimal places.", {
        position: "bottom-right",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (
      !(
        (e.key >= "0" && e.key <= "9") ||
        e.key === "." ||
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      )
    ) {
      e.preventDefault();
    }
  };

  //validation of aselect more that 1 option.
  //Add the option into selected options.
  //Delete the option of selected options.
  
  const handleCategoryChange = (e) => {
    setCategoryInput(e.target.value);
  };

  const handleAddCategory = () => {
    const trimmedCategory = categoryInput.trim();
    if (
      trimmedCategory !== "" &&
      !selectedCategories.includes(trimmedCategory)
    ) {
      setSelectedCategories([...selectedCategories, trimmedCategory]);
      setCategoryInput("");
    } else if (trimmedCategory === "") {
      toast.error("Category cannot be empty.", {
        position: "bottom-right",
      });
    } else {
      toast.error("Category already selected.", {
        position: "bottom-right",
      });
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    const updatedCategories = selectedCategories.filter(
      (category) => category !== categoryToRemove
    );
    setSelectedCategories(updatedCategories);
  };

  const handleTargetChange = (e) => {
    setTargetInput(e.target.value);
  };

  const handleAddTarget = () => {
    const trimmedTarget = targetInput.trim();
    if (trimmedTarget !== "" && !selectedTarget.includes(trimmedTarget)) {
      setSelectedTarget([...selectedTarget, trimmedTarget]);
      setTargetInput("");
    } else if (trimmedTarget === "") {
      toast.error("Target cannot be empty.", {
        position: "bottom-right",
      });
    } else {
      toast.error("Target already selected.", {
        position: "bottom-right",
      });
    }
  };

  const handleRemoveTarget = (targetToRemove) => {
    const updatedTarget = selectedTarget.filter(
      (target) => target !== targetToRemove
    );
    setSelectedTarget(updatedTarget);
  };

  const handlSportChange = (e) => {
    setSportInput(e.target.value);
  };

  const handleAddSport = () => {
    const trimmedSport = sportInput.trim();
    if (trimmedSport !== "" && !selectedSports.includes(trimmedSport)) {
      setSelectedSports([...selectedSports, trimmedSport]);
      setSportInput("");
    } else if (trimmedSport === "") {
      toast.error("Sports cannot be empty.", {
        position: "bottom-right",
      });
    } else {
      toast.error("Sport already selected.", {
        position: "bottom-right",
      });
    }
  };

  const handleRemoveSport = (sportToRemove) => {
    const updatedSports = selectedSports.filter(
      (sport) => sport !== sportToRemove
    );
    setSelectedSports(updatedSports);
  };

  const handleAddProductMessages = () => {
    const trimmedProductName = productName.trim();
    const trimmedProductDescription = productDescription.trim();
    if (trimmedProductName === "" || !trimmedProductName) {
      toast.error("Product name cannot be empty.", { position: "bottom-right", });
    } else if (trimmedProductDescription === "" || !trimmedProductDescription) {
      toast.error("Product description cannot be empty.", { position: "bottom-right", });
    } else if (selectedBrand === "") {
      toast.error("Please select a brand.", { position: "bottom-right", });
    } else if (price === "") {
      toast.error("Price cannot be empty.", { position: "bottom-right", });
    } else if (selectedCategories.length === 0) {
      toast.error("Please add at least one category.", { position: "bottom-right", });
    } else if (selectedTarget.length === 0) {
      toast.error("Please add at least one target.", { position: "bottom-right", });
    } else if (selectedSports.length === 0) {
      toast.error("Please add at least one sport.", { position: "bottom-right", });
    } else if (productImages.length === 0) {
      toast.error("Please add at least one product Image.", { position: "bottom-right", });
    } else if (colorInformation.length === 0) {
      toast.error("Please add at least one color and Image.", { position: "bottom-right", });
    } else if (sizeInformation.length === 0) {
      toast.error("Please add at least one size.", { position: "bottom-right", });
    } else if (stockInformation.length === 0) {
      toast.error("Please add at stock information.", { position: "bottom-right", });
    } else {
      toast.success("The product was added!",{position: "bottom-right"})
      navigate("/");
      setIsProductAdded(true);
      }
    }


  const handleAddProduct = async () => {
    const product = {
      name: productName,
      description: productDescription,
      price: parseFloat(price),
      brand: selectedBrandHarcode || null,
      categories: selectedCategories,
      target: selectedTarget,
      sport: selectedSports,
      size: sizeInformation.map(size => size.size),
      colorInformation: colorInformation.map(color => ({
        color: color.color,
        hex: color.hex,
        imagePath: color.imagePath
      })),
      imagePath: productImages,
      inStock: stockInformation
    };

    try {
      const response = await addElement(product, '/products');
      console.log(response);
    } catch (error) {
      console.error('Error adding the new product: ', error);
    }
  };

  return (
    <div className={'container'}>
      <div
        style={{
          fontSize: "30px",
          fontFamily: "Montserrat, cursive",
          marginTop: "13px",
        }}
      >
        Add Product
      </div>


        <div className="flex flex-col lg:flex-row lg:gap-2 lg:pb-4 rounded p-3">
          <div className="lg:w-1/2">
            <ProductForm
              label="Product Name"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
              placeholder="Enter product name"
            />
            <ProductForm
              label="Description"
              id="productDescription"
              value={productDescription}
              onChange={handleProductDescriptionChange}
              inputType="textarea"
              placeholder="Enter product description"
            />
            <BrandsSelect
              value={selectedBrand}
              onChange={handleBrandChange}
              options={[ "Adidas", "Asics", "Fila", "Givenchy", "New Balance", "Nike", "Puma", "Under Armour", "Vans", "Champion", "Wilson",]}
            />
            <ProductForm
              label="Price"
              id="price"
              value={price}
              onChange={handlePriceChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter product price"
            />
            <label htmlFor="categories">Categories</label>
            <SelectWithAddButton
              id="category"
              value={categoryInput}
              onChange={handleCategoryChange}
              inputValue={categoryInput}
              onInputChange={(e) => setCategoryInput(e.target.value)}
              onAdd={handleAddCategory}
              options={[ "T-shirt", "Shoes", "Accessory", "Pants", "Jersey", "Hoodies", "Jackets", "Shorts", "Socks", "Equipment", "Offers", ]}
              selectedItems={selectedCategories}
              onRemoveItem={handleRemoveCategory}
              placeholder="Select a category"
            />
            <label htmlFor="target">Target</label>
            <SelectWithAddButton
              id="target"
              value={targetInput}
              onChange={handleTargetChange}
              inputValue={targetInput}
              onInputChange={(e) => setTargetInput(e.target.value)}
              onAdd={handleAddTarget}
              options={["Men", "Woman", "Teenagers", "Kids"]}
              selectedItems={selectedTarget}
              onRemoveItem={handleRemoveTarget}
              placeholder="Select a target"
            />
            <label htmlFor="sport">Sport</label>

            <SelectWithAddButton
              id="sport"
              value={sportInput}
              onChange={handlSportChange}
              inputValue={sportInput}
              onInputChange={(e) => setSportInput(e.target.value)}
              onAdd={handleAddSport}
              options={[ "Basketball", "Soccer", "Yoga", "Gym", "Tennis", "Cycling", "Swimming", "Golf", ]}
              selectedItems={selectedSports}
              onRemoveItem={handleRemoveSport}
              placeholder="Select a sport"
            />
          </div>

          <div className={' lg:w-1/2 border-2 border-black rounded p-3'}>
            <RightSide setProductImages={setProductImages} setColorInformation={setColorInformation}
                       setSizeInformation={setSizeInformation} setStockInformation={setStockInformation}
                       colorInformation={colorInformation} sizeInformation={sizeInformation}/>
          </div>
        </div>
      <div className="buttons-container">
        <button className="styleButton button-cancel" onClick={() => navigate('/admin')}>Cancel</button>
        <button className="styleButton button-add"  onClick={() => {
                            handleAddProduct();
                            handleAddProductMessages();
                            
                        }} disabled={isProductAdded}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProduct;