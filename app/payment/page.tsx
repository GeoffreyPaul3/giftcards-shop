import PaymentConfirmation from "./components/PaymentComfirmation";

type Props = {
  searchParams: {
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

