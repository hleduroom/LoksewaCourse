'use server';

import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import db from "@/db";
import { subscription, transaction } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSessions } from "@/actions/sessions";
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { amount, courseId, transactionId, userId } = body;
        const session = await getSessions()
        if (!amount || !courseId || !transactionId || !userId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const existingSub = await db.query.subscription.findFirst({
            where: and(
                eq(subscription.userId, userId),
                eq(subscription.courseId, courseId)
            ),
        });

        if (existingSub) {
            return NextResponse.json(
                { error: "You already have access to this course." },
                { status: 409 }
            );
        }

        const khaltiConfig = {
            return_url: `${process.env.BETTER_AUTH_URL}/payment/success?courseId=${courseId}&transactionId=${transactionId}`,
            website_url: process.env.BETTER_AUTH_URL!,
            amount: Math.round(parseFloat(amount) * 100), // in paisa
            purchase_order_id: transactionId,
            purchase_order_name: courseId,
            customer_info: {
                name: session?.user?.name,
                email: session?.user?.email,
            },
        };

        const response = await fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
            method: "POST",
            headers: {
                Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(khaltiConfig),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Khalti API Error:", errorData);
            return NextResponse.json(
                { error: "Khalti payment initiation failed", details: errorData },
                { status: 500 }
            );
        }

        const khaltiResponse = await response.json();
        return NextResponse.json({ paymentUrl: khaltiResponse.payment_url });

    } catch (err) {
        console.error("Payment API Error:", err);
        return NextResponse.json(
            {
                error: "Error initiating Khalti payment",
                details: err instanceof Error ? err.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
