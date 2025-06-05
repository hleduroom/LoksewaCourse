
import { NextResponse } from 'next/server';
import db from '@/db';
import { subscription, transaction } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const pidx = searchParams.get("pidx");
        const transactionId = searchParams.get("transactionId");

        if (!pidx) {
            return NextResponse.json({ error: "Missing pidx" }, { status: 400 });
        }

        const khaltiRes = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
            method: "POST",
            headers: {
                Authorization: `Key ${process.env.NEXT_PUBLIC_KHALTI_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ pidx }),
        });

        const data = await khaltiRes.json();
        if (data.status !== "Completed") {
            return NextResponse.json({ error: "Payment not completed or invalid" }, { status: 400 });
        }
        if (!transactionId) {
            return NextResponse.json({ error: "Missing transactionId" }, { status: 400 });
        }
        const tx = await db.query.transaction.findFirst({
            where: eq(transaction.id, transactionId),
        });

        if (!tx) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        const existingSub = await db.query.subscription.findFirst({
            where: and(
                eq(subscription.userId, tx.userId),
                eq(subscription.courseId, tx.courseId)
            ),
        });

        if (existingSub) {
            return NextResponse.json({ success: true, courseId: tx.courseId });
        }


        const now = new Date();
        const end = new Date();
        end.setMonth(end.getMonth() + 1);

        await db.insert(subscription).values({
            userId: tx.userId,
            courseId: tx.courseId,
            transactionId: tx.id,
            startDate: now,
            endDate: end,
            isActive: true,
        });

        await db.update(transaction).set({ status: "completed" }).where(eq(transaction.id, tx.id));

        return NextResponse.json({ success: true, courseId: tx.courseId });
    } catch (err) {
        console.error("Verification error:", err);
        return NextResponse.json(
            { error: "Internal server error", details: err instanceof Error ? err.message : err },
            { status: 500 }
        );
    }
}
