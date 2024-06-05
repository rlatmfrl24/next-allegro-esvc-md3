import { useState } from "react";
import NAOutlinedListBox from "./na-outline-listbox";
import { MdOutlinedButton } from "../util/md3";

export const UpdateContractNumber = (props: {
  contracts: string[];
  onContractsUpdate?: (contracts: string[]) => void;
}) => {
  const [contracts, setContracts] = useState(props.contracts);
  ("");
  const [selectedContract, setSelectedContract] = useState<string>("");

  return (
    <div className="flex gap-4">
      <NAOutlinedListBox
        options={contracts}
        initialValue={selectedContract}
        onSelection={(contract) => {
          setSelectedContract(contract);
        }}
      />
      <MdOutlinedButton>Update Contract No.</MdOutlinedButton>
    </div>
  );
};
