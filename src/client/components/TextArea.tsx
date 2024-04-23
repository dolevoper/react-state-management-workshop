import { forwardRef } from "react";
import styles from "./TextArea.module.css";

type InputProps = React.JSX.IntrinsicElements["textarea"] & {
  id: string;
  label: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, InputProps>(function TextArea(
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
      <textarea {...props} className={styles.input} id={id} ref={ref} />
    </div>
  );
});

export default TextArea;
