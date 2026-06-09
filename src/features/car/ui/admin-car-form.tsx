"use client";

import { InboxOutlined } from "@ant-design/icons";
import { App, Button, Checkbox, Form, Input, InputNumber, Select, Upload } from "antd";
import type { UploadFile } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import type { CarDto } from "@/entities/car";
import { useCategoriesQuery } from "@/entities/category";
import { useCreateCar, useUpdateCar } from "@/features/car/model/hooks";

interface AdminCarFormValues {
  name: string;
  price: number;
  year: number;
  color: string;
  description: string;
  categoryId: number;
  replacePhotos?: boolean;
}

interface AdminCarFormProps {
  car?: CarDto;
  mode: "create" | "edit";
}

function fileListFromUpload(files: UploadFile[]): File[] {
  const result: File[] = [];
  for (const file of files) {
    if (file.originFileObj instanceof File) {
      result.push(file.originFileObj);
    }
  }
  return result;
}

export function AdminCarForm({ car, mode }: AdminCarFormProps) {
  const [form] = Form.useForm<AdminCarFormValues>();
  const router = useRouter();
  const { message } = App.useApp();
  const [mainPhotoList, setMainPhotoList] = useState<UploadFile[]>([]);
  const [photosList, setPhotosList] = useState<UploadFile[]>([]);

  const createMutation = useCreateCar();
  const updateMutation = useUpdateCar(car?.id ?? 0);
  const { data: categoriesData } = useCategoriesQuery({ pageSize: 100 });

  const categoryOptions = useMemo(
    () =>
      (categoriesData?.items ?? []).map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categoriesData?.items],
  );

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const buildFormData = (values: AdminCarFormValues): FormData => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("price", String(values.price));
    formData.set("year", String(values.year));
    formData.set("color", values.color);
    formData.set("description", values.description);
    formData.set("categoryId", String(values.categoryId));

    const mainPhoto = fileListFromUpload(mainPhotoList)[0];
    if (mainPhoto) {
      formData.set("mainPhoto", mainPhoto);
    }

    fileListFromUpload(photosList).forEach((photo) => {
      formData.append("photos", photo);
    });

    if (mode === "edit" && values.replacePhotos) {
      formData.set("replacePhotos", "true");
    }

    return formData;
  };

  const handleFinish = async (values: AdminCarFormValues) => {
    if (mode === "create" && mainPhotoList.length === 0) {
      message.error("Main photo is required");
      return;
    }

    try {
      const formData = buildFormData(values);

      if (mode === "create") {
        await createMutation.mutateAsync(formData);
        message.success("Car created");
        router.push("/admin/cars");
        return;
      }

      await updateMutation.mutateAsync(formData);
      message.success("Car updated");
      router.push(`/admin/cars/${car?.id}`);
    } catch (e) {
      message.error(e instanceof Error ? e.message : "Failed to save car");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={
        car
          ? {
              name: car.name,
              price: car.price,
              year: car.year,
              color: car.color,
              description: car.description,
              categoryId: car.categoryId,
              replacePhotos: false,
            }
          : undefined
      }
      className="max-w-3xl"
    >
      <Form.Item name="name" label="Name" rules={[{ required: true, message: "Name is required" }]}>
        <Input placeholder="BMW X5" />
      </Form.Item>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Form.Item
          name="price"
          label="Price (AED)"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <InputNumber className="!w-full" min={0} placeholder="150000" />
        </Form.Item>

        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: "Year is required" }]}
        >
          <InputNumber className="!w-full" min={1900} max={2100} placeholder="2022" />
        </Form.Item>
      </div>

      <Form.Item
        name="color"
        label="Color"
        rules={[{ required: true, message: "Color is required" }]}
      >
        <Input placeholder="Black" />
      </Form.Item>

      <Form.Item
        name="categoryId"
        label="Category"
        rules={[{ required: true, message: "Category is required" }]}
      >
        <Select
          options={categoryOptions}
          placeholder="Select category"
          showSearch
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Description is required" }]}
      >
        <Input.TextArea rows={5} placeholder="Car description..." />
      </Form.Item>

      {car && (
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-500">Current main photo</p>
          <Image
            src={car.mainPhoto}
            alt={car.name}
            width={240}
            height={160}
            className="rounded object-cover"
          />
        </div>
      )}

      <Form.Item label={mode === "create" ? "Main photo" : "Replace main photo (optional)"}>
        <Upload.Dragger
          accept="image/*"
          maxCount={1}
          fileList={mainPhotoList}
          beforeUpload={() => false}
          onChange={({ fileList }) => setMainPhotoList(fileList)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag main photo</p>
        </Upload.Dragger>
      </Form.Item>

      {mode === "edit" && (
        <Form.Item name="replacePhotos" valuePropName="checked">
          <Checkbox>Replace all gallery photos when uploading new ones</Checkbox>
        </Form.Item>
      )}

      {car && car.photos.length > 0 && (
        <div className="mb-4">
          <p className="mb-2 text-sm text-gray-500">Current gallery ({car.photos.length})</p>
          <div className="flex flex-wrap gap-2">
            {car.photos.map((photo) => (
              <Image
                key={photo}
                src={photo}
                alt=""
                width={100}
                height={70}
                className="rounded object-cover"
              />
            ))}
          </div>
        </div>
      )}

      <Form.Item label={mode === "create" ? "Gallery photos" : "Add gallery photos (optional)"}>
        <Upload.Dragger
          accept="image/*"
          multiple
          fileList={photosList}
          beforeUpload={() => false}
          onChange={({ fileList }) => setPhotosList(fileList)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag gallery photos</p>
        </Upload.Dragger>
      </Form.Item>

      <div className="flex gap-3">
        <Button type="primary" htmlType="submit" loading={isSubmitting}>
          {mode === "create" ? "Create car" : "Save changes"}
        </Button>
        <Button onClick={() => router.back()}>Cancel</Button>
      </div>
    </Form>
  );
}
