"use client";
import React from "react";
import { useRouter } from "next/navigation";

const PaymentFailed: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="bg-white w-full max-w-4xl mx-auto p-8 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:mr-8 text-center lg:text-left">
          <h2 className="text-2xl font-semibold mb-2">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            Payment failed. Please try again or contact support.
          </p>

          <div className="flex justify-center lg:justify-start space-x-4">
            {/* <button className="bg-main text-white py-2 px-4 rounded-lg hover:bg-gray-100 transition">
              Back Home
            </button> */}
            <button
              className="bg-main text-white py-2 px-4 rounded-lg hover:bg-main transition"
              onClick={() => router.push("/dashboard")}
            >
              Back Home
            </button>
            <button className="border border-gray-400 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;