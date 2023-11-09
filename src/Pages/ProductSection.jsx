import ProductInformation from "../Components/productInformation";
import Recommendations from "../Components/Recommendations";

import { useParams } from 'react-router-dom';

export function ProductSection() {
    const { id } = useParams();

    return (
        <>
            <div className={'flex flex-col items-center justify-center min-h-screen'}>
                <div className={'flex items-center justify-center max-w-7xl w-full px-4'}>
                    <ProductInformation
                        productID={id}
                    />
                </div>
                <div className="w-full h-250 mx-auto">
                    <Recommendations/>
                </div>
            </div>
            {/* Include Recommendations component below */}
            
        </>
    )
}
