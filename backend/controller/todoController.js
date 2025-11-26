const Todo= require ("../models/todoModel");

exports.getAllTodos=async(req,res)=>{
    try{
        const task = (await Todo.find().sort({createdAt : -1}));
        res.json(task);
    } catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.getTodo = async(req,res)=>{
    try{
        const tasks = await Todo.findById(req.params.id);
        if(!tasks){
            return res.status(404).json({message:"Task not found"});
        }
        res.json(tasks);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.createTodo= async(req,res)=>{
    try{
        const tasks = new Todo({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed  || false
        });

        const savedTask = await tasks.save();
        res.status(201).json(savedTask);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.updateTodo = async(req,res)=>{
    try{
        const tasks=await Todo.findById(req.params.id);
        if(!tasks){
            return res.status(404).json({message:"Task not found"});
        }

        tasks.title=req.body.title || tasks.title;
        tasks.description= req.body.description !== undefined ? req.body.description : tasks.description;
        tasks.completed= req.body.completed !== undefined ? req.body.completed : tasks.completed;
        

        const updateTask = await tasks.save();
        res.json(updateTask);
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.deleteTodo=async(req,res)=>{
    try{
        const tasks=await Todo.findByIdAndDelete(req.params.id);
        if(!tasks){
            return res.status(404).json({message:"Task not found"});
        }

        res.json({message : "Task deleted succesfully"});
    }catch(err){
        res.status(500).json({message:err.message});
    }
};

exports.toggleComplete=async(req,res)=>{
    try{
        const tasks=await Todo.findById(req.params.id);
        if(!tasks){
            return res.status(404).json({message:"Task not found"});
        }

        tasks.completed=!tasks.completed;
        tasks.updatedAt=new Date();

        const updateTasks=await tasks.save();
        res.json(updateTasks);

        }catch(err){
        res.status(500).json({message:err.message});
    }
};