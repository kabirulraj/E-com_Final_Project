import styled from "styled-components";
import { FormGridWrapper, FormTitle } from "../styles/form_grid";
import { Container } from "../styles/styles";
import { staticImages } from "../utils/images";
import { FormElement, Input } from "../styles/form";
import { Link } from "react-router-dom";
import { BaseButtonBlack } from "../styles/button";
import { breakpoints, defaultTheme } from "../styles/themes/default";
import { useUserSignInQuery } from "../hooks/react_query/user-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const SignInScreenWrapper = styled.section`
  .form-separator {
    margin: 32px 0;
    column-gap: 18px;

    @media (max-width: ${breakpoints.lg}) {
      margin: 24px 0;
    }

    .separator-text {
      border-radius: 50%;
      min-width: 36px;
      height: 36px;
      background-color: ${defaultTheme.color_purple};
      position: relative;
    }

    .separator-line {
      width: 100%;
      height: 1px;
      background-color: ${defaultTheme.color_platinum};
    }
  }

  .form-elem-text {
    margin-top: -16px;
    display: block;
  }
`;

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required()

const SignIn = () => {

  const { mutate } = useUserSignInQuery()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => mutate(data)
  

  return (
    <SignInScreenWrapper>
      <FormGridWrapper>
        <Container>
          <div className="form-grid-content">
            <div className="form-grid-left">
              <img src={staticImages.form_img1} className="object-fit-cover" />
            </div>
            <div className="form-grid-right" style={{marginTop: "80px"}}>
              <FormTitle>
                <h3>Sign In</h3>
              </FormTitle>

              <form onSubmit={handleSubmit(onSubmit)}>
                <FormElement>
                  <label htmlFor="" className="form-elem-label">
                    User name or email address
                  </label>
                  <Input
                    type="text"
                    placeholder=""
                    name="email"
                    className="form-elem-control"
                    {...register('email')}
                  />
                  <span className="form-elem-error">
                  {errors.email?.message}
                  </span>
                  <br/>
                  <br/>

                  <label htmlFor="" className="forme-elem-label">
                    Password
                  </label>

                  <Input
                    type="password"
                    placeholder=""
                    name=""
                    className="form-elem-control"
                    {...register("password")}
                  />   
                  <span className="form-elem-error">
                  {errors.password?.message}
                  </span> 
                </FormElement>
                <Link
                  to="/reset"
                  className="form-elem-text text-end font-medium"
                >
                  Forgot your password?
                </Link>
                <BaseButtonBlack type="submit" className="form-submit-btn">
                  Sign In
                </BaseButtonBlack>
              </form>
              <p className="flex flex-wrap account-rel-text">
                Don&apos;t have a account?
                <Link to="/sign_up" className="font-medium">
                  Sign Up
                </Link>
                `
              </p>
            </div>
          </div>
        </Container>
      </FormGridWrapper>
    </SignInScreenWrapper>
  );
};

export default SignIn;
