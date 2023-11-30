import "../../css/Sidebar.css";
import { useEffect, useState } from "react";
import { targetData } from "../../Components/Objects/FiltersByTarget";
import { sportData } from "../../Components/Objects/FiltersBySport";
import { categoriesData } from "../../Components/Objects/FiltersByCategories";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { Range } from 'react-range';
import { getElements } from "../../Components/ApiRestHandler/requestHandler";

const Sidebar = ({setParams, query}) => {
    const [brandsData, setBrandsData] = useState([]);

    const [targetFilterDisplayed, setTargetFilterDisplayed] = useState(false);
    const [sportFilterDisplayed, setSportFilterDisplayed] = useState(false);
    const [categoriesFilterDisplayed, setCategoriesFilterDisplayed] = useState(false);
    const [brandsFilterDisplayed, setBrandsFilterDisplayed] = useState(false);

    const [selectedTarget, setSelectedTarget] = useState([]);
    const [selectedSports, setSelectedSports] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500);

    const [state, setState] = useState({values: [0, 500]});
    const [firstLoad, setFirstLoad] = useState(true);
    const currency = "$"

    useEffect(() => {
        const brands = getElements("/brands");
        brands.then((brand) => {
            setBrandsData(brand);
        });

        if (query !== null && query !== undefined) {
            const paramsSplitted = query.split("=");
            if (paramsSplitted.length === 2) {
                const key = paramsSplitted[0];
                const value = paramsSplitted[1];

                switch (key) {
                    case "brand":
                        setSelectedBrands([value]);
                        break;
                    case "target":
                        setSelectedTarget([value]);
                        break;
                    case "categories":
                        setSelectedCategories([value]);
                        break;
                    default:
                        break;
                }
            }
        }
    }, []);

    useEffect(() => {
        buildQuery();
    }, [selectedTarget, selectedSports, selectedCategories, selectedBrands, minPrice, maxPrice]);

    const buildQuery = () => {
        if (!firstLoad) {
            if (selectedTarget.length !== 0
                || selectedBrands !== 0
                || selectedSports !== 0
                || selectedCategories !== 0 || minPrice !== 0 || maxPrice !== 500) {
                const builtQuery = {
                    target: selectedTarget,
                    brand: selectedBrands,
                    sport: selectedSports,
                    categories: selectedCategories,
                    minPrice: minPrice,
                    maxValue: maxPrice
                };
                setParams(builtQuery)
            }
        } else {
            setFirstLoad(false)
        }
    }

    const displayTargetMenu = () => {
        setTargetFilterDisplayed(!targetFilterDisplayed);
    }

    const handleCheckboxChange = (selectedValue, setSelectedFunction, selectedArray) => {
        const isSelected = selectedArray.includes(selectedValue);

        if (isSelected) {
            setSelectedFunction((prevSelected) => prevSelected.filter((value) => value !== selectedValue));
        } else {
            setSelectedFunction((prevSelected) => [...prevSelected, selectedValue]);
        }
    };

    const displaySportsMenu = () => {
        setSportFilterDisplayed(!sportFilterDisplayed);
    }

    const displayCategoriesMenu = () => {
        setCategoriesFilterDisplayed(!categoriesFilterDisplayed);
    }

    const displayBrandsMenu = () => {
        setBrandsFilterDisplayed(!brandsFilterDisplayed);
    }

    return (
        <>
            <section className="sidebar">
                <label className="main-title">Filtered By:</label>
                <div className="filters">
                    <ul>
                        <div className="title-filter" onClick={displayTargetMenu}>
                            <label>Target</label>
                            {targetFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                        </div>
                        {targetData.map((target) => (
                            <li className={targetFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                                <input id={target.id} name={target.id} value={target.label} type="checkbox"
                                       onChange={() => handleCheckboxChange(target.label, setSelectedTarget, selectedTarget)}
                                       checked={selectedTarget.includes(target.label)}
                                />
                                <label htmlFor={target.id}>{target.label}</label>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <div className="title-filter" onClick={displaySportsMenu}>
                            <label>Sports & Activities</label>
                            {sportFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                        </div>
                        {sportData.map((sport) => (
                            <li className={sportFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                                <input id={sport.id} name={sport.id} value={sport.label} type="checkbox"
                                       onChange={() => handleCheckboxChange(sport.label, setSelectedSports, selectedSports)}
                                       checked={selectedSports.includes(sport.label)}
                                />
                                <label htmlFor={sport.id}>{sport.label}</label>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <div className="title-filter" onClick={displayCategoriesMenu}>
                            <label>Categories</label>
                            {categoriesFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                        </div>
                        {categoriesData.map((category) => (
                            <li className={categoriesFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                                <input id={category.id} name={category.id} value={category.label} type="checkbox"
                                       onChange={() => handleCheckboxChange(category.label, setSelectedCategories, selectedCategories)}
                                       checked={selectedCategories.includes(category.label)}/>
                                <label htmlFor={category.id}>{category.label}</label>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        <div className="title-filter" onClick={displayBrandsMenu}>
                            <label>Brands</label>
                            {brandsFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                        </div>
                        {brandsData.map((brand) => (
                            <li className={brandsFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                                <input id={brand._id} key={brand._id} name={brand._id} value={brand.name} type="checkbox"
                                       onChange={() => handleCheckboxChange(brand._id, setSelectedBrands, selectedBrands)}
                                       checked={selectedBrands.includes(brand._id)}
                                />
                                <label htmlFor={brand._id}>{brand.name}</label>
                            </li>
                        ))}
                    </ul>
                    <div className="selector">
                        <br/>
                        <label className="title-selector">Price:</label>
                        <br/>
                        <Range
                            step={10}
                            min={0}
                            max={500}
                            values={state.values}
                            onChange={(values) => {
                                setState({ values });
                                setMinPrice(values[0]);
                                setMaxPrice(values[1]);
                            }}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '6px',
                                        width: '100%',
                                        backgroundColor: '#ccc',
                                        margin: '10px 0 10px 0'
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '20px',
                                        width: '20px',
                                        backgroundColor: '#52a0ef',
                                        borderRadius: '50%',
                                    }}
                                />
                            )}
                        />
                        <label>{state.values[0]}{currency} - {state.values[1]}{currency}</label>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Sidebar;
