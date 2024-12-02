import PaymentConfirmation from './components/PaymentComfirmation';

interface Props {
  searchParams?: { tx_ref: string };
}

const Page = ({ searchParams }: Props) => {
  if (!searchParams?.tx_ref) {
    throw new Error('Transaction reference is missing.');
  }

  return (
    <div className="mt-20">
      <PaymentConfirmation searchParams={searchParams} />
    </div>
  );
};

export default Page;
