'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState("Verifying payment...");

    useEffect(() => {
        const pidx = searchParams.get("pidx");
        const transactionId = searchParams.get("transactionId");
        if (!pidx) {
            setStatus("Missing payment identifier.");
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`/api/payment/verify-payment?pidx=${pidx}&transactionId=${transactionId}`);
                const data = await res.json();
                if (res.ok && data.success && data.courseId) {
                    router.push(`/courses/${data.courseId}/watch`);
                } else {
                    setStatus("Payment verification failed. Please contact support.");
                }
            } catch (err) {
                console.error("Payment verify error:", err);
                setStatus("Something went wrong during verification.");
            }
        };

        verify();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center space-y-4">
            {status === "Verifying payment..." && (
                <div className="w-12 h-12 border-4 border-dashed border-green-500 rounded-full animate-spin" />
            )}
            <p className="text-lg text-gray-700">{status}</p>
        </div>
    );
}
