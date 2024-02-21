import { MdElevation, MdRippleEffect } from "@/app/util/md3";
import classNames from "classnames/bind";
import styles from "@/app/styles/variable-buttons.module.css";
import { MdTypography } from "./typography";

export const VariableElavatedButton = ({
  children,
  size,
  icon,
  className,
  ...props
}: {
  children: React.ReactNode;
  size: "x-small" | "small" | "medium" | "large";
  icon?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) => {
  const cx = classNames.bind(styles);
  const labelSize: any = {
    "x-small": "small",
    small: "small",
    medium: "medium",
    large: "large",
  }[size];

  return (
    <div
      {...props}
      className={cx(className, styles["elevated-button"], styles[size])}
    >
      <MdRippleEffect />
      <MdElevation />
      {icon && <div className="flex w-4 h-4 text-primary">{icon}</div>}
      <MdTypography
        variant="label"
        tag="div"
        size={labelSize}
        className="cursor-pointer text-primary h-fit mr-1"
      >
        {children}
      </MdTypography>
    </div>
  );
};
