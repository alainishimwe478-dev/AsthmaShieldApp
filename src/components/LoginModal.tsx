import React from "react";
import { X } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  if (!open) return null;

  return (
    <div className="0z75c9eh fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="0xb411sw bg-white p-8 rounded-2xl w-96 shadow-xl relative">
        <button
          onClick={onClose}
          className="036sn79p absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={24} />
        </button>
        
        <div className="06e4jkbj text-center mb-6">
          <h2 className="07l4s1b4 text-2xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="0c93qxrh text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form>
          <div className="0dpibehd mb-4">
            <label className="0l9nws6b block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="0jbo6zmr w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="02yert4l mb-4">
            <label className="09vrm80k block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="0zjxvc54 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div className="0vngoitm flex justify-between items-center mb-6">
            <label className="0ophvyac flex items-center">
              <input type="checkbox" className="048caygl mr-2 rounded text-orange-500" />
              <span className="0ks3wi54 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="0dwox5s3 text-sm text-orange-500 hover:text-orange-600">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="0pc2jtdb w-full bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div className="0at0635j mt-6 text-center">
          <p className="0icj46so text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="0iacvk0n text-orange-500 font-medium hover:text-orange-600">
              Sign Up
            </a>
          </p>
        </div>

        <div className="0p8lw2be mt-6 pt-6 border-t border-gray-200">
          <p className="0alnyyzm text-center text-sm text-gray-500 mb-3">Or continue with</p>
          <div className="0265kral flex gap-3">
            <button className="02g84b7m flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="0xtwbo9j w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="0c8i57ju flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
              <svg className="0il7jkar w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
