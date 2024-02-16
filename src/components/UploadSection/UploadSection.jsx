import { globalContext } from '@/lib/GlobalContext/GlobalContext';
import convertor from '@/lib/convertor';
import React, { useContext, useRef } from 'react'

const UploadSection = () => {
  const imageInputRef = useRef(null);
  // const {setText} = useContext(ContextProvider)
  const { text, setText } = useContext(globalContext); // Corrected context import
  const openBrowseImage = () => {
     imageInputRef.current.click();
  };

  const convert =  (url) => {
    if (url) {
      // setProcessing(true);
     convertor(url).then((text) => {
      setText(text)
      // console.log('from uploca', text)
     })
      
      // .then((txt) => {
      //   // let copyTexts = texts;
      //   copyTexts.push(txt);
      //   setTexts(copyTexts);
      // });
      // setProcessing(false);
    }
  };
  return (
    <div>
      <input
      type="file"
      ref={imageInputRef}
      hidden
      required
      onChange={e => {
        if(e.target.files){
          const url = URL.createObjectURL(e.target.files[0])
          // console.log(url)
          convert(url)
        }
        
      }}
      />
      <div 
      onClick={openBrowseImage}
      className="h-96 border-2 border-purple-700 text-white">Click Here to upload file</div>
    </div>
  )
}

export default UploadSection