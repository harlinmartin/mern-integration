import { useState, useEffect } from 'react';
import axios from 'axios';

const Userdata = ({ user }) => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('/api/customers', config);
      setCustomers(res.data.data);
      setLoading(false);
    } catch (err) {
      setError('Could not fetch customers');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone) {
      setError('Name, Email and Phone are required');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`/api/customers/${editId}`, formData, config);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post('/api/customers', formData, config);
      }
      setFormData({ name: '', email: '', phone: '', address: '' });
      fetchCustomers();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  const onEdit = (customer) => {
    setIsEditing(true);
    setEditId(customer._id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address || ''
    });
  };

  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`/api/customers/${id}`, config);
        fetchCustomers();
      } catch (err) {
        setError('Delete failed');
      }
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;

  return (
    <div className="space-y-10">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isEditing ? 'Edit Customer' : 'Add New Customer'}
        </h2>
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">{error}</div>}
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Customer Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="+1 234 567 890"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              placeholder="City, Country"
            />
          </div>
          <div className="md:col-span-2 flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition shadow-md"
            >
              {isEditing ? 'Update Customer' : 'Add Customer'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden max-w-5xl mx-auto">
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Customer List</h2>
          <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
            {customers.length} Total
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 uppercase text-xs font-bold tracking-wider">
                <th className="px-8 py-4">Name</th>
                <th className="px-8 py-4">Contact</th>
                <th className="px-8 py-4">Address</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((customer) => (
                <tr key={customer._id} className="hover:bg-slate-50 transition">
                  <td className="px-8 py-5">
                    <div className="font-semibold text-gray-800">{customer.name}</div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="text-gray-600 text-sm">{customer.email}</div>
                    <div className="text-gray-400 text-xs mt-1">{customer.phone}</div>
                  </td>
                  <td className="px-8 py-5 text-gray-600">{customer.address || '-'}</td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center space-x-3">
                      <button
                        onClick={() => onEdit(customer)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(customer._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="4" className="px-8 py-10 text-center text-gray-500 italic">
                    No customers found. Add your first customer above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Userdata;
