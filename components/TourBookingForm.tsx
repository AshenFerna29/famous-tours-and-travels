"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  package: string;
  guests: string;
  date: string;
  request: string;
}

const TourBookingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    package: "",
    guests: "",
    date: "",
    request: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Top Image */}
      <div className="h-60 w-full relative">
        <Image
          src="/images/Booking-page.jpg"
          alt="Tour Beach View"
          fill
          className="object-cover"
        />
      </div>

      {/* Form Container */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center mb-1">
          Tour Booking Form
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Fill in your details and we’ll get back to you within 24 hours
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Full Name *</label>
              <input
                type="text"
                name="fullName"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone *</label>
              <input
                type="tel"
                name="phone"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
          </div>

          {/* Tour Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">
                Tour Package *
              </label>
              <select
                name="package"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              >
                <option value="">Select your preferred Tour package</option>
                <option value="adventure">Hill Country Adventure</option>
                <option value="romance">Ceylon Romance</option>
                <option value="ancient">Ancient Ceylon</option>
                <option value="wellness">Tranquil Escape</option>
                <option value="wildlife">Wild Lanka</option>
                <option value="budget">Ceylon On a Budget</option>
                <option value="luxary">Luxary Island Lanka</option>
                <option value="eco">Eco Ceylon</option>
                <option value="family">Family Fun in Sri Lanka</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Number of Guests *
              </label>
              <input
                type="number"
                name="guests"
                required
                min={1}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium">
              Special Request or Requirements
            </label>
            <textarea
              name="request"
              onChange={handleChange}
              placeholder="Tell us about any special requirements..."
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 mt-1"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourBookingForm;
