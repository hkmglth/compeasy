import { Avatar, Button } from "antd";
import { ICompanyDto } from "dtos/Companies";
import React from "react";
import {
  UserOutlined,
  ShopOutlined,
  PhoneOutlined,
  NumberOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
type ICompanySimpleProps = {
  company: ICompanyDto;
};

const CompanySimple = ({ company }: ICompanySimpleProps) => {
  return (
    <div className="bg-gray-200 hover:scale-105 transition-all duration-150 ease-in-out rounded-md overflow-hidden shadow-lg flex flex-col items-center justify-center w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]">
      <div className="bg-sky-400 shadow-lg relative h-24 w-full px-3">
        <p className="text-white flex gap-x-3 p-3 font-medium">
          <ShopOutlined />
          {company.fields}
        </p>
        <Avatar
          className="absolute bg-sky-200 -bottom-6 left-1/2 -translate-x-1/2 shadow-md"
          src={company.companyPic}
          size={80}
          icon={<UserOutlined />}
        />
      </div>

      <div className="mt-5 py-3 flex flex-col gap-1">
        <p className="!m-0 !p-0 flex flex-row gap-x-3 items-center justify-center text-center font-medium text-gray-700 text-base">
          <DatabaseOutlined />
          {company.companyName}
        </p>
        <p className="!m-0 !p-0 flex flex-row gap-x-3 items-center justify-center text-center text-gray-700 text-base">
          <PhoneOutlined />
          {company.companyPhone}
        </p>
        <p className="!m-0 !p-0 flex flex-row gap-x-3 items-center justify-center text-center text-gray-700 text-base">
          <NumberOutlined />
          {company.vatNumber}
        </p>
      </div>
    </div>
  );
};

export default CompanySimple;
