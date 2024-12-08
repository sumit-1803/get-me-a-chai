"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [redirectCountdown, setRedirectCountdown] = useState(0);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setRedirectCountdown(5); // Start 5-second countdown
      } else {
        setStatus("Something went wrong, please try again.");
      }
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (redirectCountdown === 0 && status === "Message sent successfully!") {
      router.push("/"); // Redirect after countdown
    }
  }, [redirectCountdown, status, router]);

  return (
    <div className="bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-2xl border border-gray-300">
        <center className="text-3xl font-semibold text-white bg-[#3730a3] rounded-md p-4 mb-6">Contact Us</center>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg font-medium text-gray-900">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-black p-4 mt-2 rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-900">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 text-black mt-2 rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block text-lg font-medium text-gray-900">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full text-black p-4 mt-2 rounded-lg bg-gray-100 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Message"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3730a3] text-white p-4 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {status || "Send Message"}
          </button>
        </form>

        {redirectCountdown > 0 && (
          <p className="mt-4 text-center text-green-500 font-semibold">
            Redirecting to home in {redirectCountdown} second{redirectCountdown > 1 ? "s" : ""}...
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
