import classNames from "classnames";

export const DividerComponent = ({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "vertical" | "horizontal";
}) => {
  if (orientation === "vertical") {
    return (
      <div
        className={classNames(
          "w-px border-r border-r-outlineVariant",
          className
        )}
      ></div>
    );
  }
  return (
    <div
      className={classNames(
        "w-full h-px border-b border-b-outlineVariant",
        className
      )}
    ></div>
  );
};
