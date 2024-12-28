'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Spinner from '@/app/components/Spinner';

const PaymentSuccess: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const tx_ref = localStorage.getItem('tx_ref'); // Retrieve from localStorage or any other source
    const userId = localStorage.getItem('userId');
    const amount = localStorage.getItem('amount');

    const handleOrderCreation = async () => {
      try {
        if (tx_ref && userId && amount) {
          const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tx_ref, userId, amount }),
          });

          if (response.ok) {
            await response.json();
            setStatus('success');
            localStorage.removeItem('tx_ref');
            localStorage.removeItem('amount'); // Clear local storage
          } else {
            throw new Error('Order creation failed');
          }
        } else {
          throw new Error('Missing required parameters');
        }
      } catch (error) {
        console.error('Error creating order:', error);
        setErrorMessage('There was an error creating the order.');
        setStatus('error');
      }
    };

    handleOrderCreation();
  }, []);

  if (status === 'loading') {
    return <div className="fixed inset-0 flex items-center justify-center z-50">
    <Spinner size={40} color="white" />
  </div> 
  }

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px] shadow-lg hover:shadow-2xl">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Successful</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats on your purchase. Your payment was successfully processed.
            </p>

            {/* Show error message if order creation fails */}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="/my-orders">View Your Order</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PaymentSuccess;
