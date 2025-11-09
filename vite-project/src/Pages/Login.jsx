
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

import { ErrorMessage, Field, Formik } from "formik"
import { Form } from "react-router-dom"

const Login = () => {
  // const initialValues = { email: "", password: "" };

  // const validationSchema = Yup.object({
  //   email: Yup.string().email("بريد غير صالح").required("الإيميل مطلوب"),
  //   password: Yup.string().min(6, "كلمة السر لا تقل عن 6 حروف").required("كلمة السر مطلوبة"),
  // });

  // const onSubmit = async (values, { setSubmitting, setStatus }) => {
  //   try {
  //     await signInWithEmailAndPassword(auth, values.email, values.password);
  //     setStatus({ success: true, message: "تم تسجيل الدخول بنجاح ✅" });
  //   } catch (error) {
  //     setStatus({ success: false, message: "خطأ في تسجيل الدخول ❌" });
  //   }
  //   setSubmitting(false);
  return (
    <div className="flex justify-center py-32 px-10  min-h-screen bg-gray-50">
      
      <div className="section2 bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Wellcome Back
        </h1>
        <p className="text-center  font-semibold text-gray-600">
          Enter your credentials to access your orders management portal.
        </p>

        <Formik
          // initialValues={initialValues}
          // validationSchema={validationSchema}
          // onSubmit={onSubmit}
        >
          
            <Form className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200 outline-none"
                  placeholder="example@email.com"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-gray-600"> Password</label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border p-2 rounded-md focus:ring focus:ring-blue-200 outline-none"
                  placeholder="•••••••"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              <button
                type="submit"
                
                className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                <h3>Login</h3>
              </button>
              <p className="text-gray-600 text-center">Don't have an account?<a href="#" className="text-blue-700">Create Account</a></p>
              
            </Form>
          
        </Formik>
      </div>
    </div>
  )
}

export default Login