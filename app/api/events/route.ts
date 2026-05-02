import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    let event: any;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 },
      );
    }

    // normalize mode
    if (event.mode) {
      event.mode = String(event.mode).toLowerCase().trim();
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
