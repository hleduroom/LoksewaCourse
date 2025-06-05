"use client";

import { DollarSign, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { QuizMeta } from "@/data/mock";

type PurchaseModalProps = {
  quiz: QuizMeta | null;
  onClose: () => void;
  onBuy: () => void;
};

export default function PurchaseModal({
  quiz,
  onClose,
  onBuy,
}: PurchaseModalProps) {
  if (!quiz) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal content */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <button
          className="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="mb-3 text-lg font-semibold">Purchase Required</h2>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          This quiz <strong>{quiz.name}</strong> requires a purchase to
          continue.
        </p>
        <div className="mb-4 flex items-center space-x-2 font-medium text-yellow-600">
          <DollarSign className="h-4 w-4" />
          <span>Price: ₹{quiz.price || "N/A"}</span>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="secondary"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={onBuy} className="cursor-pointer">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
