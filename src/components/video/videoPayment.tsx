"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function PaymentPopup({
  onConfirm,
  onClose,
}: {
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"khalti" | "esewa">("khalti");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (paymentMethod === "khalti") {
        onConfirm();
      } else {
        alert("eSewa integration coming soon!");
        setIsProcessing(false);
      }
    }, 3500);
  };

  const getButtonLabel = () => {
    return paymentMethod === "khalti" ? "Pay with Khalti" : "Pay with eSewa";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800 dark:text-white">
        <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
          Choose Payment Method
        </h2>
        <p className="mb-5 text-sm text-gray-600 dark:text-gray-300">
          Select your preferred payment option
        </p>

        <div className="space-y-3">

          <label
            htmlFor="esewa"
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 ${paymentMethod === "esewa"
              ? "border-gray-600 bg-gray-100 dark:bg-gray-900"
              : "border-gray-300 dark:border-gray-600"
              }`}
          >
            <div className="flex items-center space-x-4">
              <Image src="/esewa.jpeg" alt="eSewa" width={32} height={32} />
              <span className="text-base font-medium text-gray-800 dark:text-white">
                eSewa
              </span>
            </div>
            <input
              type="radio"
              id="esewa"
              name="payment"
              checked={paymentMethod === "esewa"}
              onChange={() => setPaymentMethod("esewa")}
              className="accent-green-600 dark:accent-green-400"
              disabled={isProcessing}
            />
          </label>

          <label
            htmlFor="khalti"
            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all duration-200 ${paymentMethod === "khalti"
              ? "border-gray-600 bg-gray-100 dark:bg-gray-900"
              : "border-gray-300 dark:border-gray-600"
              }`}
          >
            <div className="flex items-center space-x-4">
              <Image src="/khalti.jpg" alt="Khalti" width={32} height={32} />
              <span className="text-base font-medium text-gray-800 dark:text-white">
                Khalti
              </span>
            </div>
            <input
              type="radio"
              id="khalti"
              name="payment"
              checked={paymentMethod === "khalti"}
              onChange={() => setPaymentMethod("khalti")}
              className="accent-purple-600 dark:accent-purple-400"
              disabled={isProcessing}
            />
          </label>
        </div>


        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className={`mt-6 w-full rounded-xl px-4 py-3 text-white font-medium transition duration-200 flex items-center justify-center ${paymentMethod === "khalti"
            ? "bg-purple-600 hover:bg-purple-700"
            : "bg-purple-600 hover:bg-purple-700"
            } ${isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Payment...
            </>
          ) : (
            getButtonLabel()
          )}
        </button>

        <button
          onClick={onClose}
          disabled={isProcessing}
          className="cursor-pointer mt-4 w-full text-center text-sm text-gray-500 hover:underline dark:text-gray-400 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
