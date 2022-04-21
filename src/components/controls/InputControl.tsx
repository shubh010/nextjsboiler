import React, { InputHTMLAttributes } from 'react';

interface IInputControlProps extends InputHTMLAttributes<HTMLInputElement> {
  errors: string | undefined;
  touched: any;
}

export default function InputControl(props: IInputControlProps) {
  const { errors, touched } = props;

  return (
    <div>
      <input
        {...props}
        // value={values.name}
        // onChange={handleChange('name')}
        // onBlur={handleBlur('name')}
      />
      {errors && touched ? (
        <div className="text-sm text-red-500">{errors}</div>
      ) : null}
    </div>
  );
}
