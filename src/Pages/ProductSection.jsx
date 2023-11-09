import ProductInformation from "../Components/productInformation";
import { useParams } from 'react-router-dom';

export function ProductSection() {

    const { id } = useParams();


    return (
        <>
            {/*header*/}
            <div className={'w-screen h-screen flex items-center justify-center'}>
                <div className={'flex items-center justify-center max-w-7xl '}>
                    <ProductInformation
                        productID={id}
                    />
                </div>
            </div>
            {/*footer*/}
        </>
    )
}