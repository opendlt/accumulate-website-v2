import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const pilotIntakeSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  organization: z.string().min(2),
  pilotTrack: z.enum([
    "vendor-authority",
    "treasury-controls",
    "coalition-delegation",
  ]),
  industry: z.string().min(2),
  workflow: z.string().min(10),
  urgency: z.enum(["exploring", "1-3-months", "immediate"]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = pilotIntakeSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.PILOT_INTAKE_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
