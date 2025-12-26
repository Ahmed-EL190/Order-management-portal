import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
const Login = () => {
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email") || "";
    const savedPassword = localStorage.getItem("password") || "";
    setInitialValues({ email: savedEmail, password: savedPassword });
  }, []);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  });


  const handleSubmit = (values) => {
    localStorage.setItem("email", values.email);
    localStorage.setItem("password", values.password);
    navigate("/"); 
  };

  return (
    <div className="flex justify-center py-32 px-10 min-h-screen bg-gray-50">
      <div className="section2 bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Welcome Back
        </h1>
        <p className="text-center font-semibold text-gray-600 mb-6">
          Enter your credentials to access your orders management portal.
        </p>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600">Email</label>
                <Field
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200 outline-none"
                  placeholder="example@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-600">Password</label>
                <Field
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200 outline-none"
                  placeholder="•••••••"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>

              <p
                className="text-gray-600 text-center mt-4"
                onClick={() => navigate("/register")}
              >
                Don't have an account?{" "}
                <span className="text-blue-700 cursor-pointer">Create Account</span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
