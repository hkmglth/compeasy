import { Button, Modal, Select, Table, Form, Input, InputNumber } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { getAllProducts, getProductsByCompanyId } from "api/ProductsApi";
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
import allCompanies from "fakeData/companies.json";
import { ICompanyDto } from "dtos/Companies";
import { getCompanyByIdLocale } from "api/CompaniesApi";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
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

  const navigate = useNavigate();

  const getAllProds = async () => {
    if (products.length > 0) {
      setTempProducts(structuredClone(products));
    } else {
      const response = await getAllProducts();
      setProducts(response);
      setTempProducts(response);
    }
  };

  const getProdsByCompanyId = async (id: number) => {
    const response = await getProductsByCompanyId(id);
    if (response.length === 0) {
      messageApi.open({
        type: "warning",
        content: "Company not found!",
      });
      navigate("../../dashboard/products");
    }
    setProducts(response);
    setTempProducts(response);
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

  const deleteSelections = () => {
    if (selected.length === 0) {
      messageApi.open({
        type: "warning",
        content: "Please select a product!",
      });
    }
    let tempProducts: IProductsDto = structuredClone(products);
    let tempSelectedIds = selected.map((select) => select.id);
    let deletedProducts = tempProducts.filter(
      (company) => !tempSelectedIds.includes(company.id)
    );
    setProducts(deletedProducts);
    setTempProducts(deletedProducts);
  };

  const fillCompaniesOptions = () => {
    let tempCompaniesOptions: DefaultOptionType[] = [];
    allCompanies.map((company) =>
      tempCompaniesOptions.push({
        label: company.companyName,
        value: company.id,
      })
    );
    setCompaniesOptions(tempCompaniesOptions);
  };

  const handleChange: any = (value: number, option: DefaultOptionType) => {
    navigate(`../../dashboard/products/${value}`, { relative: "route" });
    getProdsByCompanyId(value);
  };

  const onFinish = (values: IProductDto) => {
    let tempProd: IProductDto = { ...values, id: products.length + 1 };
    setProducts([tempProd, ...products]);
    setTempProducts([tempProd, ...products]);
    toggleAddProductModal();
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
    if (companyId === undefined) {
      getAllProds();
    } else {
      getProdsByCompanyId(parseInt(companyId));
      getCompany();
    }
    fillCompaniesOptions();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-x-3 justify-between">
          <div className="flex flex-row gap-x-3">
            {companyId && (
              <Button
                onClick={() => navigate("../../dashboard/products")}
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
                defaultValue={{ value: company.id, label: company.companyName }}
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
            <InputNumber className="w-full" addonBefore="$" />
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
