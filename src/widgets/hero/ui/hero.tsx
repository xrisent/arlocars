import { Carousel } from "antd";

import "./hero.scss";

const slides = [
  {
    id: 1,
    image: "/hero-banner-1.jpg",
    title: "Driven by Excellence, <br /> Defined by Trust",
  },
  {
    id: 2,
    image: "/hero-banner-1.jpg",
    title: "Innovation Meets <br /> Reliability",
  },
  {
    id: 3,
    image: "/hero-banner-1.jpg",
    title: "Your Success <br /> Our Priority",
  },
];

export const HeroSection = () => {
  return (
    <section className="h-[100vh] HeroSection">
      <Carousel draggable swipe infinite dots={false} autoplay autoplaySpeed={5000}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              className="bg-center bg-cover bg-no-repeat h-[100%] pt-[108px]"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
              }}
            >
              <div className="container flex items-center h-full">
                <h2
                  className="text-[62px] text-[var(--color-gold)] title"
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};
