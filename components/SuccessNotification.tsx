import React, { useEffect } from "react";

interface SuccessNotificationProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  show,
  onClose,
  title,
  message,
}) => {
  // Auto-close after 5 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <div
        className={`bg-white border border-gray-200 rounded-b-lg shadow-xl max-w-md mx-4 mt-0 transform transition-all duration-500 ease-out ${
          show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-gray-900">{title}</h3>
              <p className="mt-1 text-sm text-gray-600">{message}</p>
            </div>
            <div className="flex-shrink-0 ml-4">
              <button
                onClick={onClose}
                className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 bg-gray-200 rounded-full h-1">
            <div
              className="bg-[#F68713] h-1 rounded-full transition-all duration-[5000ms] ease-linear"
              style={{ width: show ? "0%" : "100%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;
