'use client'
import { globalContext } from '@/lib/GlobalContext/GlobalContext'
import jsPDF from 'jspdf';
import React, { useContext, useEffect, useState } from 'react'

const RearrangedWords = () => {
  const {wordCombinations} = useContext(globalContext)
  // console.log(wordCombinations)

  const [shuffledWords, setShuffledWords] = useState([]);

  useEffect(() => {
    // Shuffle the words when the wordCombinations change
    setShuffledWords(wordCombinations.sort(() => Math.random() - 0.5));
  }, [wordCombinations]);
  const getPadding = (word) => {
    // Calculate the padding based on the length of the word
    return `${word.length+2}ch`;
  };

  const downloadPDF = () => {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set up initial y position for text
    let yPos = 10;
    
    // Add each word combination to the PDF document
  shuffledWords.forEach((word, index) => {
    // Calculate the padding based on the length of the word
    const padding = `${word.length + 2}ch`;
    
    // Add word and dash to the PDF document
    doc.text(word + " -", 10, yPos);
    
    // Add blank space after the dash
    doc.text("", 10 + word.length * 6, yPos);

    yPos += 10; // Increase y position for the next word
  });

    // Save the PDF document
    doc.save('word_combinations.pdf');
  };



  return (
    <div>
      <h1 className='text-orange-900 text-5xl'>RearrangedWords</h1>
      {shuffledWords.map((word, i) => (
        <span key={i} className='text-orange-500'>
          {word}- ,
          {/* <span style={{ paddingLeft: getPadding(word) }}>&nbsp;</span> */}
        </span>
      ))}
      <button onClick={downloadPDF}>Download as PDF</button>
    </div>
  )
}

export default RearrangedWords