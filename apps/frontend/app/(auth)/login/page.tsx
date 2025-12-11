"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { storeAuthData } from '../localStorageUtils';
import { useUser } from "@/app/userContext";

type LoginForm = {
    email: string;
    password: string;
};

const url = process.env.NEXT_PUBLIC_API_URL

export default function Login() {

    const router = useRouter();
    const {setUser} = useUser();

    const [ loginUser, setloginUser ] = useState<LoginForm>({
        email: "",
        password: "",
    })

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${url}/user/login`, loginUser);
            if(response.data.status == "success"){
                
            const user = response.data.user;
            const token = response.data.token;
                storeAuthData(token, user);
                setUser({...user, token});
            }else{
                console.log(response.data.message);
            }
            router.push('/dashboard');
        }catch(error){
            console.log(error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setloginUser((prev) => ({...prev, [name] : value}));
    }

    return (
        <div className="flex h-screen w-screen items-center justify-center">
            <form onSubmit={submit}>

                <div className="flex flex-col h-[300px] w-[300px] justify-center bg-gray-700 rounded-4xl space-y-3 items-center">

                    <input className=" h-[40px] p-[10px] rounded-3xl bg-gray-500"
                    name="email"
                    value={loginUser.email}
                    onChange={handleChange}
                    type="email"
                        placeholder="username" />

                    <input className=" h-[40px] p-[10px] rounded-3xl bg-gray-500"
                    name="password"
                    value={loginUser.password}
                    onChange={handleChange}
                    type="password"
                        placeholder="password" />

                    <button className=" border-1 h-[40px] w-[150px] rounded-4xl hover:bg-gray-400">Login</button>

                    <div className="">
                        Not registered? <Link href={'/signup'} className="text-blue-400 underline">Sign Up</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}