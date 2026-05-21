import Link from "next/link";

import { SellSVG, AutomativeSVG, BuySVG } from "@/shared/assets/icons";

import "./solution-cards.scss";

const cards = [
  {
    img: <BuySVG size={40} color="var(--e-global-color-primary)" />,
    title: "Buy",
    p: "Trusted by buyers who value quality, transparency, and care. Handpicked, verified cars with a smooth digital process, flexible finance options and peace of mind.",
    href: "/cars",
  },
  {
    img: <SellSVG size={40} color="var(--e-global-color-primary)" />,
    title: "Sell",
    p: "Sell your car fast with Arlo Cars - instant valuation, hassle free inspection, and same day secure payment. No waiting, No Stress",
    href: "/sell-your-car",
  },
  {
    img: <AutomativeSVG size={40} color="var(--e-global-color-primary)" />,
    title: "Arlo Automotive Solutions",
    p: "Effortless car ownership with Arlo Cars - from registration to repairs, we handle every detail so you stay on the road without losing a minute of your day.",
    href: "/automotive-solutions",
  },
];

export const SolutionCards = () => {
  return (
    <section className="SolutionCards py-[100px] text-center">
      <div className="container">
        <p className="font-[16px] desc">Our Automotive Services</p>
        <h2 className="title">
          Trusted car care <span>solutions</span>
        </h2>

        <div className="cards flex items-center justify-between pt-[50px]">
          {cards.map((card) => (
            <Link
              href={card.href}
              className="card flex flex-col items-center text-center gap-[14px] transition-opacity hover:opacity-90"
              key={card.title}
            >
              <span className="icon w-[71px] h-[71px] flex items-center justify-center rounded-[10%]">
                {card.img}
              </span>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.p}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
