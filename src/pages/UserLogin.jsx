import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

const UserLogin = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user came from a protected route
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Navigate to where they were going or back home
      navigate(from, { replace: true });
    } catch (err) {
      console.error("User login error:", err);
      setError('Invalid email or password. Please verify your details.');
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
            <Lock className="text-accent animate-pulse" size={28} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary">{t('login')}</h2>
          <p className="text-muted mt-2 text-sm">{t('enterDetails')}</p>
        </div>

        {location.state?.from && (
          <div className="bg-accent/10 border border-accent/40 text-accent px-4 py-3 rounded mb-6 text-xs flex items-center gap-2">
            <AlertCircle size={14} className="shrink-0" />
            <span>{t('collectionsProtectedMsg')}</span>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs text-secondary mb-2 uppercase tracking-wider font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-white/40" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 rounded pl-10 pr-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/20 text-sm"
                placeholder="example@mail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-secondary mb-2 uppercase tracking-wider font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-white/40" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary/50 border border-white/10 rounded pl-10 pr-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors placeholder-white/20 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-dominant font-bold py-4 rounded hover:bg-yellow-500 hover:scale-[1.01] active:scale-[0.99] transition-all flex justify-center items-center gap-2 text-sm shadow-lg shadow-accent/10"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Logging In...</span>
              </>
            ) : (
              t('login')
            )}
          </button>
        </form>

        <div className="mt-6 text-center border-t border-white/5 pt-6 text-sm">
          <span className="text-muted/60">{t('dontHaveAccount')} </span>
          <Link
            to="/signup"
            state={location.state}
            className="text-accent hover:text-primary transition-colors font-medium underline underline-offset-4"
          >
            {t('signup')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
