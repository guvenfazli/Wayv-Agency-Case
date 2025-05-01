"use client"

import { BaseSyntheticEvent, useState } from "react"

interface UserValue {
  email: string;
  password: string;
}

export default function Login() {

  const [userValue, setUserValue] = useState<UserValue>({
    email: "",
    password: ""
  })

  function gatherValue(field: string, input: React.ChangeEvent<HTMLInputElement>) {
    setUserValue((prev) => ({
      ...prev,
      [field]: input.target.value
    }))
  }

  async function submitLogin(e: BaseSyntheticEvent) {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: "POST",
        body: JSON.stringify(userValue),
        headers: {
          'Content-Type': "application/json"
        },
        credentials: "include"
      })

      if (!response.ok) {
        const resData = await response.json()
        const error = new Error(resData.message)
        throw error
      }

      const resData = await response.json()

      console.log(resData.message)

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col justify-center gap-2 border border-white py-3 px-5 h-1/3 w-1/4 rounded-4xl bg-stone-900">
      <div className="flex text-center justify-center items-center">
        <p className="text-xl">Admin Login</p>
      </div>

      <form onSubmit={(e) => submitLogin(e)} className="flex flex-col justify-start items-start gap-3">
        <label className="text-lg">Email</label>
        <input onChange={(e) => gatherValue("email", e)} required type="email" className="bg-black rounded-md py-1.5 w-full px-1 "></input>
        <label className="text-lg">Password</label>
        <input onChange={(e) => gatherValue("password", e)} required type="password" className="bg-black rounded-md py-1.5 w-full px-1"></input>
        <div className="flex w-full justify-center items-center">
          <button className="bg-black w-1/2 py-2 rounded-lg cursor-pointer hover:bg-black/80 duration-100">Login</button>
        </div>
      </form>
    </div>
  )
}