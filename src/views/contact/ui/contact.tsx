"use client";

import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Form } from "antd";
import Link from "next/link";

import { CustomButton, CustomInput, CustomTextArea } from "@/shared/ui";

import "./contact.scss";

export const ContactPage = () => {
  const [form] = Form.useForm();

  return (
    <main className="ContactPage">
      <section className="ContactPage-formSection">
        <div className="container">
          <Form form={form} className="ContactPage-form">
            <div className="ContactPage-inputs">
              <CustomInput
                type="text"
                placeholder="Your Name*"
                className="w-full"
                inputClassName="!p-[20px] !text-[16px] max-[1050px]:!text-[14px]" // Add responsive class
              />
              <CustomInput
                type="email"
                placeholder="Your Email*"
                className="w-full"
                inputClassName="!p-[20px] !text-[16px] max-[1050px]:!text-[14px]"
              />
            </div>
            <CustomTextArea
              placeholder="Your Message..."
              inputClassName="!p-[20px] !min-h-[200px] !text-[16px] max-[1050px]:!text-[14px]"
            />
            <CustomButton
              className="!text-[16px] !py-[15px] !px-[34px] max-[1050px]:!text-[14px]"
              htmlType="submit"
            >
              Send Message
            </CustomButton>
          </Form>
          <div className="ContactPage-content">
            <p className="ContactPage-heading">Get in Touch</p>
            <h1 className="ContactPage-title">We’re Here to Help — Contact Arlo Cars</h1>
            <p className="ContactPage-text">
              Whether you&apos;re ready to sell your car, need help with documentation, or just have
              a few questions — our team is here to assist you every step of the way. Reach out
              using the form below and we’ll get back to you as soon as possible.
              <br />
              <br />
              Our support is fast, friendly, and fully focused on giving you a seamless car selling
              or buying experience in Dubai. Let’s connect and get started today!
            </p>
          </div>
        </div>
      </section>

      <section className="ContactPage-cards">
        <div className="container">
          <div className="ContactPage-card ContactPage-card-phone">
            <PhoneOutlined />
            <Link
              href="tel:+971526902710"
              className="transition-colors duration-200 hover:text-[var(--color-gold)]"
            >
              +971 52 690 2710
            </Link>
          </div>

          <div className="ContactPage-card ContactPage-card-mail">
            <MailOutlined />
            <Link
              href="mailto:info@arlocars.ae"
              className="transition-colors duration-200 hover:text-[var(--color-gold)]"
            >
              info@arlocars.ae
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
