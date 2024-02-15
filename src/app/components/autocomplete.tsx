import {
  MdIcon,
  MdIconButton,
  MdMenu,
  MdMenuItem,
  MdOutlinedTextField as MdOutlinedTextFieldBase,
} from "../util/md3";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { MdTypography } from "./typography";
import { useEffect, useRef, useState } from "react";
import { Corner } from "@material/web/menu/menu";

type MdOutlinedTextFieldProps = React.ComponentProps<
  typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedAutoComplete = ({
  id,
  itemList,
  className,
  ...props
}: {
  id: string;
  itemList: string[];
  className?: string;
} & MdOutlinedTextFieldProps) => {
  const [width, setWidth] = useState<number | undefined>(0);
  const [value, setValue] = useState(props.value || "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [recommandedItems, setRecommandedItems] = useState<string[]>([]);

  console.log(itemList);

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, [setWidth, ref.current?.offsetWidth]);

  return (
    <div ref={ref} className={className + " relative flex"}>
      <MdOutlinedTextFieldBase
        {...props}
        id={id + "-anchor"}
        aria-controls={id + "-menu"}
        aria-autocomplete="list"
        aria-expanded={isMenuOpen}
        aria-activedescendant={id + "-menu-item-0"}
        className="flex-1"
        required={false}
        onInput={(e) => {
          const targetValue = (e.target as HTMLInputElement).value;
          if (
            targetValue.length > 2 &&
            itemList.filter((item) =>
              item.toLowerCase().includes(targetValue.toLowerCase())
            ).length > 0
          ) {
            setRecommandedItems(
              itemList.filter((item) =>
                item.toLowerCase().includes(targetValue.toLowerCase())
              )
            );
            setIsMenuOpen(true);
          } else {
            setRecommandedItems([]);
            setIsMenuOpen(false);
          }

          setValue(targetValue);
        }}
        value={value}
      >
        {value !== "" && props.label && (
          <MdIconButton
            slot="trailing-icon"
            onClick={() => {
              setValue("");
            }}
          >
            <MdIcon>
              <CancelIcon />
            </MdIcon>
          </MdIconButton>
        )}
      </MdOutlinedTextFieldBase>
      <MdMenu
        defaultFocus={undefined}
        stayOpenOnFocusout
        skipRestoreFocus
        id={id + "-menu"}
        anchor={id + "-anchor"}
        role="listbox"
        open={isMenuOpen}
        close={() => {
          setIsMenuOpen(false);
        }}
        className="contents max-h-[600px] overflow-y-auto w-full"
      >
        {recommandedItems.map((item, index) => (
          <MdMenuItem
            key={index}
            style={{
              width: width ? width + "px" : "auto",
            }}
            id={id + "-menu-item-" + index}
            onClick={() => {
              setValue(item);
              setIsMenuOpen(false);
            }}
          >
            <div slot="headline">{item}</div>
          </MdMenuItem>
        ))}
      </MdMenu>
      {props.required && (
        <MdTypography
          variant="label"
          size="large"
          className="text-error absolute top-0.5 left-1.5"
        >
          *
        </MdTypography>
      )}
    </div>
  );
};
