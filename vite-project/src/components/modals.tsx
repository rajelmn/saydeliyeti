import { IoMdClose as Close } from "react-icons/io";
import { SellModalProps } from "../../server/interface.ts";
// interface TablePropsWithId extends TableProps {
//     id: string,
//     setMedicament: (arg: TableProps) => void
// }
// inside a component (not the main component) would you submit the form inside that component
// or you would pass the function as prop and then add that prop from the main component

export function SellModal({
  medicamentObj,
  isBuying,
  handleBuy,
  handleSell,
  setSelledMed,
}: SellModalProps) {
  return (
    <div className="w-full h-screen absolute flex justify-center z-10 items-center bg-[#f5f5f574]">
      <div className="popup-container box z-20 absolute  rounded-xl p-6 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-base font-bold">
            {isBuying ? "command" : "vending"} {medicamentObj.medicament}
          </h1>
          <Close
            className="text-xl cursor-pointer"
            onClick={() => setSelledMed(null)}
          />
        </div>
        <form className="" onSubmit={isBuying ? handleBuy : handleSell}>
          <div className="mt-6 ">
            <div className="flex flex-col h-full justify-between">
              <label htmlFor="">Quantite</label>
              <input
                type="number"
                name="qty"
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
                defaultValue={1}
              />
            </div>
            <button
              className="bg-blue-600 mt-6 px-4 text-white rounded-md"
              type="submit"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
