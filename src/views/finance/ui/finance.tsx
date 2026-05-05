import { CheckSquareOutlined, RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

import { CustomButton } from "@/shared/ui";

const financeData = {
  offers: [
    {
      title: "Dedicated Finance Support",
      description:
        "Our in-house finance specialists are here to guide - not push. We'll help you understand all your options, answer your questions clearly, and handle the full process on your behalf.",
    },
    {
      title: "Flexible Payment Plans",
      description:
        "Prefer lower monthly payments? Need zero upfront? We'll structure your finance plan to suit your budget - with complete clarity and zero hidden charges.",
    },
    {
      title: "Fully Managed Process",
      description:
        "No paperwork hassle. No RTA queues. From approval to registration, we take care of everything - so you can simply choose your car and drive.",
    },
    {
      title: "Bundle & Save",
      description:
        "Want added peace of mind? We can bundle service, warranty, and insurance into your finance plan - all in one smooth monthly payment.",
    },
  ],
  points: [
    "Transparent, expert advice - no pushy sales",
    "Wide range of finance structures available",
    "Fast-track approval through trusted banks",
    "All-inclusive options with warranty & service",
    "No stress - we handle all paperwork",
  ],
};

import "./finance.scss";

export const FinancePage = () => {
  return (
    <main className="FinancePage">
      <section className="FinancePage-intro">
        <div className="container">
          <article>
            <h2>Drive Now. Pay Smart with Arlo Cars</h2>
            <p>
              At Arlo Cars, we believe financing your next vehicle should be effortless,
              transparent, and stress-free. Whether you&apos;re buying your first ride or upgrading
              to something premium, we&apos;re here to make your financing journey smooth from start
              to finish.
            </p>
            <p>
              Thanks to our trusted network of UAE financial partners, we&apos;re able to offer
              competitive rates, faster approvals, and flexible plans tailored to your lifestyle and
              budget.
            </p>
          </article>
        </div>
      </section>

      <section className="FinancePage-offers">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="FinancePage-offersGrid">
            {financeData.offers.map((offer) => (
              <article key={offer.title} className="FinancePage-offer">
                <RightOutlined />
                <div>
                  <h3>{offer.title}</h3>
                  <p>{offer.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="FinancePage-why">
        <div className="container FinancePage-whyGrid">
          <Image
            src="/finance/finance-why-image.jpg"
            alt="Finance consultation at Arlo Cars"
            width={1080}
            height={720}
            sizes="(max-width: 1250px) 100vw, 50vw"
          />
          <article>
            <h2>Why Finance with Arlo Cars?</h2>
            <p>
              Smart, stress-free financing tailored to your needs - with expert help every step of
              the way.
            </p>
            <ul>
              {financeData.points.map((point) => (
                <li key={point}>
                  <CheckSquareOutlined />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="FinancePage-cta">
        <div className="container FinancePage-ctaContent">
          <article>
            <h2>Let&apos;s Get You Approved</h2>
            <p>
              Whether you&apos;ve found your dream car or want help exploring your options, our
              friendly team is ready to assist. At Arlo Cars, we go the extra mile to ensure your
              car purchase fits your lifestyle - so you can drive smarter, every time.
            </p>
            <Link href="/contact">
              <CustomButton>Book a Service</CustomButton>
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
};
