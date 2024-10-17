import Header from "./header";
import { MdAdd } from "react-icons/md";
import { AddNewPopUp } from "./AddNewPopup";
import { useState } from "react";

interface Item {
  medicament: string;
  stock: number;
  qty: number;
  priceSell: number;
  priceBuy: number;
  date: string;
  id: string;
}

export default function App() {
  const [showNew, setShowNew] = useState<boolean>(false);
  const [pharmacyItems, setPharmacyItems] = useState<Item[]>([]);
  function handleClick() {
    setShowNew((prev: boolean) => {
      return !prev;
    });
  }
  async function handleFormSubmit(e: any) {
    e.preventDefault();
    console.log(e.target);
    try {
      const medicamentObj: Item = {
        medicament: e.target.medicament.value,
        stock: e.target.stock.value,
        qty: e.target.qty.value,
        priceSell: e.target.priceSell.value,
        priceBuy: e.target.priceBuy.value,
        date: e.target.date.value,
        id: crypto.randomUUID(),
      };
      console.log(medicamentObj);
      setPharmacyItems((prev) => [...prev, medicamentObj]);
      setShowNew((prev: boolean) => !prev);
     
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Farmacy pharmacyItems={pharmacyItems} handleClick={handleClick} />
      {showNew && (
        <AddNewPopUp
          setShowNew={handleClick}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
}
export function Farmacy({
  handleClick,
  pharmacyItems,
}: {
  handleClick: () => void;
  pharmacyItems: Item[];
}) {
  // const [items, setItems] = useState([]);
  return (
    <div className="h-screen">
      <Header room="pharmacetique" />
      <main className="w-full h-[92vh]  p-14">
        <div className="content mt-9">
          <button
            className="flex p-2 items-center font-bold bg-[#0CA63A] rounded-lg text-white"
            onClick={handleClick}
          >
            <span>Add New</span>
            <MdAdd className="text-white" />
          </button>
          <div className=" row-container mt-3 grid w-full">
            <div className="row border border-solid border-black">
              medicaments
            </div>
            <div className="row border border-solid border-black">Stock</div>
            <div className="row border border-solid border-black">
              quantite vendue
            </div>
            <div className="row border border-solid border-black">
              prix d'achats
            </div>
            <div className="row border border-solid border-black">
              prix de vente
            </div>
            <div className="row border border-solid border-black">
              New Stock
            </div>
            <div className="row border border-solid border-black">caisse</div>
            {pharmacyItems.map((row: Item) => (
              <>
                {/* {console.log(row)} */}
                <div className="row border border-solid border-black">
                  {row.medicament}
                </div>
                <div className="row border border-solid border-black">
                  {row.stock}
                </div>
                <div className="row border border-solid border-black">
                  {row.qty}
                </div>
                <div className="row border border-solid border-black">
                  {row.priceBuy}
                </div>
                <div className="row border border-solid border-black">
                  {row.priceSell}
                </div>
                <div className="row border border-solid border-black">
                  {row.stock - row.qty}
                </div>
                <div className="row border border-solid border-black">
                  {row.qty * row.priceSell}
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

