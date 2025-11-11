"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type LoginForm = {
    email: string;
    name: string;
    password: string;
};

const url = process.env.NEXT_PUBLIC_API_URL

export default function SignUp() {
    const router = useRouter();

    const [ user, setUser ] = useState<LoginForm>({
        email: "",
        name: "",
        password: "",
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${url}/user`, user)
            if(response){
                alert(response.data.message);
                router.push('/login');
            }
        }catch(err){
            console.log(err)
        }
        
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prev) => ({...prev, [name] : value}));
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <form onSubmit={submit}>

                <div className="flex flex-col h-[320px] w-[300px] justify-center bg-gray-700 rounded-4xl space-y-3 items-center">

                    <input className=" h-[40px] p-[10px] rounded-3xl bg-gray-500"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    type="email"
                        placeholder="Email" />

                    <input className=" h-[40px] p-[10px] rounded-3xl bg-gray-500"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                        placeholder="username" />

                    <input className=" h-[40px] p-[10px] rounded-3xl bg-gray-500"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    type="password"
                        placeholder="password" />

                    <button className=" border-1 h-[40px] w-[150px] rounded-4xl hover:bg-gray-400">Sign up</button>

                    <div className="">
                        Already have an account? <Link href={'/login'} className="text-blue-400 underline">Login</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}