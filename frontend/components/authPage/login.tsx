"use client"

import { useState } from "react"

interface UserValue {
  name: string;
  password: string;
}

export default function Login() {

  const [userValue, setUserValue] = useState<UserValue>({
    name: "",
    password: ""
  })

  function gatherValue(field: string, input: React.ChangeEvent<HTMLInputElement>) {
    setUserValue((prev) => ({
      ...prev,
      [field]: input.target.value
    }))
  }

  return (
    <div className="flex flex-col justify-center gap-2 border border-white py-3 px-5 h-1/3 w-1/4 rounded-4xl bg-stone-900">
      <div className="flex text-center justify-center items-center">
        <p className="text-xl">Admin Login</p>
      </div>

      <form className="flex flex-col justify-start items-start gap-3">
        <label className="text-lg">Email</label>
        <input required type="email" className="bg-black rounded-md py-1.5 w-full px-1 "></input>
        <label className="text-lg">Password</label>
        <input required type="password" className="bg-black rounded-md py-1.5 w-full px-1"></input>
        <div className="flex w-full justify-center items-center">
          <button className="bg-black w-1/2 py-2 rounded-lg cursor-pointer hover:bg-black/80 duration-100">Login</button>
        </div>
      </form>
    </div>
  )
}