"use client";
import Link from "next/link";
import { logout } from "../(auth)/localStorageUtils";
import { useRouter } from "next/navigation";

export default function NavBar(){
    const router = useRouter()

    const handleLogout = () =>{
        logout();
        router.push('/login');
    }

    return (
        <div className="bg-blue-600">
            <div className="flex justify-between">
                <div>
                    <Link href={'/dashboard'} className="bg-gray-500 p-2">Home</Link>
                </div>
                

                <div>
                    <Link href={'/login'} className="bg-gray-500 p-2" onClick={handleLogout}>Logout</Link>
                </div>
            </div>
        </div>
    )
}