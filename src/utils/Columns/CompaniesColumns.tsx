import { Avatar, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { RightOutlined, EditOutlined } from "@ant-design/icons";
import { ICompanyDto } from "dtos/Companies";
import { countries } from "dtos/Countries";

const AllCompaniesColumns: ColumnsType<ICompanyDto> = [
  {
    title: "Edit",
    dataIndex: "id",
    showSorterTooltip: true,
    render: (value: string, record, index) => (
      <Button
        className="flex flex-row items-center justify-center gap-x-3"
        type="ghost"
        href={`./products/edit/${value}`}
      >
        <EditOutlined className="" />
      </Button>
    ),
    filtered: true,
    align: "center",
    filterMultiple: true,
  },
  {
    title: "Company Photo",
    dataIndex: "companyPic",
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
    title: "Id",
    dataIndex: "id",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => (a.id > b.id ? 1 : -1),
  },
  {
    title: "Company Name",
    dataIndex: "companyName",

    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => a.companyName.localeCompare(b.companyName),
  },
  {
    title: "Company Phone",
    dataIndex: "companyPhone",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
  },
  {
    title: "Vat Number",
    dataIndex: "vatNumber",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
  },
  {
    title: "Country",
    dataIndex: "country",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    render: (value: string, record, index) => {
      let country = countries.find((country) => country.name === value);
      console.log(country);
      return (
        <div className="flex flex-row gap-x-3 items-center justify-start self-center">
          <Avatar
            className="!object-center !object-cover"
            src={country?.flag}
          />
          <p>{country?.name}</p>
        </div>
      );
    },
    sorter: (a, b) => a.country.localeCompare(b.country),
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
    title: "Field",
    dataIndex: "fields",
    showSorterTooltip: true,
    filtered: true,
    align: "center",
    filterMultiple: true,
    sorter: (a, b) => a.fields.localeCompare(b.fields),
  },
  {
    title: "Products",
    dataIndex: "id",
    showSorterTooltip: true,
    render: (value: string, record, index) => (
      <Button
        className="flex flex-row items-center justify-center gap-x-3"
        type="ghost"
        shape="circle"
        href={"products/" + value}
      >
        <RightOutlined className="" />
      </Button>
    ),
    align: "center",
  },
];

export { AllCompaniesColumns };
