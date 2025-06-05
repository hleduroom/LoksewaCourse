'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
    userId: string;
}

export default function KhaltiPayment({ userId }: Props) {
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const router = useRouter();

    useEffect(() => {
        const startPayment = async () => {
            try {
                const res1 = await fetch('/api/payment/create-transaction', {
                    method: 'POST',
                    body: JSON.stringify({ userId, courseId }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const { transactionId, productName, amount } = await res1.json();

                const res2 = await fetch('/api/payment/initiate-payment', {
                    method: 'POST',
                    body: JSON.stringify({
                        amount,
                        courseId,
                        transactionId,
                        productName,
                        userId,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await res2.json();
                router.push(data.paymentUrl);
            } catch (err) {
                console.log('Error initiating Khalti payment:', err);
            } finally {
                setLoading(false);
            }
        };

        if (courseId && userId) {
            startPayment();
        }
    }, [courseId, userId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 border-4 border-purple-500 border-dashed rounded-full animate-spin" />
            <p className="text-lg text-gray-700">Redirecting to Khalti...</p>
        </div>
    );
}
