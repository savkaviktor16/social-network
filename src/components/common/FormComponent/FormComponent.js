import React from 'react';
import styles from './FormComponent.module.css';

export const FormComponent = ({input, meta, label, ...props}) => {
  const hasError = meta.touched && meta.error;

  return <div
      className={styles.formControl + " " + (hasError ? styles.error : "")}>
    <div>
      <label>{label}</label>
      <props.el {...input} {...props} />
    </div>
    {hasError && <span>{meta.error}</span>}
  </div>
}

export const Input = ({input, meta, ...props}) => {
  return React.createElement(FormComponent, {
    input,
    meta, ...props,
    el: 'input'
  });
}

export const Textarea = ({input, meta, ...props}) => {
  return React.createElement(FormComponent, {
    input,
    meta, ...props,
    el: 'textarea'
  });
}
