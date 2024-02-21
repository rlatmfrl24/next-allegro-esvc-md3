import classNames from "classnames/bind";
import styles from "../styles/typography.module.css";

export const MdTypography = ({
  children,
  variant,
  tag,
  size,
  prominent,
  className,
}: {
  children: string | React.ReactNode;
  tag?: "div" | "span" | "label";
  variant: "display" | "headline" | "title" | "label" | "body";
  size: "small" | "medium" | "large";
  prominent?: boolean;
  className?: string;
}) => {
  const cx = classNames.bind(styles);
  const Wrapper = tag || "div";
  return (
    <Wrapper
      className={cx(className, styles[variant], styles[size], {
        [styles.prominent]: prominent,
      })}
    >
      {children}
    </Wrapper>
  );
};
