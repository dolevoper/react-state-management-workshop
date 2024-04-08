import { forwardRef } from "react";
import styles from "./Button.module.css";

type ButtonProps = React.JSX.IntrinsicElements["button"] & {
  primary?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, primary, ...props },
  ref
) {
  return (
    <button
      {...props}
      className={`${styles.button}${className ? ` ${className}` : ""}`}
      data-primary={primary}
      ref={ref}
    />
  );
});

export default Button;
