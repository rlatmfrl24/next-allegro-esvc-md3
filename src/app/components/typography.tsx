import classNames from "classnames/bind";
import styles from "../styles/typography.module.css";

export const MdTypography = ({
  children,
  variant,
  size,
  prominent,
  className,
}: {
  children: string | React.ReactNode;
  variant: "display" | "headline" | "title" | "label" | "body";
  size: "small" | "medium" | "large";
  prominent?: boolean;
  className?: string;
}) => {
  const cx = classNames.bind(styles);

  return (
    <div
      className={cx(className, styles[variant], styles[size], {
        [styles.prominent]: prominent,
      })}
    >
      {children}
    </div>
  );
};
