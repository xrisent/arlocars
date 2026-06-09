"use client";

import { App, Form, Input, Modal } from "antd";
import { useEffect } from "react";

import type { CategoryDto } from "@/entities/category/model/interfaces";
import { useCreateCategory, useUpdateCategory } from "@/features/category/model/hooks";

interface CategoryEditorModalProps {
  open: boolean;
  category?: CategoryDto | null;
  onClose: () => void;
}

interface CategoryFormValues {
  name: string;
}

export function CategoryEditorModal({ open, category, onClose }: CategoryEditorModalProps) {
  const [form] = Form.useForm<CategoryFormValues>();
  const { message } = App.useApp();
  const isEdit = Boolean(category);

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory(category?.id ?? 0);

  useEffect(() => {
    if (open) {
      form.setFieldsValue({ name: category?.name ?? "" });
    }
  }, [category, form, open]);

  const handleFinish = async (values: CategoryFormValues) => {
    try {
      if (isEdit && category) {
        await updateMutation.mutateAsync({ name: values.name });
        message.success("Category updated");
      } else {
        await createMutation.mutateAsync({ name: values.name });
        message.success("Category created");
      }
      onClose();
      form.resetFields();
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Failed to save category");
    }
  };

  return (
    <Modal
      title={isEdit ? "Edit category" : "New category"}
      open={open}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="SUV" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
