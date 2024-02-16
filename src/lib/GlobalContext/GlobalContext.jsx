"use client";

import { createContext, useEffect, useState } from "react";

export const globalContext = createContext();

export const ContextProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [words, setWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [wordCombinations, setWordCombinations] = useState([]);
  const [combinationsCount, setCombinationsCount] = useState(2);
  const maxPermutations = 2000;

  // Function to split the paragraph into words and update the words state
  const excludedWords = ["the", "and", "are", "its", "may", "can"];

  useEffect(() => {
    // todo 
    // const splitParagraphIntoWords = () => {
    //   const wordsArray = text.split(/\s+|[-&_.,;:!?()[\]{}|/]/)
    //                          .filter(word => word.length >= 3 && !excludedWords.includes(word.toLowerCase()));
    //   return wordsArray;
    // };

    // todo logic implemented for not repeating same word
    const splitParagraphIntoWords = () => {
      // Split the text into words using regular expression and filter out excluded words
      const wordsArray = text
        .split(/\s+|[-&_.,;:!?()[\]{}|/]/)
        .filter(word => word.length >= 3 && !excludedWords.includes(word.toLowerCase()));
  
      // Use a Set to keep track of unique words
      const uniqueWordsSet = new Set(wordsArray);
  
      // Convert the Set back to an array
      const uniqueWordsArray = Array.from(uniqueWordsSet);
  
      return uniqueWordsArray;
    };
    setWords(splitParagraphIntoWords());
  }, [text]);

  // Generate word combinations
  useEffect(() => {
    const permute = (chars, maxPermutations) => {
      const result = [];
      if (chars.length === 1) {
        result.push(chars);
        return result;
      }
      for (let i = 0; i < chars.length && result.length < maxPermutations; i++) {
        const firstChar = chars[i];
        const remainingChars = chars.slice(0, i).concat(chars.slice(i + 1));
        const innerPermutations = permute(remainingChars, maxPermutations);
        for (let j = 0; j < innerPermutations.length; j++) {
          const perm = [firstChar].concat(innerPermutations[j]);
          result.push(perm);
          if (result.length >= maxPermutations) {
            break; // Break out of loop if the maximum limit is reached
          }
        }
      }
      return result;
    };

    const getRandomElements = (array, count) => {
      const shuffled = array.slice().sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    };

    const generateWordCombinations = () => {
      const combinations = selectedWords.map(word => {
        const chars = word.split('');
        const perms = permute(chars, maxPermutations);
        const randomPerms = getRandomElements(perms, combinationsCount);
        return randomPerms.map(perm => perm.join(''));
      });
      setWordCombinations(combinations.flat());
    };

    if (selectedWords.length > 0) {
      generateWordCombinations();
    } else {
      setWordCombinations([]);
    }
  }, [selectedWords, combinationsCount, maxPermutations]);

  const value = {
    text,
    setText,
    words,
    setWords,
    selectedWords,
    setSelectedWords,
    wordCombinations,
    setWordCombinations,
    combinationsCount,
    setCombinationsCount
  };

  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};


// "use client";

// import { createContext, useEffect, useState } from "react";

// export const globalContext = createContext();

// export const ContextProvider = ({ children }) => {
//   const [text, setText] = useState("");
//   const [words, setWords] = useState([]);
//   const [selectedWords, setSelectedWords] = useState([]);
//   const [wordCombinations, setWordCombinations] = useState([]);
//   const [combinationsCount, setCombinationsCount] = useState(2);
//   const maxPermutations = 2000;
// console.log('text', text)
// console.log('words', words)
// console.log('selected words',selectedWords)
//   console.log('word com', wordCombinations)
//   console.log('combi count', combinationsCount)
//   // Function to split the paragraph into words and update the words state
//   const excludedWords = ["the", "and", "are", "its", "may", "can"];

//   useEffect(() => {
//     // todo only split words
//     // const splitParagraphIntoWords = () => {
//     //   return text.split(/\s+/); // This will split the text by any whitespace character (space, tab, newline)
//     // };
//     // todo only 3 letters or more words pushed
//     // const splitParagraphIntoWords = () => {
//     //   return text.split(/\s+/).filter(word => word.length >= 3); // Filter out words with less than three letters
//     // };
// // todo ,.;:!?-_+ removed from words
//     // const splitParagraphIntoWords = () => {
//     //   const wordsArray = text.split(/\s+|[-&_.,;:!?()[\]{}|/]/).filter(word => word.length >= 3);
//     //   return wordsArray;
//     // };

//     // setWords(splitParagraphIntoWords());
//     // todo excluded word removed
//     const splitParagraphIntoWords = () => {
//       const wordsArray = text.split(/\s+|[-&_.,;:!?()[\]{}|/]/)
//                              .filter(word => word.length >= 3 && !excludedWords.includes(word.toLowerCase()));
//       return wordsArray;
//     };
//     setWords(splitParagraphIntoWords());

//   }, [text]);

//   // Rearrange words

// useEffect(() => {
//     const generateWordCombinations = () => {
//       const combinations = selectedWords.map(word => {
//         const chars = word.split('');
//         const perms = permute(chars);
//         const randomPerms = getRandomElements(perms, combinationsCount);
//         return randomPerms.map(perm => perm.join(''));
//       });
//       setWordCombinations(combinations.flat());
//     };

//     const permute = (chars, maxPermutations) => {
//       const result = [];
//       if (chars.length === 1) {
//         result.push(chars);
//         return result;
//       }

//      // Generate permutations up to the maximum limit
//   for (let i = 0; i < chars.length && result.length < maxPermutations; i++) {
//     const firstChar = chars[i];
//     const remainingChars = chars.slice(0, i).concat(chars.slice(i + 1));
//     const innerPermutations = permute(remainingChars, maxPermutations);
//     for (let j = 0; j < innerPermutations.length; j++) {
//       const perm = [firstChar].concat(innerPermutations[j]);
//       result.push(perm);
//       if (result.length >= maxPermutations) {
//         break; // Break out of loop if the maximum limit is reached
//       }
//     }
//   }
//   return result;
//     };

//     const getRandomElements = (array, count) => {
//       const shuffled = array.slice().sort(() => Math.random() - 0.5);
//       return shuffled.slice(0, count);
//     };

//     generateWordCombinations();
//   }, [selectedWords, combinationsCount]);


// // console.log('words', words)
//   const value = {
//     text,
//     setText,words, setWords, selectedWords, setSelectedWords, wordCombinations, setWordCombinations
//   };

//   return (
//     <globalContext.Provider value={value}>{children}</globalContext.Provider>
//   );
// };
