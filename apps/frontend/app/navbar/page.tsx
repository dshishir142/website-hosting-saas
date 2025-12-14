"use client";
import Link from "next/link";
import { logout } from "../(auth)/localStorageUtils";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function NavBar(){
    const router = useRouter()

    const handleLogout = async () =>{
        const logoutUser = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {}, {withCredentials: true});
        
        if(logoutUser.data.status == 'success'){
            logout();
            router.push('/login');
        }

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