import React, {
  useState,
  useEffect,
  Attributes,
  ReactElement,
  cloneElement,
} from "react";
import classNames from "classnames/bind";
import styles from "./components.module.css";
import { MdTypography } from "./typography";
import { MdIcon, MdRippleEffect } from "../util/md3";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export function MdSegmentedButtons({
  children,
  value,
  onChange,
}: {
  children: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
} & Attributes) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <div className={styles["segmented-buttons"]}>
      {React.Children.map(children, (child) => {
        return cloneElement(child as ReactElement, {
          selected: selected === (child as ReactElement).props.id,
          disabled: (child as ReactElement).props.disabled,
          onClick: () => {
            if ((child as ReactElement).props.disabled) {
              return;
            }
            setSelected((child as ReactElement).props.id);
            onChange((child as ReactElement).props.id);
          },
        });
      })}
    </div>
  );
}

export const MdSegmentedButton = ({
  children,
  id,
  onClick,
  selected,
  disabled,
}: {
  children: string;
  id: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
}) => {
  const cx = classNames.bind(styles);

  return (
    <button
      id={id}
      onClick={onClick}
      className={cx({
        "segmented-button": true,
        selected: selected,
        disabled: disabled,
      })}
    >
      <>
        {!disabled && <MdRippleEffect />}
        <MdTypography
          variant="label"
          size="large"
          className="flex items-center justify-center"
        >
          {selected ? <CheckOutlinedIcon className="text-lg mr-2" /> : null}
          {children}
        </MdTypography>
      </>
    </button>
  );
};
