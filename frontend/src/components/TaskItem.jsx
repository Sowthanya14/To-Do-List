import React from "react";
import EditTaskForm from "./EdittaskForm"; 
import { Check, Edit2, Trash2 } from "lucide-react";

function TaskItem({task,editingTask,setEditingTask,updateTask,deleteTask,toggleTask}){
    return(
        <div className={`bg-gray-800  border border-gray-700 rounded-lg shadow-lg p-6 
        transition duration-200 hover:shadow-xl hover:border-gray-600 ${task.completed ? "opacity-60" : ""}`}>

            {/*Conditional Rendering*/}
            {editingTask === task._id ?
             (<EditTaskForm 
                task={task} 
                onSave={(updates)=>updateTask(task._id,updates)} 
                onCancel={()=>setEditingTask(null)} />) : 
             ( <div className="flex items-center justify-between">

                {/*left side checkbox + details */}
                <div className="flex items-start space-x-3 flex-1">

                    {/* Toogle completion*/}
                    <button 
                        className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center
                        justify-center transition duration-200 
                        ${task.completed ? "border-green-500 bg-green-500 hover:bg-green-600" 
                            : "border-gray-400 hover:border-gray-600"}`} 
                        onClick={() => toggleTask(task._id)}>
                        { task.completed && <Check size={16} />} 
                    </button>

                    {/*Task Info */}
                    <div className="flex-1">
                        <h3 className={`text-lg font-medium 
                            ${task.completed ? 
                            "text-gray-400 line-through" : "text-white"}`}>{task.title}
                        </h3>
                        {task.description && (<p className={`mt-1 ${task.completed ? "text-gray-500" : "text-gray-300"} `}>
                            {task.description}
                        </p>
                        )}

                        {/*Created & updated timestamps */}
                        <p className="text-sm text-gray-500 mt-2">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                            {task.updatedAt !== task.createdAt && (<span>. Updated:{new Date(task.updatedAt).toLocaleDateString()} </span>)}
                        </p>
                    </div>
                </div>

                {/*RightSide Actions */}
                <div className="flex items-center space-x-2 ml-4">

                    {/*edit button */}
                    <button className="p-2 text-gray-400 hover:text-green-400 
                        hover:bg-green-500/10 rounded-lg transition duration-200" 
                        onClick={()=> setEditingTask(task._id)}>
                        <Edit2 size={18}/>
                    </button>
                    
                    {/*Delete button */}
                    <button className="p-2 text-gray-400 hover:text-red-400 
                    hover:bg-red-500/10 rounded-lg transition duration-200"
                    onClick={() => deleteTask(task._id)}>
                        <Trash2 size={18}/>
                    </button>
                </div>
            </div>)}
            
            {/* Else*/}
            
        </div>
    )
};

export default TaskItem;