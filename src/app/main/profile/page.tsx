"use client";

import { DividerComponent } from "@/app/components/divider";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle, SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import classNames from "classnames";
import { useMemo } from "react";

export default function MyProfilePage() {
  const cx = classNames.bind(styles);
  const tempContactOffices = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      return faker.location.city() + " Agent";
    });
  }, []);
  const countryOptions = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      return faker.location.country();
    });
  }, []);
  const cityOptions = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      return faker.location.city();
    });
  }, []);
  const contractNumberOptions = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      return faker.string.alphanumeric(10).toUpperCase();
    });
  }, []);

  const companyTypeOptions = [
    "Shipper or Consignee",
    "Freight Forwarder",
    "Shipping Carrier",
    "Truck or Rail Company",
    "Others",
  ];

  return (
    <div aria-label="container" className={cx(styles.container, "flex-1 flex")}>
      <div className={cx(styles.area, "flex-1 flex")}>
        <div className="border-2 border-secondaryContainer flex-1 rounded-lg flex flex-col">
          <MdTypography
            variant="title"
            size="large"
            className="bg-secondaryContainer p-4"
          >
            My Profile
          </MdTypography>
          <div className="flex flex-1 flex-col gap-4 px-6 py-12">
            <div className="flex gap-4 items-center">
              <NAOutlinedTextField
                label="User ID"
                value="Seul-Ki Kim"
                readOnly
              />
              <NAOutlinedTextField
                label="Customer ID"
                value={faker.string.alphanumeric(10).toUpperCase()}
                readOnly
              />
              <MdOutlinedButton>Password Update</MdOutlinedButton>
              <MdTextButton>Withdrawal</MdTextButton>
            </div>
            <div className="flex items-center gap-4">
              <SubTitle title="User Information" className="w-fit flex-1" />
              <DividerComponent />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="First Name"
                value=""
                className="w-96"
              />
              <NAOutlinedTextField
                label="Last Name"
                value=""
                className="w-96"
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Tel No."
                type="tel"
                value=""
                className="w-96"
              />
              <NAOutlinedTextField
                label="Fax No."
                type="tel"
                value=""
                className="w-96"
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="E-mail"
                type="email"
                value=""
                className="w-96"
              />
              <NAOutlinedListBox
                options={["Import", "Export", "Export & Import"]}
                label="Trade"
                initialValue="Export"
              />
              <NAOutlinedListBox
                options={tempContactOffices}
                label="Contact Office"
              />
            </div>
            <div className="flex items-center gap-4">
              <SubTitle title="Company Information" className="flex-1" />
              <DividerComponent />
            </div>
            <div className="flex gap-4 items-center">
              <NAOutlinedTextField
                label="Company Name"
                value="Cyberlogitec"
                readOnly
                required
                className="w-96"
              />
              <MdOutlinedButton>Company Update</MdOutlinedButton>
            </div>
            <div className="flex gap-4 items-center">
              <NAOutlinedListBox options={countryOptions} label="Country" />
              <NAOutlinedAutoComplete itemList={cityOptions} label="City" />
              <NAOutlinedTextField label="Zip Code" className="w-36" />
              <NAOutlinedTextField className="flex-1" label="Address" />
            </div>
            <div className="flex gap-4 items-center">
              <NAOutlinedListBox
                options={companyTypeOptions}
                label="Company Name"
              />
              <NAOutlinedListBox
                options={contractNumberOptions}
                label="Contract No."
              />
              <MdOutlinedButton>Contract No. Update</MdOutlinedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
