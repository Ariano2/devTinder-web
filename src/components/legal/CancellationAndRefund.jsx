const CancellationAndRefund = () => {
  return (
    <div className="md:mx-[10%] bg-primary text-primary-content p-4">
      <h1 className="font-bold text-center text-xl md:text-2xl">
        Cancellation & Refunds Policy
      </h1>
      <div className="my-2">
        <h2 className="my-2 font-semibold text-lg md:text-xl">
          Premium Subscriptions
        </h2>
        <p className="my-1">
          All payments made for premium services on Dev2inder are final and
          non-refundable. Once a payment is processed, no refunds or partial
          refunds will be provided under any circumstances.
        </p>
        <h2 className="my-2 font-semibold text-lg md:text-xl">Cancellation</h2>
        <p className="my-1">
          You can cancel your premium subscription at any time to avoid future
          charges. However, the cancellation will not result in a refund for the
          current billing period.
        </p>
        <h2 className="my-2 font-semibold text-lg md:text-xl">
          Account Deletion
        </h2>
        <p className="my-1">
          If you choose to delete your account, your premium subscription will
          not be refunded.
        </p>
      </div>
    </div>
  );
};

export default CancellationAndRefund;
