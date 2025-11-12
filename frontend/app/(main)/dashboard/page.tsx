"use client";

import { useContext } from "react";

export default function Page() {

    const localData = JSON.parse(localStorage.getItem('user') || "{}");


    const handleChange = ()=>{

    }

    return (
        <>
            <div className="flex items-center justify-center">
                {localData.subdomain != null ? (
                    <>
                        <div>Choose subdomain</div>
                        <input className=" h-[40px] p-[10px] rounded-3xl bg-gray-500"
                            name="subdomain"
                            // value={subdomain}
                            onChange={handleChange}
                            placeholder="subdomain" />
                    </>
                ) : (
                    <>{localData.subdomain}</>
                )}
            </div>
        </>
    )
}