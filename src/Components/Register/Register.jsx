import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  let [isLoading, setIsLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  async function register(values) {
    console.log(values);
    setIsLoading(true);
    setErrorMessage("");

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
        setIsLoading(false);
      });
    console.log(data);
    setIsLoading(false);
    navigate("/login");
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Min length must be greater than 3 char")
      .max(20, "Max length must be less than 20 char"),
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
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "Password and rePassword doesn't match"),
    phone: Yup.string()
      .required("Password is required")
      .matches(/^01[0125][0-9]{8}$/, "Invalid Number , Please Enter Valid Number"),
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,

    onSubmit: register,
  });
  return (
    <>
      <div className="w-75 mx-auto my-5">
        <h1 className="my-3">Register Now :</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name :</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="form-control mb-4"
            type="text"
            name="name"
            id="name"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger ">
              <p className="m-0">{formik.errors.name}</p>
            </div>
          ) : null}

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

          <label htmlFor="rePassword">Re Password :</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            className="form-control mb-4"
            type="password"
            name="rePassword"
            id="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger ">
              <p className="m-0">{formik.errors.rePassword}</p>
            </div>
          ) : null}

          <label htmlFor="phone">Phone :</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="form-control mb-4"
            type="tel"
            name="phone"
            id="phone"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger ">
              <p className="m-0">{formik.errors.phone}</p>
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
              Register
            </button>
          )}
        </form>
      </div>
    </>
  );
}
