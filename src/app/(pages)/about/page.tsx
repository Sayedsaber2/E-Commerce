export default function AboutPage() {
  return (
    <div className="min-h-screen text-blue-100">

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">
          About ShopMart
        </h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed text-blue-200">
          ShopMart is your one-stop destination for the latest technology,
          fashion, and lifestyle products. We are committed to providing
          quality products with fast shipping and excellent customer service.
        </p>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center bg-white/5 backdrop-blur-md rounded-2xl p-10 border border-white/10">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Our Mission
          </h2>
          <p className="max-w-2xl mx-auto leading-relaxed text-blue-200">
            To make shopping for quality products easy, convenient, and
            enjoyable for everyone. We believe that everyone deserves access
            to the latest and best products at competitive prices.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-white text-center mb-12">
          Our Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Quality",
              desc: "We only sell products that meet our high standards.",
            },
            {
              title: "Customer Service",
              desc: "Your satisfaction is our priority.",
            },
            {
              title: "Innovation",
              desc: "We stay ahead of trends to bring you the latest products.",
            },
            {
              title: "Trust",
              desc: "We build lasting relationships with our customers.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-blue-400 transition"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-blue-200">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Why Choose ShopMart?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                title: "Fast Shipping",
                desc: "Quick and reliable delivery to your doorstep.",
              },
              {
                title: "Quality Guarantee",
                desc: "All products are carefully selected and tested.",
              },
              {
                title: "24/7 Support",
                desc: "Our customer service team is always here to help.",
              },
              {
                title: "Easy Returns",
                desc: "Hassle-free return policy for your peace of mind.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-blue-400 transition"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-blue-200">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}