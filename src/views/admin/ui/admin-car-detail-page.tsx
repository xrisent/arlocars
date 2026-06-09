"use client";

import { DeleteOutlined, EditOutlined, LinkOutlined } from "@ant-design/icons";
import { App, Button, Descriptions, Image, Popconfirm, Space, Spin, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCarQuery } from "@/entities/car";
import { useDeleteCar } from "@/features/car/model";

const { Title, Text } = Typography;

interface AdminCarDetailPageProps {
  carId: number;
}

export function AdminCarDetailPage({ carId }: AdminCarDetailPageProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const { data: car, isLoading } = useCarQuery(carId);
  const deleteMutation = useDeleteCar();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(carId);
      message.success("Car deleted");
      router.push("/admin/cars");
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Failed to delete car");
    }
  };

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

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Title level={3} className="!mb-0">
          {car.name}
        </Title>
        <Space wrap>
          <Button icon={<LinkOutlined />} href={`/cars/${car.id}`} target="_blank">
            View on site
          </Button>
          <Button icon={<EditOutlined />} href={`/admin/cars/${car.id}/edit`}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this car?"
            description="This action cannot be undone."
            onConfirm={handleDelete}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <Button danger icon={<DeleteOutlined />} loading={deleteMutation.isPending}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <Text type="secondary" className="mb-2 block">
            Main photo
          </Text>
          <Image src={car.mainPhoto} alt={car.name} className="rounded" />
        </div>

        <Descriptions bordered column={1} size="small">
          <Descriptions.Item label="ID">{car.id}</Descriptions.Item>
          <Descriptions.Item label="Price">{car.price.toLocaleString()} AED</Descriptions.Item>
          <Descriptions.Item label="Year">{car.year}</Descriptions.Item>
          <Descriptions.Item label="Color">{car.color}</Descriptions.Item>
          <Descriptions.Item label="Category">
            <Link href="/admin/categories">{car.category.name}</Link>
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {new Date(car.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Public URL">
            <Link href={`/cars/${car.id}`} target="_blank">
              /cars/{car.id}
            </Link>
          </Descriptions.Item>
        </Descriptions>
      </div>

      <div className="mb-6">
        <Title level={5}>Description</Title>
        <p className="whitespace-pre-wrap text-gray-700">{car.description}</p>
      </div>

      {car.photos.length > 0 && (
        <div>
          <Title level={5} className="!mb-3">
            Gallery
          </Title>
          <div className="flex flex-wrap gap-3">
            {car.photos.map((photo) => (
              <Image key={photo} src={photo} alt="" width={160} className="rounded object-cover" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
