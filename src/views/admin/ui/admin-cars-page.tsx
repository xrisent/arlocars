"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { App, Button, Image, Input, Popconfirm, Space, Table, Typography } from "antd";
import type { TablePaginationConfig } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import type { CarDto, CarListResponse } from "@/entities/car";
import { useCarsQuery } from "@/entities/car";
import { useDeleteCar } from "@/features/car/model";

const { Title } = Typography;

interface AdminCarsPageProps {
  initialData?: CarListResponse;
}

export function AdminCarsPage({ initialData }: AdminCarsPageProps) {
  const router = useRouter();
  const { message } = App.useApp();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useCarsQuery(
    {
      page,
      page_size: 10,
      q: search || undefined,
    },
    initialData,
  );

  const deleteMutation = useDeleteCar();

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteMutation.mutateAsync(id);
        message.success("Car deleted");
      } catch (e) {
        message.error(e instanceof Error ? e.message : "Failed to delete car");
      }
    },
    [deleteMutation, message],
  );

  const columns = [
      {
        title: "Photo",
        dataIndex: "mainPhoto",
        key: "photo",
        width: 90,
        render: (src: string, record: CarDto) => (
          <Image src={src} alt={record.name} width={64} height={48} className="rounded object-cover" />
        ),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name: string, record: CarDto) => (
          <Link href={`/admin/cars/${record.id}`} className="font-medium text-[#a27c29] hover:underline">
            {name}
          </Link>
        ),
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price: number) => `${price.toLocaleString()} AED`,
      },
      {
        title: "Year",
        dataIndex: "year",
        key: "year",
      },
      {
        title: "Category",
        dataIndex: ["category", "name"],
        key: "category",
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        render: (_: unknown, record: CarDto) => (
          <Space>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => router.push(`/admin/cars/${record.id}/edit`)}
            />
            <Popconfirm
              title="Delete this car?"
              description="This action cannot be undone."
              onConfirm={() => handleDelete(record.id)}
              okText="Delete"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" danger icon={<DeleteOutlined />} loading={deleteMutation.isPending} />
            </Popconfirm>
          </Space>
        ),
      },
    ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPage(pagination.current ?? 1);
  };

  const handleSearch = () => {
    setSearch(searchInput.trim());
    setPage(1);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Title level={3} className="!mb-0">
          Cars
        </Title>
        <Button type="primary" icon={<PlusOutlined />} href="/admin/cars/new">
          Add car
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by name or description"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onPressEnter={handleSearch}
          className="max-w-sm"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Table<CarDto>
        rowKey="id"
        columns={columns}
        dataSource={data?.items ?? []}
        loading={isLoading}
        pagination={{
          current: page,
          pageSize: data?.pageSize ?? 10,
          total: data?.total ?? 0,
          showSizeChanger: false,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}
