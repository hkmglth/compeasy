import { Avatar, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RightOutlined, EditOutlined } from "@ant-design/icons";
import { IProductDto } from "dtos/Products";
import allCompanies from "fakeData/companies.json";
const AllProductsColumns: ColumnsType<IProductDto> = [
  {
    title: "Edit",
    dataIndex: "id",
    showSorterTooltip: true,
    render: (value: string, record, index) => (
      <Button
        className="flex flex-row items-center justify-center gap-x-3"
        type="ghost"
        href={`products/edit/${value}`}
      >
        <EditOutlined className="" />
      </Button>
    ),
    filtered: true,
    align: "center",
    filterMultiple: true,
  },
  {
    title: "Company",
    dataIndex: "companyId",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => (a.companyId > b.companyId ? 1 : -1),
    render: (value: number, record, index) => {
      let company = allCompanies.find((company) => company.id === value);
      return <>{company?.companyName}</>;
    },
  },
  {
    title: "Product Id",
    dataIndex: "id",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => (a.id > b.id ? 1 : -1),
  },
  {
    title: "Product Photo",
    dataIndex: "productPic",
    showSorterTooltip: true,
    render: (value: string, record, index) => (
      <Avatar
        className="shadow-md bg-sky-200 !m-0 !p-0"
        key={value}
        src={value}
        size={48}
      />
    ),
    filtered: true,
    align: "center",
    filterMultiple: true,
  },
  {
    title: "Product Name",
    dataIndex: "productName",

    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => a.productName.localeCompare(b.productName),
  },
  {
    title: "Product Amount",
    dataIndex: "productAmount",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => (a.productAmount > b.productAmount ? 1 : -1),
  },
  {
    title: "Product Price",
    dataIndex: "productPrice",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => a.productPrice.localeCompare(b.productPrice),
  },
  {
    title: "Website",
    dataIndex: "website",
    showSorterTooltip: true,
    render: (value: string, record, index) => (
      <Button
        className="flex flex-row items-center justify-between gap-x-3"
        type="primary"
        href={"https://www." + value}
      >
        {value}
        <RightOutlined className="" />
      </Button>
    ),
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => a.website.localeCompare(b.website),
  },
  {
    title: "Status",
    dataIndex: "status",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    render: (value: boolean, record, index) => (
      <>
        {value ? (
          <Tag className="!px-3 !py-2" color="success">
            On sale!
          </Tag>
        ) : (
          <Tag className="!px-3 !py-2" color="error">
            Not on sale!
          </Tag>
        )}
      </>
    ),
  },
];

export { AllProductsColumns };
