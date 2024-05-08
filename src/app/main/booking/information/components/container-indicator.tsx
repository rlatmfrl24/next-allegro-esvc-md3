import Portal from "@/app/components/portal";
import {
  MdChipSet,
  MdDialog,
  MdFilterChip,
  MdOutlinedButton,
  MdRippleEffect,
} from "@/app/util/md3";
import {
  ContainerInformationType,
  OpenTopContainerInformationType,
  FlatRackContainerInformationType,
  ReeferContainerInformationType,
} from "@/app/util/typeDef/boooking";
import { Info, ThermostatAuto, Warning } from "@mui/icons-material";
import { useState } from "react";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import LabelChip from "@/app/components/label-chip";
import { DividerComponent } from "@/app/components/divider";

const BasicItem = (props: {
  title: string;
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-0.5 ${
        props.className ? props.className : ""
      }`}
    >
      <MdTypography variant="body" size="medium" prominent>
        {props.title}
      </MdTypography>
      <MdTypography variant="body" size="medium">
        {props.value || "-"}
      </MdTypography>
    </div>
  );
};

export const DangerIndicator = (props: {
  containers: ContainerInformationType[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<ContainerInformationType>(
    props.containers[0]
  );

  return (
    <>
      <div
        className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <MdRippleEffect />
        <Warning fontSize="small" className="text-error" />
      </div>
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
          className="min-w-[400px]"
        >
          <div slot="headline">Danger Cargo Info</div>
          <div slot="content" className="flex flex-col gap-4">
            <MdChipSet>
              {props.containers
                .filter((container) => container.isDangerous)
                .map((container, index) => (
                  <MdFilterChip
                    key={index}
                    label={
                      container.type +
                      " " +
                      container.size +
                      " X " +
                      container.quantity
                    }
                    selected={container.size === selectedSize.size}
                    onClick={(e) => {
                      if (container.size === selectedSize.size) {
                        e.preventDefault();
                        e.stopPropagation();
                      } else {
                        setSelectedSize(container);
                      }
                    }}
                  />
                ))}
            </MdChipSet>
            <DividerComponent />
            <DetailTitle
              title={
                selectedSize.type +
                " " +
                selectedSize.size +
                " X " +
                selectedSize.quantity
              }
            />
            <div className="grid grid-cols-2 gap-4">
              <BasicItem
                title="UN Number"
                value={selectedSize.dangerousCargoInformation.unNumber}
              />
              <BasicItem
                title="Class"
                value={selectedSize.dangerousCargoInformation.class}
              />
              <BasicItem
                title="Flash Point"
                value={selectedSize.dangerousCargoInformation.flashPoint}
              />
              <BasicItem
                title="Packaging Group"
                value={selectedSize.dangerousCargoInformation.packingGroup}
              />
              <BasicItem
                title="Proper Shipping Name"
                value={
                  selectedSize.dangerousCargoInformation.properShippingName
                }
                className="col-span-2"
              />

              <div className="flex flex-col gap-0.5 col-span-2">
                <MdTypography variant="body" size="medium" prominent>
                  Dangerous Cargo Certificate
                </MdTypography>
                <MdChipSet>
                  {selectedSize.dangerousCargoInformation.dangerousCargoCertificate.map(
                    (certificate, index) => (
                      <LabelChip
                        key={index}
                        label={certificate.name}
                        size="medium"
                      />
                    )
                  )}
                </MdChipSet>
              </div>
            </div>
          </div>
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Close
            </MdOutlinedButton>
          </div>
        </MdDialog>
      </Portal>
    </>
  );
};

export const AwkwardIndicator = (props: {
  containers:
    | OpenTopContainerInformationType[]
    | FlatRackContainerInformationType[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] =
    useState<OpenTopContainerInformationType>(
      props.containers[0] as OpenTopContainerInformationType
    );

  return (
    <>
      <div
        className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <MdRippleEffect />
        <Info fontSize="small" className="text-[#FFD300] " />
      </div>
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
          className="min-w-[400px]"
        >
          <div slot="headline">Awkward Cargo Info</div>
          <div slot="content" className="flex flex-col gap-4">
            <MdChipSet>
              {props.containers
                .filter((container) => container.isAwkward)
                .map((container, index) => (
                  <MdFilterChip
                    key={index}
                    selected={container.size === selectedSize.size}
                    label={
                      container.type +
                      " " +
                      container.size +
                      " X " +
                      container.quantity
                    }
                    onClick={(e) => {
                      if (container.size === selectedSize.size) {
                        e.preventDefault();
                        e.stopPropagation();
                      } else {
                        setSelectedSize(
                          container as OpenTopContainerInformationType
                        );
                      }
                    }}
                  />
                ))}
            </MdChipSet>
            <DividerComponent />
            <div className="grid grid-cols-3 gap-4">
              <BasicItem
                title="Package"
                value={
                  selectedSize.awkward.package +
                  " " +
                  selectedSize.awkward.packageType
                }
                className="col-span-3"
              />
              <BasicItem
                title="Gross Weight"
                value={
                  selectedSize.awkward.grossWeight +
                  " " +
                  selectedSize.awkward.grossWeightUnit
                }
              />
              <BasicItem
                title="Net Weight"
                value={
                  selectedSize.awkward.netWeight +
                  " " +
                  selectedSize.awkward.netWeightUnit
                }
              />
              <BasicItem
                title="Commodity"
                value={selectedSize.awkward.commodity.description}
              />
              <BasicItem
                title="Length"
                value={
                  selectedSize.awkward.length + " " + selectedSize.awkward.unit
                }
              />
              <BasicItem
                title="Width"
                value={
                  selectedSize.awkward.width + " " + selectedSize.awkward.unit
                }
              />
              <BasicItem
                title="Height"
                value={
                  selectedSize.awkward.height + " " + selectedSize.awkward.unit
                }
              />
              <BasicItem title="Remark" value={selectedSize.awkward.remark} />
            </div>
          </div>
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Close
            </MdOutlinedButton>
          </div>
        </MdDialog>
      </Portal>
    </>
  );
};

export const ReeferIndicator = (props: {
  containers: ReeferContainerInformationType[];
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSize, setSelectedSize] =
    useState<ReeferContainerInformationType>(props.containers[0]);

  return (
    <>
      <div
        className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        <MdRippleEffect />
        <ThermostatAuto fontSize="small" className="text-onSurfaceVariant" />
      </div>
      <Portal selector="#main-container">
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
          className="min-w-[400px]"
        >
          <div slot="headline">Reefer Information</div>
          <div slot="content" className="flex flex-col gap-4">
            <MdChipSet>
              {props.containers.map((container, index) => (
                <MdFilterChip
                  key={index}
                  selected={container.size === selectedSize.size}
                  label={
                    container.type +
                    " " +
                    container.size +
                    " X " +
                    container.quantity
                  }
                  onClick={(e) => {
                    if (container.size === selectedSize.size) {
                      e.preventDefault();
                      e.stopPropagation();
                    } else {
                      setSelectedSize(container);
                    }
                  }}
                />
              ))}
            </MdChipSet>
            <DividerComponent />
            <DetailTitle
              title={
                selectedSize.type +
                " " +
                selectedSize.size +
                " X " +
                selectedSize.quantity
              }
            />
            <div className="grid grid-cols-3 gap-4">
              <BasicItem
                title="Degree"
                value={
                  selectedSize.temperature + " " + selectedSize.temperatureUnit
                }
              />
              <BasicItem
                title="Ventilation"
                value={
                  selectedSize.ventilation.toString() +
                  " " +
                  (selectedSize.ventilationType === "open" ? "%Open" : "%Close")
                }
              />
              <BasicItem title="Nature" value={selectedSize.nature} />
              <BasicItem
                title="Humidity"
                value={selectedSize.humidity.toString() + "%"}
              />
              <BasicItem
                title="Genset"
                value={selectedSize.genset ? "Yes" : "No"}
              />
            </div>
          </div>
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsDialogOpen(false);
              }}
            >
              Close
            </MdOutlinedButton>
          </div>
        </MdDialog>
      </Portal>
    </>
  );
};
