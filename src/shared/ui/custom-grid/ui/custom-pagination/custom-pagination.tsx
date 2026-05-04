import { Pagination, PaginationProps, TablePaginationConfig } from "antd";

import "./custom-pagination.scss";

export const CustomPagination: React.FC<TablePaginationConfig> = ({
  current,
  pageSize = 0,
  total = 0,
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize) || 1;

  const hasPrev = (current || 1) > 1;
  const hasNext = (current || 1) < totalPages;

  const handlePageChange = (page: number, pageSize: number) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (onChange) {
      onChange(page, pageSize);
    }
  };

  const itemRender: PaginationProps["itemRender"] = (_, type, originalElement) => {
    if (type === "prev") {
      return hasPrev ? "<" : null;
    }
    if (type === "next") {
      return hasNext ? ">" : null;
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
        onChange={handlePageChange}
      />
    </div>
  );
};
