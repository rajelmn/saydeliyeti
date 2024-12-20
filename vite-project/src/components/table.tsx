import { useEffect, useState } from "react";
import { FaPlus as Plus } from "react-icons/fa";
import { MdModeEditOutline as Edit } from "react-icons/md";
import TableProps, { medicamentObj } from "../../server/interface.ts";
import { FaMinus as Minus } from "react-icons/fa6";

export default function Table({
  medicament,
  readOnly,
  setSelledMed,
  setIsBuying,
}: TableProps) {
  // console.log(medicament, 'god damn')
  const [tableItems, setTableItems] = useState<TableProps["medicament"]>([]);
  // const [dropDownValue, setDropDownValue] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  function handleEdit(med: medicamentObj) {
    try {
      setTableItems((prev) =>
        prev.map((item: medicamentObj) => {
          if (item?.id === med?.id) {
            return { ...item, edit: true };
          }
          return { ...item, edit: false };
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  function handleMedChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ): void {
    const { name } = e.target;
    setTableItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: e.target.value };
        } else return item;
      })
    );
  }

  async function handleSubmitEdit(id: string) {
    try {
      const [editedItem] = tableItems.filter((item) => item.id === id);
      if (+editedItem.priceSell < +editedItem.priceBuy) {
        return alert(
          "le prix vendu de l'objet ne peut être inférieur au prix d'achat"
        );
      }
      setTableItems((prev) =>
        prev.map((item) => {
          return { ...item, edit: false };
        })
      );

      const res = await fetch("/editMed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      });
      if (!res.ok) {
        throw new Error("oops");
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDropDownChange(e: React.ChangeEvent<HTMLSelectElement>) {
    try {
      if (!search && e.target.value) {
        const res = await fetch(`/letterSearch/${e.target.value}`);
        if (res.ok) {
          const ordredItems = await res.json();
          console.log(ordredItems)
          return setTableItems(ordredItems);
        }
      }
      else {
        setTableItems(medicament)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setTableItems(medicament);
  }, [medicament]);

  useEffect(() => {
    async function handleSearch(): Promise<void> {
      try {
        if (!search.length) {
          return setTableItems(medicament);
        }
        const res = await fetch(`/api/search/${search}`);
        const searchedItems = await res.json();
        setTableItems(searchedItems);
      } catch (err) {
        console.log(err);
      }
    }
    handleSearch();
  }, [search]);
  return (
    <div className=" overflow-x-auto p-8 shadow-md sm:rounded-lg">
      <div className="pb-4 bg-white dark:bg-gray-900">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative flex mt-1">
            {!readOnly && (

              <>
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            onChange={(e) => {
              setIsSearching(true);
              setSearch(e.target.value);
            }}
            className="block outline-none pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
          </>
            )}
            {!readOnly && (

          <div className="ml-32">
            <label htmlFor="filter"> ordre</label>
            <select
              name="filter"
              // value={dropDownValue}
              onChange={handleDropDownChange}
              defaultValue="all letters"
              className="text-black ml-1 border border-solid border-black"
              id="filter"
            >
              <option value=""></option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
              <option value="e">e</option>
              <option value="f">f</option>
              <option value="g">g</option>
              <option value="h">h</option>
              <option value="i">i</option>
              <option value="j">j</option>
              <option value="k">k</option>
              <option value="l">l</option>
              <option value="m">m</option>
              <option value="n">n</option>
              <option value="o">o</option>
              <option value="p">p</option>
              <option value="q">q</option>
              <option value="r">r</option>
              <option value="s">s</option>
              <option value="t">t</option>
              <option value="u">u</option>
              <option value="v">v</option>
              <option value="w">w</option>
              <option value="x">x</option>
              <option value="y">y</option>
              <option value="z">z</option>
            </select>
          </div>
            )}
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
                >
                  ordre
                </p>
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 pl-[1.4rem]">
              Nom du medicament
            </th>
            <th scope="col" className="px-4 py-3">
              Stock
            </th>
            {/* <th scope="col" className="px-4 py-3">
              Quantite Vendue
            </th> */}
            <th scope="col" className="px-4 py-3">
              Prix D'achats
            </th>
            <th scope="col" className="px-4 py-3">
              Prix de vente
            </th>
            {/* <th scope="col" className="px-4 py-3">
              Nouveau Stock
            </th> */}
            {/* <th scope="col" className="px-4 py-3">
              Caise
            </th> */}
            <th scope="col" className="pl-4 py-3">
              Action
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableItems.length === 0 && isSearching && (
            <td className="text-2xl text-red-400">Not Found</td>
          )}
          {tableItems
            .sort((a, b) => a.medicament.localeCompare(b.medicament))
            .map((item: medicamentObj) => (
              <>
                {
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <p
                          id="checkbox-table-search-1"
                          //   type="checkbox"
                          className="w-4 h-4 text-[#000]/90 m-auto  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        >
                          {item.medicament.charAt(0)}
                        </p>
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
                    {/* <td className="px-6 py-4">{item.qty}</td> */}
                    <td className="px-6 py-4">
                      {item.edit ? (
                        <input
                          type="number"
                          onChange={(e) => handleMedChange(e, item.id)}
                          name="priceBuy"
                          className="w-14 rounded-sm outline-none border-solid border border-black"
                        />
                      ) : (
                        item.priceBuy
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.edit === true ? (
                        <input
                          type="number"
                          onChange={(e) => handleMedChange(e, item.id)}
                          name="priceSell"
                          className="w-14 rounded-sm outline-none border-solid border border-black"
                        />
                      ) : (
                        item.priceSell
                      )}
                    </td>
                    {/* <td className="px-6 py-4">{item.stock - item.qty}</td> */}
                    {/* <td className="px-6 py-4">{item.qty * item.priceSell}</td> */}
                    <td className="px-6 py-4">
                      {!readOnly && (
                        <div className="flex items-center w-16 justify-between">
                          <Minus
                            onClick={() => {
                              if (setSelledMed !== null) {
                                if (setIsBuying) {
                                  setIsBuying(false);
                                }
                                setSelledMed(item);
                              }
                            }}
                            className="font-medium cursor-pointer text-[red] hover:underline"
                          />
                          
                          <Plus
                            onClick={() => {
                              if (setSelledMed !== null) {
                                if (setIsBuying) {
                                  setIsBuying(true);
                                }
                                setSelledMed(item);
                              }
                            }}
                            className="font-bold cursor-pointer text-[green] dark:text-blue-500 hover:underline"
                          />
                        </div>
                      )}
                    </td>
                    <td>
                      {!readOnly && (
                        item.edit ? (
                          <button
                          onClick={() => handleSubmitEdit(item.id)}
                          className="border border-solid border-black px-2 py-1 text-black font-semibold rounded-lg"
                        >
                          save
                        </button>
                        ): (
                          <Edit
                          onClick={() => handleEdit(item)}
                          className="font-bold text-lg cursor-pointer"
                        />
                        )
                      )}
                      {/* {item.edit ? (
                        
                        <Edit
                          onClick={() => handleEdit(item)}
                          className="font-bold text-lg cursor-pointer"
                        />
                      )} */}
                    </td>
                  </tr>
                }
              </>
            ))}
        </tbody>
      </table>
    </div>
  );
}
