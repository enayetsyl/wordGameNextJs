'use client'
import { globalContext } from "@/lib/GlobalContext/GlobalContext"
import { useContext } from "react"

const ShowText = () => {
  const { text } = useContext(globalContext)
  return (
    <div>
      <p className="text-orange-500">{text}</p>
    </div>
  )
}

export default ShowText