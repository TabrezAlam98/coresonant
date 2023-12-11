import React, { useEffect, useState } from "react";
import axios from "axios";
import style from "./Todos.module.css";
import TodoItem from "./TodoItem";

const Todos = () => {
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((d) => {
        setData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    const deleteTodo = data.filter((e) => e.id !== id);
    setData(deleteTodo);
  };

  const handleEdit = (el) => {
    setEditingItem(el);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedData = data.map((item) =>
      item.id === editingItem.id ? editingItem : item
    );
    setData(updatedData);
    setEditingItem(null);
  };

  const handleToggle = (Taskid) => {
    setData((prevTasks) =>
      prevTasks.map((el) =>
        el.id === Taskid ? { ...el, isComplete: !el.isComplete } : el
      )
    );
  };

  // console.log(data);

  return (
    <div>
      <TodoItem />
      {editingItem && (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={editingItem.title}
            onChange={(e) =>
              setEditingItem({
                ...editingItem,
                title: e.target.value,
              })
            }
          />
          <button className={style.addBtn} type="submit">
            Update
          </button>
        </form>
      )}

      {data.map((el) => {
        return (
          <div className={style.main}>
            <p style={{ background: el.isComplete ? "green" : "none " }}>
              {el.title}
            </p>
            <button onClick={() => handleEdit(el)} className={style.editBtn}>
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              onClick={() => handleDelete(el.id)}
              className={style.delBtn}
            >
              <i class="fa-solid fa-trash"></i>
            </button>
            <button onClick={() => handleToggle(el.id)}>
              {el.isComplete ? "Incomplete" : "Completed"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
