'use client'
import { globalContext } from "@/lib/GlobalContext/GlobalContext"
import { useContext } from "react"

const ShowText = () => {
  const { text } = useContext(globalContext)
  return (
    <div>
      <h1 className="text-orange-700 font-bold text-2xl">This is converted Text</h1>
      <p className="text-orange-500">{text}</p>
    </div>
  )
}

export default ShowText