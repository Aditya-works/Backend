import React from 'react'

const NoteCard = ({note, updatedNote, deleteNote}) => {
  return (
    <div className="w-[30%] border border-black p-3 flex flex-col gap-4 rounded-xl">
      <h1>{note.title}</h1>
      <p className="text-xs">{note.description.length>20?note.description.substring(0,20):note.description}</p>
      <div className="flex justify-between">
        <button onClick={()=>updatedNote(note)}  className="p-2 bg-amber-300 rounded">update</button>
        <button onClick ={()=> deleteNote(note._id)} className="p-2 bg-red-600 rounded">delete</button>
      </div>
    </div>
  )
}

export default NoteCard
