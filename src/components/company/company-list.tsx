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
import { SUPERADMIN_ROUTES } from "@utils/loanoutes";

export type IProps = {
  companies: any | undefined | null;
};

const CompanyList = ({ companies }: IProps) => {
  const { t } = useTranslation();
  const { data } = companies! ?? {};
  const rowExpandable = (record: any) => record.children?.length;

  const { alignLeft } = useIsRTL();

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
          title={t("table:table-item-title")}
          ascending= {false}
          isActive={false}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      
    },
    
    {
      title: t("table:table-item-address"),
      dataIndex: "address",
      key: "address",
      align: "center",
      ellipsis: true,
    },
    {
      title: t("table:table-item-phone-number"),
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
          editUrl={`${SUPERADMIN_ROUTES.COMPANY}/${id}/edit`}
          deleteModalView="DELETE_COMPANY"
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

      
    </>
  );
};

export default CompanyList;
