import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field } from "formik";

export class ListForm extends React.Component {
  handleSubmit = (values, { setSubmitting }) => {
    const { name } = values;
    const token = localStorage.getItem("token");

    axios
      .put(
        `${process.env.REACT_APP_URL}/lists/${
          this.props.activeList._id
        }/update`,
        { name: name, complete: this.props.activeList.complete },
        { headers: { "x-auth": token } }
      )
      .then(res => {
        this.props.getList();
        this.props.toggleEditOff();
      })
      .catch(err => {
        console.log("error " + err);
      });
  };

  deleteItem() {
    const token = localStorage.getItem("token");

    axios
      .delete(
        `${process.env.REACT_APP_URL}/lists/${
          this.props.activeList._id
        }/delete`,
        { headers: { "x-auth": token } }
      )
      .then(res => {
        this.props.getList();
        this.props.toggleEditOff();
      })
      .catch(err => {
        console.log("error " + err);
      });
  }

  render() {
    return (
      <Formik
        initialValues={{ name: this.props.activeList.name }}
        onSubmit={this.handleSubmit}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .min(2, "Name must be at least two characters")
            .required("Name is required")
        })}
        render={({ errors, touched, isSubmitting }) => {
          return (
            <div>
              <Form>
                <div>
                  <Field type="text" name="name" placeholder="name" />
                  {touched.name && errors.name && <p>{errors.name}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Edit Item
                </button>
              </Form>
              <button onClick={() => this.deleteItem()}>
                Delete
              </button>
            </div>
          );
        }}
      />
    );
  }
}

export default ListForm;
