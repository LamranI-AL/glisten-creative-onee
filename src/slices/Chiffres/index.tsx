// "use client";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `Chiffres`.
 */
export type ChiffresProps = SliceComponentProps<Content.ChiffresSlice>;

/**
 * Component for "Chiffres" Slices.
 */
const Chiffres = ({ slice }: ChiffresProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      // className="bg-white dark:bg-slate-800"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
            <PrismicRichText field={slice.primary.heading} />
            {/* Trusted by eCommerce Businesses */}
          </div>

          <div className="mt-4 text-gray-500 sm:text-xl dark:text-gray-400">
            <PrismicRichText field={slice.primary.subheading} />
            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            dolores laborum labore provident impedit esse recusandae facere
            libero harum sequi. */}
          </div>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:divide-x sm:divide-gray-100 dark:sm:divide-gray-800">
            {slice.items.map((item, index) => {
              return (
                <div
                  className="flex flex-col px-4 py-8 text-center"
                  key={index}
                >
                  <dt className="order-last text-lg font-medium text-gray-500 dark:text-gray-400">
                    <PrismicRichText field={item.chiffretexte} />
                    {/* Official Addons */}
                  </dt>

                  <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                    <Link href={"https://www.instagram.com/quark.events"}>
                      <PrismicRichText field={item.chiffre} />
                    </Link>

                    {/* 24 */}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Chiffres;
