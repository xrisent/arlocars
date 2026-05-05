import Image from "next/image";
import Link from "next/link";

import { CustomButton } from "@/shared/ui";
import { Accordion } from "@/shared/ui/accordion";
import { SellCarSection } from "@/widgets/sell-car";

const faqs = [
  {
    key: "1",
    question: "1. How do I sell my car through Arlocars?",
    answer:
      'Selling your car is easy! Simply fill out our "Sell Your Car" form, and our team will get in touch to schedule a free inspection and valuation. If everything checks out, we\'ll offer you a deal and handle all the paperwork.',
  },
  {
    key: "2",
    question: "2. Do you buy all types of vehicles?",
    answer: "We buy all makes and models of GCC cars under 120,000 km. Subject to condition.",
  },
  {
    key: "3",
    question: "3. What documents do I need to sell my car?",
    answer:
      "You'll need your Emirates ID, car registration (Mulkiya), and a valid driving license. Our team will guide you through the full process.",
  },
  {
    key: "4",
    question: "4. Can I sell my car if there is still a bank loan on it?",
    answer:
      "Yes, we can help you clear the loan and handle the paperwork with your bank. Just provide the current loan details, and we'll take care of the rest.",
  },
  {
    key: "5",
    question: "5. How long does it take to get paid?",
    answer:
      "Once the inspection is complete and the deal is finalized, we provide same-day secure payment via your preferred method — either bank transfer or cash.",
  },
  {
    key: "6",
    question: "6. Do you provide car consignment services?",
    answer:
      "Absolutely! We can list and market your car, handle inquiries, and manage the full sales process on your behalf. You only pay once the car is sold.",
  },
  {
    key: "7",
    question: "7. Can you help with RTA inspection and car registration renewal?",
    answer:
      "Yes, we offer assistance with RTA testing, registration renewal, and related services. Our team can collect your car, handle everything, and return it fully processed.",
  },
];

import "./sell-your-car.scss";

export const SellYourCarPage = () => {
  return (
    <main className="SellYourCarPage">
      <SellCarSection subtitle="Cosmetic Car Repairs" />

      <section className="SellYourCarPage-why">
        <div className="container SellYourCarPage-whyGrid">
          <div className="SellYourCarPage-whyImage">
            <Image
              src="/sell-your-car/why-choose-image.png"
              alt="Why choose Arlo Cars"
              width={770}
              height={700}
              sizes="(max-width: 1250px) 100vw, 50vw"
            />
          </div>
          <article>
            <h2>Why Choose Arlo Cars.</h2>
            <p>
              At Arlo Cars, we make selling your car simple and stress-free- From the moment you
              reach out, our team handles everything - from providing a quick, competitive offer to
              managing all paperwork and transfer. Whether you&apos;re upgrading or just letting go,
              you can count on our expertise, integrity, and personalised service every step of the
              way
            </p>
            <Link href="/contact">
              <CustomButton>Get a Quote</CustomButton>
            </Link>
          </article>
        </div>
      </section>

      <section className="SellYourCarPage-faq">
        <div className="container">
          <Accordion faqs={faqs} />
        </div>
      </section>
    </main>
  );
};
