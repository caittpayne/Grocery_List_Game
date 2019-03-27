import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field } from "formik";

export class ListForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const { name } = values;
    const token = localStorage.getItem("token");

    axios
      .post(`${process.env.REACT_APP_URL}/lists/create`, { name }, {headers: {"x-auth": token}})
      .then(res => {
        return;
      })
      .catch(err => {
        console.log("error " + err);
      });
  };

  render() {
    return (
      <Formik
        initialValues={{ name: "" }}
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(2, "Name must be at least two characters")
            .required("Name is required")
        })}
        render={({ errors, touched, isSubmitting }) => {
          return (
            <Form>
              <div>
                <Field type="text" name="name" placeholder="name" />
                {touched.name && errors.name && <p>{errors.name}</p>}
              </div>
              <button type="submit" disabled={isSubmitting}>
                Create List
              </button>
            </Form>
          );
        }}
      />
    );
  }
}

export default ListForm;
