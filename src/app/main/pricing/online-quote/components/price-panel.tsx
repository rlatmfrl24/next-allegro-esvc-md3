import { MdTypography } from "@/app/components/typography";
import { QuotationContainerType } from "@/app/util/typeDef/pricing";
import { CategorySumItem, SubSumItem } from "./price-items";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { getNumberWithCommas } from "@/app/main/util";
import { faker } from "@faker-js/faker";

export const PricePanel = ({
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
          className="border-b border-outlineVariant pb-2 text-outline text-right"
        >
          Unit Price
        </MdTypography>
        <MdTypography
          variant="label"
          size="large"
          prominent
          className="border-b border-outlineVariant pb-2 text-outline text-right"
        >
          Quantity
        </MdTypography>
        <MdTypography
          variant="label"
          size="large"
          prominent
          className="border-b border-outlineVariant pb-2 text-outline text-right"
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
