import { getProductById, updateProduct } from "api/ProductsApi";
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
import { PlusOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { getCompaniesDropdown } from "api/CompaniesApi";
const ProductsEdit = () => {
  const { productId } = useParams();
  const { messageApi } = useMessage();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductDto>({} as IProductDto);
  const [companiesOptions, setCompaniesOptions] = useState<DefaultOptionType[]>(
    []
  );

  const getProduct = async () => {
    const response = await getProductById(parseInt(productId!));
    if (response.success) {
      setProduct(response.data);
    } else {
      messageApi.open({
        type: "error",
        content: "Product not found!",
      });
    }
  };

  const onFinish = async (values: IProductDto) => {
    const tempValues: IProductDto = {
      ...product,
      productPrice:
        product.productPrice[0] !== "$"
          ? `$${product.productPrice}`
          : product.productPrice,
    };
    const response = await updateProduct(tempValues);
    if (response.success) {
      messageApi.open({
        type: "success",
        content: response.message,
      });
      navigate("../");
    } else {
      messageApi.open({
        type: "error",
        content: response.message,
      });
    }
  };

  const onFinishFailed = (values: ValidateErrorEntity<IProductDto>) => {
    values.errorFields.map((errors) =>
      errors.errors.map((error) =>
        messageApi.open({ type: "error", content: error })
      )
    );
  };

  const fillCompaniesOptions = async () => {
    const response = await getCompaniesDropdown();
    if (response.success) {
      setCompaniesOptions(response.data);
    }
  };

  useEffect(() => {
    if (productId?.length === 0) {
      messageApi.open({
        type: "error",
        content: "Product not found!",
      });
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
            valuePropName="productName"
          >
            <Input
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Product Amount"
            name="productAmount"
            valuePropName="productAmount"
          >
            <InputNumber
              value={product.productAmount}
              onChange={(e) =>
                setProduct({ ...product, productAmount: e === null ? 0 : e })
              }
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Product Price"
            name="productPrice"
            valuePropName="productPrice"
          >
            <Input
              value={product.productPrice}
              onChange={(e) =>
                setProduct({ ...product, productPrice: e.target.value })
              }
              className="w-full"
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
              value={product.website}
              onChange={(e) =>
                setProduct({ ...product, website: e.target.value })
              }
              addonBefore="https://"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24, className: "!-mb-2" }}
            wrapperCol={{ span: 24 }}
            label="Status"
            name="status"
            valuePropName="status"
          >
            <Select
              value={product.status}
              onSelect={(e) => setProduct({ ...product, status: e })}
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
            valuePropName="companyId"
          >
            <Select
              onSelect={(e) => setProduct({ ...product, companyId: e })}
              placeholder="Select a company"
              value={product.companyId}
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
                onClick={() => navigate(-1)}
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
                Update Product
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProductsEdit;
