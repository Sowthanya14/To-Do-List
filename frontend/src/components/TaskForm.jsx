import React from "react";
import {X,Plus} from "lucide-react";

function TaskForm({onCancel,newTasks,setNewTask,onAdd}){
    return(
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-8 ">
            {/*Header with close */}
            <div className="flex justify-between items-centre mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Task</h2>

                {/*conditional rendering */}
                {onCancel && (<button className="text-gray-400 hover:text-red-500 transition" onClick={onCancel}>
                    <X size={26}/>
                </button>)}
            </div>

            {/*Inputs */}
            <div className="space-y-4">
                <input 
                    type="text" 
                    value={newTasks.title}
                    onChange={(e)=>setNewTask({...newTasks,title:e.target.value})}
                    placeholder="Task Title...." 
                    className="w-full px-4 py-3 bg-gray-800 
                    border border border-gray-600 rounded-lg text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                />
                <textarea 
                    value={newTasks.description}
                    onChange={(e)=>setNewTask({...newTasks,description:e.target.value})}
                    placeholder="Task description(optional)" 
                    className="w-full px-4 py-3 bg-gray-800 border-gray-600 round-lg text-white 
                    placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
                    rows="4"
                />

                <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 
                    rounded-lg flex items-center justify-center gap-2 hover:from-green-500 
                    hover:to-emerald-500 transition" onClick={onAdd}>
                    <Plus size={16}/>Add Task
                </button>
                <button className="flex-1 bg-gray-800 text-white py-3 px-4 
                    rounded-lg flex items-center justify-center gap-2 hover:from-green-500 hover:to-emerald-500 transition">
                    <X size={16}/>Cancel
                </button>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;