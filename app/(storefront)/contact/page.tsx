"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
      message: (e.currentTarget.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    // Use EmailJS to send the email
    emailjs
      .send(process.env.NEXT_EMAILJS_SERVICE_ID as string, process.env.NEXT_EMAILJS_TEMPLATE_ID!, formData, process.env.NEXT_EMAILJS_USER_ID!)
      .then(() => {
        setLoading(false);
        toast.success("Message sent! We will get back to you shortly.");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Failed to send message. Please try again.");
        console.error("Error sending email:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
          <p className="mt-2 text-sm text-gray-600">
            Have any questions or concerns? Feel free to reach out. We&apos;re here to help!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              name="name"
              id="name"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              name="email"
              id="email"
              type="email"
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <Textarea
              name="message"
              id="message"
              rows={4}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <Button
            type="submit"
            className={`w-full py-3 px-4 text-white font-medium rounded-md ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            } transition duration-150 ease-in-out`}
            disabled={loading}
          >
            {loading ? (
              <span className="loader inline-block h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
