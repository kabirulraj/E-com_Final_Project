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
import { image } from '../../api/endPoints/endPoints';

const AddressScreenWrapper = styled.main`
  .form-elem-control {
    padding-left: 16px;
    border: 1px solid ${defaultTheme.color_platinum};

    &:focus {
      border-color: ${defaultTheme.color_silver};
    }
  }
    .image-preview {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 4px;
    border: 1px solid ${defaultTheme.color_platinum};
  }
  
  .image-input-container {
    display: flex;
    flex-direction: column;
  }
  
  .file-input-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }
  
  .file-input-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
  
  .file-input-button {
    padding: 8px 16px;
    background-color: ${defaultTheme.color_whitesmoke};
    border: 1px solid ${defaultTheme.color_platinum};
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    color: ${defaultTheme.color_dim_gray};
  }
  
  .file-name {
    margin-top: 8px;
    font-size: 12px;
    color: ${defaultTheme.color_dim_gray};
  }
`;

const breadcrumbItems = [
    { label: "Home", link: "/home" },
    { label: "Account", link: "/account" },
    { label: "Add Product", link: "/account/add" },
];


const EditProductDetails = () => {

    const { id } = useParams();

    const [productImage, setProductImage] = useState(null);
    const [fileName, setFileName] = useState('No file chosen');

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: "",
            description: "",
            image: "",
        },
    });
    const { data } = useProductDetailsQuery(id);

    const { mutate } = useProductUpdateQuery();

    useEffect(() => {
        if (data) {
            setValue("title", data?.data?.title);
            setValue("description", data?.data?.description);
            setValue("image", data?.data?.image);
        }
    }, [data, setValue]);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
            setFileName(e.target.files[0].name);
        }
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("image", productImage);
        formData.append("id", id);
        mutate(formData);
    };

    return (
        <AddressScreenWrapper className="page-py-spacing">
            <Container>
                <Breadcrumb items={breadcrumbItems} />
                <UserDashboardWrapper>
                    <UserMenu />
                    <UserContent>
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
                                                type="number"
                                                className="form-elem-control"
                                                placeholder="price"
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
                                   <div className="image-input-container">
                                        {data?.data?.image && !productImage && (
                                            <img 
                                                src={image(data.data.image)} 
                                                alt="Current product" 
                                                className="image-preview" 
                                            />
                                        )}
                                        {productImage && (
                                            <img 
                                                src={URL.createObjectURL(productImage)} 
                                                alt="New product" 
                                                className="image-preview" 
                                            />
                                        )}
                                        <div className="file-input-wrapper">
                                            <div className="file-input-button">Choose File</div>
                                            <Input
                                                type="file"
                                                accept='image/*'
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <div className="file-name">{fileName}</div>
                                    </div>
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