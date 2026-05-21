import { CheckSquareOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";

// import { CtaSection } from "@/widgets/cta-section";

import "./automotive-solutions.scss";
import { CustomButton } from "@/shared/ui";

const services = [
  {
    title: "Car Renewal Made Easy",
    description:
      "In Dubai it is compulsory to renew your car registration annually. This involves a visit to the RTA traffic department for an annual vehicle inspection. A day which gets in the way of your busy schedule!",
    points: [
      "Car collection from your location",
      "Assistance with insurance renewal",
      "Vehicle testing completed",
      "Assistance with trusted repairs if it was to fail",
      "Returned back to you renewed and ready to go for another year.",
    ],
    image: "/automotive-solutions/car-renewal.jpg",
    imageAlt: "Car renewal and registration support",
  },
  {
    title: "Maintenance & Repairs",
    description: "Regular service or unexpected issues? Let us handle it with care and clarity.",
    points: [
      "Car collection & drop-off",
      "Low-cost, trusted repairs",
      "From basic service to diagnostics",
      "Transparent quoting",
    ],
    image: "/automotive-solutions/cosmetic-repairs.jpg",
    imageAlt: "Car maintenance and repair services",
  },
  {
    title: "Cosmetic Repairs",
    description: "Get your car looking like new again with expert dent, scratch, and rim repairs.",
    points: [
      "Bumper and bodywork repair",
      "Rim restoration",
      "Paint touch-ups",
      "Full car collection & return",
    ],
    image: "/automotive-solutions/premium-car-care.jpg",
    imageAlt: "Cosmetic car repairs and paint restoration",
  },
  {
    title: "Premium Car Care",
    description: "Protect your car's shine and resale value with advanced treatments.",
    points: [
      "Window tinting",
      "Ceramic coating",
      "Paint protection film (PPF)",
      "Interior detailing",
    ],
    image: "/automotive-solutions/maintenance-repairs.png",
    imageAlt: "Premium car care and detailing",
  },
];

export const AutomotiveSolutionsPage = () => {
  return (
    <main className="AutomotiveSolutionsPage">
      <h1 className="sr-only">Automotive Solutions in Dubai</h1>
      <section className="AutomotiveSolutionsPage-services">
        <div className="container">
          {services.map((service, index) => (
            <article
              className={`AutomotiveSolutionsPage-service ${index % 2 === 1 ? "reversed" : ""}`}
              key={service.title}
            >
              <div className="AutomotiveSolutionsPage-serviceImage">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={1080}
                  height={720}
                  sizes="(max-width: 1250px) 100vw, 50vw"
                />
              </div>

              <div className="AutomotiveSolutionsPage-serviceContent">
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>
                      <CheckSquareOutlined />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="AutomotiveSolutionsPage-cta">
        <div className="container AutomotiveSolutionsPage-ctaContent">
          <article>
            <p>Let Arlo Cars Handle the Hassle</p>
            <h2>Book your service today and experience stress-free car care in Dubai.</h2>
            <Link href="/contact">
              <CustomButton>Book a Service</CustomButton>
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
};
