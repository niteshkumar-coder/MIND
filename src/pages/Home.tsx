import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Star, Shield, Clock, Users, Calendar } from 'lucide-react';

const services = [
  { title: 'Teeth Cleaning', description: 'Professional cleaning to remove plaque and tartar.', icon: '🦷' },
  { title: 'Root Canal', description: 'Saving your natural teeth with advanced procedures.', icon: '🔬' },
  { title: 'Dental Implants', description: 'Permanent solutions for missing teeth.', icon: '🔩' },
  { title: 'Teeth Whitening', description: 'Brighten your smile with our safe whitening treatments.', icon: '✨' },
];

const testimonials = [
  { name: 'Rahul Sharma', text: 'Best dental experience I have ever had. The doctors are very professional and gentle.', rating: 5 },
  { name: 'Priya Verma', text: 'MindDental transformed my smile with braces. Highly recommend their orthodontic services!', rating: 5 },
  { name: 'Anil Gupta', text: 'Very clean clinic and friendly staff. They explained everything clearly before starting.', rating: 5 },
];

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center pt-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-blue-50/50 blur-3xl"></div>
          <div className="absolute -bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-blue-100/30 blur-3xl"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="mb-4 inline-block rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-600">
                #1 Dental Clinic in New Delhi
              </span>
              <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-7xl">
                Your Smile, <br />
                <span className="text-blue-600">Our Priority</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
                Experience world-class dental care with state-of-the-art technology and a team of expert dentists dedicated to your oral health.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/book"
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-blue-700 hover:shadow-blue-200 active:scale-95"
                >
                  Book Appointment
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/services"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-all hover:border-blue-600 hover:text-blue-600"
                >
                  Our Services
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`}
                      alt="User"
                      className="h-10 w-10 rounded-full border-2 border-white object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  <span className="font-bold text-gray-900">5,000+</span> Happy Patients
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://picsum.photos/seed/dentist/800/1000"
                  alt="Modern Dental Clinic"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl bg-white p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Certified Clinic</p>
                    <p className="text-lg font-bold text-gray-900">ISO 9001:2015</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Our Specialized Services</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              We offer a wide range of dental treatments using the latest technology to ensure the best results for our patients.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-3xl transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{service.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-gray-600">{service.description}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Intro */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <img
                src="https://picsum.photos/seed/clinic-interior/800/600"
                alt="Clinic Interior"
                className="rounded-3xl shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Why Choose MindDental?</h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                At MindDental, we believe that a visit to the dentist should be a positive and stress-free experience. Our clinic is designed with your comfort in mind.
              </p>
              <ul className="space-y-4">
                {[
                  'Expert Doctors with 15+ years experience',
                  'Advanced Digital X-Rays & Imaging',
                  'Painless Treatment Options',
                  'Strict Sterilization Protocols',
                  'Affordable & Transparent Pricing',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-sm font-bold text-white transition-all hover:bg-gray-800"
                >
                  Read Our Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-600 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">What Our Patients Say</h2>
            <p className="mx-auto max-w-2xl text-blue-100">
              Real stories from real patients who trusted us with their smiles.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 italic text-blue-50">"{t.text}"</p>
                <p className="font-bold">{t.name}</p>
                <p className="text-xs text-blue-200 uppercase tracking-widest">Verified Patient</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gray-900 p-12 text-center text-white shadow-2xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready for a Brighter Smile?</h2>
            <p className="mb-10 text-lg text-gray-400">
              Book your appointment today and take the first step towards perfect oral health.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-10 py-4 text-lg font-bold transition-all hover:bg-blue-700 hover:shadow-xl active:scale-95"
            >
              Book Your Visit Now
              <Calendar className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
