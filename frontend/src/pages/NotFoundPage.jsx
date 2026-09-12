


import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-lg">

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-indigo-600">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-600">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg
                       bg-indigo-600 px-5 py-3 text-white font-medium
                       hover:bg-indigo-700 transition"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg
                       border border-gray-300 bg-white px-5 py-3
                       text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;