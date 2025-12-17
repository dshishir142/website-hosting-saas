"use client";
import { useUser } from "@/app/userContext";
import axios from "axios";
import { useEffect, useState } from "react";

type TenantData = {
    id: String
    userId: String
    name: String
    description: String
    logourl: String
    contactemail: String
    contactnumber: String
}

export default function Page() {

    const { user, hydrated, setUser } = useUser();

    const [tenantData, setTenantData] = useState<TenantData>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!hydrated || !user?.subdomain) return
        console.log('here');
        const fetchTenant = async () => {
            try {
                const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tenant/${user.subdomain}`);
                if (data.data.status == 'error') {
                    setError(data.data.message);
                }
                console.log(data.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occured');
            }
        }

        fetchTenant();

    }, [hydrated, user?.subdomain]);

    if (user?.subdomain == '' || user?.subdomain == null) {
        return (
            <>The user doesnt have subdomain please go back to home and create one</>
        )
    }


    return (
        <>
            <>Hello world</>
            {error && <p>{error}</p>}
        </>
    )
}