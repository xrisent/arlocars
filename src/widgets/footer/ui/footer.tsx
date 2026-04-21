import {
  ClockCircleOutlined,
  CustomerServiceOutlined,
  EnvironmentOutlined,
  InstagramOutlined,
  MailOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import Link from "next/link";

import { CustomButton, Logo } from "@/shared/ui";

import "./footer.scss";

// TODO
const links = [
  { title: "Cars For Sale", path: "" },
  { title: "Sell Your Car", path: "" },
  { title: "Finance", path: "" },
  { title: "Automative Solutions", path: "" },
  { title: "Contact", path: "" },
];

export const Footer = () => {
  return (
    <footer className="h-[70vh] Footer text-white flex flex-col justify-between items-center pt-[100px]">
      <div className="container pb-[30px]">
        <div className="footer-items flex w-full justify-between items-stretch gap-x-30">
          <div className="footer-item footer-gap flex flex-col justify-between w-full">
            <Logo />
            <p className="font-normal text-base leading-[1.8]">
              Trusted car experts in Dubai for car selling, consignment, financing, and
              registration, sell smart, drive stress-free.
            </p>
            <div className="flex items-center gap-[10px]">
              <Link href="https://www.instagram.com/arlocarsdxb/" target="_blank">
                <CustomButton className="w-[36px] !h-[36px] m-0 !p-0">
                  <InstagramOutlined />
                </CustomButton>
              </Link>
              <Link
                href="https://api.whatsapp.com/send/?phone=971526902710&text=Hi+%2AARLO+CARS%2A%21+I+need+more+info+about+FAQ+-+ARLO+CARS+https%3A%2F%2Farlocars.ae%2Ffaq%2F&type=phone_number&app_absent=0"
                target="_blank"
              >
                <CustomButton className="w-[36px] !h-[36px] m-0 !p-0">
                  <WhatsAppOutlined />
                </CustomButton>
              </Link>
            </div>
          </div>
          <div className="footer-item flex flex-col w-full">
            <h2 className="text-[24px] title mb-[25px]">Useful Links</h2>
            <nav className="flex gap-[14px] flex-col">
              {links.map((item) => (
                <Link
                  key={item.title}
                  className="transition-colors duration-200 text-[15px] font-medium text-white hover:text-[var(--color-gold)]"
                  href={item.path}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="footer-item flex flex-col w-full justify-between">
            <h2 className="text-[24px] title mb-[25px]">Contact Us</h2>
            <ul className="flex flex-col h-full justify-between footer-gap">
              <li>
                <EnvironmentOutlined className="mr-2" />
                Arlo Cars, Dubai, UAE
              </li>
              <li>
                <CustomerServiceOutlined className="mr-2" />
                <Link
                  href="tel:+971526902710"
                  className="transition-colors duration-200 hover:text-[var(--color-gold)]"
                >
                  +971 52 690 2710
                </Link>
              </li>
              <li>
                <MailOutlined className="mr-2" />
                <Link
                  href="mailto:info@arlocars.ae"
                  className="transition-colors duration-200 hover:text-[var(--color-gold)]"
                >
                  info@arlocars.ae
                </Link>
              </li>
              <li>
                <ClockCircleOutlined className="mr-2" />
                Open 7 days a week
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-600 w-full text-center py-[30px]">
        <p>
          Copyright <strong className="text-[18px]">©</strong> 2026{" "}
          <Link href="/" className="text-[var(--color-gold)]">
            Arlo Cars
          </Link>
          . All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
