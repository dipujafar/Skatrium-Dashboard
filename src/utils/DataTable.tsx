import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { Pagination, Table } from "antd";
import { TableProps } from "antd/lib/table";
import { useSearchParams } from "next/navigation";

interface DataTableProps<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  pageSize?: number;
  total?: number;
  currentPage?: number;
  loading?: boolean;
  pagination?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}

const DataTable = <T extends object>({
  columns,
  data,
  pageSize = 10,
  total,
  loading = false,
  pagination = true,
}: DataTableProps<T>) => {
  const updateParams = useUpdateSearchParams();
  const page = useSearchParams()?.get("page") || "1";
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => (record as any).id || Math.random()} // prevent key warnings
      pagination={
        pagination
          ? {
            pageSize,
            defaultCurrent: Number(page) || 1,
            total: total ?? data?.length,
            onChange: (page) => {
              updateParams({ page: page.toString() });
            },
          }
          : false
      }
      scroll={{ x: "max-content" }}
    />
  );
};

export default DataTable;
