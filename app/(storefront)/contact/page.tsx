"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "react-hot-toast";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/contact", { name, email, message });

      if (response.data.success) {
        toast.success("Message sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <Button
            type="submit"
            className={`w-full py-3 px-4 text-white font-medium rounded-md ${
              isSubmitting
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            } transition duration-150 ease-in-out`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="loader inline-block h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></span>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
