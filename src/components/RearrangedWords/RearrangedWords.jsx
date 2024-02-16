'use client'
import { globalContext } from '@/lib/GlobalContext/GlobalContext'
import jsPDF from 'jspdf';
import React, { useContext, useEffect, useState } from 'react'

const RearrangedWords = () => {
  const {wordCombinations, selectedTextColor} = useContext(globalContext)
  const colors = ["#9575CD", "#EF5350", "#FFA726", "#FFEB3B", "#66BB6A", "#4FC3F7"];
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
  
      // Add each letter of the word to the PDF document
      word.split('').forEach((letter, j) => {
        const color = selectedTextColor === 'colorful'
        ? colors[j % colors.length]
        : selectedTextColor;
        doc.setTextColor(color); // Set text color for the letter
        doc.text(letter, 10 + j * 6, yPos); // Add letter to the PDF document
      });
  
      // Add dash after each word
      doc.setTextColor("#000000"); // Reset text color
      doc.text("-", 10 + word.length * 6, yPos); 
  
      yPos += 10; // Increase y position for the next word
    });
  
    // Save the PDF document
    doc.save('word_combinations.pdf');
  };
  

 // Render the component only if words state holds any value
 if (!wordCombinations || wordCombinations.length === 0) {
  return null;
}

  return (
    <div>
      <h1 className="text-orange-700 font-bold text-2x">RearrangedWords</h1>
      {shuffledWords.map((word, i) => (
  <span key={i} className='text-orange-500'>
    {word.split('').map((letter, j) => (
      <span key={j} 
      className='font-bold text-xl'
      style={{
        color:
          selectedTextColor === 'colorful'
            ? colors[j % colors.length]
            : selectedTextColor,
      }}>
        {letter}
      </span>
    ))}
    - {/* Add dash after each word */}
    
  </span>
))}
      <button onClick={downloadPDF}>Download as PDF</button>
    </div>
  )
}

export default RearrangedWords