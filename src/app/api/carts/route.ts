import { actionCart, getCart, setCart } from "@/components/CookieUtils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const data = await getCart();
  return NextResponse.json({ data }, { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const result = await setCart(data);
  return NextResponse.json({ data: result }, { status: 200 });
};

export const PUT = async (req: NextRequest) => {
  const data: { id: string; action: "ADD" | "MIN" | "DEL" } = await req.json();
  const result = await actionCart(data.id, data.action);
  return NextResponse.json({ data: result }, { status: 200 });
};
