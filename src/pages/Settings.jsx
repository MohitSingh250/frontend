import React, { useEffect, useState } from "react";
import api from "../api";
import { Settings as SettingsIcon, User, MapPin, Globe, Github, Linkedin, Save, Loader2, Key, Camera } from "lucide-react";
import toast from "react-hot-toast";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    location: "",
    avatar: "",
    about: "",
    website: "",
    github: "",
    linkedin: "",
    skills: "",
    oldPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
        setFormData({
          username: res.data.username || "",
          location: res.data.location || "",
          avatar: res.data.avatar || "",
          about: res.data.about || "",
          website: res.data.website || "",
          github: res.data.github || "",
          linkedin: res.data.linkedin || "",
          skills: res.data.skills?.join(", ") || "",
          oldPassword: "",
          newPassword: ""
        });
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...formData,
        skills: formData.skills.split(",").map(s => s.trim()).filter(Boolean)
      };
      if (!body.oldPassword || !body.newPassword) {
        delete body.oldPassword;
        delete body.newPassword;
      }
      const res = await api.put("/auth/me", body);
      toast.success("Profile updated successfully!");
      setUser(res.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--text-secondary)]">
        <Loader2 className="animate-spin mr-2" /> Loading settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-primary)]">
            <SettingsIcon size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-[var(--text-secondary)] text-sm">
              Manage your profile and account preferences
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Section */}
          <div className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-primary)] p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={18} className="text-[var(--brand-orange)]" />
              Public Profile
            </h3>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <img 
                    src={formData.avatar || "https://via.placeholder.com/120"} 
                    alt="avatar" 
                    className="w-32 h-32 rounded-3xl object-cover border-2 border-[var(--border-primary)] group-hover:border-[var(--brand-orange)] transition-colors"
                  />
                  <div className="absolute inset-0 bg-[var(--bg-overlay)] rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
                <span className="text-xs text-[var(--text-tertiary)]">Click to change</span>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Username" name="username" value={formData.username} onChange={handleChange} />
                <Input label="Location" name="location" value={formData.location} onChange={handleChange} icon={<MapPin size={16} />} />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">About Me</label>
                  <textarea 
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-orange)] min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-primary)] p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Globe size={18} className="text-[var(--accent-blue)]" />
              Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Website" name="website" value={formData.website} onChange={handleChange} icon={<Globe size={16} />} placeholder="https://" />
              <Input label="GitHub" name="github" value={formData.github} onChange={handleChange} icon={<Github size={16} />} placeholder="username" />
              <Input label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} icon={<Linkedin size={16} />} placeholder="username" />
              <Input label="Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Python, etc." />
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-primary)] p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Key size={18} className="text-[var(--color-hard)]" />
              Security
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Old Password" type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
              <Input label="New Password" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={saving}
              className="px-10 py-4 bg-[var(--brand-orange)] text-white rounded-2xl font-bold text-base hover:scale-105 transition-all shadow-xl shadow-[var(--brand-orange)]/20 flex items-center gap-3 disabled:opacity-50"
            >
              {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, icon, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{label}</label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
            {icon}
          </div>
        )}
        <input 
          {...props}
          className={`w-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl py-3 ${icon ? 'pl-12' : 'px-4'} pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--brand-orange)] transition-all`}
        />
      </div>
    </div>
  );
}
