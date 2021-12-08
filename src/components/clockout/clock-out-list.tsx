import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { getIcon } from "@utils/get-icon";
import * as categoriesIcon from "@components/icons/category";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { SortOrder } from "@ts-types/generated";
import { useState } from "react";
import TitleWithSort from "@components/ui/title-with-sort";
import { EMPLOYEE_ROUTES, SUPERADMIN_ROUTES } from "@utils/loanoutes";

export type IProps = {
  clockOuts: any | undefined | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};

const ClockOutList = ({ clockOuts, onPagination, onSort, onOrder }: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = clockOuts! ?? {};
  const rowExpandable = (record: any) => record.children?.length;
  console.log('clockOutlist data',data)
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-first-name")}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === "firstName"
          }
          isActive={sortingObj.column === "firstName"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "firstName",
      key: "firstName",
      align: alignLeft,
      onHeaderCell: () => onHeaderClick("firstName"),
    },
    {
      title: t("table:table-item-last-name"),
      dataIndex: "lastName",
      key: "lastName",
      align: "center",
      ellipsis: true,
    },
    {
      title: t("table:table-item-username"),
      dataIndex: "userName",
      key: "userName",
      align: "center",
      ellipsis: true,
    },
    {
      title: t("table:table-item-company-name"),
      dataIndex: "company",
      key: "company",
      align: "center",
      ellipsis: true,
    },
    {
      title: t("table:table-item-phone-number"),
      dataIndex: "contact",
      key: "contact",
      align: alignLeft,
      width: 120,
    },
    {
      title: t("table:table-item-description"),
      dataIndex: "description",
      key: "description",
      align: alignLeft,
      width: 120,
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${EMPLOYEE_ROUTES.CLOCK_OUT}/${id}/edit`}
          deleteModalView="DELETE_CLOCK_OUT"
        />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          //@ts-ignore
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
      
    </>
  );
};

export default ClockOutList;
