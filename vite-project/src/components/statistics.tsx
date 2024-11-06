import { format } from "date-fns";
import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillAlt } from "react-icons/fa";
import { statistics } from "../../server/interface.ts";
import Header from "./header.tsx";
export default function Statistics() {
  const [details, setDetails] = useState<statistics>();
  const navigate = useNavigate();
  const dateValue: string = format(new Date(), "yyyy-MM-dd");
  console.log(dateValue)
  async function handleDateChange(e: React.FormEvent<HTMLFormElement>) {
    try {
      const date = e.currentTarget.date.value;
      console.log(date === dateValue);
      const res = await fetch("/statistics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });
      const statistics = await res.json();
      setDetails(statistics);
      console.log(statistics);
    } catch (err) {
      setDetails(undefined);
      console.log(err);
    }
  }

  useEffect(() => {
    async function getStatistics() {
      try {
        const res = await fetch("/statistics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: dateValue }),
        }).then(res => res.json());
        setDetails(res);
      } catch(err) {
        console.log(err)
      }
    }

    async function AuthenticateUser() {
      try {
        const authres = await fetch('/validateUser').then(res => res.json());
        if(!authres.isAdmin) {
          navigate('/');
        }
        // alert(authres.ok)
      } catch(err) {
        console.log(err)
      }
    }
    AuthenticateUser()
    getStatistics();
  }, [])

  return (
    <div className="w-[calc(100vw-300px)] bg-[white]/20">
      <Header room="home" />
      <div className="statistics p-3 box bg-white m-3 rounded-md px-2 flex justify-between">
        <div className="flex-grow-[3]">
          <h2 className="font-bold">Statistics</h2>
          <p className="text-[black]/40">
          Voir le détail des ventes en pharmacie
          </p>
        </div>
        <form onChange={handleDateChange} className="flex-grow">
          {/* <label htmlFor="date">date</label> */}
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={dateValue}
            className="border border-solid border-black"
          />
        </form>
      </div>
      <main className=" grid grid-cols-3 p-20 w-full justify-between">
        <div className="card-shadow m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">Benefits</p>
            {/* <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button> */}
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p> {details?.profits || 0} </p>
            <FaMoneyBillAlt className="text-2xl block ml-3" />
          </div>
        </div>
        <div className="card-shadow rounded-lg m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">Quantie vendue</p>
            {/* <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button> */}
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p>{details?.sold || 0}</p>
          </div>
        </div>
        <div className="card-shadow m-3 py-4 px-2 ">
          <div className="flex px-1 items-center justify-between">
            <p className="flex-grow-[3]">Caise</p>
            {/* <button className=" button-shadow py-2 text-xs font-bold rounded-lg flex-grow">
              See Detail
            </button> */}
          </div>

          <div className="font-bold flex items-center mt-2 text-3xl">
            <p>{details?.salesTotal || 0}</p>
            <FaMoneyBillAlt className="text-2xl block ml-3" />
          </div>
        </div>
      </main>
    </div>
  );
}
