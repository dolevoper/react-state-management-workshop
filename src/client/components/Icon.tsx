import styles from "./Icon.module.css";

type IconProps = {
  name: "error" | "chevronDown" | "chevronLeft" | "chevronRight";
  className?: string;
};

export default function Icon({ name, className }: IconProps) {
  return (
    <i
      className={`${styles.icon} ${styles[name]}${
        className ? ` ${className}` : ""
      }`}
    />
  );
}
