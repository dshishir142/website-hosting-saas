"use client";
import axios from "axios";
import { useEffect, useState } from "react";


const url = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

  const [error, setError] = useState("");

  useEffect(() => {
    const getWebsiteData = async () => {
      try {
        const userData = await axios.get(`${url}/user`);
        console.log(userData);
      } catch (err) {
        setError(`There is an error ${error}`);
      }
    }

    getWebsiteData();
  })
  return (
    <>
      Hello</>
  );
}
