import { useState } from "react";
import api from "../api";

export default function EditProfileModal({ user, onClose, onUpdated }) {
  const [username, setUsername] = useState(user?.username || "");
  const [location, setLocation] = useState(user?.location || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage("");
      const body = { username, location, avatar };
      if (oldPassword && newPassword) {
        body.oldPassword = oldPassword;
        body.newPassword = newPassword;
      }

      const res = await api.put("/auth/me", body);
      setMessage("✅ Profile updated!");
      onUpdated(res.data.user);
      setTimeout(() => onClose(), 1000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Update failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 p-6 rounded-2xl w-full max-w-md border border-neutral-700">
        <h2 className="text-xl font-semibold mb-4 text-white text-center">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Avatar URL</label>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
              />
            </div>
          </div>
        </div>

        {message && <p className="text-center text-sm mt-4 text-gray-300">{message}</p>}

        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
