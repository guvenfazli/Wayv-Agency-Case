"use client"

import { useRouter } from "next/navigation";
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
  const [isError, setIsError] = useState<string | false>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  function gatherValue(field: string, input: React.ChangeEvent<HTMLInputElement>) {
    if (isError) setIsError(false)

    setUserValue((prev) => ({
      ...prev,
      [field]: input.target.value
    }))
  }

  async function submitLogin(e: BaseSyntheticEvent) {
    e.preventDefault()

    try {
      setIsLoading(true)
      setIsError(false)
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
        const error = new Error()
        error.message = resData.message
        throw error
      }

      setIsError(false)
      setIsLoading(false)
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setIsError(err.message);
        setIsLoading(false)

      }
    }
  }

  return (
    <div className="flex flex-col justify-center gap-2 border border-white py-3 px-5 h-1/3 w-1/4 rounded-4xl bg-stone-900">
      <div className="flex text-center justify-center items-center">
        <p className="text-xl">Admin Login</p>
      </div>

      <form onSubmit={(e) => submitLogin(e)} className="flex flex-col justify-start items-start gap-3">
        <label className="text-lg">Email</label>
        <input onChange={(e) => gatherValue("email", e)}  type="email" className="bg-black rounded-md py-1.5 w-full px-1 "></input>
        <label className="text-lg">Password</label>
        <input onChange={(e) => gatherValue("password", e)}  type="password" className="bg-black rounded-md py-1.5 w-full px-1"></input>
        <div className="flex w-full justify-center items-center">
          <button disabled={isLoading} className={`bg-black w-1/2 py-2 rounded-lg cursor-pointer hover:bg-black/80 duration-100 ${isLoading && 'bg-black/30'}`}>{isLoading ? 'Logging In...' : 'Login'}</button>
        </div>
      </form>

      {isError && <p>{isError}</p>}
    </div>
  )
}