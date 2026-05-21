import Link from "next/link";

import { CustomButton } from "@/shared/ui";

import "./services-banner.scss";

export const ServicesBanner = () => {
  return (
    <section className="ServicesBanner py-[60px]">
      <div className="container">
        <div className="content flex flex-col w-[42%] gap-[20px]">
          <p className="text-[15px]">Automotive Solutions</p>
          <h2 className="text-[42px] title">
            We take care of your motoring needs – you just Drive!
          </h2>
          <p className="text-[15px]">
            From registration renewal to cosmetic repairs, Arlo Cars offers complete care for your
            vehicle—hassle-free, trustworthy, and efficient.
          </p>
          <Link href="/automotive-solutions">
            <CustomButton className="w-fit !rounded-[5px]">Explore Services</CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};
