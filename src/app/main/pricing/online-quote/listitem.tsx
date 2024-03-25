import { DateTime } from "luxon";
import { useMemo, useState } from "react";

import SubsumIndicaotrIcon from "@/../public/icon_subsum_indicator.svg";
import VesselIcon from "@/../public/icon_vessel.svg";
import Portal from "@/app/components/portal";
import { MdTypography } from "@/app/components/typography";
import {
  MdElevationButton,
  MdFilledButton,
  MdIcon,
  MdIconButton,
} from "@/app/util/md3";
import { QuotationContainerType } from "@/app/util/typeDef/pricing";
import {
  PlaceInformationType,
  VesselInfoType,
} from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";
import {
  ArrowDropDown,
  FmdGood,
  FmdGoodOutlined,
  InfoOutlined,
  Place,
} from "@mui/icons-material";

import { DividerComponent } from "../../booking/information/components/base";
import PlaceInformationDialog from "../../schedule/popup/place-information";
import VesselInformationDialog from "../../schedule/popup/vessel-information";
import VesselScheduleDialog from "../../schedule/popup/vessel-schedule";
import {
  createDummaryVesselSchedules,
  createDummyPlaceInformation,
  createDummyVesselInformation,
} from "../../schedule/util";

export const QuotationListItem = ({
  etd,
  eta,
  origin,
  destination,
  vessel,
  containers,
}: {
  etd: DateTime;
  eta: DateTime;
  origin: PlaceInformationType;
  destination: PlaceInformationType;
  vessel: VesselInfoType;
  containers: {
    containerType: QuotationContainerType;
    quantity: number;
  }[];
}) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isPlaceInformationOpen, setIsPlaceInformationOpen] = useState(false);
  const [isVesselInformationOpen, setIsVesselInformationOpen] = useState(false);
  const [isVesselScheduleOpen, setIsVesselScheduleOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceInformationType>();

  const tempVesselInfo = useMemo(() => {
    return createDummyVesselInformation();
  }, []);

  const tempVesselSchedules = useMemo(() => {
    return createDummaryVesselSchedules();
  }, []);

  const VesselRouteComponent = () => {
    const data = useMemo(() => {
      return {
        vesselLine: faker.airline.airplane().name,
        serviceLane: faker.string.alphanumeric(4).toUpperCase(),
        transitTime: faker.number.int({
          max: 10,
        }),
      };
    }, []);

    return (
      <>
        <div className="flex items-center relative">
          <div className="mr-6 bg-surfaceContainerLowest z-10 text-primary">
            <ArrowDropDown />
          </div>
          <div className="border-r-2 border-r-outlineVariant border-dotted h-48 absolute left-3 -translate-x-px"></div>
          <div className="bg-surfaceContainerLow rounded-2xl flex flex-col flex-1 px-4 pt-2 pb-4 items-center">
            <div className="flex items-center w-full">
              <MdIcon className="text-primary mr-2">
                <VesselIcon />
              </MdIcon>
              <div
                onClick={() => {
                  setIsVesselScheduleOpen(true);
                }}
                className="flex-1 text-left"
              >
                <MdTypography
                  variant="body"
                  size="large"
                  className="underline text-onSurfaceVariant cursor-pointer"
                >
                  {data.vesselLine}
                </MdTypography>
              </div>
              <MdIconButton
                onClick={() => {
                  setIsVesselInformationOpen(true);
                }}
              >
                <MdIcon>
                  <InfoOutlined />
                </MdIcon>
              </MdIconButton>
            </div>
            <div className="flex justify-start items-center w-full">
              <div className="bg-onSecondary px-4 py-1 rounded-full">
                <MdTypography variant="label" size="small">
                  {data.serviceLane}
                </MdTypography>
              </div>
              <div className="w-px h-6 bg-outlineVariant mx-4"></div>
              <MdTypography
                variant="label"
                size="medium"
                className="text-outline mr-2"
              >
                T/Time
              </MdTypography>
              <MdTypography variant="label" size="medium" prominent>
                {data.transitTime} Hours
              </MdTypography>
            </div>
          </div>
        </div>
      </>
    );
  };

  const VesselPortComponent = ({
    item,
    time,
    portState = "middle",
  }: {
    item: PlaceInformationType;
    time: DateTime;
    portState?: "origin" | "middle" | "destination";
  }) => {
    return (
      <div className="flex items-center w-full">
        {portState === "origin" || portState === "destination" ? (
          <FmdGood className="text-primary" />
        ) : (
          <FmdGoodOutlined className="text-primary" />
        )}
        <div className="ml-6 flex-1">
          <div className="flex items-center gap-2">
            <div className="flex flex-1 gap-2 items-center w-fit">
              <MdTypography
                variant="body"
                size="large"
                prominent
                className="text-primary text-left flex-1"
              >
                {item.yardName.toUpperCase()}
              </MdTypography>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline text-left"
              >
                {time.toFormat("yyyy-MM-dd HH:mm")}
              </MdTypography>
            </div>
          </div>
          <div
            className="w-fit"
            onClick={() => {
              setSelectedPlace(item);
              setIsPlaceInformationOpen(!isPlaceInformationOpen);
            }}
          >
            <MdTypography
              variant="body"
              size="medium"
              className="text-onSurfaceVariant underline cursor-pointer"
            >
              {item.address}
            </MdTypography>
          </div>
        </div>
      </div>
    );
  };

  const middleRoutes = useMemo(() => {
    const portCount = faker.number.int({ min: 1, max: 3 });
    return (
      <>
        {Array.from({ length: portCount }).map(() => {
          return (
            <>
              <VesselRouteComponent />
              <VesselPortComponent
                item={createDummyPlaceInformation(faker.location.city())}
                time={DateTime.fromJSDate(
                  faker.date.between(etd.toJSDate(), eta.toJSDate())
                )}
              />
            </>
          );
        })}
        <VesselRouteComponent />
      </>
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [etd, eta]);

  return (
    <>
      <Portal selector="#main-container">
        {selectedPlace && (
          <PlaceInformationDialog
            open={isPlaceInformationOpen}
            handleOpen={setIsPlaceInformationOpen}
            data={selectedPlace}
          />
        )}
        <VesselInformationDialog
          open={isVesselInformationOpen}
          handleOpen={setIsVesselInformationOpen}
          data={tempVesselInfo}
        />
        <VesselScheduleDialog
          open={isVesselScheduleOpen}
          handleOpen={setIsVesselScheduleOpen}
          vesselInfo={tempVesselInfo}
          vesselSchedules={tempVesselSchedules}
        />
      </Portal>
      <div className="w-full">
        <div className="p-6 border border-outlineVariant rounded-lg flex">
          <div className="flex-1">
            <div className="flex flex-1 justify-between items-center gap-4 mb-4">
              <Place fontSize="small" className="text-primary" />
              <div className="flex-1 border-b border-dashed border-b-outlineVariant"></div>
              <VesselIcon className="text-primary" />
              <div className="flex-1 border-b border-dashed border-b-outlineVariant"></div>
              <Place fontSize="small" className="text-primary" />
            </div>
            <div className="flex flex-1 justify-between">
              <MdTypography variant="title" size="medium">
                {etd.toFormat("yyyy-MM-dd HH:mm")}
              </MdTypography>
              <MdTypography
                variant="title"
                size="medium"
                className="underline cursor-pointer"
                onClick={() => {
                  setIsVesselInformationOpen(true);
                }}
              >
                {vessel.vesselName}
              </MdTypography>
              <MdTypography variant="title" size="medium">
                {eta.toFormat("yyyy-MM-dd HH:mm")}
              </MdTypography>
            </div>
            <div className="flex flex-1 justify-between">
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                ETD
              </MdTypography>
              <div className="flex items-center gap-1">
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="text-secondary"
                >
                  {vessel.serviceLane}
                </MdTypography>
                <MdTypography variant="body" size="medium">
                  Transit Time
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="text-secondary"
                >
                  {eta.diff(etd, ["days", "hours", "minutes"]).toObject().days}{" "}
                  Day(s)
                </MdTypography>
                <MdTypography
                  variant="label"
                  size="medium"
                  className="px-2 py-0.5 bg-secondaryContainer rounded-lg"
                >
                  Direct
                </MdTypography>
              </div>
              <MdTypography
                variant="body"
                size="medium"
                className="text-outline"
              >
                ETA
              </MdTypography>
            </div>
          </div>
          <div className="ml-8 mr-6 flex flex-col bg-surfaceContainerLowest px-4 py-2 rounded-lg">
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-left"
            >
              Total Price
            </MdTypography>
            <div className="flex items-baseline gap-1 justify-end">
              <MdTypography
                variant="title"
                size="large"
                prominent
                className="text-primary"
              >
                {getNumberWithCommas(
                  faker.number.int({ min: 100000, max: 300000 })
                )}
              </MdTypography>
              <MdTypography
                variant="body"
                size="small"
                className="text-outline"
              >
                USD
              </MdTypography>
            </div>
            <DividerComponent className="my-2" />
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-left"
            >
              Validity Date
            </MdTypography>
            <MdTypography
              variant="body"
              size="small"
              className="text-onSurface"
            >
              {etd.toFormat("yyyy-MM-dd")} ~ {eta.toFormat("yyyy-MM-dd")}
            </MdTypography>
          </div>

          <div className="flex flex-col gap-2">
            <MdFilledButton>Accept</MdFilledButton>
            <MdElevationButton
              hasIcon
              onClick={() => {
                setIsDetailOpen(!isDetailOpen);
              }}
            >
              <MdIcon slot="icon">
                <ArrowDropDown
                  fontSize="small"
                  className={isDetailOpen ? "transform rotate-180" : ""}
                />
              </MdIcon>
              Details
            </MdElevationButton>
          </div>
        </div>
        {isDetailOpen && (
          <div className="p-4 border border-outlineVariant rounded-lg bg-surfaceContainerLow">
            <div className="border border-outlineVariant rounded-lg overflow-hidden bg-surfaceContainerLowest">
              <div className="bg-secondaryContainer h-2"></div>
              <div className="px-6 py-4 text-right">
                <div className="flex justify-end">
                  <MdTypography
                    variant="label"
                    size="medium"
                    prominent
                    className="px-4 py-2 bg-primaryContainer rounded-2xl w-fit "
                  >
                    <span className="mr-1 text-outline">Total</span>
                    {eta.diff(etd, ["days", "hours", "minutes"]).days +
                      ` Day(s) (Ocean: ${
                        eta.diff(etd, ["days", "hours", "minutes"]).days -
                        faker.number.int({ min: 1, max: 3 })
                      } Days)`}
                  </MdTypography>
                </div>
                <div className="flex gap-8">
                  <div
                    aria-label="route-panel"
                    className="w-[480px] flex flex-col gap-12 mt-6"
                  >
                    <VesselPortComponent
                      item={origin}
                      time={etd}
                      portState="origin"
                    />
                    {middleRoutes}
                    <VesselPortComponent
                      item={destination}
                      time={eta}
                      portState="origin"
                    />
                  </div>
                  <PricePanel containers={containers} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const PricePanel = ({
  containers,
}: {
  containers: {
    containerType: QuotationContainerType;
    quantity: number;
  }[];
}) => {
  return (
    <>
      <div
        aria-label="price-panel"
        className="flex-1 h-fit grid grid-cols-[1fr_160px_120px_1fr] mt-6"
      >
        <MdTypography
          variant="label"
          size="large"
          prominent
          className="text-left border-b border-outlineVariant pb-2 text-outline"
        >
          Item
        </MdTypography>
        <MdTypography
          variant="label"
          size="large"
          prominent
          className="border-b border-outlineVariant pb-2 text-outline"
        >
          Unit Price
        </MdTypography>
        <MdTypography
          variant="label"
          size="large"
          prominent
          className="border-b border-outlineVariant pb-2 text-outline"
        >
          Quantity
        </MdTypography>
        <MdTypography
          variant="label"
          size="large"
          prominent
          className="border-b border-outlineVariant pb-2 text-outline"
        >
          Total per Unit
        </MdTypography>
        <CategorySumItem
          sumTitle="Ocean Freight"
          sumPrice={faker.number.int({ min: 30000, max: 90000 })}
          priceUnit="USD"
        />
        <SubSumItem sumTitle="Ocean Freight" containers={containers} />
        <DividerComponent className="col-span-4 border-dotted mb-2" />
        <CategorySumItem
          sumTitle="Origin Charges"
          sumPrice={faker.number.int({ min: 30000, max: 90000 })}
          priceUnit="USD"
        />
        <SubSumItem sumTitle="Low Sulphur Surcharge" containers={containers} />
        <SubSumItem
          sumTitle="Terminal Handling Charge"
          containers={containers}
        />
        <SubSumItem
          sumTitle="Orignial Documentation Fee"
          containers={containers}
        />
        <DividerComponent className="col-span-4 border-dotted mb-2" />
        <CategorySumItem
          sumTitle="Destination Charges"
          sumPrice={faker.number.int({ min: 30000, max: 90000 })}
          priceUnit="USD"
        />
        <SubSumItem sumTitle="Container Cleaning Fee" containers={containers} />
        <SubSumItem
          sumTitle="Container Imbalance Change"
          containers={containers}
        />
        <DividerComponent className="col-span-4 border-dotted mb-2" />
        <div className="flex col-span-4 justify-between">
          <MdTypography
            variant="body"
            size="large"
            prominent
            className="text-outline"
          >
            Total Amount
          </MdTypography>
          <div className="flex items-baseline">
            <MdTypography
              variant="body"
              size="large"
              prominent
              className="text-primary"
            >
              {getNumberWithCommas(
                faker.number.int({ min: 100000, max: 300000 })
              )}
            </MdTypography>
            <MdTypography variant="body" size="medium" className="ml-3 mr-2">
              USD
            </MdTypography>
          </div>
        </div>
      </div>
    </>
  );
};

const CategorySumItem = ({
  sumTitle,
  sumPrice,
  priceUnit,
}: {
  sumTitle: string;
  sumPrice: number;
  priceUnit: string;
}) => {
  return (
    <div className="col-span-4 flex justify-between my-4">
      <MdTypography
        variant="body"
        size="large"
        prominent
        className="text-primary"
      >
        {sumTitle}
      </MdTypography>
      <MdTypography
        variant="body"
        size="medium"
        prominent
        className="text-outline border px-2 py-1 rounded-lg border-outlineVariant"
      >
        <span className="text-primary">{getNumberWithCommas(sumPrice)}</span>
        <span className="ml-2">{priceUnit}</span>
      </MdTypography>
    </div>
  );
};

const SubSumItem = ({
  sumTitle,
  containers,
  priceUnit = "USD",
}: {
  sumTitle: string;
  containers: {
    containerType: QuotationContainerType;
    quantity: number;
  }[];
  priceUnit?: string;
}) => {
  const priceTable = containers.map((container) => {
    return {
      type: container.containerType,
      quantity: container.quantity,
      price: faker.number.int({ min: 100, max: 2000 }),
      priceUnit: priceUnit,
    };
  });

  return (
    <>
      <div className="flex justify-between col-span-4 bg-secondaryContainer px-2 py-2 rounded mb-4">
        <MdTypography variant="body" size="medium" prominent className="flex ">
          <SubsumIndicaotrIcon className="mx-2" />
          {sumTitle}
        </MdTypography>
        <MdTypography variant="body" size="medium" className="text-right">
          {getNumberWithCommas(
            priceTable.reduce((acc, cur) => {
              return acc + cur.price * cur.quantity;
            }, 0)
          )}
          <span className="ml-4">{priceUnit}</span>
        </MdTypography>
      </div>
      {priceTable.map((priceItem) => {
        return (
          <ContainerPriceItem
            key={priceItem.type}
            type={priceItem.type}
            quantity={priceItem.quantity}
            price={priceItem.price}
            priceUnit={priceItem.priceUnit}
          />
        );
      })}
    </>
  );
};
const ContainerPriceItem = ({
  type,
  quantity,
  price,
  priceUnit,
}: {
  type: QuotationContainerType;
  quantity: number;
  price: number;
  priceUnit: string;
}) => {
  return (
    <>
      <MdTypography
        variant="body"
        size="medium"
        className="text-left mb-4 ml-8 whitespace-nowrap"
      >
        {
          {
            [QuotationContainerType.Dry20]: "20' Dry Container",
            [QuotationContainerType.Dry40]: "40' Dry Container",
            [QuotationContainerType.Dry45]: "45' Dry Container",
          }[type]
        }
      </MdTypography>
      <MdTypography variant="body" size="medium" className="text-right mb-4">
        {getNumberWithCommas(price)}
      </MdTypography>
      <MdTypography variant="body" size="medium" className="text-right mb-4">
        {quantity}
      </MdTypography>
      <MdTypography
        variant="body"
        size="medium"
        className="text-right mb-4 mr-2"
      >
        {getNumberWithCommas(price * quantity)}
        <span className="ml-4">{priceUnit}</span>
      </MdTypography>
    </>
  );
};

const getNumberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
