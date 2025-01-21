import { MdTypography } from "@/app/components/typography";
import { BookingSplitState } from "@/app/store/booking.store";
import { BookingSplitType, SplitTableType } from "@/app/util/typeDef/booking";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import tableStyles from "@/app/styles/table.module.css";
import StatusWarningIcon from "@/../public/icon_status_warning.svg";
import StatusGoodIcon from "@/../public/icon_status_good.svg";

export const SplitValidationTable = ({
  originBooking,
}: {
  originBooking: BookingSplitType;
}) => {
  const [tableData, setTableData] = useRecoilState(BookingSplitState);

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
  const OriginalContainerList = useMemo(() => {
    const containerSet = [] as SplitTableType["containers"];
    let slotCursor = 1;

    originBooking.containers.map((container) => {
      Array.from({ length: container.quantity }).map(() => {
        containerSet.push({
          typeSize: container.typeSize,
          slot: slotCursor,
          quantity: 1,
        });
        slotCursor++;
      });
    });

    return containerSet;
  }, [originBooking]);

  const totalSplitWeight = useMemo(() => {
    return tableData.reduce((acc, row) => {
      return acc + (row.weight || 0);
    }, 0);
  }, [tableData]);

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
                {originBooking.weight
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </MdTypography>
            </td>
            <td
              className={`mx-2 p-0 border-r border-r-outlineVariant ${
                originBooking.weight !== totalSplitWeight
                  ? "bg-[#BA1A1A14]"
                  : "bg-[#19658414]"
              }`}
            >
              <MdTypography
                variant="body"
                size="medium"
                className={`text-onSurface justify-end gap-2 px-2 py-3 h-full flex`}
              >
                {totalSplitWeight
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {originBooking.weight !== totalSplitWeight ? (
                  <StatusWarningIcon />
                ) : (
                  <StatusGoodIcon />
                )}
              </MdTypography>
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {OriginalContainerList.map((container) => {
                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0"
                  >
                    {container.typeSize}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {OriginalContainerList.map((container) => {
                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0 text-right"
                  >
                    {container.slot}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0 border-r border-r-outlineVariant">
              {OriginalContainerList.map((container) => {
                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className="p-2 border-b border-b-outlineVariant last:border-b-0 text-right"
                  >
                    {container.quantity}
                  </div>
                );
              })}
            </td>
            <td className="mx-2 p-0">
              {OriginalContainerList.map((container) => {
                const currentSlotQuantity = tableData.reduce((acc, row) => {
                  return (
                    acc +
                    row.containers.reduce((acc, splitContainer) => {
                      return (
                        acc +
                        (splitContainer.typeSize === container.typeSize &&
                        splitContainer.slot === container.slot
                          ? splitContainer.quantity || 0
                          : 0)
                      );
                    }, 0)
                  );
                }, 0);

                return (
                  <div
                    key={container.typeSize + "_" + container.slot}
                    className={`flex gap-2 justify-end p-2 border-b border-b-outlineVariant last:border-b-0 ${
                      1 === currentSlotQuantity
                        ? "bg-[#19658414]"
                        : "bg-[#BA1A1A14]"
                    }`}
                  >
                    {currentSlotQuantity}
                    {currentSlotQuantity === 1 ? (
                      <StatusGoodIcon />
                    ) : (
                      <StatusWarningIcon />
                    )}
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
