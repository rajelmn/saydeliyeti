// import { MdModeNight } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

export default function Header({ room }: { room: string }) {
  return (
    <header className="w-full h-[8vh] flex justify-between items-center px-4">
      <p className="flex-grow-[4]">Farmacy | {room}</p>
      <div className="flex flex-grow-[1] px-2 items-center">
        <div className="border-solid hidden mr-12 items-center border text-black outline-none focus:border-black border-black">
          <IoIosSearch />
          <input type="text" placeholder="search" className="pl-2 outline-none border-none" />
        </div>
        {/* <MdModeNight className="text-2xl cursor-pointer" /> */}
      </div>
    </header>
  );
}
