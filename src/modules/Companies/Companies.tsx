import { Form, Input, Modal, Select, Table } from "antd";
import Button from "antd/es/button";
import { addCompany, deleteCompanies, getAllCompanies } from "api/CompaniesApi";
import { ICompaniesDto, ICompanyDto } from "dtos/Companies";
import React, { useEffect, useState } from "react";
import { AllCompaniesColumns } from "utils/Columns/CompaniesColumns";
import {
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./companies.css";
import { TableRowSelection } from "antd/es/table/interface";
import { useCompanies, useMessage } from "hooks";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { CompanyFieldsAsArray } from "dtos/Fields";
import { countries } from "dtos/Countries";
import { DefaultOptionType } from "antd/es/select";
const Companies = () => {
  const { messageApi } = useMessage();
  const [addCompanyModal, setAddCompanyModal] = useState<boolean>(false);
  const { companies, setCompanies } = useCompanies();
  const [tempAllCompanies, setTempAllCompanies] = useState<ICompaniesDto>([]);
  const [selected, setSelected] = useState<ICompaniesDto>([]);
  const [fieldOptions, setFieldOptions] = useState<DefaultOptionType[]>([]);
  const [countryOptions, setCountryOptions] = useState<DefaultOptionType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isCompaniesLoading, setIsCompaniesLoading] = useState<boolean>(false);

  const getCompanies = async () => {
    if (companies.length > 0) {
      setTempAllCompanies(structuredClone(companies));
    } else {
      setIsCompaniesLoading(true);
      const response = await getAllCompanies();
      if (response.success) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        setCompanies(response.data);
        setTempAllCompanies(response.data);
      } else {
        setCompanies(response.data);
        setTempAllCompanies(response.data);
      }
      setIsCompaniesLoading(false);
    }
  };

  const rowSelection: TableRowSelection<ICompanyDto> = {
    type: "checkbox",
    onSelect: (record, selected, selectedRows, e) => {
      setSelected(selectedRows);
    },
  };

  const deleteSelections = async () => {
    setIsCompaniesLoading(true);
    if (selected.length === 0) {
      messageApi.open({
        type: "warning",
        content: "Please select a company!",
      });
    } else {
      let tempCompanies: ICompaniesDto = structuredClone(companies);
      let tempSelectedIds = selected.map((select) => select.id);
      let tempDeletedCompanies = tempCompanies.filter(
        (company) => !tempSelectedIds.includes(company.id)
      );

      const response = await deleteCompanies(tempSelectedIds);
      if (response.success) {
        messageApi.open({
          type: "success",
          content: response.message,
        });
        setCompanies(tempDeletedCompanies);
        setTempAllCompanies(tempDeletedCompanies);
      } else {
        messageApi.open({
          type: "error",
          content: response.message,
        });
      }

      setIsCompaniesLoading(false);
    }
  };

  const toggleAddCompanyModal = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  const onFinish = async (values: ICompanyDto) => {
    let tempCompany: ICompanyDto = {
      companyName: values.companyName,
      companyPhone: values.companyPhone,
      companyPic: "",
      country: values.country,
      fields: values.fields,
      vatNumber: values.vatNumber,
      website: values.website,
      id: companies.length + 1,
      key: companies.length + 1,
    };
    setIsCompaniesLoading(true);
    const response = await addCompany(tempCompany);
    if (response.success) {
      setCompanies([tempCompany, ...companies]);
      setTempAllCompanies([tempCompany, ...companies]);
      messageApi.open({
        type: "success",
        content: "Company added successfully!",
      });
      toggleAddCompanyModal();
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
    setIsCompaniesLoading(false);
  };

  const onFinishFailed = (values: ValidateErrorEntity<ICompanyDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempValue = e.target.value;
    setSearch(tempValue);
    let searchedCompanies = companies.filter((company) => {
      let tempCheck: boolean = false;
      Object.values(company).map((values) => {
        if (typeof values === "string") {
          if (
            values.toLocaleLowerCase().includes(tempValue.toLocaleLowerCase())
          ) {
            tempCheck = true;
          }
        } else {
          if (
            values
              .toString()
              .toLocaleLowerCase()
              .includes(tempValue.toLocaleLowerCase())
          ) {
            tempCheck = true;
          }
        }
      });
      return tempCheck;
    });
    setTempAllCompanies(searchedCompanies);
  };

  useEffect(() => {
    getCompanies();
    fillOptions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-3 w-full overflow-auto">
        <div className="flex flex-row gap-x-6 justify-between">
          <div className="flex flex-row gap-x-3">
            <Button
              onClick={toggleAddCompanyModal}
              className="flex flex-row items-center justify-between"
            >
              <PlusOutlined />
              <p className="hidden md:flex m-0 p-0 ml-2">Add Company</p>
            </Button>

            <Button
              onClick={deleteSelections}
              className="flex flex-row items-center justify-between"
              danger
            >
              <MinusOutlined />
              <p className="hidden md:flex m-0 p-0 ml-2">Delete Companies</p>
            </Button>
          </div>

          <div className="flex flex-row items-center gap-x-3">
            <p className="!m-0 !p-0 flex w-fit flex-row gap-x-2">
              <SearchOutlined />
              Search:
            </p>
            <Input
              value={search}
              onChange={handleSearch}
              placeholder="Search"
            />
          </div>
        </div>
        <Table
          loading={isCompaniesLoading}
          rowSelection={{
            ...rowSelection,
          }}
          showSorterTooltip
          pagination={{
            hideOnSinglePage: true,
            position: ["bottomCenter"],
          }}
          rowClassName={"!m-0 !p-0"}
          columns={AllCompaniesColumns}
          dataSource={tempAllCompanies}
        />
      </div>

      <Modal
        title="Add Company"
        open={addCompanyModal}
        closable
        centered
        destroyOnClose
        onCancel={toggleAddCompanyModal}
        footer={[]}
      >
        <Form
          name="addCompany"
          className="flex flex-col"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Company Name"
            name="companyName"
            rules={[
              { required: true, message: "Please enter company name!", min: 5 },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Company Phone"
            name="companyPhone"
            rules={[
              {
                required: true,
                message: "Please enter company phone!",
                min: 11,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Vat Number"
            name="vatNumber"
            rules={[
              {
                required: true,
                message: "Please enter vat number!",
                len: 10,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Country"
            name="country"
            rules={[
              { required: true, message: "Please enter country!", min: 3 },
            ]}
          >
            <Select
              showSearch
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
            rules={[
              { required: true, message: "Please enter website!", min: 3 },
            ]}
          >
            <Input addonBefore="https://" />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Fields"
            name="fields"
            rules={[{ required: true, message: "Please enter field!", min: 3 }]}
          >
            <Select
              showSearch
              placeholder="Select a field"
              optionFilterProp="children"
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
                onClick={toggleAddCompanyModal}
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
                Add Company
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Companies;
