import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, 
  Users, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Trash2, 
  Search, 
  Loader2, 
  CheckCircle2,
  ExternalLink,
  Clock,
  LayoutDashboard,
  Filter,
  ChevronRight,
  Menu,
  X,
  AlertCircle
} from 'lucide-react';

interface Appointment {
  id: string;
  fullName: string;
  mobileNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  problem: string;
  status: 'pending' | 'completed';
  createdAt: any;
}

export function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const adminEmail = 'niteshkumar9128ku@gmail.com';

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== adminEmail) {
        navigate('/admin');
      }
    });

    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Appointment[];
      setAppointments(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin');
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteDoc(doc(db, 'appointments', deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Failed to delete appointment.');
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    try {
      await updateDoc(doc(db, 'appointments', id), {
        status: newStatus
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.mobileNumber.includes(searchTerm);
    const matchesDate = dateFilter ? app.appointmentDate === dateFilter : true;
    return matchesSearch && matchesDate;
  });

  const stats = {
    total: appointments.length,
    today: appointments.filter(a => a.appointmentDate === new Date().toISOString().split('T')[0]).length,
    pending: appointments.filter(a => a.status === 'pending').length,
    completed: appointments.filter(a => a.status === 'completed').length
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 font-medium text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <LayoutDashboard className="h-6 w-6" />
              </div>
              <span className="text-xl font-black tracking-tight text-gray-900">MindDental</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            <button className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-bold text-blue-600 transition-all">
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600">
              <Calendar className="h-5 w-5" />
              Appointments
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-gray-400 transition-all hover:bg-gray-50 hover:text-gray-600">
              <Users className="h-5 w-5" />
              Patients
            </button>
          </nav>

          <div className="border-t border-gray-100 p-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-bold text-red-500 transition-all hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-md lg:hidden">
          <button onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <span className="text-lg font-bold text-gray-900">Admin Panel</span>
          <div className="h-6 w-6" /> {/* Spacer */}
        </header>

        <div className="p-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-gray-900">Appointments</h1>
              <p className="text-gray-500">Manage and track patient bookings</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm">
                <Clock className="h-4 w-4 text-blue-500" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Bookings', value: stats.total, icon: Users, color: 'blue' },
              { label: "Today's", value: stats.today, icon: Calendar, color: 'green' },
              { label: 'Pending', value: stats.pending, icon: AlertCircle, color: 'orange' },
              { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'purple' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Filters & Table */}
          <div className="rounded-[2.5rem] bg-white p-8 shadow-xl shadow-gray-200/50">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search name or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl border-none bg-gray-50 py-4 pl-12 pr-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="flex w-full items-center gap-4 lg:w-auto">
                <div className="relative flex-1 lg:w-48">
                  <Filter className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full rounded-2xl border-none bg-gray-50 py-4 pl-10 pr-4 font-medium text-gray-900 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                {dateFilter && (
                  <button 
                    onClick={() => setDateFilter('')}
                    className="text-sm font-bold text-blue-600 hover:underline"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 text-xs font-black uppercase tracking-widest text-gray-400">
                    <th className="px-4 py-6">Patient Details</th>
                    <th className="px-4 py-6">Schedule</th>
                    <th className="px-4 py-6">Status</th>
                    <th className="px-4 py-6">Problem</th>
                    <th className="px-4 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <AnimatePresence mode="popLayout">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((app) => (
                        <motion.tr
                          key={app.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="group transition-colors hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-6">
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-xl font-black text-blue-600">
                                {app.fullName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-black text-gray-900">{app.fullName}</div>
                                <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                                  <Phone className="h-3 w-3" />
                                  {app.mobileNumber}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-6">
                            <div className="font-black text-gray-900">{app.appointmentDate}</div>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                              <Clock className="h-3 w-3" />
                              {app.appointmentTime}
                            </div>
                          </td>
                          <td className="px-4 py-6">
                            <button
                              onClick={() => toggleStatus(app.id, app.status)}
                              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider transition-all ${
                                app.status === 'completed'
                                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                              }`}
                            >
                              <div className={`h-1.5 w-1.5 rounded-full ${app.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'}`} />
                              {app.status}
                            </button>
                          </td>
                          <td className="px-4 py-6">
                            <div className="max-w-xs truncate text-sm font-medium text-gray-500" title={app.problem}>
                              {app.problem || <span className="italic opacity-50">No message</span>}
                            </div>
                          </td>
                          <td className="px-4 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <a 
                                href={`https://wa.me/${app.mobileNumber}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-all hover:bg-green-100"
                                title="WhatsApp Patient"
                              >
                                <ExternalLink className="h-5 w-5" />
                              </a>
                              <button
                                onClick={() => setDeleteId(app.id)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 transition-all hover:bg-red-100"
                                title="Delete Record"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-4 py-20 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-400">
                            <Search className="mb-4 h-12 w-12 opacity-20" />
                            <p className="text-xl font-bold">No appointments found</p>
                            <p className="text-sm">Try adjusting your search or filters</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-10 shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-600">
                <Trash2 className="h-10 w-10" />
              </div>
              <h3 className="mb-3 text-2xl font-black tracking-tight text-gray-900">Delete Record?</h3>
              <p className="mb-10 font-medium text-gray-500 leading-relaxed">
                This action is permanent and cannot be undone. All patient data associated with this appointment will be lost.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-2xl bg-gray-100 py-4 font-black text-gray-600 transition-all hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 rounded-2xl bg-red-600 py-4 font-black text-white shadow-lg shadow-red-200 transition-all hover:bg-red-700 hover:shadow-red-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
