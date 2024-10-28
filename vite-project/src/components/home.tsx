// import { useState } from "react"
import { useEffect, useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { statistics } from "../../server/interface.ts";
import Header from "./header.tsx";
export default function Home() {
    const [details, setDetails] = useState<statistics[]>([]);

    async function handleDateChange() {

    }

    useEffect(() => {
        async function getStatistics() {
            try {
                const res = await fetch('/api/statistics');
                if(res.ok) {
                    const data = await res.json();
                    setDetails(data);
                }
            } catch(err) {
                console.log(err);
            }
        }
    }, [])
  return (
    <div className="w-[calc(100vw-300px)] bg-[white]/20">
      <Header room="home" />
      <div className="statistics p-3 box bg-white m-3 rounded-md px-2 flex justify-between">
        <div className="flex-grow-[3]">
          <h2 className="font-bold">Statistics</h2>
          <p className="text-[black]/40">
            View the details about the pharamacy sales
          </p>
        </div>
        <form onChange={handleDateChange} className="flex-grow">
            {/* <label htmlFor="date">date</label> */}
            <input id="date" name="date" type="date" className="border border-solid border-black"/>
        </form>
      </div>
      <main className=" grid grid-cols-4 p-20 w-full justify-between">
        <div className="card-shadow m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">profits</p>
            <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button>
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p>3000</p>
            <FaMoneyBillAlt className="text-2xl block ml-3" />
          </div>
        </div>
        <div className="card-shadow rounded-lg m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">Boughts</p>
            <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button>
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p>14</p>
          </div>
        </div>
        <div className="card-shadow rounded-lg m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">Sails</p>
            <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button>
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p>114</p>
          </div>
        </div>
        <div className="card-shadow m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">how much we selled</p>
            <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button>
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p>9000</p>
            <FaMoneyBillAlt className="text-2xl block ml-3" />
          </div>
        </div>
      </main>
    </div>
  );
}
