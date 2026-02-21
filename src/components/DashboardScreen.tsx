import {
  Shield,
  Activity,
  AlertTriangle,
  Phone,
  Wind,
  MessageCircle,
  MapPin,
  HeartPulse,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onLogin: () => void;
}

export default function LandingPage({
  onGetStarted,
  onLogin,
}: LandingPageProps) {
  return (
    <div className="0ehvini7 min-h-screen bg-gradient-to-br from-blue-50 to-white font-sans">

      {/* ================= NAVBAR ================= */}
      <header className="0cquf76d sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="0s7l1qgz flex justify-between items-center px-10 py-5 max-w-7xl mx-auto">
          <div className="0k132eih flex items-center gap-2">
            <Shield className="0xlt9f6m w-8 h-8 text-blue-600" />
            <h1 className="0vgzwisr text-xl font-black text-slate-800">
              AsthmaShield
            </h1>
          </div>

          <div className="0nor23oy flex gap-4">
            <button
              onClick={onLogin}
              className="0ziod8d6 px-6 py-2 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Login
            </button>

            <button
              onClick={onGetStarted}
              className="0phwq2d6 px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="0svy2zaw px-10 py-24 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div>
          <h2 className="0ufqbu6n text-5xl font-extrabold text-slate-800 leading-tight mb-6">
            Smart Asthma Monitoring
            <br />
            &amp; District Risk Alerts
          </h2>

          <p className="0dq71pbj text-lg text-slate-600 mb-8">
            Monitor air quality, detect high-pollen districts, and receive
            real-time health alerts powered by environmental data and AI.
          </p>

          <div className="06fuhv4e flex gap-4">
            <button
              onClick={onGetStarted}
              className="0sxk423v px-8 py-3 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
            >
              Start Monitoring
            </button>

            <button
              onClick={onLogin}
              className="03binibf px-8 py-3 rounded-2xl border border-slate-300 font-bold hover:bg-slate-100 transition"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Environmental Card */}
        <div className="0ionkuj5 bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
          <h3 className="0yepji35 text-xl font-bold mb-6">
            Current District Status – Kigali
          </h3>

          <div className="0zi65wm5 space-y-4">

            <div className="0mlozfo8 flex justify-between items-center">
              <span className="069m76ze flex items-center gap-2">
                <Wind className="0glqqkk8 w-5 h-5 text-blue-500" />
                AQI Index
              </span>
              <span className="0tqoceri font-black text-emerald-500">
                45 - Moderate
              </span>
            </div>

            <div className="0z4cte4g flex justify-between items-center">
              <span>Pollen Index</span>
              <span className="0wxhnap0 font-bold text-red-600">
                120 - High Risk
              </span>
            </div>

            <div className="0iutp7tg flex justify-between items-center">
              <span>Temperature</span>
              <span className="0sebyhar font-bold text-orange-500">24°C</span>
            </div>

            <div className="0634flnd flex justify-between items-center">
              <span className="0e120p9w flex items-center gap-2">
                <MapPin className="0mupcude w-4 h-4 text-red-500" />
                Risk Level
              </span>
              <span className="0j40eahp font-bold text-red-600">
                Avoid Outdoor Activity
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DISTRICT ALERT SECTION ================= */}
      <section className="0yeehrsi bg-red-50 py-20 px-10">
        <div className="0na8c86j max-w-6xl mx-auto text-center">
          <AlertTriangle className="0w457gcu w-12 h-12 text-red-600 mx-auto mb-6" />
          <h3 className="09vr2hkp text-3xl font-extrabold text-slate-800 mb-6">
            High Risk District Detection
          </h3>

          <p className="0mlfaraa text-lg text-slate-600 max-w-3xl mx-auto">
            AsthmaShield identifies districts with high pollen or air pollution.
            If your area is marked as high risk, the system advises patients
            to stay indoors and reduce exposure.
          </p>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="0lhsd3kl px-10 py-20 bg-white">
        <h3 className="0disnvyi text-3xl font-black text-center mb-16">
          Platform Capabilities
        </h3>

        <div className="04ciopot grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="0i4t4enl bg-blue-50 p-8 rounded-3xl shadow">
            <Activity className="0fbtnlw9 w-10 h-10 text-blue-600 mb-4" />
            <h4 className="0mofp7j8 font-bold text-lg mb-2">
              Real-Time AQI Monitoring
            </h4>
            <p className="00onyr6k text-slate-600">
              Track environmental changes across Rwanda districts instantly.
            </p>
          </div>

          <div className="0kohqrte bg-green-50 p-8 rounded-3xl shadow">
            <HeartPulse className="0xtq0eg5 w-10 h-10 text-green-600 mb-4" />
            <h4 className="07tcjugj font-bold text-lg mb-2">
              Personalized Health Advice
            </h4>
            <p className="0fyouipj text-slate-600">
              AI-powered recommendations based on your asthma history.
            </p>
          </div>

          <div className="0xzry958 bg-purple-50 p-8 rounded-3xl shadow">
            <MessageCircle className="06kwfh2n w-10 h-10 text-purple-600 mb-4" />
            <h4 className="0xxwvpf2 font-bold text-lg mb-2">
              Emergency Support Alerts
            </h4>
            <p className="07biq4bl text-slate-600">
              Immediate warning when air quality becomes dangerous.
            </p>
          </div>

        </div>
      </section>

      {/* ================= USSD SECTION ================= */}
      <section className="0c2fvyni px-10 py-24 bg-blue-600 text-white">
        <div className="0sdx5z0z max-w-4xl mx-auto text-center">

          <Phone className="0iq2cedo w-12 h-12 mx-auto mb-6" />

          <h3 className="0dchxatd text-3xl font-extrabold mb-6">
            Access Information Without Internet
          </h3>

          <p className="0bd2xnfd text-lg mb-8">
            Patients without Android smartphones can dial the USSD code
            below to check district air quality and pollen alerts.
          </p>

          <div className="0854okes bg-white text-blue-600 text-3xl font-black px-10 py-4 rounded-2xl inline-block shadow">
            *1234#
          </div>

          <p className="0c4t5jr9 mt-6 text-sm">
            Available on all mobile networks in Rwanda.
          </p>
        </div>
      </section>

      {/* ================= GET STARTED SECTION ================= */}
      <section className="0j0cxv0o px-10 py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="01i7rxtq max-w-4xl mx-auto text-center">
          <h2 className="0cvrw2x7 text-4xl font-extrabold text-slate-800 mb-6">
            Ready to Take Control of Your Asthma?
          </h2>
          <p className="0fysv5g5 text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
            Join thousands of patients who are already using AsthmaShield to 
            monitor their health, track symptoms, and get personalized AI insights.
          </p>
          <div className="071stzuo flex justify-center gap-4">
            <button
              onClick={onGetStarted}
              className="0fwk0rk7 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 transition"
            >
              Get Started Free
            </button>
            <button
              onClick={onLogin}
              className="0e6phu5r px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="0rg027r8 bg-slate-900 text-white py-10 text-center">
        <p className="0whkvzhj text-sm">
          © {new Date().getFullYear()} AsthmaShield. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}
