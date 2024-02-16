import { globalContext } from '@/lib/GlobalContext/GlobalContext'
import React, { useContext } from 'react'

const RearrangedWords = () => {
  const {wordCombinations} = useContext(globalContext)
  // console.log(wordCombinations)
  const getPadding = (word) => {
    // Calculate the padding based on the length of the word
    return `${word.length+2}ch`;
  };
  return (
    <div>
      <h1 className='text-orange-900 text-5xl'>RearrangedWords</h1>
      {wordCombinations.map((word, i) => (
        <span key={i} className='text-orange-500'>
          {word} -
          <span style={{ paddingLeft: getPadding(word) }}>&nbsp;</span>
        </span>
      ))}
    </div>
  )
}

export default RearrangedWords