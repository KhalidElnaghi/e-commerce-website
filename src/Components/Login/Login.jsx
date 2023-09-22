import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Login() {
  let [isLoading, setIsLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  let { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

  async function login(values) {
    console.log(values);
    setIsLoading(true);
    setErrorMessage("");

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      });
    console.log(data);
    localStorage.setItem("token", data.token);
    setIsLoading(false);
    setIsUserLoggedIn(true);
    navigate("/home");
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Email is invaild, please enter vaild Email"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/,
        "Password must have  upper & lower case letter, special character, number and min length is 8"
      ),
  });

  // function validate(values) {
  //   let errors = {};
  //   if (values.name === "") {
  //     errors.name = "Name is required";
  //   } else if (values.name.length < 3) {
  //     errors.name = "Min length must be greater than 3 char";
  //   } else if (values.name.length > 20) {
  //     errors.name = "Max length must be less than 20 char";
  //   }

  //   if (values.email === "") {
  //     errors.email = "Email is required";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = "Email is invaild, please enter vaild Email";
  //   }

  //   if (values.password === "") {
  //     errors.password = "Password is required";
  //   } else if (
  //     !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/.test(values.password)
  //   ) {
  //     errors.password =
  //       "Password must have  upper & lower case letter, special character, number and min length is 8";
  //   }

  //   if (values.rePassword === "") {
  //     errors.rePassword = "Password is required";
  //   } else if (values.rePassword !== values.password) {
  //     errors.rePassword = "Password and rePassword doesn't match";
  //   }

  //   if (values.phone === "") {
  //     errors.phone = "phone is required";
  //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = "invaild phone number, please enter vaild phone number";
  //   }

  //   return errors;
  // }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,

    onSubmit: login,
  });
  return (
    <>
      <div className="w-75 mx-auto my-5">
        <h1 className="my-3">Login Now :</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="form-control mb-4"
            type="email"
            name="email"
            id="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger ">
              <p className="m-0">{formik.errors.email}</p>
            </div>
          ) : null}

          <label htmlFor="password">Password :</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="form-control mb-4"
            type="password"
            name="password"
            id="password"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger ">
              <p className="m-0">{formik.errors.password}</p>
            </div>
          ) : null}

          {errorMessage ? (
            <div className="alert  alert-danger ">{errorMessage}</div>
          ) : null}

          {isLoading ? (
            <button disabled className="btn bg-main text-white d-block ms-auto">
              <i className="fas fa-spinner fa-spin"></i>
            </button>
          ) : (
            <button
              disabled={isLoading}
              type="submit"
              className="btn bg-main text-white ms-auto d-block"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </>
  );
}
