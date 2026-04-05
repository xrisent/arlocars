import { Form, FormInstance } from "antd";

import { CustomButton, CustomInput, CustomTextArea } from "@/shared/ui";

interface ICarDetailsForm {
  form: FormInstance;
  onFinish: () => void;
  className?: string;
  hasPrevious?: boolean;
  onPrevious?: () => void;
  btnOk?: string;
  btnCancel?: string;
}

export const CarDetailsForm = ({
  form,
  onFinish,
  className,
  hasPrevious = false,
  onPrevious,
  btnOk,
  btnCancel,
}: ICarDetailsForm) => {
  return (
    <Form form={form} className={className} onFinish={onFinish}>
      <div className="flex gap-4 items-center">
        <CustomInput type="text" placeholder="Car Make/Model" className="w-full" />
        <CustomInput type="text" placeholder="Year" className="w-full" />
      </div>
      <div className="flex gap-4 items-center">
        <CustomInput type="text" placeholder="Mileage" className="w-full" />
        <CustomInput type="text" placeholder="Specifications" className="w-full" />
      </div>
      <CustomInput type="text" placeholder="Are you looking to trade in?" className="w-full" />
      <CustomTextArea placeholder="Notes here" className="w-full" inputClassName="!min-h-30" />
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
