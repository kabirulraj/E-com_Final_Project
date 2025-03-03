import styled from "styled-components";
import {
  CheckboxGroup,
  FormGridWrapper,
  FormTitle,
} from "../styles/form_grid";
import { Container } from "../styles/styles";
import { staticImages } from "../utils/images";
import { FormElement, Input } from "../styles/form"
import { Link } from "react-router-dom";
import { BaseButtonBlack } from "../styles/button";
import { useForm } from "react-hook-form";
import { useUserSignUpQuery } from "../hooks/react_query/user-query";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react";

const SignUpScreenWrapper = styled.section`
  form {
    margin-top: 40px;
    .form-elem-text {
      margin-top: -16px;
      display: block;
    }
  }

  .text-space {
    margin: 0 4px;
  }
`;

const schema = yup
  .object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().required(),
    password: yup.number().positive().integer().required(),
    image: yup.mixed().required(),
  })
  .required()

const SignUp = () => {

  const [image, setImage] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {mutate} = useUserSignUpQuery()

  const onSubmit = (data) =>{
    const formData = new FormData()
    formData.append('first_name', data?.first_name)
    formData.append('last_name', data?.last_name)
    formData.append('email', data?.email)
    formData.append('password', data?.password)
    formData.append('profile_pic', image)
    mutate(formData)
  }
  

  return (
    <SignUpScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img
                src={staticImages.bigzone5}
                className="object-fit-cover"
                alt=""
              />
            </div>
            <div className="form-grid-right">
              <FormTitle>
                <h3>Sign Up</h3>
                <p className="text-base">
                  Sign up for free to access to in any of our products
                </p>
              </FormTitle>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormElement>
                <label htmlFor="" className="forme-elem-label">
                    First name
                  </label>
                <Input
                    type="text"
                    placeholder=""
                    name=""
                    className="form-elem-control"
                    {...register("first_name")}
                  />
                 <span className="form-elem-error">
                  {errors.first_name?.message}
                  </span> <br />
                <label htmlFor="" className="forme-elem-label">
                    Last name
                  </label>
                <Input
                    type="text"
                    placeholder=""
                    name=""
                    className="form-elem-control"
                    {...register("last_name")}
                  />
                 <span className="form-elem-error">
                  {errors.last_name?.message}
                  </span> <br />

                  <label htmlFor="" className="forme-elem-label">
                    User name or email address
                  </label>
                  <Input
                    type="text"
                    placeholder=""
                    name=""
                    className="form-elem-control"
                    {...register("email")}
                  />
                 <span className="form-elem-error">
                  {errors.email?.message}
                  </span> <br />
               

                  <label htmlFor="" className="forme-elem-label">
                    Password
                  </label>

                  <Input
                    type="text"
                    placeholder=""
                    name=""
                    className="form-elem-control"
                    {...register("password")}
                  />
                  <span className="form-elem-error">
                  {errors.password?.message}
                  </span> <br />

                  <Input
                    type="file"
                    placeholder=""
                    name=""
                    className="form-elem-control"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
          
                </FormElement>
              

                <CheckboxGroup>
                  <li className="flex items-center">
                    <input type="checkbox" />
                    <span className="text-sm">
                      Agree to our
                      <Link to="/" className="text-underline">
                        Terms of use
                      </Link>
                      <span className="text-space">and</span>
                      <Link to="/" className="text-underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </li>
                  <li className="flex items-center">
                    <input type="checkbox" />
                    <span className="text-sm">
                      Subscribe to our monthly newsletter
                    </span>
                  </li>
                </CheckboxGroup>
                <BaseButtonBlack type="submit" className="form-submit-btn" >
                  Sign Up
                </BaseButtonBlack>
              </form>
              <p className="flex flex-wrap account-rel-text">
                Already have an account?
                <Link to="/sign_in" className="font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignUpScreenWrapper>
  );
};

export default SignUp;
