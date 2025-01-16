import { MdTypography } from "@/app/components/typography";
import tableStyles from "@/app/styles/table.module.css";
import { BookingSplitType } from "@/app/util/typeDef/booking";

export const SplitValidationTable = ({
  originBooking,
}: {
  originBooking: BookingSplitType;
}) => {
  const HeaderComponent = ({ children }: { children: React.ReactNode }) => {
    return (
      <th className="mx-2 p-0 group">
        <div className="flex items-center h-8 border-r border-r-outlineVariant group-last:border-r-0">
          <MdTypography variant="body" size="medium" prominent className="mx-2">
            {children}
          </MdTypography>
        </div>
      </th>
    );
  };

  return (
    <div className="w-full flex relative mt-2">
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <HeaderComponent>Original Weight (KG)</HeaderComponent>
            <HeaderComponent>Split Weight (KG)</HeaderComponent>
            <HeaderComponent>Type/Size</HeaderComponent>
            <HeaderComponent>Slot No.</HeaderComponent>
            <HeaderComponent>Original Qty</HeaderComponent>
            <HeaderComponent>Split Qty</HeaderComponent>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              <MdTypography
                variant="body"
                size="medium"
                className="text-onSurface text-right px-2 py-3"
              >
                {originBooking.containers.reduce(
                  (acc, container) => acc + container.weight,
                  0
                )}
              </MdTypography>
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              <MdTypography
                variant="body"
                size="medium"
                className="text-onSurface text-right px-2 py-3"
              >
                1
              </MdTypography>
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0"
                  >
                    {container.typeSize}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant text-right last:border-b-0"
                  >
                    {container.slot}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant text-right last:border-b-0"
                  >
                    {container.quantity}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0">
              {originBooking.containers.map((container) => {
                return (
                  <div
                    key={container.typeSize}
                    className="p-2 border-b border-b-outlineVariant text-right last:border-b-0"
                  >
                    {container.quantity}
                  </div>
                );
              })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
