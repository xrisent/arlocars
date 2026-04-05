import { PlusOutlined } from "@ant-design/icons";
import { Form, FormInstance, message, Upload, UploadFile } from "antd";
import { useState } from "react";

import { CustomButton } from "@/shared/ui";

interface IUploadImageForm {
  form: FormInstance;
  onFinish: () => void;
  hasPrevious?: boolean;
  className?: string;
  onPrevious?: () => void;
  btnOk?: string;
  btnCancel?: string;
}

export const UploadImageForm = ({
  form,
  onFinish,
  hasPrevious = false,
  className,
  onPrevious,
  btnOk,
  btnCancel,
}: IUploadImageForm) => {
  const [fileListState, setFileListState] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    let src = file.url as string;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }

    const imgWindow = window.open(src);
    if (imgWindow) {
      imgWindow.document.write(`<img src="${src}" style="width:100%" />`);
    }
  };

  return (
    <Form form={form} className={className} onFinish={onFinish}>
      <Form.Item className="!mt-0 flex items-center justify-center" layout="vertical">
        <Upload
          listType="picture-card"
          fileList={fileListState}
          accept=".jpg,.jpeg,.png"
          onPreview={handlePreview}
          beforeUpload={(file) => {
            const isValidType = ["image/jpeg", "image/png", "image/jpg"].includes(file.type);
            if (!isValidType) {
              message.error("Image must be only PNG/JPG type!");
              return Upload.LIST_IGNORE;
            }

            if (file.name.length > 100) {
              message.error("Image name must be no more than 100 characters!");
              return Upload.LIST_IGNORE;
            }

            return false;
          }}
          onChange={({ fileList }) => setFileListState(fileList)}
        >
          <div className="flex flex-col items-center">
            <PlusOutlined />
            <span className="mt-1">Upload</span>
          </div>
        </Upload>
      </Form.Item>
      <div className="flex w-full gap-6">
        {hasPrevious && (
          <CustomButton onClick={onPrevious} className="w-full">
            {btnCancel || "Previous"}
          </CustomButton>
        )}
        <CustomButton htmlType="submit" className="w-full">
          {btnOk || "Next"}
        </CustomButton>
      </div>
    </Form>
  );
};
