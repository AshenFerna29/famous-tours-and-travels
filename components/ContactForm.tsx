"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setIsSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Submitted!");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } else {
      setStatus("Failed to send. Try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Type your name"
        className="w-full p-3 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Insert your email"
        className="w-full p-3 border border-gray-300 rounded"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Type your message"
        className="w-full p-3 border border-gray-300 rounded"
        rows={5}
        required
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-6 py-2 rounded-md text-white transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-0.5 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-[#fda720]"
        }`}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span
              className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              aria-hidden
            />
            Sending...
          </span>
        ) : (
          "Submit"
        )}
      </button>

      {status && status !== "Submitted!" && (
        <p className="text-center text-sm mt-2 text-gray-600">{status}</p>
      )}
    </form>
  );
}
