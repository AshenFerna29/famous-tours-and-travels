"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import SuccessNotification from "./SuccessNotification";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  package: string;
  guests: string;
  date: string;
  request: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  package?: string;
  guests?: string;
  date?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2)
          return "Full name must be at least 2 characters";
        if (!/^[a-zA-Z\s]+$/.test(value))
          return "Full name can only contain letters and spaces";
        break;

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Please enter a valid email address";
        break;

      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!/^\d{10,15}$/.test(value.replace(/\s/g, "")))
          return "Phone number must contain only numbers (10-15 digits)";
        break;

      case "package":
        if (!value) return "Please select a tour package";
        break;

      case "guests":
        if (!value) return "Number of guests is required";
        if (parseInt(value) < 1) return "At least 1 guest is required";
        if (parseInt(value) > 20) return "Maximum 20 guests allowed";
        break;

      case "date":
        if (!value) return "Preferred date is required";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return "Date cannot be in the past";
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Real-time validation for better UX
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(formData).forEach((key) => {
      if (key !== "request") {
        // request is optional
        const error = validateField(key, formData[key as keyof FormData]);
        if (error) {
          newErrors[key as keyof FormErrors] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send booking data to API for email processing
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Show success notification
        setShowSuccess(true);

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          package: "",
          guests: "",
          date: "",
          request: "",
        });
        setErrors({});
      } else {
        throw new Error("Failed to send booking confirmation");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert(
        "There was an error processing your booking. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
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
              <label className="block text-sm font-medium text-gray-700">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full border rounded-md p-2 mt-1 transition-colors ${
                  errors.fullName
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-md p-2 mt-1 transition-colors ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full border rounded-md p-2 mt-1 transition-colors ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          {/* Tour Details */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tour Package *
              </label>
              <select
                name="package"
                value={formData.package}
                onChange={handleChange}
                className={`w-full border rounded-md p-2 mt-1 transition-colors ${
                  errors.package
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
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
              {errors.package && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.package}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className={`w-full border rounded-md p-2 mt-1 transition-colors ${
                  errors.date
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.date}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Number of Guests *
              </label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                min={1}
                max={20}
                className={`w-full border rounded-md p-2 mt-1 transition-colors ${
                  errors.guests
                    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                } focus:outline-none focus:ring-2`}
                placeholder="Number of guests"
              />
              {errors.guests && (
                <p className="text-red-500 text-xs mt-1 flex items-center">
                  <svg
                    className="w-3 h-3 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.guests}
                </p>
              )}
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Special Request or Requirements
            </label>
            <textarea
              name="request"
              value={formData.request}
              onChange={handleChange}
              placeholder="Tell us about any special requirements..."
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-colors"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-bblue-600 transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#F68713] hover:bg-[#e67600] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">Submitting...</span>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </div>

      <SuccessNotification
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Booking Submitted Successfully!"
        message="Your booking request has been submitted successfully! Please check your email for detailed confirmation. We'll contact you within 24 hours!"
      />
    </div>
  );
};

export default TourBookingForm;
