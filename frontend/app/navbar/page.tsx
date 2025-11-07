import Link from "next/link";

export default function NavBar(){
    return (
        <div className="bg-blue-600">
            <div className="flex justify-between">
                <div>
                    <Link href={'/dashboard'} className="bg-gray-500 p-2">Home</Link>
                </div>
                

                <div>
                    <Link href={'/login'} className="bg-gray-500 p-2">Logout</Link>
                </div>
            </div>
        </div>
    )
}