import Header from "./header";
import { MdAdd } from "react-icons/md";
import { AddNewPopUp } from "./AddNewPopup";
import Table from "./table";
import { SellModal } from "./modals";
import { useEffect, useState } from "react";

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
  const [selledMed, setSelledMed] = useState<Item | null>(null);
  const [pharmacyItems, setPharmacyItems] = useState<Item[]>([]);
  function handleClick() {
    setShowNew((prev: boolean) => {
      return !prev;
    });
  }

  async function handleSell(e: any) {
    try {
      alert('wasup')
      e.preventDefault();
      console.log(selledMed)
      if (!selledMed) return alert("no medicamnet selected");

      if (+selledMed.qty < e.target?.qty) {
        return alert("you are selling more than you chave");
      }
      setPharmacyItems((prev) =>
        prev.map((item) => {
          console.log(typeof item.qty, 'typeof')
          if (item.id === selledMed?.id) {
            return {
              ...item,
              qty: +item.qty + +e.target.qty.value,
              date: new Date().toDateString()
              // stock: item.stock - +e.target.qty.value,
            };
          } else return item;
        })
      );

      setSelledMed(null);
      const res = await fetch("/updateMed", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...selledMed,
          qty: selledMed ? selledMed?.qty + +e.target.qty.value : 0,
          soldQty: +e.target.qty.value
          // stock: selledMed ? selledMed?.stock - +e.target.qty.value : 0,
        }),
      });
      if (!res.ok) throw new Error();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFormSubmit(e: any) {
    e.preventDefault();
    console.log(e.target);
    try {
      const date = new Date();
      const medicamentObj: Item = {
        medicament: e.target.medicament.value,
        stock: e.target.stock.value,
        qty: e.target.qty.value,
        priceSell: e.target.priceSell.value,
        priceBuy: e.target.priceBuy.value,
        date: e.target.date.value || date.toTimeString(),
        id: crypto.randomUUID(),
      };
      const {stock , qty, priceSell, priceBuy} = medicamentObj;
      if(+stock < +qty) {
        return alert('the stock cant be less than the selled qty')
      }
      if(+priceSell < +priceBuy) {
        return alert('the sell price shouldnt be less than the real price')
      }
      if(pharmacyItems.find(item => item.medicament === medicamentObj.medicament)) {
        return alert ('the medicament already exist, did you meant to insert another version ?')
      }
      if(+stock <= 0 || +qty <= 0 || +priceSell <= 0 || +priceBuy <= 0) {
        return alert('input values shouldnt have any value less or equal to 0')
      }
      setPharmacyItems((prev) => [...prev, medicamentObj]);
      setShowNew((prev: boolean) => !prev);
      const res = await fetch("/storeMedicament", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicamentObj),
      });
      // const allMeds = await res.json();
      // console.log(allMeds);
      console.log(res.ok);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    console.log("fires");
    async function getAllMeds() {
      try {
        const res = await fetch("/getMedicament");
        const allMeds: Item[] = await res.json();
        console.log(res.ok);
        console.log(allMeds, "all the fucking meds");
        setPharmacyItems(allMeds);
      } catch (err) {
        console.log(err);
      }
    }
    getAllMeds();
  }, []);
  return (
    <>
      <Farmacy
        setSelledMed={setSelledMed}
        pharmacyItems={pharmacyItems}
        handleClick={handleClick}
      />
      {showNew && (
        <AddNewPopUp
          setShowNew={handleClick}
          handleFormSubmit={handleFormSubmit}
        />
      )}
      {selledMed && (
        <SellModal
          handleSell={handleSell}
          setSelledMed={setSelledMed}
          medicamentObj={selledMed}
        />
      )}
    </>
  );
}
export function Farmacy({
  handleClick,
  pharmacyItems,
  setSelledMed,
}: {
  handleClick: () => void;
  pharmacyItems: Item[];
  setSelledMed: (arg: Item | null) => void;
}) {
  // const [items, setItems] = useState([]);
  return (
    <div className="h-screen w-[calc(100vw-300px)] overflow-y-auto">
      <Header room="pharmacetique" />
      <main className="w-full h-[92vh]  p-14">
        <div className="content mt-9">
          <button
            className="flex p-2 items-center font-bold bg-blue-600 mb-4 rounded-lg text-white"
            onClick={handleClick}
          >
            <span>Add New</span>
            <MdAdd className="text-white" />
          </button>

          <Table readOnly={false} setSelledMed={setSelledMed} medicament={pharmacyItems} />
        </div>
      </main>
    </div>
  );
}
