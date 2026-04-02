import { motion } from 'motion/react';
import { Award, Heart, Users, ShieldCheck } from 'lucide-react';

export function About() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-blue-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-extrabold text-gray-900 md:text-5xl"
          >
            About MindDental Clinic
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-gray-600"
          >
            We are a team of passionate dental professionals committed to providing the highest quality care in a comfortable and welcoming environment.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-900">Our Mission & Vision</h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-600">
                Founded in 2010, MindDental Clinic started with a simple goal: to make high-quality dentistry accessible and comfortable for everyone. Over the years, we have grown into a leading dental center, serving thousands of happy patients.
              </p>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                Our mission is to provide comprehensive dental solutions that combine clinical excellence with a patient-centric approach. We envision a world where everyone can smile with confidence.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-4xl font-bold text-blue-600">15+</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Years Experience</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600">10k+</p>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Happy Patients</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://picsum.photos/seed/about-team/800/600"
                alt="Our Team"
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -right-8 hidden h-32 w-32 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl md:flex">
                <div className="text-center">
                  <p className="text-2xl font-bold">#1</p>
                  <p className="text-[10px] font-bold uppercase">Rated Clinic</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-gray-600">The principles that guide everything we do at MindDental.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Patient Care', desc: 'Your comfort and well-being are our top priorities.', icon: Heart },
              { title: 'Excellence', desc: 'We strive for perfection in every treatment we provide.', icon: Award },
              { title: 'Integrity', desc: 'Honest advice and transparent pricing at all times.', icon: ShieldCheck },
              { title: 'Innovation', desc: 'Using the latest technology for better clinical outcomes.', icon: Users },
            ].map((value, i) => (
              <div key={i} className="rounded-2xl bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Meet Our Expert Doctors</h2>
            <p className="mx-auto max-w-2xl text-gray-600">Highly qualified specialists dedicated to your smile.</p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { name: 'Dr. Sameer Khan', role: 'Senior Orthodontist', img: 'doc1' },
              { name: 'Dr. Anjali Rao', role: 'Implant Specialist', img: 'doc2' },
              { name: 'Dr. Vikram Singh', role: 'General Dentist', img: 'doc3' },
            ].map((doc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >
                <img
                  src={`https://picsum.photos/seed/${doc.img}/600/700`}
                  alt={doc.name}
                  className="h-80 w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-8 text-center">
                  <h3 className="mb-1 text-xl font-bold text-gray-900">{doc.name}</h3>
                  <p className="text-sm font-medium text-blue-600">{doc.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
