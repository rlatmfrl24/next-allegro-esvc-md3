import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { ArrowDropDown, InfoOutlined } from "@mui/icons-material";

export default function StepParties() {
  return (
    <div className="w-full flex flex-col gap-6">
      <MdTypography variant="title" size="large">
        Parties
      </MdTypography>
      <ShipperInfo />
      <ConsigneeInfo />
      <NotifyPartyInfo />
      <ReferencesInfo />
      <div className="flex flex-col gap-4">
        <div className="flex text-outline">
          <InfoOutlined sx={{ fontSize: 16, mt: 0.25, mr: 0.5 }} />
          <div>
            <MdTypography variant="body" size="medium">
              CHINA-CCAM Requirement
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outlineVariant"
            >
              Shipper (Business Registration Number, Tel), Consignee (USCI or OC
              Code, Tel, P.I.C), Notify (USCI or OC Code, Tel)
            </MdTypography>
          </div>
        </div>
        <div className="flex text-outline">
          <InfoOutlined sx={{ fontSize: 16, mt: 0.25, mr: 0.5 }} />
          <div>
            <MdTypography variant="body" size="medium">
              JAPAN-AFR Requirement{" "}
            </MdTypography>
            <MdTypography
              variant="body"
              size="medium"
              className="text-outlineVariant"
            >
              Shipper & Consignee & Notify(Tel)
            </MdTypography>
          </div>
        </div>
      </div>
      <MdFilledButton className="w-fit self-end">Next</MdFilledButton>
    </div>
  );
}

const ShipperInfo = () => {
  const companyList = Array.from({ length: 50 }, (_, i) => {
    const location = faker.location;
    return {
      name: faker.company.name(),
      street: location.streetAddress(),
      country: location.country(),
      city: location.city(),
      postalCode: location.zipCode(),
    };
  });

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="Shipper" />
            <div className="flex-1 border-b border-b-outlineVariant"></div>
            <ArrowDropDown
              className={`transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={`flex flex-col gap-4`}>
            <div className="flex gap-4">
              <NAMultiAutoComplete
                label="Company"
                required
                className="flex-1"
                isAllowOnlyListItems={false}
                itemList={companyList.map((company) => {
                  return {
                    name: company.name,
                    address: `${company.street}, ${company.city}, ${company.country}, ${company.postalCode}`,
                  };
                })}
              />
              <NAOutlinedTextField
                required
                label="Address"
                className="flex-1"
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Country" />
              <NAOutlinedTextField label="City / State" />
              <NAOutlinedTextField label="Zip Code" />
            </div>
            <NAOutlinedTextField label="Street / P.O Box" className="flex-1" />
            <div className="flex gap-4">
              <NAOutlinedTextField label="EORI No" />
              <NAOutlinedTextField label="USCC No" className="flex-1" />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Tax ID" />
              <NAOutlinedTextField label="Phone" />
              <NAOutlinedTextField label="Fax" />
            </div>
            <NAOutlinedTextField label="Email" />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const ConsigneeInfo = () => {
  const companyList = Array.from({ length: 50 }, (_, i) => {
    const location = faker.location;
    return {
      name: faker.company.name(),
      street: location.streetAddress(),
      country: location.country(),
      city: location.city(),
      postalCode: location.zipCode(),
    };
  });

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <div>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="Consignee" />
            <div className="flex-1 border-b border-b-outlineVariant"></div>
            <ArrowDropDown
              className={`transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={`flex flex-col gap-4 mb-6`}>
            <NaToggleButton
              label="To Order"
              state="unchecked"
              className="justify-end"
            />
            <div className="flex gap-4">
              <NAMultiAutoComplete
                label="Company"
                className="flex-1"
                required
                isAllowOnlyListItems={false}
                itemList={companyList.map((company) => {
                  return {
                    name: company.name,
                    address: `${company.street}, ${company.city}, ${company.country}, ${company.postalCode}`,
                  };
                })}
              />
              <NAOutlinedTextField
                disabled
                required
                label="Address"
                className="flex-1"
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Country" />
              <NAOutlinedTextField label="City / State" />
              <NAOutlinedTextField label="Zip Code" />
            </div>
            <NAOutlinedTextField label="Street / P.O Box" className="flex-1" />
            <div className="flex gap-4">
              <NAOutlinedTextField label="EORI No" />
              <NAOutlinedTextField label="USCC No" className="flex-1" />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Tax ID" />
              <NAOutlinedTextField label="Phone" />
              <NAOutlinedTextField label="Fax" />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Email" />
              <NAOutlinedTextField label="Contact Person" />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const NotifyPartyInfo = () => {
  const companyList = Array.from({ length: 50 }, (_, i) => {
    const location = faker.location;
    return {
      name: faker.company.name(),
      street: location.streetAddress(),
      country: location.country(),
      city: location.city(),
      postalCode: location.zipCode(),
    };
  });

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="Notify Party" />
            <div className="flex-1 border-b border-b-outlineVariant"></div>
            <ArrowDropDown
              className={`transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={`flex flex-col gap-4 mb-6`}>
            <NaToggleButton
              label="Same as Consignee"
              state="unchecked"
              className="justify-end"
            />
            <div className="flex gap-4">
              <NAMultiAutoComplete
                label="Company"
                className="flex-1"
                required
                isAllowOnlyListItems={false}
                itemList={companyList.map((company) => {
                  return {
                    name: company.name,
                    address: `${company.street}, ${company.city}, ${company.country}, ${company.postalCode}`,
                  };
                })}
              />
              <NAOutlinedTextField
                required
                label="Address"
                className="flex-1"
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Country" />
              <NAOutlinedTextField label="City / State" />
              <NAOutlinedTextField label="Zip Code" />
            </div>
            <NAOutlinedTextField label="Street / P.O Box" className="flex-1" />
            <div className="flex gap-4">
              <NAOutlinedTextField label="EORI No" />
              <NAOutlinedTextField label="USCC No" className="flex-1" />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField label="Tax ID" />
              <NAOutlinedTextField label="Phone" />
              <NAOutlinedTextField label="Fax" />
            </div>
            <NAOutlinedTextField label="Email" />
            <MdOutlinedTextField label="Also Notify" type="textarea" rows={5} />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const ReferencesInfo = () => {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className={`flex w-full items-center gap-2`}>
            <DetailTitle title="References" />
            <div className="flex-1 border-b border-b-outlineVariant"></div>
            <ArrowDropDown
              className={`transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className={`flex flex-col gap-4`}>
            <NAOutlinedTextField
              label="Export References"
              type="textarea"
              rows={5}
            />
            <NAOutlinedTextField
              label="Forwarding Agent References"
              type="textarea"
              rows={5}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
