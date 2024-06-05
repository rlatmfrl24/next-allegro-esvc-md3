import { useEffect, useState } from "react";
import NAOutlinedListBox from "./na-outline-listbox";
import {
  MdDialog,
  MdFilledButton,
  MdIcon,
  MdIconButton,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRadio,
  MdTextButton,
} from "../util/md3";
import { MdTypography } from "./typography";
import { Add, DeleteOutline } from "@mui/icons-material";

export const ContractNumberSelector = (props: {
  contracts: string[];
  label?: string;
  onContractsUpdate?: (contracts: string[]) => void;
}) => {
  // CONTRACT count max 15
  const [contracts, setContracts] = useState(props.contracts.slice(0, 15));
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [isEditingDialogOpen, setIsEditingDialogOpen] = useState(false);

  return (
    <div className="flex gap-4 items-center">
      <NAOutlinedListBox
        label={props.label ?? "By Contract"}
        options={contracts}
        initialValue={selectedContract}
        onSelection={(contract) => {
          setSelectedContract(contract);
        }}
      />
      <MdOutlinedButton
        onClick={() => {
          setIsEditingDialogOpen(true);
        }}
      >
        Update Contract No.
      </MdOutlinedButton>
      <MdDialog
        open={isEditingDialogOpen}
        closed={() => {
          setIsEditingDialogOpen(false);
        }}
      >
        <div slot="headline">Update Contract No.</div>
        <div slot="content">
          <MdTypography
            variant="body"
            size="medium"
            className="text-onSurfaceVariant"
          >
            Contract number input is available up to 15 lines
          </MdTypography>
          <MdTextButton
            className="my-4"
            disabled={contracts.length >= 15}
            onClick={() => {
              setContracts((prev) => [...prev, ""]);
            }}
          >
            <MdIcon slot="icon">
              <Add fontSize="small" />
            </MdIcon>
            Add
          </MdTextButton>
          <div className="flex flex-col gap-4 w-full">
            {contracts
              // sort contracts by empty string is up
              .sort((a, b) => (a === "" ? -1 : b === "" ? 1 : 0))
              .map((contract, index) => (
                <div
                  key={contract + "_" + index}
                  className="flex gap-4 items-center"
                >
                  <MdRadio
                    name="contract"
                    checked={selectedContract === contract}
                    onClick={() => {
                      setSelectedContract(contract);
                    }}
                  />
                  <MdOutlinedTextField
                    label="Contract No."
                    value={contract}
                    className="flex-1"
                    onFocus={() => {
                      setSelectedContract(contract);
                    }}
                    onBlur={(e) => {
                      setContracts((prev) => {
                        return prev.map((c, i) => {
                          if (i === index) {
                            return e.target.value;
                          }
                          return c;
                        });
                      });
                      setSelectedContract(e.target.value);
                    }}
                  />
                  <MdIconButton
                    onClick={() => {
                      if (selectedContract === contract) {
                        setSelectedContract("");
                      }

                      setContracts((prev) => {
                        return prev.filter((_, i) => i !== index);
                      });
                    }}
                  >
                    <DeleteOutline fontSize="small" />
                  </MdIconButton>
                </div>
              ))}
          </div>
        </div>
        <div slot="actions">
          <MdOutlinedButton
            onClick={() => {
              setContracts(props.contracts.slice(0, 15));
              setIsEditingDialogOpen(false);
            }}
          >
            Cancel
          </MdOutlinedButton>
          <MdFilledButton
            onClick={() => {
              props.onContractsUpdate?.(contracts.filter((c) => c !== ""));
              setContracts(contracts.filter((c) => c !== ""));
              setIsEditingDialogOpen(false);
            }}
          >
            Save
          </MdFilledButton>
        </div>
      </MdDialog>
    </div>
  );
};
