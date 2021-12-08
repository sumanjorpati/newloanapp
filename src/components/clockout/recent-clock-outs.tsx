import { Table } from "@components/ui/table";
import { ClockOut as RecentClockOut } from "@ts-types/generated";
import { useTranslation } from "next-i18next";

type IProps = {
  clockOuts: RecentClockOut[];
  title?: string;
};

const RecentClockOuts = ({ clockOuts, title }: IProps) => {
  const { t } = useTranslation();

  const rowExpandable = (record: any) => record.children?.length;

  const columns = [
    {
      title: t("table:table-item-company-name"),
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
      width: 150,
    },
    {
      title: t("table:table-item-company-address"),
      dataIndex: "address",
      key: "address",
      align: "center",
      width: 100,
    },
    {
      title: t("table:table-item-company-phone"),
      dataIndex: "contact",
      key: "contact",
      align: "center",
      width: 70,
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <h3 className="text-heading text-center font-semibold px-4 py-3 bg-light border-b border-border-200">
          {title}
        </h3>
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={clockOuts}
          rowKey="firstName"
          scroll={{ x: 200 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>
    </>
  );
};

export default RecentClockOuts;
