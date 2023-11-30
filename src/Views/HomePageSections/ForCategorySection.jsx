import React from "react";
import '../../css/BrandsSection.css'
import { Link } from "react-router-dom";
import { data } from "../../Components/Objects/ForCategoryImages";

const ForCategorySection = () => {
    return (
        <section>
            <div className="title-container mt-14">
                <h1 className="section-title">For</h1>
            </div>
            <div className="flex flex-wrap justify-center">
                {data.map((category) => (
                    <Link to={`/${category.name}`} key={category.id} className="m-4 relative overflow-hidden group">
                        <img
                            src={category.imgUrl}
                            alt={category.name}
                            className="object-cover mb-14 transition-opacity duration-300 group-hover:opacity-70"
                        />
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default ForCategorySection;
