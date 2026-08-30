const Task = require('../models/Task');

const checkPhoto = (photoUrl) => {
  try {
    const url = new URL(photoUrl);

    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const addTask = async (req, res) => {
    const { title, price, category, description, photo } = req.body;
    const errors = {};

    if(title ===null||title===""||title ===undefined|| title.trim()===""){
        errors.title = "Food Item Name is required"
    }

    const price_number = Number(price);
    if(price_number<0||!Number.isFinite(price_number) ){
        errors.price = 'Price must be greater than 0.'
    }

    if (category===null||category===""||category===undefined||category.trim()==="") {
    errors.category = 'Category is required.';
    }

    if (description===null||description===""||description===undefined || description.trim() === '') {
  errors.description = 'Description is required.';
}

    if (!photo && !checkPhoto(photo.trim())) {
        errors.photo = 'Photo must be a valid URL.';
    }
    
    if (Object.keys(errors).length > 0) {
    return res.status(400).json({
       errors:errors
    });
  }

    try {
        const task = await Task.create({ userId: req.user.id, title:title.trim(),price:price_number,category: category.trim(), description:  description.trim(),photo: photo.trim(),});
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ 
  errors: errors, });
    }
};



const updateTask = async (req, res) => {
    const { title, price, category, description, photo } = req.body;
    const errors = {};

    if(title ===null||title===""||title ===undefined|| title.trim()===""){
        errors.title = "Food Item Name is required"
    }

    const price_number = Number(price);
    if(price_number<0||!Number.isFinite(price_number) ){
        errors.price = 'Price must be greater than 0.'
    }

    if (category===null||category===""||category===undefined||category.trim()==="") {
    errors.category = 'Category is required.';
    }

    if (description===null||description===""||description===undefined || description.trim() === '') {
  errors.description = 'Description is required.';
}

    if (!photo && !checkPhoto(photo.trim())) {
        errors.photo = 'Photo must be a valid URL.';
    }
    
    if (Object.keys(errors).length > 0) {
    return res.status(400).json({
       errors:errors
    });
  }

    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Menu item not found' });
        
        task.title = title.trim();
        task.price = price_number;
        task.category = category.trim();
        task.description = description.trim();
        task.photo = photo.trim();

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        await task.remove();
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = { getTasks, addTask, updateTask, deleteTask };
