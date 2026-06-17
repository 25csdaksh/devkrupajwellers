import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Lock, UserPlus, Loader2 } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isRegistering) {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('Admin account created successfully! You can now log in.');
        setIsRegistering(false);
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        console.error("Signup error:", err);
        setError(err.message || 'Failed to create admin account. Check Firebase configuration.');
      } finally {
        setLoading(false);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/admin/dashboard');
      } catch (err) {
        console.error("Login error:", err);
        setError('Invalid email or password. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dominant px-4">
      <div className="max-w-md w-full glass-effect p-8 rounded-lg border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/20">
            {isRegistering ? (
              <UserPlus className="text-accent" size={32} />
            ) : (
              <Lock className="text-accent" size={32} />
            )}
          </div>
          <h2 className="text-3xl font-serif font-bold text-primary">
            {isRegistering ? 'Register Admin' : 'Admin Login'}
          </h2>
          <p className="text-muted mt-2">
            {isRegistering ? 'Create a secure store manager account' : 'Manage your Devkrupa Jewellers store'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 px-4 py-3 rounded mb-6 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="admin@devkrupajewellers.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
              placeholder="••••••••"
            />
          </div>

          {isRegistering && (
            <div>
              <label className="block text-sm font-medium text-secondary mb-2">Confirm Password</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-secondary border border-white/10 rounded px-4 py-3 text-primary focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-dominant font-bold py-4 rounded hover:bg-yellow-500 transition-colors flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Processing...</span>
              </>
            ) : isRegistering ? (
              'Create Admin Account'
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
              setSuccess('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-accent hover:text-primary transition-colors text-sm font-medium underline underline-offset-4"
          >
            {isRegistering ? 'Back to Admin Login' : 'First-time setup? Register Admin account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
