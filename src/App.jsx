import React,{useEffect, useState} from "react";
import "./App.css"




function App(){

  document.addEventListener('keydown',(event)=>{
    if(event.key==="Enter"){
      handleAddClick();
    }
  });



const date = new Date();

  const [startAdd,setStartAdd] = useState(false);
  const [newTask,setNewTask] = useState("");
  const [task,setTask] = useState([]);
  const [anyThingThere,setAnyThingThere] = useState(false);


function handleAddClick(){
  setStartAdd(true);
}


function handleWindow(){
  if(!anyThingThere){
    return <>
    <div className="transparent">
      NO Task ToDO </div></>
  }
}

function clearAll(){
  if(anyThingThere){
    setNewTask("");
    setTask([]);
    setAnyThingThere(false);
    setStartAdd(false);
  }
}


function handleAddTaskClick() {
  if (newTask.trim() !== "") {
    const taskObj = {
      text: newTask.trim(),
      date: new Date().toLocaleString(),
      completed : false
    };
    setTask((prev) => [...prev, taskObj]);
    setNewTask("");
    setStartAdd(false);
    setAnyThingThere("true");
  }
}

function handleInputChange(event){
  setNewTask(event.target.value);
}
  function taskWindow(){
    const handleKeyDownInput = (event) => {
    if (event.key === "Enter") {
      handleAddTaskClick();
    }
  };
    return(
    <div className="enterTask">
      <label htmlFor="item">New Task &nbsp;</label>
      <input type="text" value={newTask} onChange={handleInputChange}
      onKeyDown={handleKeyDownInput}/>
      <button className="addtask" onClick={handleAddTaskClick}>Add Task</button>
  </div>);
    
  }

  useEffect(()=>{
  if (startAdd){
    const inputField = document.querySelector("input[type='text']");
  if(inputField){
    inputField.focus();     
  }
}
},[startAdd]);

 


  return <>
  <div className="container">
    <div className="header">
      <h1 className="gradient-text">To-Do</h1>
      <button onClick={handleAddClick}>Add + </button>
    </div>
      {startAdd ? taskWindow():handleWindow()}
  </div>
    <div className="todocard">


  {task.map((todo, index) => (
  <div
    className={`Card ${todo.completed ? 'completed' : ''}`}
    key={index}
    onClick={() => {
      const updatedTasks = [...task];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      setTask(updatedTasks);
    }}
  >
    <p>{todo.text}</p><br />
    <p className="date">{todo.date}</p>
  </div>
))}


  
</div>
<div className="footer">
    <button onClick={clearAll}>Clear All</button>
  </div>

    </>;
}

export default App;