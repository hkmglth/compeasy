import {
  getAllCountryStats,
  getAllFieldStats,
  getLastActionCompanies,
} from "api/CompaniesApi";
import CompanySimple from "components/Company/CompanySimple";
import { ICompaniesDto } from "dtos/Companies";
import { useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import { Divider } from "antd";
import { Pie } from "@ant-design/plots";
import { IMultipleFieldStats } from "dtos/Fields";

import { ClockCircleOutlined, PieChartOutlined } from "@ant-design/icons";

const DashboardLanding = () => {
  const parentLastActions = useRef<HTMLDivElement>(null);

  const [lastActionCompanies, setLastActionCompanies] = useState<ICompaniesDto>(
    []
  );

  const [fieldStats, setFieldStats] = useState<IMultipleFieldStats>([]);
  const [countryStats, setCountryStats] = useState<IMultipleFieldStats>([]);
  const getLastActions = async () => {
    const response = await getLastActionCompanies();
    setLastActionCompanies(response);
  };

  const getFieldStats = async () => {
    const response = await getAllFieldStats();
    setFieldStats(response);
  };

  const getCountryStats = async () => {
    const response = await getAllCountryStats();
    setCountryStats(response);
  };

  useEffect(() => {
    getLastActions();
    getFieldStats();
    getCountryStats();
  }, []);

  useEffect(() => {
    parentLastActions.current && autoAnimate(parentLastActions.current);
  }, [parentLastActions]);

  const fieldConfig = {
    appendPadding: 10,
    data: fieldStats,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  const countryConfig = {
    appendPadding: 10,
    data: countryStats,
    angleField: "value",
    colorField: "type",
    radius: 0.75,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-y-3">
        <Divider orientation="left">
          <p className="font-bold flex flex-row gap-x-3 text-gray-500 text-lg m-0 p-0">
            <ClockCircleOutlined />
            Recent
          </p>
        </Divider>
        <div
          className="flex flex-wrap gap-4 flex-row justify-center items-center"
          ref={parentLastActions}
        >
          {lastActionCompanies.map((company) => (
            <CompanySimple key={company.id} company={company} />
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <div className="flex flex-col w-[calc(50%-1rem)] shadow-lg rounded-md bg-gray-100 gap-x-2">
          <Divider orientation="left">
            <p className="font-bold flex flex-row gap-x-3 text-gray-500 text-lg m-0 p-0">
              <PieChartOutlined />
              Field Stats
            </p>
          </Divider>
          <Pie {...fieldConfig} />
        </div>
        <div className="flex flex-col w-[calc(50%-1rem)] shadow-lg rounded-md bg-gray-100 gap-x-2">
          <Divider orientation="left">
            <p className="font-bold flex flex-row gap-x-3 text-gray-500 text-lg m-0 p-0">
              <PieChartOutlined />
              Country Stats
            </p>
          </Divider>
          <Pie {...countryConfig} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLanding;
