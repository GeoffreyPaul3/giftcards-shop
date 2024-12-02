import { Metadata } from 'next';
import PaymentConfirmation from './components/PaymentComfirmation';

interface Props {
  searchParams?: { tx_ref: string };
}

export const metadata: Metadata = {
  title: 'Payment Confirmation',
};

const Page = ({ searchParams }: Props) => {
  if (!searchParams || !searchParams.tx_ref) {
    throw new Error('Transaction reference is missing.');
  }

  return (
    <div className="mt-20">
      <PaymentConfirmation searchParams={searchParams} />
    </div>
  );
};

export default Page;
