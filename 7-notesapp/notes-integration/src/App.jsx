import React,{useState} from 'react'
import axios from "axios"
import { useEffect } from 'react'
import NoteCard from './components/notecard'

const App = () => {
  const [isupdatedata, setisupdatedata] = useState(null)
  const [formValue, setformValue] = useState({
    title: "",
    description: "",
  })
  let updatedNote = (note)=>{
    setisupdatedata(note._id);
    console.log(note);
    setformValue({
      title:note.title,
      description:note.description
    })
  }

  let deleteNote=async (id)=>{
    try{
      let res = await axios.delete(`http://localhost:3000/notes/${id}`);
      console.log(res);
      getAllNotes();
    }
    catch(error){
      console.log("error in delete", error);
    }
  }
  const [allNotes, setallNotes] = useState([])
  const handleChange= (e) =>{
    setformValue((prev)=>({
      ...prev, [e.target.name]: e.target.value
    }))
  }

  let getAllNotes= async ()=>{
    try{
      let res = await axios.get("http://localhost:3000/notes/allnotes");
     //console.log(res)
      setallNotes(res.data.data);
    }
    catch(error){
      console.log("error in all notes",error)
    }
  }
  useEffect(()=>{
    getAllNotes();
  },[])
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isupdatedata) {
      await axios.put(
        `http://localhost:3000/notes/${isupdatedata}`,
        formValue
      );
    } else {
      await axios.post(
        "http://localhost:3000/notes/create",
        formValue
      );
    }

    setisupdatedata(null);

    setformValue({
      title: "",
      description: "",
    });

    await getAllNotes();
  } catch (error) {
    console.log("error while saving note", error);
  }
};



  return (
    <div className="h-screen">
      <h2 className="text-3xl font-semibold"> notes app </h2>
      <form 
      onSubmit={handleSubmit}
      className="w-70 gap-5 border border-black p-4 rounded-xl flex flex-col">
        <input
        onChange={handleChange}
        name="title"
        value={formValue.title}
        className="p-2 outline-none text-xl border rounded border-black" type ="text" placeholder="title"/>
        <input
        onChange={handleChange}
        minLength={20}
        required
        name="description"
        value={formValue.description}
        className="p-2 outline-none text-xl border rounded border-black" type ="text" placeholder="decription"/>
        <button className="bg-blue-600 text-white p-2 rounded">
          {
            isupdatedata?"update note": "add note"
          }</button>
      </form>

      <div className="flex gap-4 flex-wrap">{
        allNotes.map(val=>
          <NoteCard updatedNote={updatedNote} key={val._id} deleteNote={deleteNote} note={val}/>
        )
          }
      </div>
    </div>
  )
}

export default App
