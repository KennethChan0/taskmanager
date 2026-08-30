import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  const { user } = useAuth();

  const handleDelete = async (taskId) => {
    const confirmation = window.confirm("Are you sure to remove this item?");
    if (confirmation === false){
      return false;
    }
    try {
      await axiosInstance.delete(`/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      alert('Failed to delete menu item.');
    }
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{task.title}</h2>
          {task.photo && (
            <img
              src={task.photo}
              alt={task.title}
              className="w-40 h-40 object-cover rounded mt-3 mb-3"
            />
          )}
          {task.description && <p className="mb-2">{task.description}</p>}
          <p>
            Category: {task.category}
          </p>
          <p >
            Price: ${Number(task.price)}
          </p>
          
          {user.role === 'restaurant' && (
          <div className="mt-2">
            <button
              onClick={() => setEditingTask(task)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit Menu Item
            </button>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Menu Item
            </button>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
