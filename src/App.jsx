import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

function App() {  
  const [todo, settodo] = useState("");

  const [todos, settodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      settodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  } 

  const handleDelete = (e, id)=>{
  
    // Deleting the chosen todo
    let newtodos = todos.filter(item=>{
      return item.id !== id;
    });
    settodos(newtodos);
    saveToLS();
  }

  const handleEdit = (e,id)=>{
    let t = todos.filter(i=>i.id ===id)
    settodo(t[0].todo);

    handleDelete(e, id);

    saveToLS();
  }

  const handleAdd = ()=>{
    settodos([...todos,{id:uuidv4(),todo, isCompleted: false}])
    settodo("");
    saveToLS();
  }

  const handleChange=(e)=>{
    settodo(e.target.value)
  }

  const handleCheckbox =(e)=>{
    let id = e.target.id;
    // console.log(id)
    // To find the index of current todo
    let index = todos.findIndex(item=>{
      return item.id === id;
    });
    // console.log(index)
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    // console.log(newtodos)
    saveToLS();
  }

  const toggleFinished= (e) => {
    setshowFinished  (!showFinished)
  }
  


  
  return (
    <>
      <Navbar/>
      <div className="md:container m-3 md:mx-auto bg-sky-200 p-5 rounded-xl my-5 min-h-[80vh] md:w-[35%]">
        <div className="">
          <h1 className='text-3xl text-center font-bold'>Quick Task - Todo Manager</h1>
          <div className="add-todos my-5 flex flex-col gap-2 items-center">
            <h2 className="text-xl font-semibold ">Add new Task</h2>
            <input className='w-full rounded-xl outline-sky-500 p-1 px-3' type="text" onChange={handleChange} value={todo}/>
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-sky-800 hover:bg-sky-950 px-16 py-1 text-white rounded-xl mx-6 disabled:bg-sky-950 flex items-center gap-2 justify-center'>Save <FaRegSave /></button>
          </div>
          <input type="checkbox" checked={showFinished} name="" id="show" onChange={toggleFinished}/>
          <label htmlFor="show" className='mx-2'>Show Finished</label>
          <div className="h-[1px] bg-sky-900 opacity-35 mx-auto my-2 w-[90%]"></div>
        
          <h2 className="text-xl font-semibold my-4">Your todos</h2>
          <div className="todos">
            {todos.length === 0 && <div className='m-5 text-lg'>No Todos To Display</div>}
            {todos.map(item=>{
                  return (showFinished || !item.isCompleted ) && <div key={item.id} className="todo flex gap-4 justify-between md:w-3/4 my-3">
                    <div className="flex gap-3 items-center">
                        <input type="checkbox" checked={item.isCompleted} name="" id={item.id} onChange={handleCheckbox}/>
                        <div className={item.isCompleted?"line-through": ""}>{item.todo}</div>
                    </div>
                    
                  <div className="buttons flex h-full">
                    <button onClick={(e)=>handleEdit(e, item.id)} className="edit bg-sky-800 hover:bg-sky-950 p-3 py-1 text-white rounded-lg mx-1"><FaRegEdit /></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className="delete bg-sky-800 hover:bg-sky-950 p-3 py-1 text-white rounded-lg mx-1"><MdDeleteOutline /></button>
                  </div>
              </div>
            })}
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
