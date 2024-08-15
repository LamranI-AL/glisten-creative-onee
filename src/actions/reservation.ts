"use server";

import { reservation } from "@/interfaces/interfaces";
import axios from "axios";

export const reserverBth = async (reservation: reservation) => {
  console.log(reservation);
  //   const name = formData.get("name");
  //   const phoneNumber = formData.get("phone");
  //   console.log("les donner : " + name, phoneNumber);
  //   await axios.post("/api/reservation", {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(reservation),
  //   });
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
};
