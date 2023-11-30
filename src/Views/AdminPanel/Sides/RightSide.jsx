import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import ImageCard from "../components/ImageCard";
import ColorComponent from "../components/ColorComponent";
import StockItem from "../components/StockItem";
import SelectSizeComponent from "../components/SelectSizeComponent";
import { Axios } from "axios";

function RightSide({
   isEditMode = false,
   colorInformation = [],
   sizeInformation = [],
   productImages = [],
  setProductImages,
  setColorInformation,
  setSizeInformation,
  setStockInformation,
    stockInformation,
    isDataLoaded,

    colorInformationAux,
    sizeInformationAux
}) {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");
  const [colorComponents, setColorComponents] = useState([]);
  const [sizeComponents, setSizeComponents] = useState([]);
  const [stockRows, setStockRows] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      const newColorComponents = colorInformationAux.map(colorInfo => (
          <ColorComponent
              key={colorInfo.id}
              id={colorInfo.id}
              color={colorInfo.color}
              hex={colorInfo.hex}
              imagePath={colorInfo.imagePath}
              onDelete={() => handleDeleteColorComponent(colorInfo.id)}
              setColorInformation={setColorInformation}
              isEditMode={true}
          />
      ));
      setColorComponents(newColorComponents);
      const newSizeComponents = sizeInformationAux.map(size => (
          <SelectSizeComponent
              key={size.id}
              id={size.id}
              size={size.size}
              onDelete={handleDeleteSizeComponent}
              setSizeInformation={setSizeInformation}
              isEditMode={true}
          />
      ));
      setSizeComponents(newSizeComponents);
      setImages(productImages);
    }
  }, [isDataLoaded]);

  const handleAddImage = () => {
    const trimmedInput = input.trim();

    // Check if the input is empty or contains only spaces.
    if (!trimmedInput) {
      toast.error("The input field cannot be empty or contain only spaces.", {
        position: "bottom-right",
      });
      return;
    }

    if (images.length < 4) {
      if (
        !trimmedInput.startsWith("http://") &&
        !trimmedInput.startsWith("https://") &&
        !trimmedInput.startsWith("data:image/")
      ) {
        toast.error(
          "The image URL must start with 'http://', 'https://' or 'data:image/'",
          {
            position: "bottom-right",
          }
        );
        return;
      }

      const newImages = [...images, trimmedInput];
      setImages(newImages);
      setProductImages(newImages);
      setInput("");
    } else {
      toast.error("The maximum number of images is 4.", {
        position: "bottom-right",
      });
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setProductImages(newImages);
  };

  const handleAddColorComponent = () => {
    const id = Math.random();
    if (colorComponents.length < 5) {
      setColorComponents((prevColorComponents) => [
        ...prevColorComponents,
        <ColorComponent
          key={id}
          id={id}
          onDelete={() => handleDeleteColorComponent(id)}
          setColorInformation={setColorInformation}
          isEditMode={false}
        />,
      ]);
    } else {
      toast.error("The maximum number of colors is 5.", {
        position: "bottom-right",
      });
    }
  };

  const handleDeleteColorComponent = (id) => {
    setColorComponents((prevColorComponents) =>
      prevColorComponents.filter((component) => component.props.id !== id)
    );
    setColorInformation((prevColorInformation) =>
      prevColorInformation.filter((colorInfo) => colorInfo.id !== id)
    );
  };

  useEffect(() => {
    console.log(colorInformation)
  }, [colorInformation]);

  const handleAddSizeComponent = () => {
    const id = Math.random();
    if (sizeComponents.length < 8) {
      setSizeComponents((prevSizeComponents) => [
        ...prevSizeComponents,
        <SelectSizeComponent
          key={id}
          id={id}
          onDelete={handleDeleteSizeComponent}
          setSizeInformation={setSizeInformation}
        />,
      ]);
    } else {
      toast.error("The maximum number of sizes is 8.", {
        position: "bottom-right",
      });
    }
  };

  const handleDeleteSizeComponent = (id) => {
    setSizeComponents((prevSizeComponents) =>
        prevSizeComponents.filter((component) => component.props.id !== id)
    );
    setSizeInformation((prevSizeInformation) =>
        prevSizeInformation.filter((sizeInfo) => sizeInfo.id !== id)
    );
  };

  const handleQuantityChange = (color, size, quantity, sizeIndex) => {
    setStockInformation((prevStockInformation) => {
      const colorIndex = colorInformation.findIndex((c) => c.id === color.id);
      const updatedStockInformation = [...prevStockInformation];

      if (!updatedStockInformation[sizeIndex]) {
        updatedStockInformation[sizeIndex] = [];
      }

      updatedStockInformation[sizeIndex][colorIndex] = quantity;

      return updatedStockInformation;
    });
  };

  useEffect(() => {
    setStockInformation((prevStockInformation) => {
      const updatedStockInformation = prevStockInformation.map((size) => [...size]);
      if (updatedStockInformation.length > sizeInformation.length) {
        updatedStockInformation.length = sizeInformation.length;
      }
      updatedStockInformation.forEach((size, index) => {
        if (size.length > colorInformation.length) {
          size.length = colorInformation.length;
        }
        updatedStockInformation[index] = size;
      });

      return updatedStockInformation;
    });
  }, [sizeInformation, colorInformation]);

  useEffect(() => {
    if (sizeInformation.length > stockInformation.length) {
      setStockInformation((prevStockInformation) => {
        const updatedStockInformation = [...prevStockInformation, Array(colorInformation.length).fill(1)];
        return updatedStockInformation;
      });
    }
  }, [sizeInformation]);

  useEffect(() => {
    if (colorInformation.length > stockInformation[0]?.length) {
      setStockInformation((prevStockInformation) => {
        const updatedStockInformation = prevStockInformation.map((size) => [...size, 1]);
        return updatedStockInformation;
      });
    }
  }, [colorInformation]);

  return (
    <div className={'flex flex-col gap-3'}>
      <div className={'border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700 '}>
        <div className="flex flex-col mb-2">
          <label>Add reference images (URL)</label>
          <div className="flex flex-col lg:flex-row gap-3">
            <input
              type="text"
              className="input-add_right lg:w-2/3 block border-2 border-black hover:border-blue-700 rounded-md hover:text-blue-700"
              placeholder="Image URL"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              onClick={handleAddImage}
              className="text-white bg-blue-500 lg:w-1/3 block rounded-md p-3"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex flex-wrap overflow-auto h-64 mb-4 border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700">
          {images.map((url, index) => (
            <ImageCard
              key={index}
              url={url}
              onDelete={() => handleDeleteImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4 border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700">
        <label>Colors</label>
        <div className="overflow-auto h-44 flex flex-col gap-3">
          {colorComponents}
        </div>
        <button
          onClick={handleAddColorComponent}
          className="text-white bg-blue-500 w-full rounded-md p-3"
        >
          Add new color
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-4 border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700">
        <label>Sizes</label>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-2 overflow-auto h-40">
          {sizeComponents}
        </div>
        <button
          onClick={handleAddSizeComponent}
          className="text-white bg-blue-500 w-full rounded-md p-3"
        >
          Add new size
        </button>
      </div>

      <div className={"overflow-auto h-60 border-2 border-black p-3 hover:border-blue-700 rounded-md hover:text-blue-700"}>
        <label className={"mb-3"}>Stock</label>
        <div className={"flex flex-col gap-2"}>
          {sizeInformation.map((size, sizeIndex) =>
              colorInformation.map((color, colorIndex) => (
                  <StockItem
                      key={`${color.id}-${size.id}`}
                      color={color}
                      size={size}
                      sizeIndex={sizeIndex}
                      handleQuantityChange={handleQuantityChange}
                      initialQuantity={stockInformation[sizeIndex] ? stockInformation[sizeIndex][colorIndex] : 1}
                  />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RightSide;