import PaymentConfirmation from './components/PaymentComfirmation';

type Props = {
  searchParams?: { tx_ref: string };
};

const Page = async ({ searchParams }: Props) => {
  if (!searchParams?.tx_ref) {
    // Handle missing or undefined searchParams
    throw new Error('Transaction reference is missing.');
  }

  return (
    <div className="mt-20">
      <PaymentConfirmation searchParams={searchParams} />
    </div>
  );
};

export default Page;
