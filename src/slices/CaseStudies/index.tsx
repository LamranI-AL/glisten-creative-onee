import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import clsx from "clsx";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/**
 * Component for "CaseStudies" Slices.
 */
const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient();

  const caseStudies = await Promise.all(
    slice.items.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id
        );
      }
    })
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <h2 className="max-w-2xl text-balance text-center text-5xl font-medium md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>

      <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
        {/* <PrismicRichText field={slice.primary.body} /> */}
      </div>

      <div className="mt-20 grid gap-16">
        {caseStudies.map(
          (caseStudy, index) =>
            caseStudy && (
              <div
                key={caseStudy.id}
                className="relative grid opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                <div className="col-span-1 flex flex-col justify-center gap-2">
                  <h3 className="text-4xl">
                    <PrismicText field={caseStudy.data.company} />
                  </h3>
                  <div className="max-w-md">
                    <PrismicRichText field={caseStudy.data.description} />
                  </div>

                  <ButtonLink
                    document={caseStudy}
                    className="after:absolute after:inset-0 "
                  >
                    {/* Découvrez davantage à propos de notre{" "} */}
                    <PrismicText field={caseStudy.data.company} />
                  </ButtonLink>
                </div>
                <PrismicNextImage
                  alt=""
                  field={caseStudy.data.logo_image}
                  quality={100}
                  width={1000}
                  height={1000}
                  // sizes="(max-width: 768px) 100vw, 50vw"
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1"
                  )}
                />
              </div>
            )
        )}
      </div>
    </Bounded>
  );
};

export default CaseStudies;
