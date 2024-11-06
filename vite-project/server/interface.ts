
export type medicamentObj = {
    medicament: string;
    stock: number;
    priceSell: number;
    priceBuy: number;
    id: string;
    edit?: boolean,
}

export type changePasswordObj = {
    oldPassword: string,
    newPassword: string,
    isAdmin: boolean,
}

export type passwordChangeStatus = {
    status: number,
    message: string,
}

export type statistics = {
    date: string,
    soldQty: number,
    profits: number,
    sold: number,
    purchases: number,
    salesTotal: number,
    // details: {
    //     medicament: string,
    //     selled: number,
    //     id: string,
    // }[]
}

export default interface TableProps {

    medicament: {
        medicament: string;
        stock: number;
        // qty: number;
        priceSell: number;
        priceBuy: number;
        // date: string;
        id: string;
    }[],
    // setIsSelling: (arg: boolean) => void ,
    setSelledMed: ((arg: medicamentObj | null) => void) | null,
    readOnly: boolean,
    setIsBuying: ((arg: boolean) => void) | null  ,
  }

export interface SellModalProps {
    medicamentObj: medicamentObj,
    handleSell: (e: any) => void,
    setSelledMed: ((arg: medicamentObj | null) => void),
    isBuying: boolean,
    handleBuy: (e: any) => void,
}