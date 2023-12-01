import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import ProductForm from "./ProductForm";
import {useNavigate, useParams} from "react-router-dom";
import SelectWithAddButton from "./SelectWithAddButton";
import BrandsSelect from "./BrandsSelect";
import "../../css/AdminPanelStyle/simpleDataComponentStyle.css";
import "../../css/AdminPanelStyle/addProductStyle.css";
import RightSide from "./Sides/RightSide";
import {addElement, getElementByID, updateElement} from "../../Components/ApiRestHandler/requestHandler";


/**
 * AddProduct Component
 *
 * A component for adding a new product with various details.
 *
 * @component
 */
const AddProduct = ({ isEditMode = false}) => {
  const { id: productId } = useParams();
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
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [colorInformationAux, setColorInformationAux] = useState([]);
  const [sizeInformationAux, setSizeInformationAux] = useState([]);

  const transformColorInformation = (colorInformation) => {
    return colorInformation.map(colorInfo => ({
      id: Math.random(), // Genera un ID aleatorio
      color: colorInfo.color,
      hex: colorInfo.hex,
      imagePath: colorInfo.imagePath
    }));
  };

  const transformSizeInformation = (sizeInformation) => {
    return sizeInformation.map(size => ({
      id: Math.random(),
      size: size
    }));
  };

  useEffect(() => {
    if (isEditMode && productId) {
      getElementByID(productId, '/products')
          .then(product => {
            const transformedColorInformation = transformColorInformation(product.colorInformation);
            const transformedSizeInformation = transformSizeInformation(product.size);
            setProductName(product.name);
            setProductDescription(product.description);
            setSelectedBrand(product.brand);
            setPrice(product.price);
            setSelectedCategories(product.categories);
            setSelectedTarget(product.target);
            setSelectedSports(product.sport);
            setColorInformationAux(transformedColorInformation);
            setSizeInformationAux(transformedSizeInformation);
            setProductImages(product.imagePath);
            setStockInformation(product.inStock);
            setIsDataLoaded(true);
          })
          .catch(error => {
            console.error('Error al obtener el producto: ', error);
          });
    }
  }, []);

  useEffect(() => {
    console.log(isDataLoaded)
  }, [isDataLoaded]);


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
      return false;
    } else if (trimmedProductDescription === "" || !trimmedProductDescription) {
      toast.error("Product description cannot be empty.", { position: "bottom-right", });
      return false;
    } else if (selectedBrand === "") {
      toast.error("Please select a brand.", { position: "bottom-right", });
      return false;
    } else if (price === "") {
      toast.error("Price cannot be empty.", { position: "bottom-right", });
      return false;
    } else if (selectedCategories.length === 0) {
      toast.error("Please add at least one category.", { position: "bottom-right", });
      return false;
    } else if (selectedTarget.length === 0) {
      toast.error("Please add at least one target.", { position: "bottom-right", });
      return false;
    } else if (selectedSports.length === 0) {
      toast.error("Please add at least one sport.", { position: "bottom-right", });
      return false;
    } else if (productImages.length === 0) {
      toast.error("Please add at least one product Image.", { position: "bottom-right", });
      return false;
    } else if (colorInformation.length === 0) {
      toast.error("Please add at least one color and Image.", { position: "bottom-right", });
      return false;
    } else if (sizeInformation.length === 0) {
      toast.error("Please add at least one size.", { position: "bottom-right", });
      return false;
    } else if (stockInformation.length === 0) {
      toast.error("Please add at stock information.", { position: "bottom-right", });
      return false;
    }

    return true;
  }

  const handleUpdateProduct = async () => {
    if (handleAddProductMessages()) {
      const product = {
        _id: productId,
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
        const response = await updateElement(product, 'products');
        console.log(response);
        navigate("/admin");
      } catch (error) {
        console.error('Error updating the product: ', error);
      }
    }
  };


  const handleAddProduct = async () => {
    if (handleAddProductMessages()) {
      setIsProductAdded(true);
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
        navigate("/admin");
      } catch (error) {
        console.error('Error adding the new product: ', error);
      }
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
        {isEditMode ? 'Edit Product' : 'Add Product'}
      </div>


        <div className="flex flex-col lg:flex-row lg:gap-2 lg:pb-4 rounded p-3">
          <div className="lg:w-1/2 p-4 flex flex-col gap-3">
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
            <div className={'border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700'}>
              <BrandsSelect
                value={selectedBrand}
                onChange={handleBrandChange}
                options={[ "Adidas", "Asics", "Champion", "Fila", "Givenchy", "New Balance", "Nike", "Puma", "Under Armour", "Vans", "Wilson" ]}
              />
            </div>
            <ProductForm
              label="Price"
              id="price"
              value={price}
              onChange={handlePriceChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter product price"
            />
            <div className={'border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700'}>
              <label htmlFor="categories">Categories</label>
              <SelectWithAddButton
                id="category"
                value={categoryInput}
                onChange={handleCategoryChange}
                inputValue={categoryInput}
                onInputChange={(e) => setCategoryInput(e.target.value)}
                onAdd={handleAddCategory}
                options={[ "Accesories", "Equipment", "Hoodies", "Jackets", "Jersey", "Pants", "Shoes", "Shorts", "Socks", "T-shirt", "Underwear" ]}
                selectedItems={selectedCategories}
                onRemoveItem={handleRemoveCategory}
                placeholder="Select a category"
              />
            </div>
            <div className={'border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700'}>
              <label htmlFor="target">Target</label>
              <SelectWithAddButton
                id="target"
                value={targetInput}
                onChange={handleTargetChange}
                inputValue={targetInput}
                onInputChange={(e) => setTargetInput(e.target.value)}
                onAdd={handleAddTarget}
                options={[ "Kids", "Men", "Teenagers", "Women"]}
                selectedItems={selectedTarget}
                onRemoveItem={handleRemoveTarget}
                placeholder="Select a target"
              />
            </div>

            <div className={'border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700'}>
              <label htmlFor="sport">Sport</label>
              <SelectWithAddButton
                id="sport"
                value={sportInput}
                onChange={handlSportChange}
                inputValue={sportInput}
                onInputChange={(e) => setSportInput(e.target.value)}
                onAdd={handleAddSport}
                options={[ "American Football", "Baseball" ,"Basketball", "Golf", "Soccer", "Skateboarding", "Tennis", "Training", "Volleyball", "Yoga" ]}
                selectedItems={selectedSports}
                onRemoveItem={handleRemoveSport}
                placeholder="Select a sport"
              />
            </div>
          </div>

          <div className={' lg:w-1/2 p-3'}>
            <RightSide setProductImages={setProductImages} setColorInformation={setColorInformation}
                       setSizeInformation={setSizeInformation} setStockInformation={setStockInformation}
                       colorInformation={colorInformation} sizeInformation={sizeInformation}
                        isEditMode={isEditMode} productImages={productImages} stockInformation={stockInformation}
                        isDataLoaded={isDataLoaded} colorInformationAux={colorInformationAux}
                       sizeInformationAux={sizeInformationAux}/>
          </div>
        </div>
      <div className="buttons-container">
        <button className="styleButton button-cancel" onClick={() => navigate('/admin')}>Cancel</button>
        <button
            className="styleButton button-add"
            onClick={() => {
              if (isEditMode) {
                handleUpdateProduct();
              } else {
                handleAddProduct();
              }
            }}
            disabled={isProductAdded}
        >
          {isEditMode ? 'Confirm' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;