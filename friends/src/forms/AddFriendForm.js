import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

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
            <Field type="number" name="number" placeholder="Number" />
        </div>

        <button disabled={isSubmitting}>Submit</button>
    </Form>
  );
}

const FormikAddFriendForm = withFormik({
  mapPropsToValues({ name, email, age }) {
    return {
      email: email || "",
      name: name || "",
      age: age || 0
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
        .integer("Must be an integer")
        .positive("Must be a postive number")
        .required("This is required")
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    
      axios
        .post("https://yourdatabaseurlgoeshere.com", values)
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
  }
})(LoginForm);

export default FormikLoginForm;