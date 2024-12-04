"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";


const features = [
  { 
    title: "User-Centric Design", 
    description: "Our platform is designed with you in mind, offering an intuitive and user-friendly interface that simplifies gift card management." 
  },
  { 
    title: "Flexible Payments", 
    description: "With our wide range of payment methods, including mobile money and Visa, you have flexibility and convenience at your fingertips." 
  },
  { 
    title: "24/7 Customer Support", 
    description: "We are here whenever you need us. Our dedicated support team is available around the clock to help with any inquiries or issues." 
  },
  { 
    title: "Tailored Gifting Solutions", 
    description: "We offer personalized gifting options to cater to any occasion, making it easy to give the perfect gift every time." 
  },
  { 
    title: "Seamless Integration", 
    description: "Our platform integrates with a variety of services, ensuring smooth and secure transactions across different devices and networks." 
  },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
      <p className="mt-6 text-lg text-gray-700">
        At TConnect, we make buying and managing gift cards simple, secure, and convenient. Whether for personal use or gifting, our platform offers a seamless experience with multiple payment options, including mobile payments, Visa cards, and bank transfers.
      </p>
      <p className="mt-4 text-lg text-gray-700">
        Powered by Trickal Holdings, we aim to redefine the gifting experience by delivering innovative and user-friendly solutions. Let TConnect be your trusted gifting partner!
      </p>

      <h2 className="mt-12 text-3xl font-bold text-gray-900">Why Choose Us</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="shadow-xl rounded-lg overflow-hidden border border-gray-200 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <CardHeader className="p-4 bg-blue-600">
              <h2 className="text-2xl font-semibold text-white">{feature.title}</h2>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-12 text-3xl font-bold text-gray-900">Contact Us</h2>
      <p className="mt-4 text-lg text-gray-700">
        Office Address: Development House, Blantyre, Third Floor, Office 307
      </p>
      <p className="text-lg text-gray-700">Email: <a href="mailto:contact@tconnect.store" className="text-blue-600">contact@tconnect.store</a></p>
    </div>
  );
}
