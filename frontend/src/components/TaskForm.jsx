import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ title: '', price:'',category:'', description:'',photo:'' });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        price: editingTask.price ,
        category: editingTask.category ,
        description: editingTask.description,
        photo: editingTask.photo,
      });
    } else {
      setFormData({ 
        title: '',
        price: '',
        category: '',
        description: '',
        photo: '',
});
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        const response = await axiosInstance.put(`/api/tasks/${editingTask._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks(tasks.map((task) => (task._id === response.data._id ? response.data : task)));
      } else {
        const response = await axiosInstance.post('/api/tasks', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasks([...tasks, response.data]);
      }
      setEditingTask(null);
      setFormData({ title: '',
        price: '',
        category: '',
        description: '',
        photo: '' });
    } catch (error) {
      const errors = error.response?.data?.errors;

      alert(
        errors?.title ||
        errors?.price ||
        errors?.category ||
        errors?.description ||
        errors?.photo ||
        'Failed to save menu item.');
        }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTask ? 'Edit Menu Item' : 'Add Menu Item'}</h1>

      <input
        required
        type="text"
        name="title"
        placeholder="Menu Name(required)"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        required
        type="number"
        name="price"
        placeholder="Price(required)"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        min="0"
        step="0.01"
        className="w-full mb-4 p-2 border rounded"
      />
      <input
      required
        type="text"
        name="category"
        placeholder="Category(required)"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <textarea
      required
        name="description"
        placeholder="Description(required)"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        required
        type="url"
        name="photo"
        placeholder="Photo URL(required)"
        value={formData.photo}
        onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />


      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTask ? 'Edit Menu Item' : 'Add Menu Item'}
      </button>
    </form>
  );
};

export default TaskForm;


// testing link to jira