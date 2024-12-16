import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../../components/common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../../components/user/UserMenu";
import Title from "../../components/common/Title";
import { FormElement, Input } from "../../styles/form";
import { BaseButtonGreen, BaseButtonWhitesmoke } from "../../styles/button";
import { defaultTheme } from "../../styles/themes/default";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { useState } from "react";
import { useProductCreateQuery } from "../../hooks/react_query/Product-query";

const AddressScreenWrapper = styled.main`
  .form-elem-control {
    padding-left: 16px;
    border: 1px solid ${defaultTheme.color_platinum};

    &:focus {
      border-color: ${defaultTheme.color_silver};
    }
  }
`;

const breadcrumbItems = [
  { label: "Home", link: "/home" },
  { label: "Account", link: "/account" },
  { label: "Add Product", link: "/account/add" },
];

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
  })
  .required()

const AddProduct = () => {

  const [productImage, setProductImage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { mutate } = useProductCreateQuery()

  const onSubmit = (data) =>{
    console.log(data)
    const formData = new FormData()
    formData.append('title', data?.title)
    formData.append('description', data?.description)
    formData.append('image', productImage)
    mutate(formData)
  }


  return (
    <AddressScreenWrapper className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <UserDashboardWrapper>
          <UserMenu />
          <UserContent>
            <Title titleText={"My Account"} />
            <h4 className="title-sm">Add Product</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-wrapper">
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Product name*
                  </label>
                  <Input
                    type="text"
                    className="form-elem-control"
                    placeholder="name"
                    {...register("title")}
                  />
                  <span className="form-elem-error">
                  {errors.title?.message}
                  </span>
                </FormElement>
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Price*
                  </label>
                  <Input
                    type="text"
                    className="form-elem-control"
                    placeholder="price"
                    {...register("description")}
                  />
                  <span className="form-elem-error">
                  {errors.description?.message}
                  </span>
                </FormElement>
                <FormElement>
                  <label
                    htmlFor=""
                    className="form-label font-semibold text-base"
                  >
                    Product Image
                  </label>
                  <Input
                    type="file"
                    className="form-elem-control"
                    placeholder="Select image.."
                    onChange={(e) => setProductImage(e.target.files[0])}
                  />
                </FormElement>
                
              </div>
             
              <div className="form-btns flex">
                <BaseButtonGreen type="submit">Save</BaseButtonGreen>
              </div>
            </form>
          </UserContent>
        </UserDashboardWrapper>
      </Container>
    </AddressScreenWrapper>
  );
};

export default AddProduct;
