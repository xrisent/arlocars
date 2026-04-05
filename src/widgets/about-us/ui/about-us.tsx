import Image from "next/image";

import "./about-us.scss";

export const AboutUsSection = () => {
  return (
    <section className="AboutUsSection">
      <div className="container flex items-center justify-between pb-[60px] pt-[100px]">
        <Image src="/about-us.webp" width={746} height={420} alt="about-us" />
        <div className="flex flex-col w-[42%]">
          <h2 className="title">About Us</h2>
          <p className="desc">
            At Arlo Cars, we bring over 15 years of automotive experience, rooted in a strong
            foundation of Premium main agency dealerships back in the UK. We understand what it
            takes to deliver excellence in the automotive world. <br />
            <br />
            After relocating to Dubai, we quickly recognised a major gap in the market, one where
            customer experience, trust and transparency were often lacking.
            <br />
            <br />
            That’s where Arlo Cars was born.
            <br />
            <br />
            Our mission is simple: To raise the standard of used car buying, selling and ownerships
            in the UAE.
            <br />
            <br />
            We provide a hassle free experience, tailored to the needs of modern drivers, from
            sourcing and selling quality vehicles to offering guidance on long term ownership,
            registration and everything in between.
            <br />
            <br />
            We’re not just selling cars! We’re redefining automotive trust!
          </p>
        </div>
      </div>
    </section>
  );
};
