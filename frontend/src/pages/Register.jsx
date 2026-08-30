import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/auth/register', formData);
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
        <p className="mb-2 font-medium">Register as:</p>

        <div className="flex justify-center gap-20">
        <label>
          <input
            type="radio"
            name="role"
            value="customer"
            checked={formData.role === 'customer'}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
          Customer
        </label>

        <label>
          <input
            type="radio"
            name="role"
            value="restaurant"
            checked={formData.role === 'restaurant'}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />
          Restaurant
        </label>
    </div>
        
        <button type="submit" className="w-full mt-3 bg-green-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
