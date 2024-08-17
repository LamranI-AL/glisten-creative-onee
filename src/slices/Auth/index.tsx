"use client";
import { Calendar } from "@/components/ui/calendar";
// import ButtonLink from "@/components/ButtonLink";
// import { Calendar } from "@/components/ui/calendar";
import { reservation } from "@/interfaces/interfaces";
import { reservationSchema } from "@/schemas/reservationSchema";
// import { useSession } from "@clerk/nextjs";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { useState } from "react";
import toast from "react-hot-toast";
import React from "react";
import Bounded from "@/components/Bounded";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { InfoIcon, PhoneCall, ServerIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type AuthProps = SliceComponentProps<Content.AuthSlice>;

const Auth = ({ slice }: AuthProps): JSX.Element => {
  const [date, setDate] = useState<Date | undefined>(new Date(Date.now()));
  // const { session } = useSession();
  const reserverAction = async (formData: FormData) => {
    const toastId = toast.loading("Waiting...");
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phone") as string;
    const serviceName = formData.get("selectEvent") as string;
    console.log(serviceName, phoneNumber);
    const newReservation: reservation | any = {
      name: name,
      phoneNumber: phoneNumber,
      email: "",
      service: serviceName ?? "no select",
      creatAt: new Date(Date.now()),
    };
    const newInput: reservation | any = {
      name: name,
      phoneNumber: phoneNumber,
    };
    const result = reservationSchema.safeParse(newInput);
    if (result.success) {
      await fetch(`/api/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReservation),
      })
        .then(() => {
          toast.dismiss(toastId);
          toast.success("reservation added successfully");
        })
        .catch(() => {
          toast.dismiss(toastId);
          toast.error("Failed to add reservation");
        });
    } else {
      let errorMsg = "";
      result.error?.issues.forEach((issue) => {
        errorMsg += issue.path[0] + " : " + issue.message + " . \n";
      });
      toast.dismiss(toastId);
      toast.error(errorMsg);
    }
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-slate-300"
    >
      <h2 className="text-balance text-center text-3xl font-medium md:text-5xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2  m-2 border border-gray-600 p-6 rounded-md ">
        <form action={reserverAction} className="mb-0 mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              name
            </label>

            <div className="relative">
              <Input
                type="text"
                name="name"
                className="shadow-sm p-6 bg-gray-950 text-sm"
                placeholder="Enter votre nom complet"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <InfoIcon />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">
              phone
            </label>
            <div className="relative">
              <Input
                type="tel"
                name="phone"
                className="shadow-sm p-6 bg-gray-950 text-sm"
                placeholder="entrer numéro de téléphone"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <PhoneCall />
              </span>
            </div>
          </div>

          <Select name="selectEvent">
            <SelectTrigger className="w-full bg-gray-950">
              <SelectValue placeholder="Choisissez votre service" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="bg-slate-950 text-gray-300">
                <SelectLabel>services</SelectLabel>
                <SelectItem
                  className="hover:bg-slate-300 hover:text-slate-900"
                  value="event-scolaire"
                >
                  {`évènement scolaire`}
                </SelectItem>
                <SelectItem
                  className="hover:bg-slate-300 hover:text-slate-900"
                  value="anniversaire"
                >
                  {`anniversaire`}
                </SelectItem>
                <SelectItem
                  className="hover:bg-slate-300 hover:text-slate-900 "
                  value="soutenance"
                >
                  {`soutenance`}
                </SelectItem>
                <SelectItem
                  className="hover:bg-slate-300 hover:text-slate-900 "
                  value="fetes"
                >
                  {`fêtes`}
                </SelectItem>
                <SelectItem
                  className="hover:bg-slate-300 hover:text-slate-900 "
                  value="soiree"
                >
                  {`soirée`}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {`Plus d'informations?`}
              {/* <a className="underline" href="#"> */}
              <Link
                className="underline"
                href={"https://www.instagram.com/quark.events"}
              >
                Voir
              </Link>
            </p>

            <Button
              type="submit"
              className="hover:border hover:border-cyan-900 hover:bg-cyan-900 h"
              variant={"outline"}
            >
              Reserver
            </Button>
          </div>
        </form>
        <h2 className="m-3 text-balance text-center text-3xl content-center font-medium md:text-2xl text-gray-600">
          Veuillez remplir le formulaire avec : votre nom, votre numéro de
          téléphone, et le nom du service. Nous vous contacterons dès que
          possible.
        </h2>
      </div>

      <div className="flex justify-center content-center m-4 p-6 my-10">
        {/* <h2 className="text-balance text-center text-gray-600 content-center text-3xl font-medium md:text-5xl">
          Calendrier pour vous aider à trouver la date idéale pour votre
          événement
        </h2> */}
        <Calendar
          mode="single"
          selected={new Date("11-05-2024")}
          onSelect={setDate}
          className="rounded-md border bg-gray-950"
        />
      </div>
    </Bounded>
  );
};

export default Auth;
