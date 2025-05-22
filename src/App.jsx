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
    <p>{todo.text}</p><br />
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
      <IconButton 
      aria-label="delete" disabled color="primary">
        <DeleteIcon  />
      </IconButton>
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