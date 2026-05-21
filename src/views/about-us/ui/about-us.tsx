import Image from "next/image";
import Link from "next/link";

import { CustomButton } from "@/shared/ui";
import { SolutionCards } from "@/widgets/solution-cards";

import "./about-us.scss";

export const AboutUsPage = () => {
  return (
    <main className="AboutUsPage">
      <section className="AboutUsPage-main">
        <div className="container">
          <Image
            className="AboutUsPage-img"
            src="/about-us/about-us.webp"
            alt="ArloCars team — automotive experts in Dubai"
            width={455}
            height={735}
          />
          <div className="AboutUsPage-content">
            <p className="AboutUsPage-heading">About Arlocars</p>
            <h1 className="AboutUsPage-title">
              Driven by Excellence, Defined by <strong>Trust</strong>
            </h1>
            <p className="AboutUsPage-text">
              Arlocars is a Dubai-based used car business built on over 15 years of automotive
              expertise. From managing premium dealerships in the UK to launching a customer-first
              brand in the UAE, our journey is rooted in professionalism, transparency, and
              delivering real value to our clients. <br />
              <br />
              We make it easy for individuals to sell, consign, or trade their vehicles with
              confidence. Whether you’re looking to get a quick valuation, renew your registration
              hassle-free, or explore financing options, Arlocars is your trusted partner for all
              things automotive.
            </p>
            <Link href="/contact">
              <CustomButton>Get a Quote</CustomButton>
            </Link>
          </div>
        </div>
      </section>
      <SolutionCards />
    </main>
  );
};
