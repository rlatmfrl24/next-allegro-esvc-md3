import { Section } from "./base";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import EmptyContainerImage from "@/../public/img_empty_container.svg";
import { MdTypography } from "@/app/components/typography";

export default function ContainerSection() {
  return (
    <Section title="Container">
      <div className="grid grid-cols-5 gap-4">
        <ContainerItem type="dry" size="20ft" quantity={1} soc={1} />
        <ContainerItem type="reefer" size="40ft" quantity={3} soc={1} />
        <ContainerItem type="open-top" size="45ft" quantity={2} soc={0} />
        <ContainerItem type="bulk" size="20ft" quantity={1} soc={1} />
        <ContainerItem type="empty" size="20ft" quantity={1} soc={1} />
      </div>
    </Section>
  );
}

const ContainerItem = ({
  type,
  size,
  quantity,
  soc,
}: {
  type:
    | "dry"
    | "reefer"
    | "empty"
    | "flatrack"
    | "open-top"
    | "tank"
    | "other"
    | "bulk";
  size: "20ft" | "40ft" | "45ft" | "53ft" | "other";
  quantity: number;
  soc: number;
}) => {
  return (
    <div className="flex flex-1 border rounded-lg border-outlineVariant p-4 gap-4">
      {type === "dry" ? (
        <DryContainerImage />
      ) : type === "reefer" ? (
        <ReeferContainerImage />
      ) : (
        <EmptyContainerImage />
      )}
      <div>
        <MdTypography variant="body" size="medium">
          {
            {
              dry: "Dry",
              reefer: "Reefer",
              empty: "Empty",
              flatrack: "Flatrack",
              "open-top": "Open Top",
              tank: "Tank",
              other: "Other",
              bulk: "Bulk",
            }[type]
          }
        </MdTypography>
        <div className="flex gap-1">
          <MdTypography variant="body" size="large" prominent>
            {
              {
                "20ft": "20ft",
                "40ft": "40ft",
                "45ft": "45ft",
                "53ft": "53ft",
                other: "Other",
              }[size]
            }
          </MdTypography>
          <MdTypography
            variant="body"
            size="large"
            prominent
            className="text-outlineVariant"
          >
            X
          </MdTypography>
          <MdTypography variant="body" size="large" prominent>
            {quantity}
          </MdTypography>
        </div>
        <MdTypography variant="body" size="small" className="text-outline">
          SOC: {soc}
        </MdTypography>
      </div>
    </div>
  );
};
