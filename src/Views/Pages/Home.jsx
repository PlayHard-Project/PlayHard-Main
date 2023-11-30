import '../../css/HomeStyle.css'
import React, { useState } from 'react';
import { getElements } from '../../Components/ApiRestHandler/requestHandler';
import {ProductButtons} from "../ProductDescriptionSection/DeleteThisButton";
import BuyNowSection from "../HomePageSections/BuyNowSection";
import BrandsSection from "../HomePageSections/BrandsSection";
import ForCategorySection from "../HomePageSections/ForCategorySection";
import CategoryHomeSection from "../HomePageSections/CategoryHomeSection";
import OffersSection from '../HomePageSections/OffersSection';

export default function Home() {
    return (
        <div className="App container">
            <section>
                <BuyNowSection className="main-container"/>
            </section>
            <section>
                <BrandsSection/>
            </section>
            <section>
                <OffersSection/>
            </section>
            <section>
                <ForCategorySection>
                </ForCategorySection>
            </section>
            <section>
                <CategoryHomeSection>
                </CategoryHomeSection>
            </section>
        </div>
    );
}