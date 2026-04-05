import { Form, FormInstance } from "antd";

import { CustomButton, CustomInput, CustomPhoneInput } from "@/shared/ui";

interface IPersonalDetailsForm {
  form: FormInstance;
  onFinish: () => void;
  className?: string;
  hasPrevious?: boolean;
  onPrevious?: () => void;
  btnOk?: string;
  btnCancel?: string;
}

export const PersonalDetailsForm = ({
  form,
  onFinish,
  hasPrevious = false,
  onPrevious,
  className,
  btnOk,
  btnCancel,
}: IPersonalDetailsForm) => {
  return (
    <Form form={form} className={className} onFinish={onFinish}>
      <div className="flex gap-4 items-center">
        <CustomInput type="text" placeholder="Full name" className="w-full" />
        <CustomPhoneInput className="w-full" />
      </div>
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
