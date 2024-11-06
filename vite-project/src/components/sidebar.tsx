// import { useState } from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoLogOutOutline as Logout} from "react-icons/io5";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import { TbReportMedical } from "react-icons/tb";
import src from "../assets/logo-day.png";
import { useEffect } from "react";
export default function SideBar() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate()
  async function handleLogout() {
    try {
      const res = await fetch('/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if(res.ok) {
        console.log('destroyed');
        navigate('/login')
      }
    } catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function validateUser() {
      const res = await fetch('/validateUser').then(res => res.json());
      setIsAdmin(res.isAdmin);
      console.log(res)
    }
    validateUser();
  })
  return (
    <div className="flex flex-col justify-between h-screen w-[300px] bg-[#F5F7F9]">
      <div className="general">
      <div className="logo  px-3">
        <img src={src} className="w-[220px]" alt="" />
        {/* <p className="font-bold">Farmacy</p> */}
      </div>
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
            <p className="pl-2">Pharmacy</p>
          </div>
        </Link>
        <Link to="/limited">
          <div className="items pl-[22px] cursor-pointer hover:bg-[#EFF1F3] w-[90%] mr-6 rounded-xl flex items-center mt-3">
            <MdOutlineHourglassEmpty className="text-2xl opacity-65" />
            <p className="pl-2">Medicaments en rupture</p>
          </div>
        </Link>
      </div>
      <div onClick={handleLogout} className="mb-6 flex items-center m-5 pl-1 cursor-pointer rounded-lg">
      <Logout className="text-xl hover:text-[red]" />
      <p>logout</p>
      </div>
    </div>
  );
}
