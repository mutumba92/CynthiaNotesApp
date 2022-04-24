import React, {useState, useEffect} from 'react'
//import notes from '../assets/data'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotePage = ({match, history}) => {
  let noteId = match.params.id
  
  let [note, setNote] = useState(null)
  // let note = notes.find(note => note.id === Number(noteId))

  useEffect(() => {
    getNote()
  }, [noteId]);

  let getNote = async () => {
    if (note === 'new') return
    let response = await fetch(`http://localhost:8000/notes/${noteId}`)
    let data = await response.json()
    setNote(data)
    console.log(note.body)
  }

let handleSubmit = () => {

  if(noteId !== 'new' && !(note.body)){
    deleteNote()
  }else if(noteId !== 'new'){
    updateNote()
  }else if(noteId === 'new' && note !== null){
      createNote()
  }

  updateNote()
  history.push('/')
}

let createNote = async () => {
  await fetch(`http://localhost:8000/notes/`, 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...note, 'updated':new Date()})
  })
}

  let updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${noteId}`, 
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated':new Date()})
    })
  }

  let deleteNote = async() => {
    await fetch(`http://localhost:8000/notes/${noteId}`, 
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    history.push('/')
  }

  return (
    <div className='note'>
        <div className='note-header'>
          <h3>
            <Link to="/">
              <ArrowLeft onClick={handleSubmit}/>
            </Link>
          </h3>
          {noteId !== 'new' ? (
              <button onClick={deleteNote} >Delete</button>
          ):
          (<button onClick={handleSubmit} >Done</button>)
          }
          
        </div>
        

        <textarea onChange={(e)=> { setNote({...note, 'body': e.target.value})}} value={note?.body}>

        </textarea>
        
    </div>
    
  )
}

export default NotePage