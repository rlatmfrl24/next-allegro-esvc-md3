import { Section } from "./base";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import OpenTopContainerImage from "@/../public/img_open_top_container.svg";
import TankContainerImage from "@/../public/img_tank_container.svg";
import BulkContainerImage from "@/../public/img_bulk_container.svg";
import FlatRackContainerImage from "@/../public/img_flat_rack_container.svg";
import { MdTypography } from "@/app/components/typography";
import { useSetRecoilState } from "recoil";
import { BookingRequestStepState } from "@/app/store/booking.store";
import { useRouter } from "next/navigation";
import {
  BulkContainerInformationType,
  ContainerInformationType,
  ContainerType,
  DryContainerInformationType,
  FlatRackContainerInformationType,
  OpenTopContainerInformationType,
  ReeferContainerInformationType,
  TankContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Info, ThermostatAuto } from "@mui/icons-material";
import LabelChip from "@/app/components/label-chip";
import { MdRippleEffect } from "@/app/util/md3";
import {
  AwkwardIndicator,
  DangerIndicator,
  ReeferIndicator,
} from "./container-indicator";

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
      <div className="grid grid-cols-4 gap-4">
        {data.dry.length !== 0 && <ContainerTypeItem containers={data.dry} />}
        {data.reefer.length !== 0 && (
          <ContainerTypeItem containers={data.reefer} />
        )}
        {data.flatrack.length !== 0 && (
          <ContainerTypeItem containers={data.flatrack} />
        )}
        {data.opentop.length !== 0 && (
          <ContainerTypeItem containers={data.opentop} />
        )}
        {data.tank.length !== 0 && <ContainerTypeItem containers={data.tank} />}
        {data.bulk.length !== 0 && (
          <div className="relative flex flex-1 items-center border border-outlineVariant rounded-lg p-4 gap-4">
            <div className="text-center px-4">
              <BulkContainerImage />
            </div>
            <div>
              <LabelChip
                label="Bulk"
                className="bg-surfaceContainerHigh mb-2"
                size="medium"
              />
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="flex gap-2"
              >
                <span>Bulk</span>
                <span className="text-outlineVariant">X</span>
                <span>{data.bulk.length}</span>
              </MdTypography>
            </div>
          </div>
        )}

        {/* {data.dry.map((container, index) => (
          <ContainerItem
            key={index}
            type="dry"
            size={container.size}
            quantity={container.quantity}
            soc={container.soc}
          />
        ))} */}
      </div>
    </Section>
  );
}

const ContainerTypeItem = (props: {
  containers: ContainerInformationType[];
}) => {
  const containerType = props.containers[0].type;
  const socCount = props.containers.reduce((acc, cur) => acc + cur.soc, 0);

  return (
    <div className="relative flex flex-1 items-center border border-outlineVariant rounded-lg p-4 gap-4">
      <div className="absolute top-2 right-2 flex gap-1">
        {props.containers.some(
          (container) => container.type === ContainerType.reefer
        ) && (
          <ReeferIndicator
            containers={props.containers as ReeferContainerInformationType[]}
          />
        )}
        {props.containers.some((container) => container.isDangerous) && (
          <DangerIndicator containers={props.containers} />
        )}
        {props.containers.some((container) => {
          if (
            container.type === ContainerType.opentop ||
            container.type === ContainerType.flatrack
          ) {
            return (container as OpenTopContainerInformationType).isAwkward;
          }
        }) && (
          <AwkwardIndicator
            containers={props.containers as OpenTopContainerInformationType[]}
          />
        )}
      </div>
      <div className="text-center px-4">
        {
          {
            Dry: <DryContainerImage />,
            Reefer: <ReeferContainerImage />,
            OpenTop: <OpenTopContainerImage />,
            FlatRack: <FlatRackContainerImage />,
            Tank: <TankContainerImage />,
            Bulk: <BulkContainerImage />,
          }[containerType as ContainerType]
        }
        <MdTypography
          variant="label"
          size="large"
          className="text-outline mt-1"
        >
          {`(SOC: ${socCount})`}
        </MdTypography>
      </div>
      <div>
        <LabelChip
          label={containerType}
          className="bg-surfaceContainerHigh text-onSurface mb-2"
          size="medium"
        />
        {props.containers.map((container, index) => (
          <MdTypography
            key={containerType + `_` + index}
            variant="body"
            size="large"
            prominent
            className="flex gap-2"
          >
            <span>{container.size}</span>
            <span className="text-outlineVariant">X</span>
            <span>{container.quantity}</span>
          </MdTypography>
        ))}
      </div>
    </div>
  );
};

//deprecated
// const ContainerItem = ({
//   type,
//   size,
//   quantity,
//   soc,
// }: {
//   type: "dry" | "reefer" | "flatrack" | "open-top" | "tank" | "bulk";
//   size?: string;
//   quantity?: number;
//   soc?: number;
// }) => {
//   return (
//     <div className="relative flex flex-1 items-center border rounded-lg border-outlineVariant p-4 gap-4">
//       <div className="w-24 flex justify-center items-center">
//         {
//           {
//             dry: <DryContainerImage />,
//             reefer: <ReeferContainerImage />,
//             "open-top": <OpenTopContainerImage />,
//             flatrack: <FlatRackContainerImage />,
//             tank: <TankContainerImage />,
//             bulk: <BulkContainerImage />,
//           }[type]
//         }
//       </div>
//       {type !== "bulk" ? (
//         <>
//           <div>
//             <MdTypography variant="body" size="medium">
//               {
//                 {
//                   dry: "Dry",
//                   reefer: "Reefer",
//                   empty: "Empty",
//                   flatrack: "Flatrack",
//                   "open-top": "Open Top",
//                   tank: "Tank",
//                   other: "Other",
//                   bulk: "Bulk",
//                 }[type]
//               }
//             </MdTypography>
//             <div className="flex gap-1">
//               <MdTypography variant="body" size="large" prominent>
//                 {size}
//               </MdTypography>
//               <MdTypography
//                 variant="body"
//                 size="large"
//                 prominent
//                 className="text-outlineVariant"
//               >
//                 X
//               </MdTypography>
//               <MdTypography variant="body" size="large" prominent>
//                 {quantity}
//               </MdTypography>
//             </div>
//             <MdTypography variant="body" size="small" className="text-outline">
//               SOC: {soc}
//             </MdTypography>
//           </div>
//         </>
//       ) : (
//         <div className="flex items-center">
//           <MdTypography variant="body" size="large" prominent>
//             Bulk
//           </MdTypography>
//         </div>
//       )}
//     </div>
//   );
// };
