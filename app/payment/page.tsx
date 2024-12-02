import { Metadata } from 'next';
import PaymentConfirmation from './components/PaymentComfirmation';

export const metadata: Metadata = {
  title: 'Payment Confirmation',
};

const Page = ({ searchParams }: { searchParams?: { tx_ref?: string } }) => {
  if (!searchParams?.tx_ref) {
    throw new Error('Transaction reference is missing.');
  }

  return (
    <div className="mt-20">
      {/* Type assertion ensures tx_ref is passed as a non-optional string */}
      <PaymentConfirmation searchParams={{ tx_ref: searchParams.tx_ref }} />
    </div>
  );
};

export default Page;
