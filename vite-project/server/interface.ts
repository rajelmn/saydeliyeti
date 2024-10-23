
export type medicamentObj = {
    medicament: string;
    stock: number;
    qty: number;
    priceSell: number;
    priceBuy: number;
    date: string;
    id: string;
}

export default interface TableProps {

    medicament: {
        medicament: string;
        stock: number;
        qty: number;
        priceSell: number;
        priceBuy: number;
        date: string;
        id: string;
    }[],
    // setIsSelling: (arg: boolean) => void ,
    setSelledMed: ((arg: medicamentObj | null) => void) | null,
    readOnly: boolean,
  }

export interface SellModalProps {
    medicamentObj: medicamentObj,
    handleSell: (e: any) => void,
    setSelledMed: ((arg: medicamentObj | null) => void)
}