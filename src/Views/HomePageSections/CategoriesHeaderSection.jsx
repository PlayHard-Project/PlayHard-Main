import React from "react";
import "../../css/categoryHeaderSection.css"
import { IoIosArrowDown } from "react-icons/io";

const CategoriesHeaderSection = () => {

    return (
        <div className="CategoriesHeaderConteiner"> 
            <div>
                <h1>
                    <button>
                    <span> CLOTHES</span>
                    <i class="fas fa-star">
                        <IoIosArrowDown></IoIosArrowDown>
                    </i>
                    </button>
                </h1>
                <h1>SHOES</h1>
                <h1>EQUIPMENT</h1>
                <h1>ACCESSORIES</h1>
                <h1>
                <button>
                    <span> BRANDS</span>
                    <i class="fas fa-star">
                        <IoIosArrowDown></IoIosArrowDown>
                    </i>
                    </button>
                </h1>
                <h1>OFFERS</h1>
                <h1>
                <button>
                    <span> CLOTHES</span>
                    <i class="fas fa-star">
                        <IoIosArrowDown></IoIosArrowDown>
                    </i>
                    </button>
                </h1>
            </div>
        </div>
    )

}

export default CategoriesHeaderSection;