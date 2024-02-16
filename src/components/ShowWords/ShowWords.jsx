import { globalContext } from "@/lib/GlobalContext/GlobalContext"
import { useContext } from "react"

const ShowWords = () => {
  const {words, selectedWords ,setSelectedWords} = useContext(globalContext)
  // console.log('show', words)
  // console.log('new', selectedWords)

  const handleWordClick = (word) => {
    setSelectedWords([...selectedWords, word]);
  };

  return (
    <div>
      <h1 className="text-orange-900 text-5xl my-10">Word List</h1>
      {words.map((word, i) => (<p 
      className="text-orange-500 cursor-pointer"
      key={i}
      onClick={() => handleWordClick(word)}
      >{word}</p>))}
    </div>
  )
}

export default ShowWords