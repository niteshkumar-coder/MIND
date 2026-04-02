import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';

export function BookAppointment() {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    problem: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Firestore
      const path = 'appointments';
      try {
        await addDoc(collection(db, path), {
          ...formData,
          status: 'pending',
          createdAt: serverTimestamp()
        });
      } catch (error) {
        const errInfo = {
          errorMessage: error instanceof Error ? error.message : String(error),
          operationType: 'create',
          path,
          userId: auth.currentUser?.uid,
        };
        console.error('Firestore Error: ', errInfo);
        throw error;
      }

      // 2. Prepare WhatsApp Message
      const whatsappNumber = '9142645990';
      const message = `New Appointment Booking:
Name: ${formData.fullName}
Mobile: ${formData.mobileNumber}
Date: ${formData.appointmentDate}
Time: ${formData.appointmentTime}
Problem: ${formData.problem || 'Not specified'}`;

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      // 3. Success State
      setIsSuccess(true);
      
      // 4. Redirect to WhatsApp after a short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 1500);

    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 pb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto max-w-md rounded-3xl bg-white p-12 text-center shadow-2xl"
        >
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Booking Successful!</h2>
          <p className="mb-8 text-gray-600">
            Your appointment request has been received. We are now redirecting you to WhatsApp to confirm your booking.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-medium text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting to WhatsApp...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Info Side */}
          <div>
            <h1 className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl">Book Your Appointment</h1>
            <p className="mb-10 text-lg text-gray-600">
              Fill out the form to schedule your visit. Our team will contact you shortly to confirm the exact time slot.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Call for Immediate Booking</h4>
                  <p className="text-gray-600">+91 9142645990</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Clinic Hours</h4>
                  <p className="text-gray-600">Mon - Sat: 10:00 AM - 08:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="mt-12 overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://picsum.photos/seed/booking-img/800/500"
                alt="Clinic"
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-white p-8 shadow-2xl md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Mobile Number</label>
                <div className="relative">
                  <Phone className="absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Enter your mobile number"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">Appointment Date</label>
                  <div className="relative">
                    <Calendar className="absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="appointmentDate"
                      required
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">Preferred Time</label>
                  <div className="relative">
                    <Clock className="absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                    <select
                      name="appointmentTime"
                      required
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className="w-full appearance-none rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select Time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                      <option value="06:00 PM">06:00 PM</option>
                      <option value="07:00 PM">07:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">Problem / Message (Optional)</label>
                <div className="relative">
                  <MessageSquare className="absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                  <textarea
                    name="problem"
                    rows={4}
                    value={formData.problem}
                    onChange={handleChange}
                    placeholder="Briefly describe your dental problem"
                    className="w-full rounded-xl border border-gray-200 py-3.5 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-blue-200 disabled:opacity-70 active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm & Book via WhatsApp
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-500">
                By clicking "Confirm & Book", you will be redirected to WhatsApp to complete your booking.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
