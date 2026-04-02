import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export function Contact() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-gray-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-extrabold md:text-5xl"
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-gray-400"
          >
            Have questions or need to schedule an emergency visit? We're here to help. Reach out to us through any of the channels below.
          </motion.p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
            {/* Contact Cards */}
            <div className="space-y-8">
              <div className="rounded-3xl bg-blue-50 p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Phone</h3>
                <p className="mb-4 text-gray-600">Call us for appointments or inquiries.</p>
                <a href="tel:9142645990" className="text-lg font-bold text-blue-600 hover:underline">+91 9142645990</a>
              </div>

              <div className="rounded-3xl bg-green-50 p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg shadow-green-200">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Email</h3>
                <p className="mb-4 text-gray-600">Send us your questions anytime.</p>
                <a href="mailto:info@minddental.com" className="text-lg font-bold text-green-600 hover:underline">info@minddental.com</a>
              </div>

              <div className="rounded-3xl bg-orange-50 p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-white shadow-lg shadow-orange-200">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Location</h3>
                <p className="mb-4 text-gray-600">Visit our modern clinic facility.</p>
                <p className="text-lg font-bold text-orange-600">MindDental Clinic, Sector 18, Noida, UP</p>
              </div>
            </div>

            {/* Map & Hours */}
            <div className="lg:col-span-2">
              <div className="mb-12 overflow-hidden rounded-3xl shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.273912345678!2d77.3259!3d28.5708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a431234567%3A0x1234567890abcdef!2sSector%2018%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1648812345678!5m2!1sen!2sin"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MindDental Clinic Location"
                ></iframe>
              </div>

              <div className="rounded-3xl bg-gray-50 p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Clinic Hours</h3>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-600">Monday - Friday</span>
                    <span className="font-bold text-gray-900">10:00 AM - 08:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-600">Saturday</span>
                    <span className="font-bold text-gray-900">10:00 AM - 06:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="font-medium text-gray-600">Sunday</span>
                    <span className="font-bold text-red-500 uppercase tracking-wider">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
