import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";
import "./styles.css";

export class SignInForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const { email, password } = values;
    axios
      .post(`${process.env.REACT_APP_URL}/users/signIn`, { email, password })
      .then(res => {
        if (res.status === 200) {
          try {
            const token = res.data.token;
            if (token) {
              localStorage.setItem("token", token);
              setSubmitting(false);
              this.props.goToLists();
            }
          } catch (err) {
            console.log("error " + err);
          }
        }
      })
      .catch(err => {
        console.log("error " + err);
      });
  };

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape({
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
              <h2>Sign In</h2>
              <Form>
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
                  Sign In
                </Button>
              </Form>
            </div>
          );
        }}
      />
    );
  }
}

export default SignInForm;
