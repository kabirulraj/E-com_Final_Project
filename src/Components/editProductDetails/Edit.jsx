import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useProductDetailsQuery, useProductUpdateQuery } from '../../hooks/react_query/Product-query';
import styled from "styled-components";
import { Container } from "../../styles/styles";
import Breadcrumb from "../common/Breadcrumb";
import { UserContent, UserDashboardWrapper } from "../../styles/user";
import UserMenu from "../user/UserMenu";
import Title from "../common/Title";
import { FormElement, Input } from "../../styles/form";
import { BaseButtonGreen, BaseButtonWhitesmoke } from "../../styles/button";
import { defaultTheme } from "../../styles/themes/default";

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


const EditProductDetails = () => {

    const { id } = useParams();
    console.log(id);

    const [productImage, setProductImage] = useState(null);
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    });
    const { data, isLoading, isError } = useProductDetailsQuery(id);

    const { mutate } = useProductUpdateQuery();

    useEffect(() => {
        if (data) {
            setValue("title", data?.data?.title);
            setValue("description", data?.data?.description);
            setValue("image", data?.data?.image);
        }
    });

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("image", productImage);
        formData.append("id", id);
        mutate(formData);
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading product details</p>;

    return (
        <AddressScreenWrapper className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <UserDashboardWrapper>
                    <UserMenu />
                    <UserContent>
                        <Title titleText={"My Account"} />
                        <h4 className="title-sm">Update Product</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-wrapper">
                                <FormElement>
                                    <label
                                        htmlFor=""
                                        className="form-label font-semibold text-base"
                                    >
                                        Product name*
                                    </label>

                                    <Controller
                                        name='title'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="text"
                                                className="form-elem-control"
                                                placeholder="name"
                                            />
                                        )}
                                    />
                                </FormElement>
                                <FormElement>
                                    <label
                                        htmlFor=""
                                        className="form-label font-semibold text-base"
                                    >
                                        Price*
                                    </label>
                                    <Controller
                                        name='description'
                                        control={control}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                type="text"
                                                className="form-elem-control"
                                                placeholder="name"
                                            />
                                        )}
                                    />
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
                                <BaseButtonGreen type="submit">Update</BaseButtonGreen>
                            </div>
                        </form>
                    </UserContent>
                </UserDashboardWrapper>
            </Container>
        </AddressScreenWrapper>
    );
};

export default EditProductDetails;