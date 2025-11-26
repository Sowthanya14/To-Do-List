const API_BASE_URL = "http://localhost:8000/api/v2";

export const fetchTaskApi = async()=>{
    const results = await fetch(`${API_BASE_URL}/todos`);
    if(!results.ok) throw new Error("Failted to fetch task");
    return results.json();
};

export const createTaskApi = async(task)=>{
    const results = await fetch(`${API_BASE_URL}/todos`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(task),
    });
    if(!results.ok) throw new Error("Failed to create task");
    return results.json();
};

export const updateTaskApi = async(id,updates)=>{
    const results = await fetch(`${API_BASE_URL}/todos/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(updates),
    });
    if(!results.ok) throw new Error("Failed to create task");
    return results.json();
};

export const deleteTaskApi = async(id)=>{
    const results = await fetch(`${API_BASE_URL}/todos/${id}`,{
        method:"DELETE",
    });
    if(!results.ok) throw new Error("Failed to create task");
    return true;
};

export const toggleTaskApi = async(id)=>{
    const results = await fetch(`${API_BASE_URL}/todos/${id}/toggle`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        }
    });
    if(!results.ok) throw new Error("Failed to create task");
    return results.json();
};