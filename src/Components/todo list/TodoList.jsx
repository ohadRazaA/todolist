import React, { useEffect, useState } from 'react'
import './todo.css';
import axios from 'axios';

function TodoList() {

  const [data, setData] = useState("");
  const [mainArr, setMainArr] = useState([]);
  const [inpVal, setInpVal] = useState("");
  const [bool, setBool] = useState(false);
  const url = "http://localhost:8000/";

  useEffect(() => {
    axios.get(url)
      .then(res => {
        console.log(res.data);
        const updatedArr = res.data;
        setMainArr([...updatedArr]);
      })
      .catch(err => console.log(err));
  }, [])

  const getValue = (event) => {
    setData(event.target.value);
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!data) {
      alert("Please fill the input");
    } else {
      axios.post(url, { data })
        .then(res => {
          setMainArr([...mainArr, res.data]);
          setData("");
        })
        .catch(err => console.log(err));
    }
  }
  const editInp = (element, index, todoId) => {
    axios.delete(`${url}${todoId}`)
      .then(res => { console.log(res.data) })
      .catch(err => console.log(err));
    let tempArr = [...mainArr];
    tempArr.splice(index, 1);
    setMainArr(tempArr);
    setData(element);
    let input = document.getElementById("new-task-input");
    input.focus();
  }
  const editInpVal = (event) => {
    setInpVal(event.target.value);
  }
  const deleteInp = (index, todoId) => {
    axios.delete(`${url}${todoId}`)
      .then(res => { console.log(res.data) })
      .catch(err => console.log(err));
    let tempArr = [...mainArr]
    tempArr.splice(index, 1);
    setMainArr(tempArr);
  }
  const deleteAllInp = () => {
    axios.put(url)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    setMainArr([]);
    setData("");
  }
  const btnClk = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "block"
  }
  const close = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  return (
    <div>

      <header>
        <h1>Todo List</h1>
        <form onSubmit={onSubmitHandler} id="new-task-form">
          <input onChange={getValue} value={data} type="text" name="new-task-input" id="new-task-input" placeholder="Add your items" />
          <button type="submit" id="new-task-submit">Add</button>
        </form>
      </header>

      <main>
        <section className="task-list">
          <h2>Lists</h2>
          {
            mainArr.map((element, index) => {
              return (
                <div key={index} id="tasks">

                  <div className="task">

                    <div className="content">
                      <input type="text" className="text" disabled id={"myInp"}
                        onChange={editInpVal}
                        value={bool ? inpVal : element.todoText} />
                    </div>
                    <div className="actions">
                      <button onClick={() => editInp(element.todoText, index, element._id)} id='edit' className="edit">Edit</button>
                      <button onClick={() => { deleteInp(index, element._id) }} className="delete">Delete</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
      </main>

      {
        mainArr == "" ?
          <div></div> : <div className='main'>
            <button onClick={btnClk} className="Delete" id="myBtn"> "Delete All !" </button>
          </div>
      }
      <div id="myModal" className="modal">

        <div className="modal-content">
          <span onClick={close} className="close">&times;</span>
          <p>Are you sure you want to delete all items</p>
          <div>
            <button onClick={deleteAllInp}>Yes</button>
            <button onClick={close} className="close1">No</button>
          </div>
        </div>


      </div>

    </div>
  )
}

export default TodoList
