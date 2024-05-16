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
import { FormEvent, useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";

export type AuthProps = SliceComponentProps<Content.AuthSlice>;

const Auth = ({ slice }: AuthProps): JSX.Element => {
  const [onSend, setOnSend] = useState(false);
  const [isValidatForm, setIsValidatForm] = useState(false);
  const [errors, setErrors] = useState({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const eventDescriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    getDataForm();
  }, [Object.keys(errors).length]);
  const resetForm = () => {
    nameRef.current!.value = "";
    emailRef.current!.value = "";
    phoneRef.current!.value = "";
    eventDescriptionRef.current!.value = "";
  };
  const creatEvent = () => {
    axios
      .post("https://quark-api-ensabm.vercel.app/CreatMessage", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        age: phoneRef.current?.value,
        message: eventDescriptionRef.current?.value,
      })
      .then(() => {
        console.log("all is oky");
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  };
  const getDataForm = () => {
    setErrors([]);
    if (nameRef.current?.value.trim() === "") {
      setErrors((prevState) => {
        return { ...prevState, ...{ name: "Name is required" } };
      });
    }
    if (emailRef.current?.value.trim() === "") {
      setErrors((prevState) => {
        return { ...prevState, ...{ email: "Email is required" } };
      });
    } else if (!emailRef.current?.value.trim().match(/^\S+@\S+.\S$/)) {
      setErrors(() => {
        return { ...errors, ...{ email: "Email is not valid" } };
      });
    }
    if (phoneRef.current?.value.trim() === "") {
      setErrors((prevState) => {
        return { ...prevState, ...{ phone: "Phone is required" } };
      });
    }
    if (eventDescriptionRef.current?.value.trim() === "") {
      setErrors((prevState) => {
        return {
          ...prevState,
          ...{ eventDescription: "Event Description is required" },
        };
      });
    }
  };

  const handelclick = (e: FormEvent) => {
    e.preventDefault();
    getDataForm();
    if (Object.keys(errors).length === 0) {
      setIsValidatForm(true);
      creatEvent();
      resetForm();
    } else if (Object.keys(errors).length > 0) {
      setIsValidatForm(false);
    }
    Object.entries(errors).map((err) => {
      console.log(err);
    });
    setOnSend(true);
  };
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {isValidatForm && onSend && (
        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ms-1 me-1.5 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <p className="whitespace-nowrap text-sm">send succes</p>
        </span>
      )}
      {!isValidatForm && onSend && (
        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="-ms-1 me-1.5 h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <p className="whitespace-nowrap text-sm">Failed to send</p>
        </span>
      )}
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="py-16">
        <form action="#" className="mb-0 mt-8 space-y-4">
          <div>
            <label className="mb-6">name</label>
            <div className="relative">
              <input
                ref={nameRef}
                type="email"
                className="w-full rounded-lg border-gray-200  bg-black/20 p-4 pe-12 text-sm border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                placeholder="Enter votre nom"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="pb-5">
              Email
            </label>
            <div className="relative">
              <input
                ref={emailRef}
                type="email"
                className="w-full rounded-lg border-gray-200 bg-black/20  p-4 pe-12 text-sm border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="">
              phone
            </label>
            <div className="relative">
              <input
                ref={phoneRef}
                type="text"
                className="w-full rounded-lg border-gray-200 bg-black/20  p-4 pe-12 text-sm border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                placeholder="Entrez votre numéro de téléphone."
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="OrderNotes" className="">
                Description
              </label>

              <div className="overflow-hidden rounded-lg border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
                <textarea
                  ref={eventDescriptionRef}
                  id="OrderNotes"
                  className="w-full bg-black/20 resize-none p-4 border-none align-top focus:ring-0 sm:text-sm"
                  rows={8}
                  placeholder="description de votre events exclusif "
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-1">
            <ButtonLink field={undefined} href={"/"} className="mt-6 m-2">
              {"page d'acceuil"}
            </ButtonLink>
            <ButtonLink
              onClick={handelclick}
              field={undefined}
              className="mt-6 m-2"
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
