"use client";
import { useEffect, useState } from "react";

export default function Home() {
    const [url, setUrl] = useState('');
    useEffect(()=>{
      setUrl(window.location.href);
    })
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {url}
    </div>
  );
}