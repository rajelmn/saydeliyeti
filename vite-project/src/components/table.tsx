interface Table {
    medicament: {
        medicament: string;
        stock: number;
        qty: number;
        priceSell: number;
        priceBuy: number;
        date: string;
        id: string;
    }[]
  }
export default function Table({ medicament }: Table) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block outline-none pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4 pr-6">
              <div className="flex items-center">
                <p
                  id="checkbox-all-search"
                //   type="checkbox"
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                >ordre</p>
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 pl-[1.4rem]">
              Product name
            </th>
            <th scope="col" className="px-4 py-3">
              Stock
            </th>
            <th scope="col" className="px-4 py-3">
              Quantite
            </th>
            <th scope="col" className="px-4 py-3">
              Prix D'achats
            </th>
            <th scope="col" className="px-4 py-3">
              Prix de vente
            </th>
            <th scope="col" className="px-4 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
         {medicament.sort((a, b) => a.medicament.localeCompare(b.medicament)).map((item: any) => 
             <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
             <td className="w-4 p-4">
               <div className="flex items-center">
                 <p
                   id="checkbox-table-search-1"
                 //   type="checkbox"
                   className="w-4 h-4 text-[#000]/90 m-auto  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                 >{item.medicament.charAt(0)}</p>
                 {/* <label htmlFor="checkbox-table-search-1" className="sr-only">
                   checkbox
                 </label> */}
               </div>
             </td>
             <th
               scope="row"
               className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
             >
               {item.medicament}
             </th>
             <td className="px-6 py-4">{item.stock}</td>
             <td className="px-6 py-4">{item.qty}</td>
             <td className="px-6 py-4">{item.priceSell}</td>
             <td className="px-6 py-4">{item.priceBuy}</td>
             <td className="px-6 py-4">
               <p
                 className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
               >
                 SELL
               </p>
             </td>
           </tr>
         )}
        </tbody>
      </table>
    </div>
  );
}
