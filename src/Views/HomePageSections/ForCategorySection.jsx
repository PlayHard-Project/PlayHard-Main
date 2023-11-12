import React from "react";
import { data } from "../../Components/Objects/CategoriesImages";

const ForCategorySection = () => {
    return (
        <div className="flex flex-wrap justify-center">
            {data.map((category) => (
                <button key={category.id} className="m-4">
                    <img
                        src={category.imgUrl}
                        alt={category.name}
                        className="w-150 h-200 object-cover"
                    />
                    <p className="text-center mt-2 text-sm">{category.name}</p>
                </button>
            ))}
        </div>
    );
};

export default ForCategorySection;
