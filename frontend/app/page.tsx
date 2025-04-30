"use client"
import { useEffect, useState } from "react";

export default function Home() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8080/campaigns')
      const resData = await response.json()
      console.log(resData)
    }

    try {
      fetchData()

    } catch (err) {
      console.log(err)
    }

  }, [])

  return (
    <div>
      Project Started
    </div>
  );
}
