import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import clientPromise from "../../../../../lib/mongodb";

interface JwtPayload {
  userId: string;
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Cookie not found" },
        { status: 401 },
      );
    }
    const client = await clientPromise;
    const db = client.db("linkle");
    const collection = db.collection("userdata");
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
    const userId = decoded.userId;

    const result = await collection.findOne(
      { userId },
      { projection: { calendar: 1, _id: 0 } },
    );
    return NextResponse.json(
      { message: "Success to get blocks", result },
      { status: 200 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to create data", error: errorMessage },
      { status: 500 },
    );
  }
}
