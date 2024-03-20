import { Section } from "./base";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import EmptyContainerImage from "@/../public/img_empty_container.svg";
import { MdTypography } from "@/app/components/typography";
import { useSetRecoilState } from "recoil";
import { BookingRequestStepState } from "@/app/store/booking.store";
import { useRouter } from "next/navigation";
import {
  BulkContainerInformationType,
  ContainerInformationType,
  DryContainerInformationType,
  FlatRackContainerInformationType,
  OpenTopContainerInformationType,
  ReeferContainerInformationType,
  TankContainerInformationType,
} from "@/app/util/typeDef/boooking";

export default function ContainerSection({
  hasEdit,
  data,
}: {
  hasEdit?: boolean;
  data: {
    dry: DryContainerInformationType[];
    reefer: ReeferContainerInformationType[];
    flatrack: FlatRackContainerInformationType[];
    opentop: OpenTopContainerInformationType[];
    tank: TankContainerInformationType[];
    bulk: BulkContainerInformationType[];
  };
}) {
  const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
  const router = useRouter();

  function moveToContainerStep() {
    setBookingRequestStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isSelected: true,
      },
    }));
    router.push("/main/booking/request");
  }

  return (
    <Section
      title="Container"
      hasEdit={hasEdit}
      editAction={() => {
        moveToContainerStep();
      }}
    >
      <div className="grid grid-cols-5 gap-4">
        {data.dry.map((container, index) => (
          <ContainerItem
            key={index}
            type="dry"
            size={container.size}
            quantity={container.quantity}
            soc={container.soc}
          />
        ))}
        {data.reefer.map((container, index) => (
          <ContainerItem
            key={index}
            type="reefer"
            size={container.size}
            quantity={container.quantity}
            soc={container.soc}
          />
        ))}
        {data.flatrack.map((container, index) => (
          <ContainerItem
            key={index}
            type="flatrack"
            size={container.size}
            quantity={container.quantity}
            soc={container.soc}
          />
        ))}
        {data.opentop.map((container, index) => (
          <ContainerItem
            key={index}
            type="open-top"
            size={container.size}
            quantity={container.quantity}
            soc={container.soc}
          />
        ))}
        {data.tank.map((container, index) => (
          <ContainerItem
            key={index}
            type="tank"
            size={container.size}
            quantity={container.quantity}
            soc={container.soc}
          />
        ))}
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
  size: string;
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
            {size}
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
