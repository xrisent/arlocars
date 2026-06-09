"use client";

import { Spin, Typography } from "antd";

import { useCarQuery } from "@/entities/car";
import { AdminCarForm } from "@/features/car/ui";

const { Title, Text } = Typography;

interface AdminCarFormPageProps {
  mode: "create" | "edit";
  carId?: number;
}

export function AdminCarFormPage({ mode, carId }: AdminCarFormPageProps) {
  const { data: car, isLoading } = useCarQuery(carId ?? Number.NaN);

  if (mode === "edit") {
    if (isLoading) {
      return (
        <div className="flex justify-center py-20">
          <Spin size="large" />
        </div>
      );
    }

    if (!car) {
      return <Text type="danger">Car not found</Text>;
    }
  }

  return (
    <div>
      <Title level={3} className="!mb-6">
        {mode === "create" ? "Add new car" : `Edit: ${car?.name}`}
      </Title>
      <AdminCarForm mode={mode} car={car} />
    </div>
  );
}
