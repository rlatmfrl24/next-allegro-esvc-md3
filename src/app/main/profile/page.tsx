"use client";
import classNames from "classnames";
import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { UserProfileState } from "@/app/store/global.store";
import styles from "@/app/styles/base.module.css";
import { MdOutlinedButton, MdTextButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { PasswordUpdateDialog } from "./dialog/password";
import { CompanyUpdateDialog } from "./dialog/company";
import { WithdrawalDialog } from "./dialog/withdrawal";
import { ContractUpdateDialog } from "./dialog/contract";

export default function MyProfilePage() {
  const [userProfile, setUserProfile] = useRecoilState(UserProfileState);
  const [isPasswordUpdateDialogOpen, setIsPasswordUpdateDialogOpen] =
    useState(false);
  const [isCompanyUpdateDialogOpen, setIsCompanyUpdateDialogOpen] =
    useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);
  const [isContractUpdateDialogOpen, setIsContractUpdateDialogOpen] =
    useState(false);
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
    <>
      <PasswordUpdateDialog
        currentPassword={userProfile.password}
        open={isPasswordUpdateDialogOpen}
        onOpenChange={setIsPasswordUpdateDialogOpen}
        onRequestUpdate={(password) => {
          console.log("Password Updated: ", password);
          setUserProfile({ ...userProfile, password: password });
        }}
      />
      <CompanyUpdateDialog
        originalCompanyName={userProfile.companyName}
        open={isCompanyUpdateDialogOpen}
        onOpenChange={setIsCompanyUpdateDialogOpen}
        onRequestUpdate={(companyName) => {
          console.log("Company Updated: ", companyName);
          setUserProfile({ ...userProfile, companyName: companyName });
        }}
      />
      <WithdrawalDialog
        open={isWithdrawalDialogOpen}
        onOpenChange={setIsWithdrawalDialogOpen}
      />
      <ContractUpdateDialog
        open={isContractUpdateDialogOpen}
        onOpenChange={setIsContractUpdateDialogOpen}
      />
      <div
        aria-label="container"
        className={cx(styles.container, "flex-1 flex")}
      >
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
                  value={userProfile.userId}
                  readOnly
                />
                <NAOutlinedTextField
                  label="Customer ID"
                  value={faker.string.alphanumeric(10).toUpperCase()}
                  readOnly
                />
                <MdOutlinedButton
                  onClick={() => {
                    setIsPasswordUpdateDialogOpen(true);
                  }}
                >
                  Password Update
                </MdOutlinedButton>
                <MdTextButton
                  onClick={() => {
                    setIsWithdrawalDialogOpen(true);
                  }}
                >
                  Withdrawal
                </MdTextButton>
              </div>
              <div className="flex items-center gap-4">
                <SubTitle title="User Information" className="w-fit flex-1" />
                <DividerComponent />
              </div>
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="First Name"
                  value={userProfile.firstName}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, firstName: value });
                  }}
                />
                <NAOutlinedTextField
                  label="Last Name"
                  value={userProfile.lastName}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, lastName: value });
                  }}
                />
              </div>
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="Tel No."
                  type="tel"
                  value={userProfile.tel}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, tel: value });
                  }}
                />
                <NAOutlinedTextField
                  label="Fax No."
                  type="tel"
                  value={userProfile.fax}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, fax: value });
                  }}
                />
              </div>
              <div className="flex gap-4">
                <NAOutlinedTextField
                  label="E-mail"
                  type="email"
                  value={userProfile.email}
                  className="w-96"
                  handleValueChange={(value) => {
                    setUserProfile({ ...userProfile, email: value });
                  }}
                />
                <NAOutlinedListBox
                  options={["Import", "Export", "Export & Import"]}
                  label="Trade"
                  initialValue={userProfile.trade}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, trade: value });
                  }}
                />
                <NAOutlinedListBox
                  options={tempContactOffices}
                  label="Contact Office"
                  initialValue={userProfile.contactOffice}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, contactOffice: value });
                  }}
                />
              </div>
              <div className="flex items-center gap-4">
                <SubTitle title="Company Information" className="flex-1" />
                <DividerComponent />
              </div>
              <div className="flex gap-4 items-center">
                <NAOutlinedTextField
                  label="Company Name"
                  readOnly
                  required
                  className="w-96"
                  value={userProfile.companyName}
                />
                <MdOutlinedButton
                  onClick={() => {
                    setIsCompanyUpdateDialogOpen(true);
                  }}
                >
                  Company Update
                </MdOutlinedButton>
              </div>
              <div className="flex gap-4 items-center">
                <NAOutlinedListBox
                  options={countryOptions}
                  label="Country"
                  initialValue={userProfile.address.country}
                  onSelection={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, country: value },
                    });
                  }}
                />
                <NAOutlinedAutoComplete
                  itemList={cityOptions}
                  label="City"
                  initialValue={userProfile.address.city}
                  onItemSelection={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, city: value },
                    });
                  }}
                />
                <NAOutlinedTextField
                  label="Zip Code"
                  className="w-36"
                  value={userProfile.address.zipCode}
                  handleValueChange={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, zipCode: value },
                    });
                  }}
                />
                <NAOutlinedTextField
                  className="flex-1"
                  label="Address"
                  value={userProfile.address.street}
                  handleValueChange={(value) => {
                    setUserProfile({
                      ...userProfile,
                      address: { ...userProfile.address, street: value },
                    });
                  }}
                />
              </div>
              <div className="flex gap-4 items-center">
                <NAOutlinedListBox
                  options={companyTypeOptions}
                  label="Company Type"
                  initialValue={userProfile.companyType}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, companyType: value });
                  }}
                />
                <NAOutlinedListBox
                  required
                  options={contractNumberOptions}
                  label="Contract No."
                  initialValue={userProfile.recentBLNumber}
                  onSelection={(value) => {
                    setUserProfile({ ...userProfile, recentBLNumber: value });
                  }}
                />
                <MdOutlinedButton
                  onClick={() => {
                    setIsContractUpdateDialogOpen(true);
                  }}
                >
                  Contract No. Update
                </MdOutlinedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
