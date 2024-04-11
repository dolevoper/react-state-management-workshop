import { PropsWithChildren, forwardRef } from "react";
import Icon from "./Icon";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = forwardRef<HTMLParagraphElement, PropsWithChildren>(
  function ErrorMessage({ children }, ref) {
    if (!children) {
      return;
    }

    return (
      <p className={styles.errorMessage} ref={ref}>
        <Icon name="error" className={styles.errorIcon} />
        {children}
      </p>
    );
  }
);

export default ErrorMessage;
