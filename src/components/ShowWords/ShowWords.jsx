'use client'
import { globalContext } from "@/lib/GlobalContext/GlobalContext"
import { useContext } from "react"

const ShowWords = () => {
  const {words, selectedWords ,setSelectedWords, setSelectedTextColor} = useContext(globalContext)
  // console.log('show', words)
  // console.log('new', selectedWords)

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  };


  const handleColorClick = (color) => {
    setSelectedTextColor(color); // Update selected text color
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
      <div>
        <p>Select Words that You want to rearrange.</p> 
        <p>Word Color Should Be</p>
        <button className="bg-black py-2 px-5 rounded-lg text-white font-semibold"
        onClick={() => handleColorClick('black')}
        >Black</button>
        <button className="bg-gradient-to-r from-blue-500  via-orange-500 to-purple-600 py-2 px-5 rounded-lg text-white font-semibold"
        onClick={() => handleColorClick('colorful')} 
        >Colorful</button>
      </div>
    </div>
  )
}

export default ShowWords