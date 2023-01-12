import { Form, Input, Modal, Select, Table } from "antd";
import Button from "antd/es/button";
import { getAllCompanies } from "api/CompaniesApi";
import { ICompaniesDto, ICompanyDto } from "dtos/Companies";
import React, { useEffect, useState } from "react";
import { AllCompaniesColumns } from "utils/Columns/CompaniesColumns";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import "./companies.css";
import { TableRowSelection } from "antd/es/table/interface";
import { useMessage } from "hooks";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { CompanyFieldsAsArray } from "dtos/Fields";
import { countries } from "dtos/Countries";
import { DefaultOptionType } from "antd/es/select";
const Companies = () => {
  const { messageApi } = useMessage();
  const [addCompanyModal, setAddCompanyModal] = useState<boolean>(false);
  const [allCompanies, setAllCompanies] = useState<ICompaniesDto>([]);
  const [selected, setSelected] = useState<ICompaniesDto>([]);
  const [fieldOptions, setFieldOptions] = useState<DefaultOptionType[]>([]);
  const [countryOptions, setCountryOptions] = useState<DefaultOptionType[]>([]);
  const getCompanies = async () => {
    const response = await getAllCompanies();
    setAllCompanies(response);
  };

  const rowSelection: TableRowSelection<ICompanyDto> = {
    type: "checkbox",
    onSelect: (record, selected, selectedRows, e) => {
      setSelected(selectedRows);
    },
  };

  const deleteSelections = () => {
    if (selected.length === 0) {
      messageApi.open({
        type: "warning",
        content: "Please select a company!",
      });
    }
    let tempCompanies: ICompaniesDto = structuredClone(allCompanies);
    let tempSelectedIds = selected.map((select) => select.id);
    setAllCompanies(
      tempCompanies.filter((company) => !tempSelectedIds.includes(company.id))
    );
  };

  const toggleAddCompanyModal = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  const onFinish = (values: ICompanyDto) => {
    let tempCompany: ICompanyDto = {
      companyName: values.companyName,
      companyPhone: values.companyPhone,
      companyPic: "",
      country: values.country,
      fields: values.fields,
      vatNumber: values.vatNumber,
      website: values.website,
      id: allCompanies.length + 1,
      key: allCompanies.length + 1,
    };
    setAllCompanies([tempCompany, ...allCompanies]);
    messageApi.open({
      type: "success",
      content: "Company added successfully!",
    });
    toggleAddCompanyModal();
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

  useEffect(() => {
    getCompanies();
    fillOptions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row gap-x-3">
          <Button
            onClick={toggleAddCompanyModal}
            className="flex flex-row items-center justify-between"
          >
            <PlusOutlined />
            Add Company
          </Button>

          <Button
            onClick={deleteSelections}
            className="flex flex-row items-center justify-between"
            danger
          >
            <MinusOutlined />
            Delete Companies
          </Button>
        </div>
        <Table
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
          dataSource={allCompanies}
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
