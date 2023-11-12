import {Link} from "react-router-dom";

{/* BORRAR ESTE COMPONENTE, SOLO ESTA PARA EL TESTEO*/}
export function ProductButtons() {
    const productIds = ['654c436360c78adccb61fc21', '654c436360c78adccb61fc42', '654c436360c78adccb61fbec'];

    return (
        <div className={'flex flex-col gap-6 items-center text-center justify-center max-w-7xl'}>
            {productIds.map(id => (
                <Link key={id} to={`/product/${id}`}>
                    <button className={'bg-blue-500 p-5'}>Ir a producto {id}</button>
                </Link>
            ))}
        </div>
    );
}