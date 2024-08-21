import { MdTypography } from "@/app/components/typography";
import { QuotationContainerType } from "@/app/util/typeDef/pricing";
import SubsumIndicaotrIcon from "@/../public/icon_subsum_indicator.svg";
import { faker } from "@faker-js/faker";
import { getNumberWithCommas } from "@/app/main/util";

export const CategorySumItem = ({
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

export const SubSumItem = ({
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

export const ContainerPriceItem = ({
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
