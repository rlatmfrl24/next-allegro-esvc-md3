import { BasicTable } from "@/app/components/basic-table";
import { MdTypography } from "@/app/components/typography";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import { MdCheckbox, MdTextButton } from "@/app/util/md3";
import { VesselInfoType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import { Print } from "@mui/icons-material";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useEffect, useMemo, useState } from "react";

type BLCheckResultTableProps = {
  blNumber: string;
  origin: string;
  destination: string;
  vessel: VesselInfoType;
  onBoardDate: DateTime;
  freight: boolean;
};

export default function BLCheckResultTable() {
  const tempData = useMemo(() => {
    return Array.from(
      { length: 10 },
      (_, i) =>
        ({
          blNumber: faker.string.alphanumeric(10).toUpperCase(),
          origin: faker.location.city(),
          destination: faker.location.city(),
          vessel: createDummyVesselInformation(),
          onBoardDate: DateTime.fromJSDate(faker.date.recent()),
          freight: faker.helpers.maybe(() => true),
        } as BLCheckResultTableProps)
    );
  }, []);
  const [tableData, setTableData] = useState<BLCheckResultTableProps[]>([]);
  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columnHelper = createColumnHelper<BLCheckResultTableProps>();

  const columns = [
    columnHelper.display({
      id: "checkbox",
      header: () => <MdCheckbox />,
      cell: () => <MdCheckbox />,
      size: 48,
    }),
    columnHelper.accessor("blNumber", {
      header: "B/L No.",
    }),
    columnHelper.accessor("origin", {
      header: "Origin",
    }),
    columnHelper.accessor("destination", {
      header: "Destination",
    }),
    columnHelper.accessor("vessel", {
      header: "Vessel",
      cell: (info) => <VesselInfoCell {...info.getValue()} />,
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <MdTextButton>
          <div slot="icon">
            <Print fontSize="small" />
          </div>
          Print
        </MdTextButton>
        <div>
          <MdTypography variant="label" size="large" className="text-outline">
            Total: 10
          </MdTypography>
        </div>
      </div>
      <BasicTable table={table} />
    </>
  );
}
