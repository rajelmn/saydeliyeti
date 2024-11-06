import Header from "./header";
import { MdAdd } from "react-icons/md";
import { AddNewPopUp } from "./AddNewPopup";
import Table from "./table";
import { SellModal } from "./modals";
import { useEffect, useState } from "react";


interface Item {
  medicament: string;
  stock: number;
  priceSell: number;
  priceBuy: number;
  id: string;
}

export default function App() {
  const [showNew, setShowNew] = useState<boolean>(false);
  const [selledMed, setSelledMed] = useState<Item | null>(null);
  const [isBuying, setIsBuying] = useState<boolean>(false);
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
      if (!selledMed) return alert("no medicamnet selected");
      setPharmacyItems((prev) =>
        prev.map((item) => {
          if (item.id === selledMed?.id) {
            return {
              ...item,
              // date: new Date().toDateString()
              stock: item.stock - +e.target.qty.value,
            };
          } else return item;
        })
      );

      const res = await fetch("/updateMed", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...selledMed,
          soldQty: +e.target.qty.value,
          stock: selledMed ? selledMed?.stock - +e.target.qty.value : 0,
        }),
      });
      setSelledMed(null);
      if (!res.ok) throw new Error();
    } catch (err) {
      console.log(err);
    }
  }

  async function handleBuy(e: any) {
    try {
      alert('buying')
      e.preventDefault();
      if (!selledMed) return alert("no medicamnet selected");

      setPharmacyItems((prev) =>
        prev.map((item) => {
          if (item.id === selledMed?.id) {
            return {
              ...item,
              // qty: +item.qty + +e.target.qty.value,
              stock: +item.stock + +e.target.qty.value,
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
          // qty: selledMed ? selledMed?.qty + +e.target.qty.value : 0,
          stock: selledMed ? selledMed?.stock + +e.target.qty.value: 0,
          buyQty: +e.target.qty.value
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
    try {
      const medicamentObj: Item = {
        medicament: e.target.medicament.value,
        stock: e.target.stock.value,
        priceSell: e.target.priceSell.value,
        priceBuy: e.target.priceBuy.value,
        id: crypto.randomUUID(),
      };
      const {stock , priceSell, priceBuy} = medicamentObj;
      if(+priceSell < +priceBuy) {
        return alert('the sell price shouldnt be less than the real price')
      }
      if(pharmacyItems.find(item => item.medicament === medicamentObj.medicament)) {
        return alert ('the medicament already exist, did you meant to insert another version ?')
      }
      if(+stock <= 0 || +priceSell <= 0 || +priceBuy <= 0) {
        return alert('input values shouldnt have any value less or equal to 0')
      }
      setPharmacyItems((prev) => [...prev, medicamentObj]);
      setShowNew((prev: boolean) => !prev);
      // const res = await 
      fetch("/storeMedicament", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicamentObj),
      });
      // const allMeds = await res.json();
      // console.log(allMeds);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function getAllMeds() {
      try {
        const res = await fetch("/getMedicament");
        const allMeds: Item[] = await res.json();
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
        setIsBuying={setIsBuying}
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
          handleBuy={handleBuy}
          isBuying = {isBuying}
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
  setIsBuying
}: {
  handleClick: () => void;
  pharmacyItems: Item[];
  setSelledMed: (arg: Item | null) => void;
  setIsBuying: (arg: boolean) => void
}) {
  // const [items, setItems] = useState([]);
  return (
    <div className="h-screen w-[calc(100vw-300px)] overflow-y-auto">
      <Header room="pharmacetique" />
      <main className="w-full h-[92vh]">
        <div className="content mt-9">
          <button
            className="flex bg-[#3ea43e] m-8 p-2 items-center font-bold mb-4 rounded-lg text-white"
            onClick={handleClick}
          >
            <span>Ajouter</span>
            <MdAdd className="text-white" />
          </button>

          <Table setIsBuying={setIsBuying} readOnly={false} setSelledMed={setSelledMed} medicament={pharmacyItems} />
        </div>
      </main>
    </div>
  );
}
