import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function Terms() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 text-center">Terms of Service</h1>
      <p className="mt-4 text-lg text-gray-600">
        Please read these Terms of Service carefully before using our platform. These terms govern your access to and use of our GiftCards platform, including purchasing, redeeming, and managing your digital gift cards.
      </p>
      <Tabs className="mt-8">
        <TabsList className="flex justify-start space-x-4">
          <TabsTrigger value="general" className="text-lg font-medium text-gray-900">General Terms</TabsTrigger>
          <TabsTrigger value="payments" className="text-lg font-medium text-gray-900">Payments</TabsTrigger>
          <TabsTrigger value="privacy" className="text-lg font-medium text-gray-900">Privacy</TabsTrigger>
          <TabsTrigger value="redemption" className="text-lg font-medium text-gray-900">Redemption</TabsTrigger>
          <TabsTrigger value="security" className="text-lg font-medium text-gray-900">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="mt-4 text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">General Terms</h3>
            <p>
              By accessing or using our platform, you agree to abide by these Terms of Service. If you do not agree with any part of these terms, you should not use our platform.
            </p>
            <p>
              Our platform allows you to purchase, redeem, and manage digital gift cards for various merchants. You agree to comply with all applicable laws, regulations, and platform rules when using our services.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="mt-4 text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Payments</h3>
            <p>
              All payments are final and non-refundable, except as required by law. When making a payment for a gift card, you agree to provide accurate billing information and authorize us to charge your selected payment method.
            </p>
            <p>
              We accept payments via major credit cards, PayPal, and other supported payment methods. Gift card balances are processed and transferred to your account immediately upon successful payment.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="privacy">
          <div className="mt-4 text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Privacy</h3>
            <p>
              Your privacy is of utmost importance to us. We collect and store personal data only as necessary to process your transactions and provide you with the best possible user experience.
            </p>
            <p>
              We do not share your personal information with third parties except for payment processors and as required by law. For a detailed explanation of our privacy practices, please refer to our Privacy Policy.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="redemption">
          <div className="mt-4 text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Redemption</h3>
            <p>
              Gift cards purchased on our platform can be redeemed at participating merchants as specified in the card&apos;s terms and conditions. Please ensure the correct merchant and redemption code before using your gift card.
            </p>
            <p>
              Gift cards are non-transferable and cannot be redeemed for cash, unless otherwise required by law.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="mt-4 text-gray-700 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Security</h3>
            <p>
              We use industry-standard encryption and security measures to protect your personal information and payment details during transactions. However, we recommend that you keep your account credentials and gift card codes secure to prevent unauthorized use.
            </p>
            <p>
              If you suspect any fraudulent activity, please contact us immediately. We take all necessary actions to protect our users and prevent fraud on our platform.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
