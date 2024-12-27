import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'
import { use } from 'react'

function App() {
  const [Length, setLength] = useState(18)
  const [numAllowed, setNum] = useState("false")
  const [charAllowed, setChar] = useState("false")
  const [password,setPassword] = useState("")
  //use ref hook
  const passwordRef=useRef(null)  

  const passwordGenerator = useCallback(() =>{
  
    let pass =""
    let str ="QWERTYUIOPASDFGHJKLZXCVBNMwqertyuiopasdfghjklzcxvbnm"
    if(numAllowed) str+= "1234567890"
    if(charAllowed) str+="<>?,{}[]!@#$%^&*()"
    for (let i=1;i<=Length;i++) {
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  },[Length,numAllowed,charAllowed,password])
  const clicktocopy=useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=> {passwordGenerator()},[Length,numAllowed,charAllowed,setPassword])
  
  return (
    <div className='w-full h-screen bg-black flex align-middle justify-center shadow-md '>
      <div className='w-max h-max bg-gray-900 rounded-xl flex flex-col fixed top-7'>
        <div className='p-3'>
          <input
            type='text'
            value={password}
            placeholder='password'
            readOnly
            className='w-96 rounded-bl-md rounded-tl-md'
            ref={passwordRef}>
          </input>
          <button 
          onClick={clicktocopy}
          className='bg-blue-600 text-white w-28 rounded-br-md rounded-tr-md '><b>Copy</b></button>
        </div>
        <div className='flex flex-row'>

          <div className='flex flex-row p-3'>
            <input
              type="range"
              min={1}
              max={100}
              value={Length}
              className="cursor-pointer"
              onChange={(f) => { setLength(f.target.value) }}
            />
            <label className='text-yellow-700'>Length: {Length}</label>
          </div>
          <div className='flex flex-row p-3'>
            <input
              type="checkbox"
              id='numberInput'
              defaultChecked={numAllowed}
              onChange={() => {
                setNum((prev) => !prev)
              }}
            />
            <label className='text-yellow-700'>Numbers</label>
          </div>
          <div className='flex flex-row p-3'>
            <input
              type="checkbox"
              id='numberInput'
              defaultChecked={charAllowed}
              onChange={() => {
                setChar((prev) => !prev)
              }}
            />
            <label className='text-yellow-700'> Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
