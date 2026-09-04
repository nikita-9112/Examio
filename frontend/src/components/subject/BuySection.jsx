import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import Button from "../ui/Button";
import purchaseService from "../../sevices/purchaseService";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    // Don't load the script again if it already exists
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const BuySection = ({ subjectPack, BuySectionRef, onPurchaseSuccess }) => {

  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleBuy = async () => {
    try {
      setError("");
      setPaymentStatus("creating-order");

      // 1. Load Razorpay Checkout
      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        throw new Error(
          "Razorpay Checkout failed to load. Please try again."
        );
      }

      // 2. Create Razorpay order from backend
      const response = await purchaseService.createOrder(
        subjectPack._id
      );

      console.log("Create order response:", response);

      if (!response.success) {
        throw new Error(
          response.message ||
          "Unable to create payment order."
        );
      }

      // 3. Open Razorpay Checkout
      setPaymentStatus("payment");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: response.order.amount,

        currency: response.order.currency,

        name: "Examio",

        description: `Purchase ${subjectPack.subjectName}`,

        order_id: response.order.id,

        handler: async function (paymentResponse) {
          try {
            console.log(
              "Razorpay payment response:",
              paymentResponse
            );

            // 4. Payment successful on Razorpay
            // Now verify it on our backend
            setPaymentStatus("verifying");

            const verificationResponse =
              await purchaseService.verifyPayment({
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,

                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,

                razorpay_signature:
                  paymentResponse.razorpay_signature,
              });

            console.log(
              "Payment verification response:",
              verificationResponse
            );

            if (!verificationResponse.success) {
              throw new Error(
                verificationResponse.message ||
                "Payment verification failed."
              );
            }

            // 5. Payment completely verified
            await onPurchaseSuccess?.();
            setPaymentStatus("success");

          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            setError(
              error.response?.data?.message ||
              error.message ||
              "Payment verification failed."
            );

            setPaymentStatus("error");
          }
        },

        modal: {
          ondismiss: function () {
            // User closed Razorpay Checkout
            setPaymentStatus("idle");
          },
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error(
          "Razorpay payment failed:",
          response
        );

        setError(
          response.error?.description ||
          "Payment failed. Please try again."
        );

        setPaymentStatus("error");
      });

      razorpay.open();

    } catch (error) {
      console.error("Buy error:", error);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to start purchase."
      );

      setPaymentStatus("error");
    }
  };

  const papersCount = subjectPack?.papers?.length ?? 0;

  const isProcessing =
    paymentStatus === "creating-order" ||
    paymentStatus === "verifying";

  return (
    <section
      className="
        sticky bottom-0 z-30 rounded-t-2xl
        border border-slate-200 bg-white p-5 shadow-lg
      "
      ref={BuySectionRef}
    >

      {/* Error message */}
      {paymentStatus === "error" && error && (
        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm font-medium text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Success message */}
      {paymentStatus === "success" && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 px-4 py-3">
          <CheckCircle2
            size={20}
            className="shrink-0 text-green-600"
          />

          <p className="text-sm font-semibold text-green-700">
            Payment successful! Your subject pack is unlocked.
          </p>
        </div>
      )}

      <div className="flex items-center justify-evenly gap-4">

        {/* Price */}
        <div>
          <p className="text-sm text-slate-500">
            Only
          </p>

          <h2 className="text-3xl font-bold text-blue-700">
            ₹{subjectPack?.price ?? 0}
          </h2>
        </div>

        {/* Desktop information */}
        <div className="hidden md:block">

          <p className="font-semibold text-slate-900">
            {papersCount} Previous Year Papers
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Includes solved exam papers
          </p>

        </div>

        {/* Buy button */}
        <Button
          size="lg"
          className="h-12 shrink-0 rounded-2xl px-6 font-semibold"
          onClick={handleBuy}
          disabled={isProcessing || paymentStatus === "success"}
        >

          {paymentStatus === "creating-order" && (
            <>
              <Loader2
                size={18}
                className="mr-2 animate-spin"
              />
              Creating Order...
            </>
          )}

          {paymentStatus === "payment" && (
            "Complete Payment"
          )}

          {paymentStatus === "verifying" && (
            <>
              <Loader2
                size={18}
                className="mr-2 animate-spin"
              />
              Verifying Payment...
            </>
          )}

          {paymentStatus === "success" && (
            <>
              <CheckCircle2
                size={18}
                className="mr-2"
              />
              Pack Unlocked
            </>
          )}

          {(paymentStatus === "idle" ||
            paymentStatus === "error") && (
            "Unlock Full Pack"
          )}

        </Button>

      </div>
    </section>
  );
};

export default BuySection;