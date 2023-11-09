import ProductInformation from "../Components/productInformation";
import { useParams } from 'react-router-dom';

export function ProductSection() {

    const { id } = useParams();


    return (
        <>
            {/*header-kari*/}
            <div className={'flex flex-col items-center justify-center min-h-screen'}>
                <div className={'flex items-center justify-center max-w-7xl w-full px-4'}>
                    <ProductInformation
                        productID={id}
                    />
                </div>
            </div>
            {/*footer-juanpa*/}
        </>
    )
}
