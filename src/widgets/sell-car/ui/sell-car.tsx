"use client";

import { Steps } from "antd";
import { useState } from "react";

import "./sell-car.scss";

export const SellCarSection = () => {
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  return (
    <section className="h-[calc(100vh-108px)] SellCarSection">
      <div className="container flex flex-col items-center justify-center h-full gap-[70px]">
        <div className="flex flex-col items-center text-center">
          <p className="text-[15px] text-[var(--color-medium)] small-desc">
            Sell Your Car in 3 Easy Steps
          </p>
          <h2 className="title text-[42px] font-bold">
            Sell your Car! <br /> Fast, Safe and Secure.
          </h2>
        </div>
        <Steps
          className="w-full"
          current={current}
          onChange={onChange}
          titlePlacement="vertical"
          items={[
            {
              content: "Personal details",
            },
            {
              content: "Car Details",
            },
            {
              content: "Upload Image",
            },
          ]}
        />
      </div>
    </section>
  );
};
