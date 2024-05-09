import classNames from "classnames/bind";
import styles from "../styles/typography.module.css";
import { HtmlHTMLAttributes } from "react";

export const MdTypography = ({
  children,
  variant,
  tag,
  size,
  prominent,
  className,
  ...props
}: {
  children: string | React.ReactNode;
  tag?: "div" | "span" | "label" | "a" | "p";
  variant: "display" | "headline" | "title" | "label" | "body";
  size: "small" | "medium" | "large";
  prominent?: boolean;
  className?: string;
} & HtmlHTMLAttributes<HTMLElement>) => {
  const cx = classNames.bind(styles);
  const Wrapper = tag || "div";
  return (
    <Wrapper
      {...props}
      className={cx(className, styles[variant], styles[size], {
        [styles.prominent]: prominent,
      })}
    >
      {children}
    </Wrapper>
  );
};
