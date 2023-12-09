import React,{useEffect, useState} from 'react'
import axios from 'axios'
import style from './Todos.module.css'
import TodoItem from './TodoItem'


const Todos = () => {
  const [data,setData]=useState([])
  
  useEffect(()=>{
    axios('https://jsonplaceholder.typicode.com/users/1/todos')
  
    .then((d)=>{
      setData(d.data)
  
     
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
 
  console.log(data)
 

  return (
    <div>
      <TodoItem/>
      {data.map((el)=>{
        return<div className={style.main}>
       
          {/* <p className={style.id}>{el.id}.</p> */}
          <p>{el.title}</p>
          <button>edit</button>
          <button>delete</button>
        
        </div>
      })}
    </div>
  )
}

export default Todos