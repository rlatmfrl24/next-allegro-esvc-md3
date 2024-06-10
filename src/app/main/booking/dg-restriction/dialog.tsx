import { DividerComponent } from "@/app/components/divider";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { useSimpleTable } from "@/app/components/table/simple-table";
import {
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

type UNNumberDetailProps = {
  class: string;
  unNumber: string;
  description: string;
};

export const UNNumberSearchDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onApply?: (data: UNNumberDetailProps) => void;
}) => {
  const tempDatas = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      return {
        class: faker.helpers.arrayElement([
          "1.1",
          "1.2",
          "1.3",
          "1.4",
          "1.5",
          "1.6",
          "2.1",
          "2.2",
          "2.3",
          "3",
          "4.1",
          "4.2",
          "4.3",
          "5.1",
          "5.2",
          "6.1",
          "6.2",
          "7",
        ]),
        unNumber: faker.string.numeric(4),
        description: faker.lorem.sentence(),
      } as UNNumberDetailProps;
    });
  }, []);
  const [query, setQuery] = useState("");
  const [tableData, setTableData] = useState<UNNumberDetailProps[]>(tempDatas);
  const [selectedData, setSelectedData] = useState<UNNumberDetailProps>();
  const columnHelper = createColumnHelper<UNNumberDetailProps>();

  const columnDefs = [
    columnHelper.display({
      id: "radio",
      cell: (info) => {
        return (
          <div className="flex justify-center">
            <MdRadio checked={info.row.getIsSelected()} />
          </div>
        );
      },
      size: 60,
    }),
    columnHelper.accessor("class", {
      id: "class",
      header: "Class",
      size: 120,
    }),
    columnHelper.accessor("unNumber", {
      id: "unNumber",
      header: "UN No. / Seq",
      size: 120,
    }),
    columnHelper.accessor("description", {
      id: "description",
      header: "Description",
      size: 400,
    }),
  ];

  const { renderTable, clearSelection } = useSimpleTable({
    data: tableData,
    columns: columnDefs,
    getSelectionRows: (rows) => {
      console.log(rows);
      if (rows.length === 0) {
        setSelectedData(undefined);
        return;
      }
      setSelectedData(rows[0]);
    },
  });

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
        setQuery("");
        setTableData(tempDatas);
        clearSelection();
      }}
      className="min-w-fit"
    >
      <div slot="headline">UN Number Detail Search</div>
      <div slot="content" className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <MdOutlinedTextField className="w-24" label="UN No." />
          <MdOutlinedTextField className="w-24" label="Seq" />
          <MdOutlinedTextField className="flex-1" label="Dsescription" />
          <MdOutlinedButton>Search</MdOutlinedButton>
        </div>
        <DividerComponent />
        {renderTable()}
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange(false);
            if (props.onApply) {
              props.onApply(selectedData!);
            }
          }}
        >
          Apply
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
