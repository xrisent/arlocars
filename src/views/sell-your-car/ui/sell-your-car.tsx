import Image from "next/image";
import Link from "next/link";

import { CustomButton } from "@/shared/ui";
import { Accordion } from "@/shared/ui/accordion";
import { sellYourCarFaqs } from "@/views/sell-your-car/constants/faqs";
import { SellCarSection } from "@/widgets/sell-car";

import "./sell-your-car.scss";

export const SellYourCarPage = () => {
  return (
    <main className="SellYourCarPage">
      <SellCarSection mainHeading />

      <section className="SellYourCarPage-why">
        <div className="container SellYourCarPage-whyGrid">
          <div className="SellYourCarPage-whyImage">
            <Image
              src="/sell-your-car/why-choose-us.png"
              alt="Why choose Arlo Cars for selling your car in Dubai"
              width={770}
              height={700}
              sizes="(max-width: 1250px) 100vw, 50vw"
            />
          </div>
          <article>
            <h2>Why Choose Arlo Cars</h2>
            <p>
              At Arlo Cars, we make selling your car simple and stress-free. From the moment you
              reach out, our team handles everything — from providing a quick, competitive offer to
              managing all paperwork and transfer. Whether you&apos;re upgrading or just letting go,
              you can count on our expertise, integrity, and personalised service every step of the
              way.
            </p>
            <Link href="/contact">
              <CustomButton>Get a Quote</CustomButton>
            </Link>
          </article>
        </div>
      </section>

      <section className="SellYourCarPage-faq" aria-labelledby="sell-faq-heading">
        <div className="container">
          <h2 id="sell-faq-heading" className="sr-only">
            Frequently asked questions
          </h2>
          <Accordion faqs={[...sellYourCarFaqs]} />
        </div>
      </section>
    </main>
  );
};
