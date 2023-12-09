import React,{useEffect, useState} from 'react'
import axios from 'axios'


const Todos = () => {
  const [todo,setTodo]=useState([])
  
  useEffect(()=>{
    axios('https://jsonplaceholder.typicode.com/users/1/todos')
  
    .then((d)=>{
      setTodo(d.data)
  
     
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
 
  console.log(todo)
 

  return (
    <div>todos
      {todo.map((el)=>{
        return<div>
          <p>{el.title}</p>
        </div>
      })}
    </div>
  )
}

export default Todos