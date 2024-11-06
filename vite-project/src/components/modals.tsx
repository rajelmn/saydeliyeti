import { IoMdClose as Close } from "react-icons/io";
import { SellModalProps } from "../../server/interface.ts";
import { useState } from "react";
import { passwordChangeStatus } from "../../server/interface.ts";
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

export function ChangePassword({
  setShowModal,
}: {
  setShowModal: (arg: boolean) => void;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [passwordChangeStatus, setPasswordChangeStatus] =
    useState<passwordChangeStatus | null>(null);

  async function handleSubmitPasswordChange(
    e: React.FormEvent<HTMLFormElement>
  ) {
    try {
      e.preventDefault();
      console.log(
        e.currentTarget.oldPassword.value,
        e.currentTarget.newPassword.value
      );
      const res = await fetch("/changePassword", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isAdmin,
          oldPassword: e.currentTarget.oldPassword.value,
          newPassword: e.currentTarget.newPassword.value,
        }),
      });
      const resMessage = await res.json();
      console.log(resMessage);
      setPasswordChangeStatus(resMessage);

      // setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="w-full h-screen absolute flex justify-center z-10 items-center bg-[#f5f5f574]">
      <form
        onSubmit={handleSubmitPasswordChange}
        className="popup-container w-[40vw] flex flex-col box z-20 absolute p-6  rounded-xl bg-white"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div
              onClick={() => setIsAdmin(false)}
              className={`border border-solid cursor-pointer ${
                !isAdmin ? "bg-blue-400 text-white border-none" : ""
              } border-black rounded-lg p-1`}
            >
              worker
            </div>
            <div
              onClick={() => setIsAdmin(true)}
              className={`border border-solid cursor-pointer ${
                isAdmin ? "bg-blue-400 text-white border-none" : ""
              } border-black rounded-lg ml-2 p-1`}
            >
              admin
            </div>
          </div>
          <Close
            className="text-xl cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </div>
        <div>
          <div>
            <label htmlFor="oldAdminPassword">
              current {isAdmin ? "admin" : "worker"} password:
            </label>
            <input
              type="password"
              name="oldPassword"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none "
            />
          </div>
          <div>
            <label htmlFor="oldAdminPassword">
              Nouveau {isAdmin ? "admin" : "worker"} password:
            </label>
            <input
              type="password"
              name="newPassword"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none "
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p
            className={`mt-5 ${
              passwordChangeStatus?.status === 200
                ? "text-[green]"
                : "text-[red]"
            }`}
          >
            {passwordChangeStatus?.message}
          </p>
          <button
            type="submit"
            className="bg-[#000000df] p-3 rounded-md text-white mt-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
