"use client";
import React from "react";

export default function ContactUs() {
  return <div><form className="space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded bg-transparent border border-white/20 focus:outline-none focus:border-blue-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded bg-transparent border border-white/20 focus:outline-none focus:border-blue-400"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full p-3 rounded bg-transparent border border-white/20 focus:outline-none focus:border-blue-400"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 transition py-3 rounded-lg font-semibold"
              >
                Send Message
              </button>
            </form></div>;
}
