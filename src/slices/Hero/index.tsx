import Bounded from "@/components/Bounded";
import ButtonLink from "@/components/ButtonLink";
import StarGrid from "@/components/StarGrid";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="text-center"
    >
      <div className="relative">
        <StarGrid />
        {/* Placeholder component for hero (variation: {slice.variation}) Slices */}
        {isFilled.richText(slice.primary.heading) && (
          <h1 className="text-balance text-center text-5xl font-medium md:text-7xl">
            <PrismicText field={slice.primary.heading} />
          </h1>
        )}
        {isFilled.richText(slice.primary.body) && (
          <div className="mx-auto mt-6 max-w-md text-balance text-slate-300">
            <PrismicText field={slice.primary.body} />
          </div>
        )}

        {/* <PrismicRichText field={slice.primary.body} /> */}
        {isFilled.link(slice.primary.button_link) && (
          <ButtonLink className=" mt-8 " field={slice.primary.button_link}>
            {slice.primary.button_label}
          </ButtonLink>
        )}
        {/* <ButtonLink field={slice.primary.button_link}>
          {slice.primary.button_label}
        </ButtonLink> */}
        {isFilled.image(slice.primary.image) && (
          <div className="glass-container mt-16 w-fit">
            <div className="absolute -z-10 inset-0  bg-blue-500/30 blur-2xl filter" />
            <PrismicNextImage
              alt=""
              className="rounded-lg"
              field={slice.primary.image}
            />
          </div>
        )}
        {/* <PrismicNextImage field={slice.primary.image} /> */}
      </div>
    </Bounded>
  );
};

export default Hero;
