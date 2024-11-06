import { IoMdClose as Close } from "react-icons/io";

export function AddNewPopUp({
  handleFormSubmit,
  setShowNew,
}: {
  handleFormSubmit: (e: any) => void;
  setShowNew: () => void;
}) {
  return (
    <div className="w-screen h-screen absolute flex justify-center z-10 items-center bg-[#f5f5f574]">
      <div className="popup-container box z-20 absolute rounded-xl p-6 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Ajouter une nouveau Medicament</h1>
          <Close className="text-2xl cursor-pointer" onClick={setShowNew} />
        </div>
        <p className="opacity-65">Ajouter une nouvelle medicament to your list</p>
        <form className="" onSubmit={handleFormSubmit}>
          <div className="mt-6 form-grid">
            <div>
              <label htmlFor="">Medicament</label>
              <input
                type="text"
                required
                name="medicament"
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
                defaultValue="medicament"
              />
            </div>
            <div>
              <label htmlFor="">Stock</label>
              <input
                type="number"
                name="stock"
                min={0}
                required
                defaultValue="0"
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
              />
            </div>
            {/* <div>
              <label htmlFor="">quantite vendue</label>
              <input
                type="number"
                name="qty"
                min={0}
                required
                defaultValue="0"
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
              />
            </div> */}
            <div>
              <label htmlFor="">prix d'achats</label>
              <input
                type="number"
                defaultValue="0"
                name="priceBuy"
                min={0}
                required
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
              />
            </div>
            <div>
              <label htmlFor="">prix de vente</label>
              <input
                type="number"
                name="priceSell"
                defaultValue="0.0"
                min={0}
                required
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
              />
            </div>
            {/* <div>
              <label htmlFor="">date:</label>
              <input
                type="date"
                name="date"
                className="block mt-1 border rounded-md p-2 border-[#00000061] border-solid outline-none"
              />
            </div> */}
          </div>
          <div className="button mt-10">
            <button
              className="bg-blue-600 px-3 text-white rounded-md"
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
