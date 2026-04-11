import { Row, Col } from "antd";

import { CustomCardGridProps } from "@/shared/interfaces";

import { CustomPagination } from "../custom-pagination/custom-pagination";

export const CustomCardGrid = ({
  data = [],
  children,
  loading = false,
  className,
  gridClassName,
  pagination,
  columns = { xs: 12, sm: 8, md: 6, lg: 4, xl: 4 },
  gutter = [16, 16],
  skeleton,
}: CustomCardGridProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];

  const skeletonCount = pagination?.pageSize || 8;
  const skeletonItems = skeleton
    ? Array.from({ length: skeletonCount }).map((_, i) => (
        <Col key={`skeleton-${i}`} {...columns}>
          {skeleton}
        </Col>
      ))
    : Array.from({ length: skeletonCount }).map((_, i) => (
        <Col key={`skeleton-${i}`} {...columns}>
          <div className="h-48 animate-pulse bg-gray-200 rounded" />
        </Col>
      ));

  return (
    <div className={className}>
      <Row gutter={gutter} className={gridClassName}>
        {loading
          ? skeletonItems
          : childrenArray.map((child, index) => (
              <Col key={index} {...columns}>
                {child}
              </Col>
            ))}
      </Row>

      {pagination && (
        <div className="mt-4 flex justify-center">
          <CustomPagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total ?? data.length}
            onChange={pagination.onChange}
          />
        </div>
      )}
    </div>
  );
};
