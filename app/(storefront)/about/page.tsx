"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

const teamMembers = [
  { name: "John Doe", role: "CEO", bio: "John leads the team with over 10 years of industry experience." },
  { name: "Jane Smith", role: "COO", bio: "Jane oversees operations ensuring smooth processes." },
];

export default function About() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
      <p className="mt-6 text-lg text-gray-700">
        Welcome to Tconnect! We are committed to delivering quality, affordability, and convenience.
      </p>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="shadow-xl rounded-lg overflow-hidden border border-gray-200">
            <CardHeader className="p-4 bg-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900">{member.name}</h2>
              <p className="text-gray-500">{member.role}</p> {/* Manually rendering the role as a subtitle */}
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-700">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
