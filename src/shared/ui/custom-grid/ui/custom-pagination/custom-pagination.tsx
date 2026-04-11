import { Pagination, PaginationProps, TablePaginationConfig } from "antd";

import "./custom-pagination.scss";

export const CustomPagination: React.FC<TablePaginationConfig> = ({
  current,
  pageSize = 0,
  total = 0,
  onChange,
}) => {
  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") {
      return "<";
    }
    if (type === "next") {
      return ">";
    }
    return originalElement;
  };

  return (
    <div className={"CustomPagination flex justify-end items-end gap-4 pt-4"}>
      <Pagination
        className="CustomPagination__pagination"
        current={current}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false}
        showLessItems
        itemRender={itemRender}
        onChange={onChange}
      />
    </div>
  );
};
