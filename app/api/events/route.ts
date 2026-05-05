import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Event from "@/database/event.model";

// ✅ Uses CLOUDINARY_URL automatically from .env.local
cloudinary.config({
  secure: true,
});

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event: any;

    try {
      event = Object.fromEntries(formData.entries());
    } catch {
      return NextResponse.json(
        { message: "Invalid data format" },
        { status: 400 },
      );
    }

    // ✅ Get image file
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { message: "Valid image file is required" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload to Cloudinary
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        )
        .end(buffer);
    });

    event.image = uploadResult.secure_url;

    // ✅ Normalize mode
    if (event.mode) {
      event.mode = String(event.mode).toLowerCase().trim();
    }

    // ✅ Safe parse agenda (supports JSON and comma-separated text)
    if (event.agenda && typeof event.agenda === "string") {
      try {
        event.agenda = JSON.parse(event.agenda);
      } catch {
        event.agenda = event.agenda
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean);
      }
    }

    // ✅ Safe parse tags (supports JSON and comma-separated text)
    if (event.tags && typeof event.tags === "string") {
      try {
        event.tags = JSON.parse(event.tags);
      } catch {
        event.tags = event.tags
          .split(",")
          .map((item: string) => item.trim())
          .filter(Boolean);
      }
    }

    // ✅ Create event
    const createdEvent = await Event.create(event);

    return NextResponse.json(
      {
        message: "Event Created Successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e.message,
      },
      { status: 500 },
    );
  }
}
