"use client";

import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";

import "./accordion.scss";

export const Accordion = ({
  faqs,
}: {
  faqs: { question: string; answer: string; key: string }[];
}) => {
  const items: CollapseProps["items"] = faqs.map((faq) => ({
    key: faq.key,
    label: faq.question,
    children: <p>{faq.answer}</p>,
  }));

  return (
    <Collapse
      bordered={false}
      expandIconPlacement="end"
      className="Accordion"
      items={items}
      expandIcon={({ isActive }) =>
        isActive ? (
          <MinusOutlined style={{ fontSize: 18 }} />
        ) : (
          <PlusOutlined style={{ fontSize: 18 }} />
        )
      }
    />
  );
};
