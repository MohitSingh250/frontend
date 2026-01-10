import { useEffect, useState } from "react";
import api from "../../api";
import { Search, Shield, Ban, CheckCircle, MoreVertical } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    api.get("/admin/users")
      .then((res) => setUsers(res.data?.users ?? []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  const handleBan = (userId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? "unban" : "ban"} this user?`)) return;

    api.put(`/admin/users/${userId}/ban`, { isBanned: !currentStatus })
      .then(() => {
        setUsers(users.map(u => u._id === userId ? { ...u, isBanned: !currentStatus } : u));
      })
      .catch(err => alert("Failed to update ban status"));
  };

  const handleRoleChange = (userId, newRole) => {
    if (!window.confirm(`Promote user to ${newRole}?`)) return;

    const roles = newRole === 'admin' ? ['user', 'admin'] : ['user'];
    api.put(`/admin/users/${userId}/role`, { roles })
      .then(() => {
        setUsers(users.map(u => u._id === userId ? { ...u, roles } : u));
      })
      .catch(err => alert("Failed to update role"));
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">User Management</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" size={18} />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl bg-[#282828] border border-[#3E3E3E] text-white focus:border-[#FFA217] outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-[#282828] border border-[#3E3E3E] rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#3E3E3E] text-[#8A8A8A] text-xs uppercase font-bold">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#3E3E3E]">
            {loading ? (
              <tr><td colSpan="5" className="p-8 text-center text-[#8A8A8A]">Loading users...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center text-[#8A8A8A]">No users found.</td></tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id} className="hover:bg-[#3E3E3E]/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3E3E3E] flex items-center justify-center font-bold text-white">
                        {user.username[0].toUpperCase()}
                      </div>
                      <span className="font-medium text-white">{user.username}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[#DAE0DE]">{user.email}</td>
                  <td className="p-4">
                    {user.roles.includes('admin') ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-purple-500/10 text-purple-500 text-xs font-bold border border-purple-500/20">
                        <Shield size={12} /> Admin
                      </span>
                    ) : (
                      <span className="text-[#8A8A8A] text-sm">User</span>
                    )}
                  </td>
                  <td className="p-4">
                    {user.isBanned ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-red-500/10 text-red-500 text-xs font-bold border border-red-500/20">
                        <Ban size={12} /> Banned
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                        <CheckCircle size={12} /> Active
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleBan(user._id, user.isBanned)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.isBanned 
                            ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" 
                            : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        }`}
                        title={user.isBanned ? "Unban User" : "Ban User"}
                      >
                        <Ban size={16} />
                      </button>
                      
                      {!user.roles.includes('admin') && (
                        <button 
                          onClick={() => handleRoleChange(user._id, 'admin')}
                          className="p-2 rounded-lg bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 transition-colors"
                          title="Promote to Admin"
                        >
                          <Shield size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
