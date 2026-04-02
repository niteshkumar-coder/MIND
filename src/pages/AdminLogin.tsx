import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { motion } from 'motion/react';
import { Lock, LogIn, ShieldAlert, Loader2, Key } from 'lucide-react';

export function AdminLogin() {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const adminEmail = 'niteshkumar9128ku@gmail.com';
  const correctPassword = 'N12N';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === adminEmail) {
        // Even if logged in with Google, we might want to stay on login page if password isn't verified
        // But for simplicity, we'll allow auto-redirect if already authenticated
        navigate('/admin/dashboard');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== correctPassword) {
      setError('Incorrect password. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== adminEmail) {
        await auth.signOut();
        setError('Unauthorized access. Only the administrator can log in.');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to log in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[2.5rem] bg-white p-8 shadow-2xl md:p-12"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-gray-900">Admin Login</h1>
          <p className="mt-2 font-medium text-gray-500">MindDental Appointment Panel</p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
            <ShieldAlert className="h-5 w-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-gray-400">
              Admin Password
            </label>
            <div className="relative">
              <Key className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border-none bg-gray-50 py-4 pl-12 pr-4 font-bold text-gray-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-900 py-4 text-lg font-black text-white shadow-xl shadow-gray-200 transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                Verify & Sign in
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs font-bold text-gray-400">
          Authorized personnel only. All access attempts are logged.
        </p>
      </motion.div>
    </div>
  );
}
