import PaymentConfirmation from './components/PaymentComfirmation';

type Props = {
  searchParams: { tx_ref: string } | Promise<{ tx_ref: string }>;
};

const Page = async ({ searchParams }: Props) => {
  // Await searchParams if it is a Promise
  const resolvedSearchParams = searchParams instanceof Promise ? await searchParams : searchParams;

  return (
    <div className="mt-20">
      <PaymentConfirmation searchParams={resolvedSearchParams} />
    </div>
  );
};

export default Page;


