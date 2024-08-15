import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FqaSlice`.
 */
export type FqaSliceProps = SliceComponentProps<Content.FqaSliceSlice>;

/**
 * Component for "FqaSlice" Slices.
 */
const FqaSlice = ({ slice }: FqaSliceProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.items.map((item) => {
        return (
          <div className="space-y-4 m-1 w-full">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className=" flex w-full  cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900 dark:bg-slate-900 dark:text-white">
                <div className="font-medium">
                  <PrismicRichText field={item.question} />
                </div>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <div className="mt-4 px-4 leading-relaxed text-gray-700 dark:text-gray-200">
                <PrismicRichText field={item.reponse} />
              </div>
            </details>
          </div>
        );
      })}
    </Bounded>
  );
};

export default FqaSlice;
