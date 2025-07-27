"use client";
const Policy = () => {
  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-2 mt-16">
      <h1 className="w-full text-center font-semibold text-[36px] mb-16">
        Payment and Information Use Policy
      </h1>
      <ol className="list-decimal flex flex-col gap-4 mt-4 pl-5">
        <li>
          <h2 className="">Overview</h2>
          <p className="text-[16px]">
            Made in Vikhroli (MIV) is a platform that hosts digital products on
            behalf of independent sellers. We do not directly sell or fulfill
            digital products. Instead, we provide a simplified interface for
            users to make payments to sellers via UPI and assist in verifying
            transactions through human-supported processes.
          </p>
        </li>
        <li>
          <h2 className="">How Payments Work</h2>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>
              Payments are made via UPI through dynamically generated QR codes
              for each purchase.
            </li>
            <li>
              Each QR code includes a unique secret key tied to the transaction.
            </li>
            <li>
              This secret key helps both buyers and sellers verify payments by
              matching it with their bank statements—without needing to manually
              search for UPI transaction IDs.
            </li>
            <li>
              MIV does not process or collect payments. The payment goes
              directly from buyer to seller.
            </li>
          </ul>
        </li>
        <li>
          <h2 className="">Human Verification and Email Thread</h2>
          <p className="text-[16px]">
            Since payment verification through the secret key is loosely
            automated, MIV initiates an email thread between the buyer and the
            seller after checkout. This email contains:
          </p>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>Product name</li>
            <li>Price</li>
            <li>Secret key</li>
            <li>
              Buyer's email and UPI ID (provided by the buyer at checkout)
            </li>
          </ul>
          <p className="text-[16px] mt-2">
            This enables both parties to manually confirm payment based on their
            own bank statements.
          </p>
        </li>
        <li>
          <h2 className="">MIV’s Role and Liability</h2>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>
              MIV acts only as a facilitator between buyers and sellers by:
              <ul className="list-disc pl-6 space-y-1">
                <li>Displaying digital products</li>
                <li>Helping generate dynamic UPI QR codes for payment</li>
                <li>Assisting in post-payment coordination via email</li>
              </ul>
            </li>
            <li>MIV does not guarantee delivery of the digital product.</li>
            <li>
              Any payment disputes or product issues are strictly between the
              buyer and the seller.
            </li>
          </ul>
        </li>
        <li>
          <h2 className="">Information We Collect</h2>
          <p className="text-[16px]">
            During checkout, users are asked to provide:
          </p>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>Email ID</li>
            <li>UPI ID</li>
          </ul>
          <p className="text-[16px] mt-2">This information is:</p>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>
              Stored only on the user's device in a secure, encrypted format
            </li>
            <li>Never uploaded to MIV servers</li>
            <li>
              Accessed temporarily by MIV for purchase coordination and
              verification purposes
            </li>
          </ul>
        </li>
        <li>
          <h2 className="">Information Shared with Sellers</h2>
          <p className="text-[16px]">
            As part of the post-purchase email conversation, the following user
            information is shared with the seller:
          </p>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>Email ID</li>
            <li>UPI ID</li>
            <li>Purchase details (product name, price, secret key)</li>
          </ul>
          <p className="text-[16px] mt-2">
            This is necessary to facilitate manual payment verification and
            product delivery. By proceeding with a purchase, users consent to
            this data being shared with the seller.
          </p>
        </li>
        <li>
          <h2 className="">Data Security</h2>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>
              MIV uses local storage and encryption techniques to ensure that
              user data remains private and secure on their device.
            </li>
            <li>
              Since MIV does not maintain servers to store user data, we
              minimize exposure to breaches or misuse of personal information.
            </li>
            <li>
              Only MIV has the capability to retrieve encrypted information at
              the time of purhcase coordination.
            </li>
          </ul>
        </li>
        <li>
          <h2 className="">User Responsibility</h2>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>
              Users must ensure they input accurate UPI ID and email address at
              the time of checkout.
            </li>
            <li>
              Users are responsible for confirming their payment with the seller
              using the secret key provided.
            </li>
            <li>
              MIV does not intervene in or resolve disputes between buyers and
              sellers beyond the initial coordination.
            </li>
          </ul>
        </li>
        <li>
          <h2 className="">Consent</h2>
          <p className="text-[16px]">
            By using MIV’s checkout system, you agree to:
          </p>
          <ul className="list-disc pl-6 text-[16px] space-y-1">
            <li>
              The sharing of your email and UPI ID with the seller post-purchase
            </li>
            <li>Manual verification of payment via email</li>
            <li>
              MIV’s limited role as a facilitator and not a seller or payment
              handler
            </li>
          </ul>
        </li>
        <li>
          <h2 className="">Contact</h2>
          <p className="text-[16px]">
            For any concerns or issues related to this policy, please contact:
            <br />
            📧{" "}
            <a
              href="mailto:madeinvikhroli@gmail.com"
              className="text-blue-600 underline"
            >
              madeinvikhroli@gmail.com
            </a>
          </p>
        </li>
      </ol>
    </div>
  );
};

export default Policy;
