import { forwardRef } from "react";
import styles from "./Input.module.css";

type InputProps = React.JSX.IntrinsicElements["input"] & {
  id: string;
  label: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { id, label, className, ...props },
  ref
) {
  return (
    <div
      style={{
        "--stack-gap": "5px",
      }}
      className={`stack${className ? ` ${className}` : ""}`}
    >
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input {...props} className={styles.input} id={id} ref={ref} />
    </div>
  );
});

export default Input;
