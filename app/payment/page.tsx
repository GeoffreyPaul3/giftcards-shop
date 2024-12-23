import PaymentConfirmation from "./components/PaymentComfirmation";

type Props = {
  searchParams: Promise<{ tx_ref: string }>;
};

const Page = async ({ searchParams }: Props) => {
  const { tx_ref } = await searchParams;

  return (
    <div className="mt-20">
      <PaymentConfirmation tx_ref={tx_ref} />
    </div>
  );
};

export default Page;