import { getProductById } from "api/ProductsApi";
import { IProductDto } from "dtos/Products";
import { useMessage } from "hooks";
import {
  Avatar,
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import { DefaultOptionType } from "antd/es/select";
import allCompanies from "fakeData/companies.json";
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { ICompanyDto } from "dtos/Companies";
const ProductsEdit = () => {
  const { productId } = useParams();
  const { messageApi } = useMessage();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductDto>({} as IProductDto);
  const [companiesOptions, setCompaniesOptions] = useState<DefaultOptionType[]>(
    []
  );
  const [company, setCompany] = useState<ICompanyDto>({} as ICompanyDto);
  const getProduct = async () => {
    const response = await getProductById(parseInt(productId!));
    if (response.id === undefined) {
      messageApi.open({
        type: "error",
        content: "Product not found!",
      });
      navigate("../../");
    } else {
      setProduct(response);
    }
  };

  const onFinish = (values: IProductDto) => {};

  const onFinishFailed = (values: ValidateErrorEntity<IProductDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
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

  useEffect(() => {
    if (productId?.length === 0) {
      messageApi.open({
        type: "error",
        content: "Product not found!",
      });
      navigate("../../");
    } else {
      getProduct();
    }
    fillCompaniesOptions();
  }, []);

  return (
    <>
      <Divider orientation="left">
        <p className="font-bold flex items-center flex-row gap-x-3 text-gray-500 text-lg m-0 p-0">
          <Avatar
            className="bg-sky-300 shadow-lg"
            size={64}
            src={product.productPic}
          />
          Edit {product.productName}
          <EditOutlined />
        </p>
      </Divider>
      <div className="flex flex-col items-center h-full -mt-12 justify-center">
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
      </div>
    </>
  );
};

export default ProductsEdit;
