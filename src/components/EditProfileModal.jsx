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
      setTimeout(() => onClose(), 1200);
    } catch (err) {
      console.error(err);
      setMessage("❌ " + (err.response?.data?.message || "Update failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div
        className="
          bg-[var(--dark-slate-gray)]/80 border border-[var(--spanish-orange)]/20
          rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-[0_0_25px_rgba(233,111,30,0.15)]
          transition-all duration-300
        "
      >
        <h2 className="text-2xl font-semibold text-center text-[var(--white)] mb-6">
          Edit Profile
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6 relative group">
          <div className="relative">
            <img
              src={avatar || "https://via.placeholder.com/100"}
              alt="avatar"
              className="
                w-28 h-28 rounded-full object-cover border-2
                border-[var(--orange-peel)]/20
                transition-all duration-300
                group-hover:border-[var(--orange-peel)]/40
                shadow-[0_0_15px_rgba(255,162,24,0.1)]
              "
            />

            <label
              htmlFor="avatar-upload"
              className="
                absolute inset-0 flex items-center justify-center
                bg-black/60 text-[var(--white)] text-xs rounded-full
                opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer
              "
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
            <p className="text-xs text-[var(--orange-peel)] mt-2">Uploading...</p>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <Field
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Field
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Field
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://example.com/avatar.jpg"
          />

          {/* Password fields */}
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Field
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              message.includes("✅")
                ? "text-[var(--dark-pastel-green)]"
                : "text-[var(--spanish-orange)]"
            }`}
          >
            {message}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg font-medium
              bg-[var(--raisin-black)]/60 text-[var(--white)]/90
              border border-[var(--orange-peel)]/20
              hover:bg-[var(--orange-peel)]/10
              transition-all
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading || uploading}
            className="
              px-5 py-2 rounded-lg font-semibold text-white
              bg-[var(--spanish-orange)] hover:bg-[var(--orange-peel)]
              shadow-[0_0_12px_rgba(233,111,30,0.3)]
              transition-all duration-200
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm text-[var(--white)]/70 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full px-3 py-2 rounded-lg
          bg-[var(--raisin-black)]/70 border border-[var(--orange-peel)]/20
          text-[var(--white)]
          placeholder-[var(--white)]/40
          focus:outline-none focus:border-[var(--orange-peel)]
          transition-all duration-200
        "
      />
    </div>
  );
}
