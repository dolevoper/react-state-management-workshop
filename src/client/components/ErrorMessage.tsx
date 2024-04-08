import { PropsWithChildren } from "react";
import styles from "./ErrorMessage.module.css";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return <p className={styles.errorMessage}>{children}</p>;
}
