import React, { useState } from "react";
import style from "./TodoItem.module.css";
import { nanoid } from 'nanoid'

const TodoItem = () => {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: todo,
      id:nanoid()
    };
    setData([...data, payload]);
  };
 
  const handleDelete=(id)=>{
    const deleteTodo=data.filter((e)=>(e.id !==id))
    setData(deleteTodo)

  }

  console.log(data);

  return (
    <>
      <div>
        <input
          placeholder="Enter Todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button onClick={handleSubmit}>add todo</button>
      </div>
      <div>
        {data.map((el) => {
          return (
            <div className={style.container}>
              <p>
                {el.title} </p>
                <button>edit</button>
                <button onClick={()=>handleDelete(el.id)}>delete</button>
             
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoItem;
