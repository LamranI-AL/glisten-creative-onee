"use client";
import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  PrismicLink,
  SliceComponentProps,
} from "@prismicio/react";
import { useEffect, useRef } from "react";
import Axios, { AxiosError } from "Axios";

export type AuthProps = SliceComponentProps<Content.AuthSlice>;

const Auth = ({ slice }: AuthProps): JSX.Element => {
  // const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(nameRef);
  }, []);

  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const eventDescriptionRef = useRef("");
  const handelclick = (e: MouseEvent) => {
    e.preventDefault();
    alert("hello");
    Axios.post("https://quark-api-ensabm.vercel.app/CreatMessage", {
      name: nameRef.current.value,
      email: emailRef.current.value,
      age: phoneRef.current.value,
      message: eventDescriptionRef.current.value,
    })
      .then(() => {
        console.log("all is okuu");
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
    console.log(nameRef.current.value, eventDescriptionRef.current.value);
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label className="sr-only">name</label>
            <div className="relative">
              <input
                ref={nameRef}
                type="email"
                className="w-full rounded-lg border-gray-200 bg-black/20 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter votre nom"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                className="w-full rounded-lg border-gray-200 bg-black/20  p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              phone
            </label>
            <div className="relative">
              <input
                ref={phoneRef}
                type="text"
                className="w-full rounded-lg border-gray-200 bg-black/20  p-4 pe-12 text-sm shadow-sm"
                placeholder="Entrez votre numéro de téléphone."
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              message
            </label>
            <div className="relative">
              <input
                ref={eventDescriptionRef}
                type="text"
                className="w-full rounded-lg border-gray-200 bg-black/20  p-4 pe-12 text-sm shadow-sm"
                placeholder="Entrez une petite description de votre event"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <ButtonLink
              onClick={handelclick}
              field={slice.primary.button_link}
              className="mt-6 lg:ml-9"
            >
              {slice.primary.button_text || "Learn More"}
            </ButtonLink>
          </div>
        </form>
      </div>
    </Bounded>
  );
};

export default Auth;
