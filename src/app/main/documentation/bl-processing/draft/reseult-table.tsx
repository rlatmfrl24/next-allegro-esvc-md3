import { BasicTable } from "@/app/components/basic-table";
import NaToggleButton from "@/app/components/na-toggle-button";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import VesselInfoCell from "@/app/components/vessel-info-cell";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdTextButton,
} from "@/app/util/md3";
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
  const [rowSelection, setRowSelection] = useState({});
  const [printDialogOpen, setPrintDialogOpen] = useState(false);
  useEffect(() => {
    setTableData(tempData);
  }, [tempData]);

  const columnHelper = createColumnHelper<BLCheckResultTableProps>();

  const columns = [
    columnHelper.display({
      id: "checkbox",
      header: (info) => (
        <MdCheckbox
          className="ml-2"
          checked={info.table.getIsAllRowsSelected()}
          onClick={() => {
            info.table.toggleAllRowsSelected();
          }}
        />
      ),
      cell: (info) => (
        <MdCheckbox className="ml-2" checked={info.row.getIsSelected()} />
      ),
      size: 44,
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
    columnHelper.accessor("onBoardDate", {
      header: "On Board Date",
      cell: (info) => info.getValue().toFormat("yyyy-MM-dd HH:mm"),
    }),
    columnHelper.accessor("freight", {
      header: "Freight",
      cell: (info) => (
        <NaToggleButton
          label="Include"
          state={info.getValue() ? "checked" : "unchecked"}
        />
      ),
      size: 100,
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  return (
    <>
      <div className="flex justify-between items-center">
        <MdTextButton
          onClick={() => {
            setPrintDialogOpen(true);
          }}
        >
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
      <BasicTable
        table={table}
        onRowSelction={(row) => {
          row.toggleSelected();
        }}
      />
      <Portal selector="#main-container">
        <BLPrintDialog
          open={printDialogOpen}
          onOpenChange={setPrintDialogOpen}
        />
      </Portal>
    </>
  );
}

const BLPrintDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <MdDialog
      open={open}
      closed={() => {
        onOpenChange(false);
      }}
    >
      <div slot="headline">B/L Print</div>
      <div
        slot="content"
        className="bg-surfaceContainerHighest flex items-center justify-center w-96 h-96"
      >
        <MdTypography variant="headline" size="large">
          PDF Viewer
        </MdTypography>
      </div>
      <div slot="actions">
        <MdTextButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Close
        </MdTextButton>
        <MdFilledButton
          onClick={() => {
            onOpenChange(false);
          }}
        >
          Print
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
