"use client";
import { reserverBth } from "@/actions/reservation";
import Bounded from "@/components/Bounded";
import ReservationList from "@/components/reservation-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reservation } from "@/interfaces/interfaces";
import { reservationSchema } from "@/schemas/reservationSchema";
// import { useSession } from "@clerk/nextjs";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { InfoIcon, PhoneCall } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export type ReserveSectionProps =
  SliceComponentProps<Content.ReserveSectionSlice>;

const ReserveSection = ({ slice }: ReserveSectionProps): JSX.Element => {
  // const { session } = useSession();
  // console.log(session?.user?.emailAddresses[0].emailAddress);
  const reserverAction = async (formData: FormData) => {
    const toastId = toast.loading("Waiting...");
    const name = formData.get("name") as string;
    const phoneNumber = formData.get("phone") as string;
    const newReservation: reservation | any = {
      name: name,
      phoneNumber: phoneNumber,
      email: "emailWaitingClerkOrOthersProviders",
      service: "BTH",
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
      // console.log(result.error?.issues, errorMsg);
      toast.dismiss(toastId);
      toast.error(errorMsg);
    }
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-lg text-center">
          <div className="text-2xl font-bold sm:text-3xl text-gray-300">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="mt-4 text-gray-300">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
        </div>
        <form
          action={reserverAction}
          className="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <Input
                type="text"
                name="name"
                className="shadow-sm p-6 bg-slate-600 text-sm"
                placeholder="Enter votre nom complet"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <InfoIcon />
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Input
                type="tel"
                name="phone"
                className="shadow-sm p-6 bg-slate-600 text-sm"
                placeholder="entrer numéro de téléphone"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <PhoneCall />
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {`Plus d'informations?`}
              <Link
                className="underline"
                href={"https://www.instagram.com/quark.events"}
              >
                Voir
              </Link>
            </p>

            <Button type="submit" variant={"outline"} className="text-gray-300">
              Reserver
            </Button>
          </div>
        </form>
      </div>
      <ReservationList />
    </Bounded>
  );
};

export default ReserveSection;
