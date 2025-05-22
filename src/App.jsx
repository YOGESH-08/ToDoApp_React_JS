import React,{useEffect, useState} from "react";
import "./App.css";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "./Button";




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
    handleWindow();
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
    setAnyThingThere(true);
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
      <Button className="addtask" onClick={handleAddTaskClick} value = "Add Task" />
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
      <Button onClick={handleAddClick} value="Add +" /> 
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
    <p>{todo.text}</p><div onClick = {(e)=>{
      e.stopPropagation();
    }}className="edit"><svg className="edit" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></div><br />
    <p className="date">{todo.date}</p>
    <div
    onClick = {(e)=>{
        e.stopPropagation();
      const filtered = task.filter((toDel,i)=>i!==index);
      setTask(filtered);
      if(filtered.length==0){
        setAnyThingThere(false);
        setStartAdd(false);
        handleWindow();
      }
    }}>
      <div className="dustbin"><IconButton 
      aria-label="delete" disabled color="primary">
        <DeleteIcon  />
      </IconButton>
      </div>
  </div>
  </div>
))}


  
</div>
<div className="footer">
    <Button onClick={clearAll} value="Clear All" />
  </div>

    </>;
}

export default App;