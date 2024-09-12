/* eslint-disable no-unused-vars */
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length ,setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 

    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+[]{}|;':,./<>?"

    // This line will generate Random password
    for(let i = 1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length +1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length,numAllowed, charAllowed, setPassword ])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 99999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() =>{
    passwordGenerator()
  } ,[length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-400 bg-blue-500'>

        <h1 className=' text-white text-center font-bold my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
           type="text"
           value={password}
           readOnly className="outline-none w-full px-1 py-3 "
           placeholder='Generated Password'
           ref={passwordRef}
           />
           <button
           onClick={copyPasswordToClipboard}
           className='px-4 py-0.5 bg-blue-700 text-white '>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <label> Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numAllowed}
            id='numInput'
            onChange={()=>{
              setNumAllowed((prev)=>!prev
            )}}
            />
            <label htmlFor='numInput'>Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
