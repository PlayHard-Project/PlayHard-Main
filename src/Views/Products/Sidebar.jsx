import "../../css/Sidebar.css";
import {useEffect, useState} from "react";
import { genderData } from "../../Components/Objects/FiltersByGender";
import { ageGroupData } from "../../Components/Objects/FiltersByAge";
import { sportData } from "../../Components/Objects/FiltersBySport";
import { categoriesData } from "../../Components/Objects/FiltersByCategories";
import { brandsData } from "../../Components/Objects/FiltersByBrands";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import {getTrackBackground, Range} from 'react-range';

const Sidebar = () => {
    const [genderFilterDisplayed, setGenderFilterDisplayed] = useState(false)
    const [ageGroupFilterDisplayed, setAgeGroupFilterDisplayed] = useState(false)
    const [sportFilterDisplayed, setSportFilterDisplayed] = useState(false)
    const [categoriesFilterDisplayed, setCategoriesFilterDisplayed] = useState(false)
    const [brandsFilterDisplayed, setBrandsFilterDisplayed] = useState(false)

    const [selectedGenders, setSelectedGenders] = useState([]);
    const [selectedAgeGroups, setSelectedAgeGroups] = useState([]);
    const [selectedSports, setSelectedSports] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const [state, setState] = useState({values: [20, 80]});
    const currency = "$"


    useEffect(() => {
        console.log(selectedGenders)
        console.log(selectedAgeGroups)
        console.log(selectedSports)
        console.log(selectedCategories)
        console.log(selectedBrands)
    }, [selectedGenders, selectedAgeGroups, selectedSports, selectedCategories, selectedBrands]);

    const displayGenderMenu = () => {
        setGenderFilterDisplayed(!genderFilterDisplayed);
    }

    const handleCheckboxChange = (selectedValue, setSelectedFunction, selectedArray) => {
        const isSelected = selectedArray.includes(selectedValue);

        if (isSelected) {
            setSelectedFunction((prevSelected) => prevSelected.filter((value) => value !== selectedValue));
        } else {
            setSelectedFunction((prevSelected) => [...prevSelected, selectedValue]);
        }
    };

    const displayAgeGroupMenu = () => {
        setAgeGroupFilterDisplayed(!ageGroupFilterDisplayed);
    }

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
                  <div className="title-filter" onClick={displayGenderMenu}>
                      <label>Gender:</label>
                      {genderFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                  </div>
                  {genderData.map((gender) => (
                      <li className={genderFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                        <input id={gender.id} name={gender.id} value={gender.label} type="checkbox"
                               onChange={() => handleCheckboxChange(gender.label, setSelectedGenders, selectedGenders)}/>
                        <label htmlFor={gender.id}>{gender.label}</label>
                      </li>
                  ))}
              </ul>
              <ul>
                  <div className="title-filter" onClick={displayAgeGroupMenu}>
                      <label>Age Group:</label>
                      {ageGroupFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                  </div>
                  {ageGroupData.map((ageGroup) => (
                      <li className={ageGroupFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                          <input id={ageGroup.id} name={ageGroup.id} value={ageGroup.label} type="checkbox"
                                 onChange={() => handleCheckboxChange(ageGroup.label, setSelectedAgeGroups, selectedAgeGroups)}/>
                          <label htmlFor={ageGroup.id}>{ageGroup.label}</label>
                      </li>
                  ))}
              </ul>
              <ul>
                  <div className="title-filter" onClick={displaySportsMenu}>
                      <label>Sports & Activities:</label>
                      {sportFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                  </div>
                  {sportData.map((sport) => (
                      <li className={sportFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                          <input id={sport.id} name={sport.id} value={sport.label} type="checkbox"
                                 onChange={() => handleCheckboxChange(sport.label, setSelectedSports, selectedSports)}/>
                          <label htmlFor={sport.id}>{sport.label}</label>
                      </li>
                  ))}
              </ul>
              <ul>
                  <div className="title-filter" onClick={displayCategoriesMenu}>
                      <label>Categories:</label>
                      {categoriesFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                  </div>
                  {categoriesData.map((category) => (
                      <li className={categoriesFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                          <input id={category.id} name={category.id} value={category.label} type="checkbox"
                                 onChange={() => handleCheckboxChange(category.label, setSelectedCategories, selectedCategories)}/>
                          <label htmlFor={category.id}>{category.label}</label>
                      </li>
                  ))}
              </ul>
              <ul>
                  <div className="title-filter" onClick={displayBrandsMenu}>
                      <label>Brands:</label>
                      {brandsFilterDisplayed ? <SlArrowDown /> : <SlArrowRight />}
                  </div>
                  {brandsData.map((brand) => (
                      <li className={brandsFilterDisplayed ? "li-displayed" : "li-no-displayed"}>
                          <input id={brand.id} name={brand.id} value={brand.label} type="checkbox"
                                 onChange={() => handleCheckboxChange(brand.label, setSelectedBrands, selectedBrands)}/>
                          <label htmlFor={brand.id}>{brand.label}</label>
                      </li>
                  ))}
              </ul>
              <div className="selector">
                  <br/>
                  <label>Price:</label>
                  <br/>
                  <Range
                      step={0.1}
                      min={0}
                      max={100}
                      values={state.values}
                      onChange={(values) => setState({ values })}
                      renderTrack={({ props, children }) => (
                          <div
                              {...props}
                              style={{
                                  ...props.style,
                                  height: '6px',
                                  width: '100%',
                                  backgroundColor: '#ccc',
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
