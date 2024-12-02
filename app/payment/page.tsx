import PaymentConfirmation from './components/PaymentComfirmation';

type Props = {
  searchParams: Promise<{ tx_ref: string }> | { tx_ref: string };
};

const Page = async ({ searchParams }: Props) => {
  // Ensure searchParams is resolved correctly if it's a Promise
  const resolvedSearchParams = await searchParams;

  return (
    <div className="mt-20">
      <PaymentConfirmation searchParams={resolvedSearchParams} />
    </div>
  );
};

export default Page;
