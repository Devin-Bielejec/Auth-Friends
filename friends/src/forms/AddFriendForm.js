import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { axiosWithAuth } from "../axiosAuth";

function AddFriendForm({ values, errors, touched, isSubmitting }) {
  return (
    <Form>
        <div>
            {touched.name & errors.name && <p>{errors.name}</p>}
            <Field type="text" name="name" placeholder="Name"/>    
        </div>

        <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field type="email" name="email" placeholder="Email" />
        </div>

        <div>
            {touched.age && errors.age && <p>{errors.age}</p>}
            <Field type="number" name="age" placeholder="Age" />
        </div>

        <button type="submit" disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

const FormikAddFriendForm = withFormik({
  mapPropsToValues({ name, email, age }) {
    return {
      email: email || "",
      name: name || "",
      age: age || 0,
      id: Date.now()
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Email not valid")
      .required("Email is required"),
    name: Yup.string()
      .min(2, "Name must be 2 characters or longer")
      .required("Password is required"),
    age: Yup.number()
        .required("This is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      console.log("The Values are", values);
      axiosWithAuth()
        .post("https://localhost:5000/api/friends", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });
    }
})(AddFriendForm);

export default FormikAddFriendForm;