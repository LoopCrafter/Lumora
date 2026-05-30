import { getDb } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await req.json();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "No email provided" }, { status: 400 });
  }
  const db = getDb();
  try {
    const userInfo = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    // If user does NOT exist in DB
    if (userInfo.length === 0) {
      const saveResult = await db
        .insert(users)
        .values({
          name: user?.fullName,
          email,
          imageUrl: user?.imageUrl,
          userId: user?.id,
        })
        .returning();

      return NextResponse.json({ result: saveResult[0] });
    }
    // If User  exist in DB
    await db
      .update(users)
      .set({ lastVisitTime: new Date() })
      .where(eq(users.email, email))
      .returning();

    return NextResponse.json({ result: userInfo[0] });
  } catch (e) {
    return NextResponse.json(
      { error: e || "Something went wrong" },
      { status: 500 },
    );
  }
}
