"use client";

import { Form, Steps } from "antd";
import { useState } from "react";

import { CarDetailsForm, PersonalDetailsForm, UploadImageForm } from "@/features/contacts-us";

import "./sell-car.scss";

interface SellCarSectionProps {
  subtitle?: string;
  mainHeading?: boolean;
}

export const SellCarSection = ({ subtitle, mainHeading = false }: SellCarSectionProps) => {
  const TitleTag = mainHeading ? "h1" : "h2";
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const onChange = () => {
    setCurrent((prev) => prev + 1);
  };

  const onPrevious = () => {
    setCurrent((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log("Sell your car form data:", form.getFieldsValue(true));
    form.resetFields();
    setCurrent(0);
  };

  return (
    <section className="SellCarSection py-[100px]">
      <div className="container flex flex-col items-center justify-center h-full gap-[70px]">
        <div className="flex flex-col items-center text-center">
          <p className="text-[15px] text-[var(--color-medium)] small-desc">
            Sell Your Car in 3 Easy Steps
          </p>
          <TitleTag className="title text-[42px] font-bold">
            Sell your Car! <br /> Fast, Safe and Secure.
          </TitleTag>
          {subtitle && <h3 className="SellCarSection-subtitle">{subtitle}</h3>}
        </div>
        <Steps
          className="w-full"
          current={current}
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

        {current === 0 && (
          <PersonalDetailsForm
            form={form}
            onFinish={onChange}
            className="w-[60%] SellCarSection-form"
          />
        )}
        {current === 1 && (
          <CarDetailsForm
            form={form}
            onFinish={onChange}
            hasPrevious
            onPrevious={onPrevious}
            className="w-[60%] SellCarSection-form"
          />
        )}
        {current === 2 && (
          <UploadImageForm
            form={form}
            onFinish={handleSubmit}
            hasPrevious
            onPrevious={onPrevious}
            className="w-[60%] SellCarSection-form"
            btnOk="Send"
          />
        )}
      </div>
    </section>
  );
};
