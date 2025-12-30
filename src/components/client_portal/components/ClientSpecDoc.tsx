import { FaCheckCircle, FaPhone, FaEnvelope, FaGlobe } from "react-icons/fa";

export default function ClientSpecDoc() {
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Sage Paths Unity</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Helping local businesses create clean, mobile‑friendly websites that actually work.
          </p>
        </section>

        {/* Overview */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-300 leading-relaxed">
            SagePaths is a personal‑first web design service. When you work with SagePaths, you work
            directly with the person designing, building, and supporting your site. The goal is
            simple: deliver professional websites with real results, without the agency fluff.
          </p>
        </section>

        {/* Process */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Web Design Process</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {["Discovery Call / Chat", "Content Gathering", "Design & Development", "Revisions", "Launch", "Ongoing Support"].map((step) => (
              <div key={step} className="p-5 bg-gray-800 rounded-xl shadow">
                <div className="flex items-center gap-3 mb-2">
                  <FaCheckCircle className="text-yellow-400" />
                  <h3 className="font-semibold">{step}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  {step === "Discovery Call / Chat" && "Discuss goals, business needs, and direction."}
                  {step === "Content Gathering" && "Collect text, images, and branding — help available."}
                  {step === "Design & Development" && "Build the site with previews along the way."}
                  {step === "Revisions" && "1–2 revision rounds depending on package."}
                  {step === "Launch" && "Domain connected and site goes live."}
                  {step === "Ongoing Support" && "Optional monthly updates, backups, and support."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Other Opportunistic Work</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {["Website Upgrades", "Complete Redesigns", "Booking Systems", "Dashboards & Metrics", "Membership Systems", "Traffic Optimization"].map((item) => (
              <li key={item} className="p-4 bg-gray-800 rounded-lg text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Pricing & Packages</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[{ name: "Trial", price: "$0.99" }, { name: "Basic", price: "$400" }, { name: "Premium", price: "$700" }, { name: "Executive", price: "$1,200" }].map((pkg) => (
              <div key={pkg.name} className="bg-gray-800 p-6 rounded-xl shadow text-center">
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-yellow-400 text-2xl font-bold">{pkg.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="space-y-3">
            {["Do I need to provide content?", "Can I update my site later?", "Do you help with hosting?", "Who owns the website?"].map((q) => (
              <div key={q} className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-1">{q}</h4>
                <p className="text-sm text-gray-400">Yes — guidance and support are always available.</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-gray-300">
            <span className="flex items-center gap-2"><FaEnvelope /> jheremi2015@gmail.com</span>
            <span className="flex items-center gap-2"><FaPhone /> (956) 451‑8817</span>
            <span className="flex items-center gap-2"><FaGlobe /> sagejherm.co</span>
          </div>
        </section>

      </div>
    </div>
  );
}
