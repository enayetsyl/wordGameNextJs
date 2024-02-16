'use client'
import { globalContext } from "@/lib/GlobalContext/GlobalContext"
import { useContext } from "react"

const ShowWords = () => {
  const {words, selectedWords ,setSelectedWords} = useContext(globalContext)
  // console.log('show', words)
  // console.log('new', selectedWords)

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  };

 // Render the component only if words state holds any value
 if (!words || words.length === 0) {
  return null;
}

  return (
    <div>
      <h1 className="text-orange-700 font-bold text-2xl">Word List</h1>
      {words.map((word, i) => (<p 
      className="text-orange-500 cursor-pointer"
      key={i}
      onClick={() => handleWordClick(word)}
      >{word}</p>))}
    </div>
  )
}

export default ShowWords