// import { useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
import src from "./logo.png";
import { useEffect } from "react";
export default function SideBar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function validateUser() {
      const res = await fetch('/api/validateUser').then(res => res.json());
      setIsAdmin(res.isAdmin);
      console.log(res)
    }
    validateUser();
  })
  return (
    <div className=" h-screen w-[300px] bg-[#F5F7F9]">
      <div className="logo flex items-center px-2">
        <img src={src} className="w-[120px]" alt="" />
        <p className="font-bold">Farmacy</p>
      </div>
      <div className="general">
        <div className="flex justify-between items-center px-7">
          <p className="opacity-70">General</p>
          <IoEllipsisVerticalSharp />
        </div>
        {isAdmin &&  (

        <Link to={"/home"}>
          <div className="items pl-[22px] cursor-pointer hover:bg-[#EFF1F3] w-[90%] mr-6 rounded-xl flex items-center mt-3">
            <BiHomeAlt2 className="text-2xl opacity-65" />
            <p className="pl-2">Caisse</p>
          </div>
        </Link>
        )}
        <Link to="/">
          <div className="items pl-[22px] cursor-pointer hover:bg-[#EFF1F3] w-[90%] mr-6 rounded-xl flex items-center mt-3">
            <TbReportMedical className="text-2xl opacity-65" />
            <p className="pl-2">Pharmaceutique</p>
          </div>
        </Link>
        <Link to="/limited">
          <div className="items pl-[22px] cursor-pointer hover:bg-[#EFF1F3] w-[90%] mr-6 rounded-xl flex items-center mt-3">
            <MdOutlineHourglassEmpty className="text-2xl opacity-65" />
            <p className="pl-2">Limited Medicaments</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
