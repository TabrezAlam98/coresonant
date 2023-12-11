import React, { useState } from "react";
import style from "./TodoItem.module.css";
import { nanoid } from "nanoid";

const TodoItem = () => {
  const [todo, setTodo] = useState("");
  const [data, setData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: todo,
      isComplete: false,
      id: nanoid(),
    };
    setData([...data, payload]);
    setTodo("");
  };

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

  console.log(data);

  return (
    <>
      <div>
        <input
          placeholder="Enter Todo ........."
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          require
        />
        <button className={style.addBtn} onClick={handleSubmit}>
          add todo
        </button>
      </div>

      <div>
        {" "}
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
      </div>
      <div>
        {data.map((el) => {
          return (
            <>
              <div className={style.container} key={el.id}>
                <p style={{ background: el.isComplete ? "green" : "none " }}>
                  {el.title}{" "}
                </p>

                <button
                  className={style.editBtn}
                  onClick={() => handleEdit(el)}
                >
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button
                  className={style.delBtn}
                  onClick={() => handleDelete(el.id)}
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button onClick={() => handleToggle(el.id)}>
                  {el.isComplete ? "Incomplete" : "Completed"}
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default TodoItem;
