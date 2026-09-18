import React from 'react'
import "./App.css"
import { useState, useEffect } from 'react'
import axios from "axios"


const dummyUrls = [
    {
      _id: "1",
      originalUrl: "https://poki.com/en/g/level-devil?msockid=0dacf46c6ff76abf13cfe3b96ed76b88",
      shortCode: "IUSJDF",
      clicks: 9
    },
    {
      _id: "2" ,
      originalUrl: "https://poki.com/en/g/level-devil?msockid=0dacf46c6ff76abf13cfe3b96ed76b88",
      shortCode: "IUSJDF",
      clicks: 5
    },
    {
      _id: "3",
      originalUrl: "https://poki.com/en/g/level-devil?msockid=0dacf46c6ff76abf13cfe3b96ed76b88",
      shortCode: "IUSJDF",
      clicks: 4
    },
  ]

const App = () => {
  const [urls, seturls] = useState(dummyUrls)
  const [inputValue, setinputValue] = useState("")
  const [currentUrl, setcurrentUrl] = useState(null)
  
  async function deleteUrl(id){
    await axios.delete(`http://localhost:5173/api/url/${id}`)
    fetchUrls()
  }

  async function createShortUrl(){
    const response = await axios.post("http://localhost:5173/api/url",{
      url: inputValue
    })
    setcurrentUrl({originalUrl:response.data.data.url, shortCode: response.data.data.shortCode});
    fetchUrls()
  }



  async function fetchUrls(){
    const response = await axios.get("http://localhost:5173/api/url")
    seturls(response.data.data.urls)
  }
  useEffect(()=>{
  fetchUrls()},[]);

  return (
    <main className = "p-10 flex flex-col gap-4">
      <div className="w-full max-w-4xl p-2">
        <input
        placeholder="enter long url"
        type="text"
        value={inputValue}
        onChange={(e)=>{setinputValue(e.target.value)}}
        />
        <button className= "rounded p-2 bg-orange-600 text-white cursor-pointer" onClick={createShortUrl}>shorten</button>
      </div>
      <div className="w-full max-w-4xl p-2"></div>
      <div className="w-full max-w-4xl p-2 flex flex-col gap-2">
        {
          urls.map(url=>{
            return (
              <div className="border border-neutral-200 p-2 flex gap-8 justify-evenly items-center">
                <a href={`http://localhost:3000/${url.shortCode}`} target="_blank">{url.shortCode}</a>
                <p className="truncate">{url.originalUrl}</p>
                <p>{url.clicks}</p>
                <div className="flex gap-2">
                  <button className="p-2 rounded bg-orange-600 text-white cursor-pointer">COPY</button>
                  <button onClick={() => deleteUrl(url._id)} className="p-2 rounded bg-orange-600 text-white cursor-pointer">DELETE</button>
                </div>
                </div>
            )
          })
        }
      </div>
    </main>
  )
}

export default App
