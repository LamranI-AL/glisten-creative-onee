import { reservation } from "@/interfaces/interfaces";
import connectDb from "@/lib/db";
import Service from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    await connectDb();
    // get data form Employees collection
    const reservations: reservation[] = await Service.find();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des reservations :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Connexion au db
    await connectDb();
    const requestData: reservation = await req.json();
    // new one
    const newReservation = new Service(requestData);
    await newReservation.save();
    // msg d confirmation
    return NextResponse.json(newReservation);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la reservation :", error);
    // eror cas :
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
