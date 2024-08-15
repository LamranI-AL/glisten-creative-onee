import { reservation } from "@/interfaces/interfaces";
import connectDb from "@/lib/db";
import Service from "@/models/Service";
import { NextRequest, NextResponse } from "next/server";
interface Props {
  params: {
    id: string;
  };
}
// update one
export async function PUT(req: NextRequest, { params }: Props) {
  try {
    await connectDb();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }
    const newReservtionUpdated: Partial<reservation> = await req.json();
    if (!newReservtionUpdated) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const updatedReservation = await Service.findByIdAndUpdate(
      id,
      newReservtionUpdated,
      {
        new: true,
      }
    );

    if (!updatedReservation) {
      return NextResponse.json({
        message: "Employé non trouvé",
        status: 404,
      });
    }

    return NextResponse.json(updatedReservation);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la reservation :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
// delete one
export async function DELETE(req: NextRequest, { params }: Props) {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }
  try {
    const { id } = params;

    const deletedReservation = await Service.findByIdAndDelete(id);

    if (!deletedReservation) {
      return NextResponse.json({
        message: "reservation non trouvé",
        status: 404,
      });
    }

    return NextResponse.json(deletedReservation);
  } catch (error) {
    console.error("Erreur lors de la suppression de la reservation :", error);
    return NextResponse.json({
      message: "Erreur lors de la requête",
      error: error instanceof Error ? error.message : "Erreur inconnue",
      status: 500,
    });
  }
}
// get one
export async function GET(request: NextRequest, { params }: Props) {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error connecting to the database" },
      { status: 500 }
    );
  }
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const reservation = await Service.findById(id);
    if (!reservation) {
      return NextResponse.json(
        { message: "reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Error retrieving reservation:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
