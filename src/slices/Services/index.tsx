import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { Content } from "@prismicio/client";
import {
  // PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Link from "next/link";

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

const Services = ({ slice }: ServicesProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-lg text-center">
          <div className="text-3xl font-bold sm:text-4xl text-gray-300">
            <PrismicRichText field={slice.primary.heading} />
          </div>

          <div className="mt-4 text-gray-300">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {slice.items.map((item, index) => {
            return (
              <div
                className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-blue-500/10 hover:shadow-blue-500/10"
                key={index}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-10 text-blue-950"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>

                <div className="mt-4 text-xl font-bold text-white">
                  <Link href={"/apply"}>
                    <PrismicRichText field={item.cardtitle} />
                  </Link>
                </div>

                <div className="mt-1 text-sm text-gray-300">
                  <PrismicRichText field={item.cardsubtitle} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/apply">Commencer</ButtonLink>
        </div>
      </div>
    </Bounded>
  );
};

export default Services;
