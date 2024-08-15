"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reservation } from "@/interfaces/interfaces";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "@clerk/nextjs";

type Props = {};

function ReservationList({}: Props) {
  const { session } = useSession();
  //   console.log(session);
  const currentUserEmail = session?.user?.emailAddresses[0].emailAddress;
  const [myReservations, setMyReservations] = useState<reservation[]>([]);
  useEffect(() => {
    const getMyReservation = async () => {
      const response = await fetch(`/api/services`, {
        method: "GET",
        cache: "no-cache",
      });
      const data = await response.json();
      setMyReservations(data);
    };
    getMyReservation();
  }, []);
  //   console.log(myReservations);
  const getDate = (reservationDate: Date) => {
    const date = new Date(reservationDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}-${month}-${year}`;
  };
  const deleteReservation = async (id: string) => {
    const idToast = toast.loading("Suppression de la réservation...");
    // alert(id);
    const response = await fetch(`/api/services/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    })
      .then(() => {
        toast.dismiss(idToast);
        toast.success("Réservation supprimée");
      })
      .catch(() => {
        toast.dismiss(idToast);
        toast.error("Erreur lors de la suppression de la réservation");
      });
  };
  const displayReservation = myReservations.filter(
    (reservation) => reservation.email === currentUserEmail
  );
  return (
    <Table className="text-gray-300">
      <TableCaption>list de mes reservation .</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">nom</TableHead>
          <TableHead>nom de service</TableHead>
          <TableHead>email</TableHead>
          <TableHead>date de creation</TableHead>
          <TableHead>Numéro de téléphone</TableHead>
          <TableHead className="text-right">OP</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayReservation.map((reservation) => (
          <TableRow key={reservation.email}>
            <TableCell className="font-medium">{reservation.name}</TableCell>
            <TableCell className="font-medium">{reservation.service}</TableCell>
            <TableCell>{reservation.email}</TableCell>
            <TableCell>{getDate(reservation.creatAt)}</TableCell>
            <TableCell>{reservation.phoneNumber}</TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => deleteReservation(reservation._id)}
                variant={"link"}
              >
                <Trash className="text-xs text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">
            {displayReservation.length}{" "}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
export default ReservationList;
