import React, { useEffect } from "react"
import Header from "./components/Header"
import FilterButtons from "./components/FilterButtons"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import Stats from "./components/Stats"
import { useState } from "react"

import { fetchTaskApi ,createTaskApi, updateTaskApi ,deleteTaskApi, toggleTaskApi} from "./api/tasksApi";

function App() {
  const [tasks,setTasks]=useState([]);
  const [newTask,setNewTask]=useState({title:"" , description:"" });
  const [editingTask,setEditingTask]=useState(null);
  const [loading,setLoading]=useState(false);
  const [filter,setFilter]=useState("all");
  const [showForm,setShowForm]=useState(false);

  const fetchTasks = async()=>{
    try{
      setLoading(true);
      const data= await fetchTaskApi();
      setTasks(data);
    }catch(err){
      console.log("Error fetching",err.message)
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchTasks();
  },[filter]);

  const createTask=async()=>{
    if(!newTask.title.trim()) return;
    try{
      const data= await createTaskApi(newTask);
      setTasks([...tasks,data]);
      setNewTask({title:"",description:""});
      setShowForm(false);
    }catch(err){
      console.log("Error fetching",err.message)
    }
  };

  const updateTask = async (id,updates)=>{
    try{
      const data= await updateTaskApi(id, updates);
      setTasks(tasks.map((t)=>(t._id===id ? data : t)));
      setEditingTask(null);
    }catch(err){
      console.log("Error fetching",err.message)
    }
  };

  const deleteTask = async (id)=>{
    try{
      await deleteTaskApi(id);
      setTasks(tasks.filter((t)=> t._id !== id));
    }catch(err){
      console.log("Error fetching",err.message)
    }
  };

  const toggleTask = async(id)=>{
    try{
      const updated = await toggleTaskApi(id);
      setTasks(tasks.map((t)=>(t._id===id ? updated : t)));

    }catch(err){
      console.log("Error fetching",err);
    }
  };

  const filteredTasks=tasks.filter((t)=>{
    if(filter==="completed") return t.completed;
    if(filter==="pending") return !t.completed;
    return true;
  })

  const stats={
    total: tasks.length,
    completed: tasks.filter((t)=>t.completed).length,
    pending: tasks.filter((t)=>!t.completed).length,
  };


  return (
    <>
     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-4xl mx-auto">
      <Header/> 

      <Stats {...stats}/>

      {/* Add New Task Button*/}
      <div className="flex justify-end mb-4">
      <button className="px-4 py-2 bg-green-700 text-white rounded-lg 
        shadow-lg hover:bg-green-900 tansition" onClick={()=>setShowForm(true)}>+ Add New Task</button>
      </div>

      <FilterButtons filter={filter} setFilter={setFilter}/>
      <TaskList 
        tasks={filteredTasks} 
        loading={loading} 
        editingTask={editingTask} 
        setEditingTask={setEditingTask} 
        updateTask={updateTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask} />
      </div>

      {/*Dark full Screen */}
      {/*conditional rendering */}
      {showForm && <div className="fixed inset-0 bg-black/80 backdrop-blur[10px] flex items-center justify-center z-50">
      {/*Task form */}
      <div className="w-full max-w-3xl px-8">
        <TaskForm 
          newTasks={newTask}
          setNewTask={setNewTask}
          onAdd={createTask}
          onCancel={()=>setShowForm(false)}/>
      </div>
      </div>
      }
    </div>
    </>
  )
}

export default App
