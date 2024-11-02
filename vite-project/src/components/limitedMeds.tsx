import { useEffect, useState } from "react";
import Header from "./header";
import Table from "./table";

export default function LimitedMeds() {
    const [meds, setMeds] = useState([]);
    useEffect(() => {
        async function getLimitedMeds() {
            try {
                const res = await fetch('/api/limitedMeds');
                const limitedMeds = await res.json();
                console.log(limitedMeds)
                setMeds(limitedMeds);
                if(!res.ok) {
                    throw new Error('couldnt fetch from db');
                }
            } catch(err) {
                console.log(err)
            }
        }
        getLimitedMeds();
    }, [])
    return(
        <div>
        <Header room="limited" />
        <div className="m-12">
            <Table setIsBuying={null} setSelledMed={null} readOnly={true} medicament={meds}/>
        </div>
        </div>
    )
}