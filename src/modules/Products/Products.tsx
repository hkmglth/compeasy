import { Button, Modal, Select, Table, Form, Input, InputNumber } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductsByCompanyId,
} from "api/ProductsApi";
import { IProductDto, IProductsDto } from "dtos/Products";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  PlusOutlined,
  MinusOutlined,
  ShopOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { AllProductsColumns } from "utils/Columns/ProductsColumns";
import { useMessage, useProducts } from "hooks";
import { DefaultOptionType } from "antd/es/select";
import { ICompanyDto } from "dtos/Companies";
import { getCompaniesDropdown, getCompanyByIdLocale } from "api/CompaniesApi";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { CompanyFieldsAsArray } from "dtos/Fields";
const Products = () => {
  const { companyId } = useParams();
  const { messageApi } = useMessage();
  const [company, setCompany] = useState<ICompanyDto>({} as ICompanyDto);
  const { products, setProducts } = useProducts();
  const [tempProducts, setTempProducts] = useState<IProductsDto>([]);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<IProductsDto>([]);
  const [addProductModal, setAddProductModal] = useState<boolean>(false);
  const [companiesOptions, setCompaniesOptions] = useState<DefaultOptionType[]>(
    []
  );
  const [fieldOptions, setFieldOptions] = useState<DefaultOptionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const getAllProds = async () => {
    setIsLoading(true);
    const response = await getAllProducts();
    if (response.success) {
      setProducts(response.data);
      setTempProducts(response.data);
      messageApi.open({
        type: "success",
        content: response.message,
      });
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }

    setIsLoading(false);
  };

  const getProdsByCompanyId = async (companyId: number) => {
    setIsLoading(true);
    const response = await getProductsByCompanyId(companyId);
    if (response.success) {
      if (response.data.length === 0) {
        messageApi.open({
          type: "error",
          content: response.message,
        });
      }
      setProducts(response.data);
      setTempProducts(response.data);
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
      navigate("../../dashboard/products");
    }
    setIsLoading(false);
  };

  const getCompany = async () => {
    const response = await getCompanyByIdLocale(parseInt(companyId!));
    setCompany(response);
  };

  const rowSelection: TableRowSelection<IProductDto> = {
    type: "checkbox",
    onSelect: (record, selected, selectedRows, e) => {
      setSelected(selectedRows);
    },
  };

  const toggleAddProductModal = () => {
    setAddProductModal(!addProductModal);
  };

  const allProds = () => {
    getAllProds();
    navigate("../../dashboard/products");
  };

  const deleteSelections = async () => {
    setIsLoading(true);
    if (selected.length === 0) {
      messageApi.open({
        type: "warning",
        content: "Please select a product!",
      });
    }

    let tempProducts: IProductsDto = structuredClone(products);
    let tempSelectedIds = selected.map((select) => select.id);

    const response = await deleteProductById(tempSelectedIds);
    if (response.success) {
      let deletedProducts = tempProducts.filter(
        (company) => !tempSelectedIds.includes(company.id)
      );
      setProducts(deletedProducts);
      setTempProducts(deletedProducts);
      messageApi.open({
        type: "success",
        content: response.message,
      });
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
    setIsLoading(false);
  };

  const fillCompaniesOptions = async () => {
    if (!(companiesOptions.length > 0)) {
      const response = await getCompaniesDropdown();
      if (response.success) {
        setCompaniesOptions(response.data);
      }
    }
  };

  const fillFieldOption = () => {
    let tempField: DefaultOptionType[] = [];
    CompanyFieldsAsArray.map((field) =>
      tempField.push({ value: field, label: field })
    );
    setFieldOptions(tempField);
  };

  const fillOptions = () => {
    fillCompaniesOptions();
    fillFieldOption();
  };

  const handleChange: any = (value: number, option: DefaultOptionType) => {
    navigate(`../../dashboard/products/${value}`, { relative: "route" });
    getProdsByCompanyId(value);
  };

  const onFinish = async (values: IProductDto) => {
    setIsLoading(true);
    let tempProd: IProductDto = {
      ...values,
      id: products.length + 1,
      key: products.length + 1,
      productPrice: `$${values.productPrice}`,
    };

    const response = await addProduct({
      ...values,
      productPrice: `$${values.productPrice}`,
    });
    if (response.success) {
      messageApi.open({
        type: "success",
        content: response.message,
      });
      getAllProds();
      const temp: IProductsDto = [tempProd, ...products];
      setProducts(temp);
      setTempProducts(temp);
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
    toggleAddProductModal();
    setIsLoading(false);
  };

  const onFinishFailed = (values: ValidateErrorEntity<IProductDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let tempValue = e.target.value;
    setSearch(tempValue);
    let searchedProducts = products.filter((prod) => {
      let tempCheck: boolean = false;
      Object.values(prod).map((values) => {
        if (typeof values === "string") {
          if (values.includes(tempValue)) {
            tempCheck = true;
          }
        } else {
          if (values.toString().includes(tempValue)) {
            tempCheck = true;
          }
        }
      });
      return tempCheck;
    });
    setTempProducts(searchedProducts);
  };

  useEffect(() => {
    if (companyId === undefined || companyId.length === 0) {
      getAllProds();
    } else {
      getProdsByCompanyId(parseInt(companyId));
      getCompany();
    }
    fillOptions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-x-3 justify-between">
          <div className="flex flex-row gap-x-3">
            {companyId && companyId?.length > 0 && (
              <Button
                onClick={allProds}
                className="flex flex-row items-center justify-between"
              >
                <ShopOutlined />
                All Products
              </Button>
            )}
            <Button
              onClick={toggleAddProductModal}
              className="flex flex-row items-center justify-between"
            >
              <PlusOutlined />
              Add Product
            </Button>

            <Button
              onClick={deleteSelections}
              className="flex flex-row items-center justify-between"
              danger
            >
              <MinusOutlined />
              Delete Products
            </Button>
          </div>
          <div className="flex flex-row gap-x-6 items-center bg-red">
            <div className="flex flex-row items-center gap-x-3">
              <p className="!m-0 !p-0 flex flex-row gap-x-2">
                <ShopOutlined />
                Company:
              </p>
              <Select
                placeholder="Select a company"
                className="w-40"
                onSelect={handleChange}
                options={companiesOptions}
              />
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
        </div>
        <Table
          loading={isLoading}
          rowSelection={{
            ...rowSelection,
          }}
          showSorterTooltip
          pagination={{
            hideOnSinglePage: true,
            position: ["bottomCenter"],
          }}
          rowClassName={"!m-0 !p-0"}
          columns={AllProductsColumns}
          dataSource={tempProducts}
        />
      </div>
      <Modal
        title="Add Company"
        open={addProductModal}
        closable
        centered
        destroyOnClose
        onCancel={toggleAddProductModal}
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
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Please enter product name !",
                min: 3,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Product Amount"
            name="productAmount"
            rules={[
              {
                required: true,
                message: "Please enter product amount!",
              },
            ]}
          >
            <InputNumber className="w-full" />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Product Price"
            name="productPrice"
            rules={[
              {
                required: true,
                message: "Please enter product price!",
              },
            ]}
          >
            <InputNumber className="w-full" />
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
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please enter company!" }]}
          >
            <Select
              placeholder="Select a status"
              className="w-40"
              options={[
                {
                  label: "Sale!",
                  value: true,
                },
                {
                  label: "Not on sale!",
                  value: false,
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Company"
            name="companyId"
            rules={[{ required: true, message: "Please enter company!" }]}
          >
            <Select
              placeholder="Select a company"
              defaultValue={{ value: company.id, label: company.companyName }}
              className="w-40"
              options={companiesOptions}
            />
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
                onClick={toggleAddProductModal}
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
                Add Product
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Products;
