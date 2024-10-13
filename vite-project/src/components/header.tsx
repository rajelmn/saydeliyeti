import { MdModeNight } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

export default function Header({ room }: { room: string }) {
  return (
    <header className="w-[calc(100vw-300px)] flex h-[8vh] justify-between items-center px-4">
      <p className="flex-grow-[6]">Farmacy | {room}</p>
      <div className="flex flex-grow-[1] px-2 items-center">
        <div className="border-solid mr-12 items-center flex border text-black outline-none focus:border-black border-black">
          <IoIosSearch />
          <input type="text" placeholder="search" className="pl-2 outline-none border-none" />
        </div>
        <MdModeNight className="text-2xl cursor-pointer" />
      </div>
    </header>
  );
}
