import { Carousel } from "antd";
import Image from "next/image";

import "./hero.scss";

const slides = [
  {
    id: 1,
    image: "/IMG_1062.PNG",
    title: "Driven by Excellence, <br /> Defined by Trust",
    alt: "Arlo Cars showroom — driven by excellence in Dubai",
  },
  {
    id: 2,
    image: "/IMG_1062.PNG",
    title: "Innovation Meets <br /> Reliability",
    alt: "Premium used cars for sale at Arlo Cars Dubai",
  },
  {
    id: 3,
    image: "/IMG_1062.PNG",
    title: "Your Success <br /> Our Priority",
    alt: "Trusted automotive services by Arlo Cars",
  },
];

export const HeroSection = () => {
  return (
    <section className="h-[100vh] HeroSection">
      <Carousel draggable swipe infinite dots={false} autoplay autoplaySpeed={5000}>
        {slides.map((slide, index) => (
          <div key={slide.id}>
            <div className="relative h-[100%] pt-[108px] HeroSection-slide">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="HeroSection-overlay" aria-hidden="true" />
              <div className="container relative z-10 flex items-center h-full">
                {index === 0 ? (
                  <h1
                    className="text-[62px] text-[var(--color-gold)] title"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                ) : (
                  <h2
                    className="text-[62px] text-[var(--color-gold)] title"
                    dangerouslySetInnerHTML={{ __html: slide.title }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};
