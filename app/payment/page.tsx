import PaymentConfirmation from "./components/PaymentComfirmation";


type Props = {
  searchParams: {
    // userId: string;
    // subscriptionId: string;
    tx_ref: string;
  };
};

const Page = async ({ searchParams }: Props) => {
  return (
    <div className="mt-20">
      <PaymentConfirmation searchParams={searchParams} />
    </div>
  );
};

export default Page;