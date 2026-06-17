import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, User, Loader2, AlertCircle } from 'lucide-react';

const UserSignup = () => {
  const { signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user came from a protected route
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      // Auto-navigate to original route or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error("User signup error:", err);
      setError(err.message || 'Failed to create account. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-dominant px-4 py-16">
      <div className="max-w-md w-full glass-effect p-8 rounded-lg border border-white/10 shadow-2xl relative">
        <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t border-l border-accent/40"></div>
        <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b border-r border-accent/40"></div>

        <div className="text-center mb-8">
          <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
            <User className="text-accent animate-pulse" size={28} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary">{t('signup')}</h2>
          <p className="text-muted mt-2 text-sm">{t('createAccount')}</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-secondary mb-1.5 uppercase tracking-wider font-semibold">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-white/40" size={16} />
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 rounded pl-10 pr-4 py-2.5 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/20 text-sm"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-secondary mb-1.5 uppercase tracking-wider font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-white/40" size={16} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 rounded pl-10 pr-4 py-2.5 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/20 text-sm"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-secondary mb-1.5 uppercase tracking-wider font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/40" size={16} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 rounded pl-10 pr-4 py-2.5 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/20 text-sm"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-secondary mb-1.5 uppercase tracking-wider font-semibold">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-white/40" size={16} />
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 rounded pl-10 pr-4 py-2.5 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/20 text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-dominant font-bold py-3.5 rounded hover:bg-yellow-500 hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 text-sm shadow-lg shadow-accent/10 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Registering...</span>
              </>
            ) : (
              t('signup')
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-white/5 pt-6 text-sm">
          <span className="text-muted/60">{t('alreadyHaveAccount')} </span>
          <Link
            to="/login"
            state={location.state}
            className="text-accent hover:text-primary transition-colors font-medium underline underline-offset-4"
          >
            {t('login')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
