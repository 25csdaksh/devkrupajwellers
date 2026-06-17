import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, LogOut, Edit2, Check, X, Calendar, Loader2 } from 'lucide-react';

const UserProfile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(displayName.trim());
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      setError('Failed to update display name.');
    } finally {
      setLoading(false);
    }
  };

  // Format creation time
  const creationTime = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'N/A';

  return (
    <div className="min-h-[85vh] py-12 px-4 bg-dominant flex items-center justify-center">
      <div className="max-w-xl w-full glass-effect rounded-lg border border-white/10 p-8 shadow-2xl relative">
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-accent/40"></div>
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-accent/40"></div>

        <div className="border-b border-white/10 pb-6 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary p-4 rounded-full border border-accent/20">
              <User size={36} className="text-accent" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-serif font-bold text-primary">{user?.displayName || 'Valued Customer'}</h1>
              <p className="text-muted/60 text-xs">Customer Profile</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 px-4 py-2 rounded text-xs transition-colors font-semibold shadow"
          >
            <LogOut size={14} /> {t('logout')}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-xs flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded mb-6 text-xs flex items-center gap-2">
            <span>{success}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Name Edit Field */}
          <div className="bg-secondary/20 p-5 rounded-lg border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted/60 uppercase tracking-wider font-semibold">Display Name</span>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-accent hover:text-primary transition-colors text-xs flex items-center gap-1 font-medium underline"
                >
                  <Edit2 size={12} /> Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdate} className="flex gap-2">
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="flex-grow bg-dominant border border-white/10 rounded px-3 py-1.5 text-sm text-primary focus:outline-none focus:border-accent"
                  placeholder="Enter display name"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent text-dominant p-2 rounded hover:bg-yellow-500 transition-colors shadow"
                  title="Save Name"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Check size={16} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDisplayName(user?.displayName || '');
                    setIsEditing(false);
                  }}
                  className="border border-white/10 hover:bg-white/5 p-2 rounded text-primary transition-colors"
                  title="Cancel"
                >
                  <X size={16} />
                </button>
              </form>
            ) : (
              <p className="text-sm text-primary font-medium">{user?.displayName || 'Not Set'}</p>
            )}
          </div>

          {/* Email Information (Read-only for security) */}
          <div className="bg-secondary/20 p-5 rounded-lg border border-white/5 flex items-start gap-3">
            <Mail className="text-accent shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-xs text-muted/60 uppercase tracking-wider font-semibold block">Email Address</span>
              <span className="text-sm text-primary font-medium">{user?.email}</span>
            </div>
          </div>

          {/* Membership Date (Read-only) */}
          <div className="bg-secondary/20 p-5 rounded-lg border border-white/5 flex items-start gap-3">
            <Calendar className="text-accent shrink-0 mt-0.5" size={16} />
            <div>
              <span className="text-xs text-muted/60 uppercase tracking-wider font-semibold block">Member Since</span>
              <span className="text-sm text-primary font-medium">{creationTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
