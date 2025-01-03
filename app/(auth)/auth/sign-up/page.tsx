import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import EmailInput from "@/app/components/EmailInput";
import { FaGoogle } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="rounded-full overflow-hidden mb-4">
            <Image
              src="/tlogo.png"
              alt="tconnect Logo"
              width={80}
              height={80}
            />
          </div>
          <CardTitle className="text-3xl font-bold text-center">Join tconnect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Sign-up */}
          <RegisterLink
            className="w-full"
            authUrlParams={{
              connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || "",
            }}
          >
            <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
              <FaGoogle className="mr-2 h-4 w-4" />
              Sign up with Google
            </Button>
          </RegisterLink>

          {/* Divider */}
          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          {/* Email Input for Sign-up */}
          <EmailInput isSignUp />

        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-500">
            Already have an account?{" "}
                <LoginLink
                  className="w-full"
                  authUrlParams={{
                  connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || ""
                  }}
                      >
              Sign in
            </LoginLink>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
