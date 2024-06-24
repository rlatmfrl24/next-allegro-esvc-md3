import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import EmptyContainerPlaceholder from "@/../public/image_empty_container_placeholder.svg";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import OpenTopContainerImage from "@/../public/img_open_top_container.svg";
import FlatRackContainerImage from "@/../public/img_flat_rack_container.svg";
import TankContainerImage from "@/../public/img_tank_container.svg";
import BulkContainerImage from "@/../public/img_bulk_container.svg";
import { MdTypography } from "@/app/components/typography";
import {
  getEmptySIEditContainerData,
  sumContainerMeasurement,
  sumContainerQuantity,
  sumContainerWeight,
} from "@/app/main/util";
import {
  SIContainerInputState,
  SIEditContainerState,
  SIEditStepState,
} from "@/app/store/si.store";
import { MdFilledButton, MdRippleEffect, MdSwitch } from "@/app/util/md3";
import { ContainerType } from "@/app/util/typeDef/boooking";

import ContainerToggleButton from "./components/container-toggle-button";
import ContainerTypeInputComponent from "./components/container-type-input";
import { DividerComponent } from "@/app/components/divider";

import SIContainerGrid from "./components/container-grid";
import {
  TableChart,
  TableChartOutlined,
  TextFields,
} from "@mui/icons-material";

export default function StepContainer() {
  const [viewType, setViewType] = useState<"grid" | "form">("form");
  const setSIEditStep = useSetRecoilState(SIEditStepState);
  const [typeSelections, setTypeSelections] = useState<ContainerType[]>(
    Object.keys(ContainerType).map(
      (key) => ContainerType[key as keyof typeof ContainerType]
    )
  );
  const [siContainerStore, setSIEditContainerStore] =
    useRecoilState(SIEditContainerState);

  const containerInputStatstics = useRecoilValue(SIContainerInputState);

  useEffect(() => {
    setSIEditStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isCompleted: true,
      },
    }));
  }, [setSIEditStep]);

  const moveToMarkDescriptionStep = useCallback(() => {
    setSIEditStep((prev) => ({
      ...prev,
      container: {
        ...prev.container,
        isSelected: false,
      },
      markDescription: {
        ...prev.markDescription,
        isSelected: true,
      },
    }));
  }, [setSIEditStep]);

  function handleTypeSelections(type: ContainerType) {
    if (typeSelections.includes(type)) {
      setTypeSelections((prev) => prev.filter((t) => t !== type));
    } else {
      setTypeSelections((prev) => [...prev, type]);
    }

    const typeKey = type.toLowerCase() as keyof typeof siContainerStore;
    const emptyContainerData = getEmptySIEditContainerData(type);

    if (siContainerStore[typeKey].length === 0) {
      if (typeKey === "weightUnit" || typeKey === "measurementUnit") return;

      setSIEditContainerStore((prev) => ({
        ...prev,
        [typeKey]: [...prev[typeKey], emptyContainerData],
      }));
    }
  }

  useEffect(() => {
    siContainerStore.dry.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.dry));
    siContainerStore.reefer.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.reefer)
      );
    siContainerStore.opentop.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.opentop)
      );
    siContainerStore.flatrack.length === 0 &&
      setTypeSelections((prev) =>
        prev.filter((t) => t !== ContainerType.flatrack)
      );
    siContainerStore.tank.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.tank));
    siContainerStore.bulk.length === 0 &&
      setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.bulk));
  }, [
    siContainerStore.bulk.length,
    siContainerStore.dry.length,
    siContainerStore.flatrack.length,
    siContainerStore.opentop.length,
    siContainerStore.reefer.length,
    siContainerStore.tank.length,
  ]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <MdTypography variant="title" size="large">
          Container
        </MdTypography>
        <div className="flex gap-4">
          <div className="bg-surfaceContainerHigh rounded-2xl px-4 py-1 flex items-center relative">
            <MdTypography
              variant="label"
              size="small"
              className="text-outline absolute -top-1.5"
            >
              Total
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-primary min-w-[88px] text-right"
            >
              {sumContainerQuantity([
                ...siContainerStore.dry,
                ...siContainerStore.reefer,
                ...siContainerStore.opentop,
                ...siContainerStore.flatrack,
                ...siContainerStore.tank,
                ...siContainerStore.bulk,
              ])}
            </MdTypography>
            <DividerComponent
              orientation="vertical"
              className="mx-4 h-4 flex items-center"
            />
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-primary min-w-16 text-right"
            >
              {sumContainerWeight([
                ...siContainerStore.dry,
                ...siContainerStore.reefer,
                ...siContainerStore.opentop,
                ...siContainerStore.flatrack,
                ...siContainerStore.tank,
                ...siContainerStore.bulk,
              ])}
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline ml-2"
            >
              {siContainerStore.weightUnit}
            </MdTypography>
            <DividerComponent
              orientation="vertical"
              className="mx-4 h-4 flex items-center"
            />
            <MdTypography
              variant="body"
              size="medium"
              prominent
              className="text-primary min-w-16 text-right"
            >
              {sumContainerMeasurement([
                ...siContainerStore.dry,
                ...siContainerStore.reefer,
                ...siContainerStore.opentop,
                ...siContainerStore.flatrack,
                ...siContainerStore.tank,
                ...siContainerStore.bulk,
              ])}
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline ml-2"
            >
              {siContainerStore.measurementUnit}
            </MdTypography>
          </div>
          <CustomSwapSwitch
            viewType={viewType}
            onViewTypeChange={(viewType) => setViewType(viewType)}
          />
        </div>
      </div>
      {viewType === "grid" ? (
        <>
          <SIContainerGrid />
        </>
      ) : (
        <>
          <div className="flex gap-4">
            <ContainerToggleButton
              image={<DryContainerImage />}
              isSelected={typeSelections.includes(ContainerType.dry)}
              title="Dry"
              onClick={() => handleTypeSelections(ContainerType.dry)}
              count={
                siContainerStore.dry.length === 0
                  ? undefined
                  : siContainerStore.dry.length
              }
              hoverText={
                <div>
                  {Object.keys(containerInputStatstics.dry).map((key) => {
                    return (
                      <div key={key} className="flex text-white">
                        <MdTypography variant="title" size="medium">
                          {key} x
                        </MdTypography>
                        <MdTypography variant="title" size="medium">
                          {containerInputStatstics.dry[key as any]}
                        </MdTypography>
                      </div>
                    );
                  })}
                </div>
              }
            />
            <ContainerToggleButton
              image={<ReeferContainerImage />}
              isSelected={typeSelections.includes(ContainerType.reefer)}
              title="Reefer"
              onClick={() => handleTypeSelections(ContainerType.reefer)}
              count={
                siContainerStore.reefer.length === 0
                  ? undefined
                  : siContainerStore.reefer.length
              }
              hoverText={
                <div>
                  {Object.keys(containerInputStatstics.reefer).map((key) => {
                    return (
                      <div key={key} className="flex text-white">
                        <MdTypography variant="title" size="medium">
                          {key} x
                        </MdTypography>
                        <MdTypography variant="title" size="medium">
                          {containerInputStatstics.reefer[key as any]}
                        </MdTypography>
                      </div>
                    );
                  })}
                </div>
              }
            />
            <ContainerToggleButton
              image={<OpenTopContainerImage />}
              isSelected={typeSelections.includes(ContainerType.opentop)}
              title="Open top"
              onClick={() => handleTypeSelections(ContainerType.opentop)}
              count={
                siContainerStore.opentop.length === 0
                  ? undefined
                  : siContainerStore.opentop.length
              }
              hoverText={
                <div>
                  {Object.keys(containerInputStatstics.opentop).map((key) => {
                    return (
                      <div key={key} className="flex text-white">
                        <MdTypography variant="title" size="medium">
                          {key} x
                        </MdTypography>
                        <MdTypography variant="title" size="medium">
                          {containerInputStatstics.opentop[key as any]}
                        </MdTypography>
                      </div>
                    );
                  })}
                </div>
              }
            />
            <ContainerToggleButton
              image={<FlatRackContainerImage />}
              isSelected={typeSelections.includes(ContainerType.flatrack)}
              title="Flat rack"
              onClick={() => handleTypeSelections(ContainerType.flatrack)}
              count={
                siContainerStore.flatrack.length === 0
                  ? undefined
                  : siContainerStore.flatrack.length
              }
              hoverText={
                <div>
                  {Object.keys(containerInputStatstics.flatrack).map((key) => {
                    return (
                      <div key={key} className="flex text-white">
                        <MdTypography variant="title" size="medium">
                          {key} x
                        </MdTypography>
                        <MdTypography variant="title" size="medium">
                          {containerInputStatstics.flatrack[key as any]}
                        </MdTypography>
                      </div>
                    );
                  })}
                </div>
              }
            />
            <ContainerToggleButton
              image={<TankContainerImage />}
              isSelected={typeSelections.includes(ContainerType.tank)}
              title="Tank"
              onClick={() => handleTypeSelections(ContainerType.tank)}
              count={
                siContainerStore.tank.length === 0
                  ? undefined
                  : siContainerStore.tank.length
              }
              hoverText={
                <div>
                  {Object.keys(containerInputStatstics.tank).map((key) => {
                    return (
                      <div key={key} className="flex text-white">
                        <MdTypography variant="title" size="medium">
                          {key} x
                        </MdTypography>
                        <MdTypography variant="title" size="medium">
                          {containerInputStatstics.tank[key as any]}
                        </MdTypography>
                      </div>
                    );
                  })}
                </div>
              }
            />
            <ContainerToggleButton
              image={<BulkContainerImage />}
              isSelected={typeSelections.includes(ContainerType.bulk)}
              title="Bulk"
              onClick={() => handleTypeSelections(ContainerType.bulk)}
              count={
                siContainerStore.bulk.length === 0
                  ? undefined
                  : siContainerStore.bulk.length
              }
              hoverText={
                <div>
                  {Object.keys(containerInputStatstics.bulk).map((key) => {
                    return (
                      <div key={key} className="flex text-white">
                        <MdTypography variant="title" size="medium">
                          {key} x
                        </MdTypography>
                        <MdTypography variant="title" size="medium">
                          {containerInputStatstics.bulk[key as any]}
                        </MdTypography>
                      </div>
                    );
                  })}
                </div>
              }
            />
          </div>
          <div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
            {typeSelections.map((type) => {
              return (
                <div key={type}>
                  {type === ContainerType.dry && (
                    <ContainerTypeInputComponent
                      title="Dry Container"
                      type={ContainerType.dry}
                      list={siContainerStore.dry}
                    />
                  )}
                  {type === ContainerType.reefer && (
                    <ContainerTypeInputComponent
                      title="Reefer Container"
                      type={ContainerType.reefer}
                      list={siContainerStore.reefer}
                    />
                  )}
                  {type === ContainerType.opentop && (
                    <ContainerTypeInputComponent
                      title="Open Top Container"
                      type={ContainerType.opentop}
                      list={siContainerStore.opentop}
                    />
                  )}
                  {type === ContainerType.flatrack && (
                    <ContainerTypeInputComponent
                      title="Flat Rack Container"
                      type={ContainerType.flatrack}
                      list={siContainerStore.flatrack}
                    />
                  )}
                  {type === ContainerType.tank && (
                    <ContainerTypeInputComponent
                      title="Tank Container"
                      type={ContainerType.tank}
                      list={siContainerStore.tank}
                    />
                  )}
                  {type === ContainerType.bulk && (
                    <ContainerTypeInputComponent
                      title="Bulk Container"
                      type={ContainerType.bulk}
                      list={siContainerStore.bulk}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
            {typeSelections.length === 0 && (
              <div className="flex-1 flex-col flex items-center justify-center gap-8">
                <EmptyContainerPlaceholder />
                <MdTypography
                  variant="headline"
                  size="medium"
                  className="text-outlineVariant"
                >
                  Please select the container type you want to add.
                </MdTypography>
              </div>
            )}
          </div>
        </>
      )}
      <div className="flex-1 flex justify-end items-end">
        <MdFilledButton
          className="h-fit"
          onClick={() => moveToMarkDescriptionStep()}
        >
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}

const CustomSwapSwitch = (props: {
  viewType: "grid" | "form";
  onViewTypeChange: (viewType: "grid" | "form") => void;
}) => {
  return (
    <div className="flex border border-primary rounded-lg overflow-hidden h-fit">
      <div
        className={`relative p-1.5 flex items-center ${
          props.viewType === "grid" ? "bg-primary" : ""
        }`}
        onClick={() => props.onViewTypeChange("grid")}
      >
        <MdRippleEffect />
        <TableChartOutlined
          className={`${
            props.viewType === "grid" ? "text-white" : "text-primary"
          }`}
        />
      </div>
      <div
        className={`relative p-1.5 flex items-center ${
          props.viewType === "form" ? "bg-primary" : ""
        }`}
        onClick={() => props.onViewTypeChange("form")}
      >
        <MdRippleEffect />
        <TextFields
          className={`
        ${props.viewType === "form" ? "text-white" : "text-primary"}
          `}
        />
      </div>
    </div>
  );
};
