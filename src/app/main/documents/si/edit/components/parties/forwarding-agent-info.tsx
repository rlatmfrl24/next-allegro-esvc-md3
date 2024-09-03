import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import NAOutlinedSelect from "@/app/components/na-outlined-select";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { SIEditPartiesState } from "@/app/store/si.store";
import { MdFilledButton, MdFilledTonalButton } from "@/app/util/md3";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

export const ForwardingAgentInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);
  const agentOptions = useMemo(() => {
    return [
      "Carrier Filed NVOCC",
      "Self Filing NVOCC",
      "Self Filing Freight Forwarder",
      "Self Filing Customs Broker",
      "Self Filing Other",
      "Non Self Filing NVOCC",
      "Non Self Filing Freight Forwarder",
      "Non Self Filing Customs Broker",
    ];
  }, []);

  return (
    <div>
      <DetailTitle title="Forwarding Agent References" className="mb-4" />
      <div className="flex flex-col gap-4">
        <NAOutlinedTextField
          label="Forwarding Agent References"
          type="textarea"
          rows={7}
          value={partiesStore.forwardingAgentReference || ""}
          handleValueChange={(value) => {
            setPartiesStore((prev) => {
              return {
                ...prev,
                forwardingAgentReference: value,
              };
            });
          }}
          onBlur={(e) => {
            // split 35 characters
            let splitTexts = e.currentTarget.value
              .replaceAll("\n", "")
              .match(/.{1,35}/g)
              ?.join("\n")
              .toUpperCase();

            if (splitTexts) {
              e.currentTarget.value = splitTexts;
              setPartiesStore((prev) => ({
                ...prev,
                forwardingAgentReference: splitTexts as string,
              }));
            }
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <NAOutlinedListBox
            className="w-full"
            label="US"
            options={agentOptions}
          />
          <NAOutlinedListBox
            className="w-full"
            label="CA"
            options={agentOptions}
          />
          <NAOutlinedTextField label="Self Filter SCAC" />
          <div className="flex items-center">
            <MdFilledTonalButton className="h-fit w-fit">
              Detail
            </MdFilledTonalButton>
          </div>
        </div>
      </div>
    </div>
  );
};
