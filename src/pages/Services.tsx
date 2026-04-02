import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Teeth Cleaning',
    description: 'Professional scaling and polishing to remove plaque, tartar, and surface stains, preventing gum disease and cavities.',
    icon: '🦷',
    features: ['Plaque Removal', 'Tartar Scaling', 'Stain Polishing', 'Gum Health Check']
  },
  {
    title: 'Root Canal Treatment',
    description: 'Advanced endodontic therapy to save infected or damaged teeth, relieving pain and restoring function.',
    icon: '🔬',
    features: ['Pain Relief', 'Infection Control', 'Tooth Preservation', 'Digital Imaging']
  },
  {
    title: 'Dental Implants',
    description: 'Permanent and natural-looking replacement for missing teeth using high-quality titanium posts and ceramic crowns.',
    icon: '🔩',
    features: ['Natural Look', 'Strong Foundation', 'Lifetime Solution', 'Bone Preservation']
  },
  {
    title: 'Teeth Whitening',
    description: 'Safe and effective professional whitening treatments to brighten your smile by several shades in just one visit.',
    icon: '✨',
    features: ['Instant Results', 'Safe Procedures', 'Long Lasting', 'Custom Trays']
  },
  {
    title: 'Braces & Invisalign',
    description: 'Orthodontic solutions to straighten misaligned teeth and correct bite issues for both children and adults.',
    icon: '📏',
    features: ['Clear Aligners', 'Metal Braces', 'Bite Correction', 'Smile Design']
  },
  {
    title: 'Pediatric Dentistry',
    description: 'Specialized dental care for children in a friendly environment to ensure healthy development of primary and permanent teeth.',
    icon: '👶',
    features: ['Child Friendly', 'Preventive Care', 'Habit Counseling', 'Gentle Approach']
  }
];

export function Services() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-blue-600 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-4xl font-extrabold md:text-5xl"
          >
            Our Dental Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-3xl text-lg text-blue-100"
          >
            Comprehensive dental care tailored to your unique needs. We use the latest technology to provide painless and effective treatments.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl transition-all hover:shadow-2xl md:flex-row"
              >
                <div className="flex items-center justify-center bg-blue-50 p-12 text-6xl md:w-1/3">
                  {service.icon}
                </div>
                <div className="p-8 md:w-2/3">
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">{service.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-gray-600">{service.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link
                      to="/book"
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                    >
                      Book This Service <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Real Results</h2>
            <p className="mx-auto max-w-2xl text-gray-600">See the transformation we've achieved for our patients.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src="https://picsum.photos/seed/before1/400/400" alt="Before" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white uppercase">Before</span>
                </div>
                <div className="relative">
                  <img src="https://picsum.photos/seed/after1/400/400" alt="After" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white uppercase">After</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-bold text-gray-900">Full Mouth Rehabilitation</h4>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
              <div className="grid grid-cols-2">
                <div className="relative">
                  <img src="https://picsum.photos/seed/before2/400/400" alt="Before" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white uppercase">Before</span>
                </div>
                <div className="relative">
                  <img src="https://picsum.photos/seed/after2/400/400" alt="After" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                  <span className="absolute top-4 left-4 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold text-white uppercase">After</span>
                </div>
              </div>
              <div className="p-6 text-center">
                <h4 className="font-bold text-gray-900">Teeth Whitening & Veneers</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-gray-600">Common questions about our treatments and procedures.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: 'Is dental treatment painful?', a: 'We use modern anesthesia and gentle techniques to ensure all procedures are as painless as possible. Your comfort is our priority.' },
              { q: 'How often should I visit for a checkup?', a: 'We recommend a professional cleaning and checkup every 6 months to maintain optimal oral health and catch issues early.' },
              { q: 'Do you offer emergency dental care?', a: 'Yes, we provide emergency services for severe pain, broken teeth, or other urgent dental issues. Call us immediately if you have an emergency.' },
              { q: 'What payment options do you accept?', a: 'We accept all major credit/debit cards, UPI, and offer flexible EMI options for major treatments.' }
            ].map((faq, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h4 className="mb-3 text-lg font-bold text-gray-900">{faq.q}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
