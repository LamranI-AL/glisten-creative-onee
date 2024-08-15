"use client";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import StarBackground from "./StarBackground";
import Image from "next/image";

import background from "./background.jpg";
import React from "react";
import AnimatedContent from "./AnimatedContent";

/**
 * Props for `Integrations`.
 */
export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

/**
 * Component for "Integrations" Slices.
 */
const Integrations = ({ slice }: IntegrationsProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <StarBackground />

      <div className="relative">
        <h2 className="mx-auto max-w-2xl text-balance text-slate-300  text-center text-5xl font-medium md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        <div className="mx-auto mt-6 max-w-md text-balance text-center text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  );
};

export default Integrations;
