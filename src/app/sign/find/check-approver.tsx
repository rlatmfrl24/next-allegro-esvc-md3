import { DividerComponent } from "@/app/components/divider";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { useSimpleTable } from "@/app/components/table/simple-table";
import { MdDialog, MdFilledButton, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { createColumnHelper } from "@tanstack/react-table";
import { useMemo, useState } from "react";

export const CheckApprover = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  type CheckApproverProps = {
    office: string;
    country: string;
    name: string;
    email: string;
    tel: string;
  };

  const tempData: CheckApproverProps[] = useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      office: faker.location.city() + " Office",
      country: faker.location.country(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      tel: faker.phone.number(),
    }));
  }, []);

  const columnHelper = createColumnHelper<CheckApproverProps>();

  const columnDefs = [
    columnHelper.accessor("office", {
      header: "Office",
    }),
    columnHelper.accessor("country", {
      header: "Country",
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("tel", {
      header: "Tel",
    }),
  ];

  const { renderTable } = useSimpleTable({
    data: tempData,
    columns: columnDefs,
  });

  return (
    <>
      <MdTextButton
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Check Approver
      </MdTextButton>
      <MdDialog
        open={isDialogOpen}
        closed={() => {
          setIsDialogOpen(false);
        }}
        className="min-w-fit"
      >
        <div slot="headline">Check Approver</div>
        <div slot="content" className="flex flex-col gap-4">
          <input className="h-0" />
          <div className="flex gap-2">
            <NAOutlinedListBox
              initialValue="All"
              options={tempData
                .map((item) => {
                  return item.country;
                })
                .filter((value, index, self) => self.indexOf(value) === index)}
              label="Country"
              className="flex-1"
            />
            <NAOutlinedListBox
              initialValue="All"
              options={tempData
                .map((item) => {
                  return item.office;
                })
                .filter((value, index, self) => self.indexOf(value) === index)}
              label="Contact Office"
              className="flex-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <MdTextButton>Reset</MdTextButton>
            <MdFilledButton>Search</MdFilledButton>
          </div>
          <DividerComponent />
          {renderTable()}
        </div>
        <div slot="actions"></div>
      </MdDialog>
    </>
  );
};
