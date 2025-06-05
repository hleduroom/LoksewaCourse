import db from "@/db";
import { transaction, course } from "../../../../db/schema";
import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    const { userId, courseId } = await req.json();
    const transactionId = uuidv4();

    const courseData = await db.query.course.findFirst({
        where: eq(course.id, courseId),
    });

    if (!courseData) {
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const amount = courseData.price ?? 0;

    await db.insert(transaction).values({
        id: transactionId,
        amount: String(amount),
        status: "pending",
        userId,
        courseId,
    });

    return NextResponse.json({
        transactionId,
        productName: courseData.title || "Course Purchase",
        amount,
    });
}
