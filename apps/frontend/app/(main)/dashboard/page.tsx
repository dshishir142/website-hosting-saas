"use client";

import { useUser } from "@/app/userContext";
import axios from "axios";
import { useState } from "react";
import type { User } from "@/app/userContext";

const url = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {

    const { user, hydrated, setUser } = useUser();
    const [domainName, setDomainName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {

        if (domainName == "") {
            setError("Sub Domain name cannot be empty");
            return;
        } else {
            setError(null);
        }

        try {
            const response = await axios.post(`${url}/user/subdomain`, { domainName, user });
            if (response.data.status == "error") {
                setError(response.data.message);
            }
            const updatedUser: User = {...user, subdomain : domainName}
            setUser(updatedUser);
        } catch (err: any) {
            setError(err.message);
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDomainName(e.target.value);
    }

    if(!hydrated){
        return (
            <>Loading data...</>
        )
    }

    return (
        <>
            <div className="flex items-center justify-center">
                {user ? (
                    <div className="space-y-2">
                        {user.subdomain == null ? (
                            <>
                                <div>Choose subdomain Name</div>
                                <input
                                    className="h-[40px] p-[10px] rounded-3xl bg-gray-500"
                                    name="subdomain"
                                    onChange={handleChange}
                                    placeholder="subdomain name only..."
                                />

                                <div className="text-red-500">{error}</div>

                                <button
                                    onClick={handleSubmit}
                                    className="border-1 h-[40px] w-[150px] rounded-4xl hover:bg-gray-400"
                                >
                                    Submit
                                </button>
                            </>
                        ) : (
                            <div>Your subdomain: {user.subdomain}</div>
                        )}
                    </div>
                ) : (
                    <div>No user</div>
                )
                }



            </div>
        </>
    )
}