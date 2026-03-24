import ContactUs from "@/components/ContactUs/ContactUs";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Contact Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-blue-200">
          {"We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
        </p>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Info */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-white">
              Get in Touch
            </h2>

            <div className="space-y-6">

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
                <Mail className="text-blue-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-sm">support@shopmart.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
                <Phone className="text-blue-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-sm">(+20) 01093333333</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10">
                <MapPin className="text-blue-400 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-white">Address</h3>
                  <p className="text-sm">
                    {"123 Shop Street, October City, DC 12345"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Send us a Message
            </h2>

            <ContactUs />
          </div>

        </div>
      </section>

    </div>
  );
}