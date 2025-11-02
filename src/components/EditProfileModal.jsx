import { useState } from "react";
import api from "../api";

export default function EditProfileModal({ user, onClose, onUpdated }) {
  const [username, setUsername] = useState(user?.username || "");
  const [location, setLocation] = useState(user?.location || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await api.post("/auth/me/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAvatar(res.data.avatar);
      setMessage("✅ Avatar uploaded!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

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
      console.error(err);
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

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-5 relative group">
          <div className="relative">
            <img
              src={avatar || "https://via.placeholder.com/100"}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border border-neutral-700 transition-all group-hover:opacity-80"
            />

            {/* Hover overlay */}
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center bg-black/60 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full"
            >
              Change Photo
            </label>

            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>
          {uploading && (
            <p className="text-xs text-gray-400 mt-2">Uploading...</p>
          )}
        </div>

        {/* Profile Fields */}
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
            <label className="block text-sm text-gray-400 mb-1">
              Or paste Avatar URL
            </label>
            <input
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 rounded bg-neutral-800 text-white border border-neutral-700"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-sm mt-4 text-gray-300">{message}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading || uploading}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
