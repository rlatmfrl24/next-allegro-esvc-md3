import { DateRangePicker } from "@/app/components/datepickers/date-range-picker";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdRadio,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Add, Delete, DeleteOutline, InfoOutlined } from "@mui/icons-material";
import { DateTime } from "luxon";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { start } from "repl";

type ContractProps = {
  contractNo: string;
  type: string;
  duration: {
    start: DateTime;
    end: DateTime;
  };
};

function createDummyContract(): ContractProps {
  return {
    contractNo: faker.string.alphanumeric(10).toUpperCase(),
    type: "General Rate",
    duration: {
      start: DateTime.fromJSDate(faker.date.past()),
      end: DateTime.fromJSDate(faker.date.future()),
    },
  };
}

const ContractItem = (props: {
  contract: ContractProps;
  onDelete?: () => void;
}) => {
  return (
    <div className="flex gap-2 items-center relative">
      <MdRadio name="contract-select" />
      <NAOutlinedTextField
        label="Contract No."
        value={props.contract.contractNo}
      />
      <NAOutlinedTextField label="Type" value={props.contract.type} />
      <DateRangePicker
        initial={{
          start: props.contract.duration.start,
          end: props.contract.duration.end,
        }}
        label="Duration"
      />
      <MdIconButton
        onClick={() => {
          props.onDelete?.();
        }}
      >
        <MdIcon>
          <DeleteOutline />
        </MdIcon>
      </MdIconButton>
    </div>
  );
};

export const ContractUpdateDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onRequestUpdate?: () => void;
}) => {
  const tempContracts = useMemo(() => {
    return Array.from({ length: 5 }, createDummyContract);
  }, []);
  const [contracts, setContracts] = useState<ContractProps[]>(tempContracts);

  function AddContract() {
    setContracts([
      ...contracts,
      {
        contractNo: "",
        type: "",
        duration: {
          start: DateTime.now(),
          end: DateTime.now(),
        },
      },
    ]);
  }

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
      }}
      className="min-w-fit"
    >
      <div slot="headline">Contract No. Update</div>
      <div slot="content" className="flex flex-col gap-4">
        <MdTypography variant="body" size="medium" className="mb-4">
          Update for adding Contract No. requires re-approval by Administrator.
          <br />
          Before the re-approval, your e-Service usage will be limited.
        </MdTypography>
        <div className="flex gap-1 text-outline">
          <InfoOutlined fontSize="small" />
          <MdTypography variant="body" size="medium">
            Contract number input is available up to 15 lines
          </MdTypography>
        </div>
        <div className="flex justify-end">
          <MdTextButton
            onClick={() => {
              AddContract();
            }}
          >
            <MdIcon slot="icon">
              <Add fontSize="small" />
            </MdIcon>
            Add Contract No.
          </MdTextButton>
        </div>
        <div className="flex flex-col-reverse gap-4">
          {contracts.map((contract, index) => (
            <ContractItem
              key={index}
              contract={contract}
              onDelete={() => {
                setContracts(contracts.filter((_, i) => i !== index));
              }}
            />
          ))}
        </div>
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
            props.onRequestUpdate && props.onRequestUpdate();
          }}
        >
          Request for Update
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
