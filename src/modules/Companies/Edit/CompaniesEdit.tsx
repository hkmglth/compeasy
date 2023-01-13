import { getCompanyById } from "api/CompaniesApi";
import { ICompaniesDto, ICompanyDto } from "dtos/Companies";
import { useCompanies, useMessage } from "hooks";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Select, Button, Divider, Avatar } from "antd";
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { DefaultOptionType } from "antd/es/select";
import { CompanyFieldsAsArray } from "dtos/Fields";
import { countries } from "dtos/Countries";
const CompaniesEdit = () => {
  const { companyId } = useParams();
  const { messageApi } = useMessage();
  const { companies, setCompanies } = useCompanies();
  const [company, setCompany] = useState<ICompanyDto>({} as ICompanyDto);
  const [fieldOptions, setFieldOptions] = useState<DefaultOptionType[]>([]);
  const [countryOptions, setCountryOptions] = useState<DefaultOptionType[]>([]);

  const navigate = useNavigate();
  const getCompany = async () => {
    const response = await getCompanyById(parseInt(companyId!));
    if (response.companyName !== undefined) {
      setCompany(response);
    } else {
      messageApi.open({
        type: "error",
        content: "Company details not found!",
      });
      navigate("../../companies");
    }
  };

  const onFinish = (values: ICompanyDto) => {
    let tempCompany: ICompanyDto = { ...values };
    let updatedCompanies: ICompaniesDto = companies.map((company) => {
      if (company.id === tempCompany.id) {
        company = tempCompany;
      }
      return company;
    });
    setCompanies(updatedCompanies);
    messageApi.open({
      type: "success",
      content: "Company updated successfully!",
    });
    navigate("../../companies");
  };

  const onFinishFailed = (values: ValidateErrorEntity<ICompanyDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
  };

  const goCompanies = () => {
    navigate("../../companies");
  };

  const fillFieldOption = () => {
    let tempField: DefaultOptionType[] = [];
    CompanyFieldsAsArray.map((field) =>
      tempField.push({ value: field, label: field })
    );
    setFieldOptions(tempField);
  };

  const fillCountryOption = () => {
    let tempField: DefaultOptionType[] = [];
    countries.map((country) =>
      tempField.push({ value: country.name, label: country.name })
    );
    setCountryOptions(tempField);
  };

  const fillOptions = () => {
    fillFieldOption();
    fillCountryOption();
  };
  useEffect(() => {
    fillOptions();
    if (companyId && companyId.length !== 0) {
      getCompany();
    } else {
      messageApi.open({
        type: "error",
        content: "Company not found!",
      });
      navigate("../");
    }
  }, []);

  return (
    <>
      <Divider orientation="left">
        <p className="font-bold flex items-center flex-row gap-x-3 text-gray-500 text-lg m-0 p-0">
          <Avatar
            className="bg-sky-300 shadow-lg"
            size={64}
            src={company.companyPic}
          />
          Edit {company.companyName}
          <EditOutlined />
        </p>
      </Divider>
      <div className="flex flex-col items-center h-full -mt-12 justify-center">
        <Form
          name="updateCompany"
          className="flex flex-col md:w-1/2 xl:w-1/4 max-w-5xl"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Company Name"
            name="companyName"
            valuePropName="companyName"
          >
            <Input
              value={company.companyName}
              onChange={(e) =>
                setCompany({ ...company, companyName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Company Phone"
            name="companyPhone"
            valuePropName="companyPhone"
          >
            <Input
              value={company.companyPhone}
              onChange={(e) =>
                setCompany({ ...company, companyPhone: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Vat Number"
            name="vatNumber"
            valuePropName="vatNumber"
          >
            <Input
              value={company.vatNumber}
              onChange={(e) =>
                setCompany({ ...company, vatNumber: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Country"
            name="country"
            valuePropName="country"
          >
            <Select
              id="country"
              showSearch
              value={company.country}
              onSelect={(e) => setCompany({ ...company, country: e })}
              placeholder="Select a country"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={countryOptions}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Website"
            name="website"
            valuePropName="website"
          >
            <Input
              value={company.website}
              onChange={(e) =>
                setCompany({ ...company, website: e.target.value })
              }
              addonBefore="https://"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Fields"
            name="fields"
            valuePropName="fields"
          >
            <Select
              showSearch
              placeholder="Select a field"
              optionFilterProp="children"
              value={company.fields}
              onSelect={(e) => setCompany({ ...company, fields: e })}
              filterOption={(input, option: any) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={fieldOptions}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
          >
            <div className="flex flex-row gap-x-3 justify-end">
              <Button
                danger
                type="default"
                onClick={goCompanies}
                className="flex flex-row items-center justify-between"
              >
                <CloseOutlined />
                Cancel
              </Button>
              <Button
                type="default"
                htmlType="submit"
                className="flex flex-row items-center justify-between"
              >
                <PlusOutlined />
                Update Company
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CompaniesEdit;
