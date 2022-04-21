import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

import InputControl from '@/components/controls/InputControl';
import IUser from '@/interface/user';
import dbConnect, { Jsonify } from '@/middleware/database';
import UserModel from '@/models/User';

export async function getServerSideProps() {
  dbConnect();
  const users: IUser | any = await UserModel.find();

  return {
    props: {
      users: Jsonify(users),
    },
  };
}

export default function User({ users }: { users: IUser[] }) {
  const storeUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),
    phone: Yup.string()
      .required('Phone is required')
      .min(10, 'Enter a valid phone number')
      .max(10, 'Enter a valid phone number'),
    gender: Yup.string().required('Gender is required'),
  });

  const handleAddUser = (values: any) => {
    axios
      .post('/api/user', values)
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>User</h1>
      <div className="mt-5">
        {users.map((user: IUser, index) => (
          <div key={index} className="mb-5">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
      </div>
      <div className="p-4">
        <Formik
          // enableReinitialize
          initialValues={{
            name: 'sdfa',
            email: 'sdf@sdfsd.com',
            phone: '9929607416',
            gender: 'Male',
          }}
          onSubmit={handleAddUser}
          validationSchema={storeUserSchema}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <div>
              <div className="mb-3">
                <InputControl
                  type="text"
                  className="border-2 border-slate-300 p-2"
                  placeholder="Enter Name"
                  value={values.name}
                  onChange={handleChange('name')}
                  onBlur={handleBlur('name')}
                  errors={errors.name}
                  touched={touched.name}
                />
              </div>
              <div className="mb-3">
                <InputControl
                  type="email"
                  className="border-2 border-slate-300 p-2"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  errors={errors.email}
                  touched={touched.email}
                />
              </div>
              <div className="mb-3">
                <InputControl
                  type="tel"
                  className="border-2 border-slate-300 p-2"
                  placeholder="Enter Phone"
                  value={values.phone}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  errors={errors.phone}
                  touched={touched.phone}
                />
              </div>
              <div className="mb-3">
                <select
                  className="border-2 border-slate-300 p-2"
                  value={values.gender}
                  onChange={handleChange('gender')}
                  onBlur={handleBlur('gender')}
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Others</option>
                </select>

                {/* {console.log(errors)} */}
              </div>
              <div className="mb-3">
                <button type="submit" onClick={() => handleSubmit()}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
