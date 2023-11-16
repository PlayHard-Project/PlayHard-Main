import { Link } from "react-router-dom";

{
  /* BORRAR ESTE COMPONENTE, SOLO ESTA PARA EL TESTEO*/
}
export function ProductButtonsD() {
  return (
    <div
      className={
        "flex flex-col gap-6 items-center text-center justify-center max-w-7xl"
      }
    >
      <Link to={"/PaymentStatus1"}>
        <button className={"bg-blue-500 p-5"}>Ir al estado de pago Fail</button>
      </Link>
      <Link to={"/PaymentStatus2"}>
        <button className={"bg-blue-500 p-5"}>Ir al estado de pago Successful</button>
      </Link>
    </div>
  );
}
