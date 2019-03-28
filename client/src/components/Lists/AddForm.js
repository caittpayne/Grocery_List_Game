import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "reactstrap";
import { Formik, Form, Field } from "formik";

export class ListForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const { name } = values;
    const token = localStorage.getItem("token");

    axios
      .post(
        `${process.env.REACT_APP_URL}/lists/create`,
        { name: name, complete: false },
        { headers: { "x-auth": token } }
      )
      .then(res => {
        this.props.toggleAdd();
        this.props.getList();
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
            <div className='edit-form'>
              <Form>
                <div>
                  <Field type="text" className='form-field' name="name" placeholder="name" />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </div>
                <Button
                  color="primary"
                  className='form-button'
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Add
                </Button>
              </Form>
            </div>
          );
        }}
      />
    );
  }
}

export default ListForm;
