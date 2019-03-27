import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";

export class RegisterForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const { name, email, password } = values;
    axios
      .post(`${process.env.REACT_APP_URL}/users/create`, {
        name,
        email,
        password
      })
      .then(() => {
        setSubmitting(false);
        this.props.setRedirect();
      })
      .catch(err => {
        console.log("error" + err);
      });
  };

  render() {
    return (
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(2, "Name must be two or more characters")
            .required("Name is required"),
          email: Yup.string()
            .email("Not a valid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6)
            .required("Password is required")
        })}
        render={({ errors, touched, isSubmitting }) => {
          return (
            <div>
              <h2>Register</h2>
              <Form>
                <div className="form-field">
                  <Field type="text" name="name" placeholder="name" />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </div>
                <div className="form-field">
                  <Field type="text" name="email" placeholder="email" />
                  {touched.email && errors.email && <p>{errors.email}</p>}
                </div>
                <div className="form-field">
                  <Field type="text" name="password" placeholder="password" />
                  {touched.password && errors.password && (
                    <p>{errors.password}</p>
                  )}
                </div>
                <Button
                  color="primary"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          );
        }}
      />
    );
  }
}

export default RegisterForm;
