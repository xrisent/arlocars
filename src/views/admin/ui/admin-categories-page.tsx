"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { App, Button, Input, Popconfirm, Space, Table, Typography } from "antd";
import type { TablePaginationConfig } from "antd";
import { useCallback, useState } from "react";

import { useCategoriesQuery, type CategoryDto, type CategoryListResponse } from "@/entities/category";
import { useDeleteCategory } from "@/features/category/model";
import { CategoryEditorModal } from "@/features/category/ui";

const { Title } = Typography;

interface AdminCategoriesPageProps {
  initialData?: CategoryListResponse;
}

export function AdminCategoriesPage({ initialData }: AdminCategoriesPageProps) {
  const { message } = App.useApp();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);

  const { data, isLoading } = useCategoriesQuery(
    { page, pageSize: 10, search: search || undefined },
    initialData,
  );
  const deleteMutation = useDeleteCategory();

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteMutation.mutateAsync(id);
        message.success("Category deleted");
      } catch (e) {
        message.error(e instanceof Error ? e.message : "Failed to delete category");
      }
    },
    [deleteMutation, message],
  );

  const openCreate = () => {
    setEditingCategory(null);
    setEditorOpen(true);
  };

  const openEdit = (category: CategoryDto) => {
    setEditingCategory(category);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingCategory(null);
  };

  const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Actions",
        key: "actions",
        width: 120,
        render: (_: unknown, record: CategoryDto) => (
          <Space>
            <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)} />
            <Popconfirm
              title="Delete this category?"
              description="Categories with cars cannot be deleted."
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
          Categories
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          Add category
        </Button>
      </div>

      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search categories"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onPressEnter={handleSearch}
          className="max-w-sm"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Table<CategoryDto>
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

      <CategoryEditorModal open={editorOpen} category={editingCategory} onClose={closeEditor} />
    </div>
  );
}
