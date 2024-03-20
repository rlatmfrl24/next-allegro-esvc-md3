import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { SIEditPartiesState, SIEditStepState } from "@/app/store/si.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { ArrowDropDown, InfoOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export default function StepParties() {
  const setSIEditStep = useSetRecoilState(SIEditStepState);
  const partiesStore = useRecoilValue(SIEditPartiesState);

  const moveToRouteBLStep = useCallback(() => {
    setSIEditStep((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        isSelected: false,
      },
      routeBL: {
        ...prev.routeBL,
        isSelected: true,
      },
    }));
  }, [setSIEditStep]);

  const ValidateRequired = useMemo(() => {
    if (
      partiesStore.shipper.companyName === "" ||
      partiesStore.shipper.fullAddress === "" ||
      partiesStore.notifyParty.companyName === "" ||
      partiesStore.notifyParty.fullAddress === ""
    ) {
      return false;
    }

    if (
      partiesStore.consignee.companyName === "" ||
      partiesStore.consignee.fullAddress === ""
    ) {
      return partiesStore.consignee.isToOrder ? true : false;
    } else {
      return true;
    }
  }, [
    partiesStore.consignee.companyName,
    partiesStore.consignee.fullAddress,
    partiesStore.consignee.isToOrder,
    partiesStore.notifyParty.companyName,
    partiesStore.notifyParty.fullAddress,
    partiesStore.shipper.companyName,
    partiesStore.shipper.fullAddress,
  ]);

  useEffect(() => {
    setSIEditStep((prev) => ({
      ...prev,
      parties: {
        ...prev.parties,
        isCompleted: ValidateRequired,
      },
    }));
  }, [setSIEditStep, ValidateRequired]);

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
      <div className="flex flex-1 justify-end items-end">
        <MdFilledButton
          className="w-fit h-fit self-end"
          onClick={() => {
            moveToRouteBLStep();
          }}
        >
          Next
        </MdFilledButton>
      </div>
    </div>
  );
}

const ShipperInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);

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
                initialValue={{
                  name: partiesStore.shipper.companyName,
                  address: partiesStore.shipper.fullAddress,
                }}
                isAllowOnlyListItems={false}
                itemList={companyList.map((company) => {
                  return {
                    name: company.name,
                    address: `${company.street}, ${company.city}, ${company.country}, ${company.postalCode}`,
                  };
                })}
                onQueryChange={(query) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        companyName: query,
                      },
                    };
                  });
                }}
                onItemSelection={(item) => {
                  if (item.name === "") {
                    setPartiesStore((prev) => {
                      return {
                        ...prev,
                        shipper: {
                          ...prev.shipper,
                          companyName: "",
                        },
                      };
                    });
                  } else {
                    setPartiesStore((prev) => {
                      const addressArray = item.address.split(",");

                      return {
                        ...prev,
                        shipper: {
                          ...prev.shipper,
                          companyName: item.name,
                          fullAddress: item.address,
                          addressCountry: addressArray[2].trim(),
                          addressCityState: addressArray[1].trim(),
                          addressZipCode: addressArray[3].trim(),
                          addressStreet: addressArray[0].trim(),
                        },
                      };
                    });
                  }
                }}
              />
              <NAOutlinedTextField
                required
                label="Address"
                value={partiesStore.shipper.fullAddress || ""}
                className="flex-1"
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        fullAddress: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Country"
                value={partiesStore.shipper.addressCountry || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        addressCountry: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="City / State"
                value={partiesStore.shipper.addressCityState || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        addressCityState: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Zip Code"
                value={partiesStore.shipper.addressZipCode || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        addressZipCode: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <NAOutlinedTextField
              label="Street / P.O Box"
              className="flex-1"
              value={partiesStore.shipper.addressStreet || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    shipper: {
                      ...prev.shipper,
                      addressStreet: value,
                    },
                  };
                });
              }}
            />

            <div className="flex gap-4">
              <NAOutlinedTextField
                label="EORI No"
                value={partiesStore.shipper.eoriNumber || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        eoriNumber: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="USCC No"
                className="flex-1"
                value={partiesStore.shipper.usccNumber || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        usccNumber: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Tax ID"
                value={partiesStore.shipper.taxID || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        taxID: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Phone"
                type="tel"
                value={partiesStore.shipper.phone || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        phone: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Fax"
                type="tel"
                value={partiesStore.shipper.fax || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      shipper: {
                        ...prev.shipper,
                        fax: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <NAOutlinedTextField
              label="Email"
              type="email"
              value={partiesStore.shipper.email || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    shipper: {
                      ...prev.shipper,
                      email: value,
                    },
                  };
                });
              }}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

const ConsigneeInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);

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
              state={partiesStore.consignee.isToOrder ? "checked" : "unchecked"}
              className="self-end w-fit"
              onClick={(isChecked) => {
                if (isChecked) {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        isToOrder: false,
                        companyName: "",
                      },
                    };
                  });
                } else {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        isToOrder: true,
                        companyName: "To Order",
                        fullAddress: "",
                      },
                    };
                  });
                }
              }}
            />
            <div className="flex gap-4">
              <NAMultiAutoComplete
                label="Company"
                className="flex-1"
                required
                readOnly={partiesStore.consignee.isToOrder}
                isAllowOnlyListItems={false}
                itemList={companyList.map((company) => {
                  return {
                    name: company.name,
                    address: `${company.street}, ${company.city}, ${company.country}, ${company.postalCode}`,
                  };
                })}
                initialValue={{
                  name: partiesStore.consignee.companyName,
                  address: partiesStore.consignee.fullAddress,
                }}
                onQueryChange={(query) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        companyName: query,
                      },
                    };
                  });
                }}
                onItemSelection={(item) => {
                  if (item.name === "") {
                    setPartiesStore((prev) => {
                      return {
                        ...prev,
                        consignee: {
                          ...prev.consignee,
                          companyName: "",
                        },
                      };
                    });
                  } else {
                    setPartiesStore((prev) => {
                      const addressArray = item.address.split(",");

                      return {
                        ...prev,
                        consignee: {
                          ...prev.consignee,
                          companyName: item.name,
                          fullAddress: item.address,
                          addressCountry: addressArray[2].trim(),
                          addressCityState: addressArray[1].trim(),
                          addressZipCode: addressArray[3].trim(),
                          addressStreet: addressArray[0].trim(),
                        },
                      };
                    });
                  }
                }}
              />
              <NAOutlinedTextField
                disabled={partiesStore.consignee.isToOrder}
                required
                label="Address"
                className="flex-1"
                value={partiesStore.consignee.fullAddress || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        fullAddress: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Country"
                value={partiesStore.consignee.addressCountry || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        addressCountry: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="City / State"
                value={partiesStore.consignee.addressCityState || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        addressCityState: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Zip Code"
                value={partiesStore.consignee.addressZipCode || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        addressZipCode: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <NAOutlinedTextField
              label="Street / P.O Box"
              className="flex-1"
              value={partiesStore.consignee.addressStreet || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    consignee: {
                      ...prev.consignee,
                      addressStreet: value,
                    },
                  };
                });
              }}
            />
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="EORI No"
                value={partiesStore.consignee.eoriNumber || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        eoriNumber: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="USCC No"
                className="flex-1"
                value={partiesStore.consignee.usccNumber || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        usccNumber: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Tax ID"
                value={partiesStore.consignee.taxID || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        taxID: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Phone"
                type="tel"
                value={partiesStore.consignee.phone || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        phone: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Fax"
                type="tel"
                value={partiesStore.consignee.fax || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        fax: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Email"
                type="email"
                value={partiesStore.consignee.email || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        email: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Contact Person"
                value={partiesStore.consignee.contactPerson || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      consignee: {
                        ...prev.consignee,
                        contactPerson: value,
                      },
                    };
                  });
                }}
              />
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const NotifyPartyInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);

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
              state={
                partiesStore.consignee.companyName ===
                  partiesStore.notifyParty.companyName &&
                partiesStore.consignee.fullAddress ===
                  partiesStore.notifyParty.fullAddress &&
                partiesStore.consignee.addressCountry ===
                  partiesStore.notifyParty.addressCountry &&
                partiesStore.consignee.addressCityState ===
                  partiesStore.notifyParty.addressCityState &&
                partiesStore.consignee.addressZipCode ===
                  partiesStore.notifyParty.addressZipCode &&
                partiesStore.consignee.addressStreet ===
                  partiesStore.notifyParty.addressStreet
                  ? "checked"
                  : "unchecked"
              }
              className="w-fit self-end"
              onClick={(isChecked) => {
                if (isChecked) {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        companyName: "",
                        fullAddress: "",
                        addressCountry: "",
                        addressCityState: "",
                        addressZipCode: "",
                        addressStreet: "",
                      },
                    };
                  });
                } else {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        companyName: partiesStore.consignee.companyName,
                        fullAddress: partiesStore.consignee.fullAddress,
                        addressCountry: partiesStore.consignee.addressCountry,
                        addressCityState:
                          partiesStore.consignee.addressCityState,
                        addressZipCode: partiesStore.consignee.addressZipCode,
                        addressStreet: partiesStore.consignee.addressStreet,
                      },
                    };
                  });
                }
              }}
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
                initialValue={{
                  name: partiesStore.notifyParty.companyName,
                  address: partiesStore.notifyParty.fullAddress,
                }}
                onQueryChange={(query) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        companyName: query,
                      },
                    };
                  });
                }}
                onItemSelection={(item) => {
                  if (item.name === "") {
                    setPartiesStore((prev) => {
                      return {
                        ...prev,
                        notifyParty: {
                          ...prev.notifyParty,
                          companyName: "",
                        },
                      };
                    });
                  } else {
                    setPartiesStore((prev) => {
                      const addressArray = item.address.split(",");

                      return {
                        ...prev,
                        notifyParty: {
                          ...prev.notifyParty,
                          companyName: item.name,
                          fullAddress: item.address,
                          addressCountry: addressArray[2].trim(),
                          addressCityState: addressArray[1].trim(),
                          addressZipCode: addressArray[3].trim(),
                          addressStreet: addressArray[0].trim(),
                        },
                      };
                    });
                  }
                }}
              />
              <NAOutlinedTextField
                required
                label="Address"
                className="flex-1"
                value={partiesStore.notifyParty.fullAddress || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        fullAddress: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Country"
                value={partiesStore.notifyParty.addressCountry || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        addressCountry: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="City / State"
                value={partiesStore.notifyParty.addressCityState || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        addressCityState: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Zip Code"
                value={partiesStore.notifyParty.addressZipCode || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        addressZipCode: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <NAOutlinedTextField
              label="Street / P.O Box"
              className="flex-1"
              value={partiesStore.notifyParty.addressStreet || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    notifyParty: {
                      ...prev.notifyParty,
                      addressStreet: value,
                    },
                  };
                });
              }}
            />
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="EORI No"
                value={partiesStore.notifyParty.eoriNumber || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        eoriNumber: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="USCC No"
                className="flex-1"
                value={partiesStore.notifyParty.usccNumber || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        usccNumber: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <div className="flex gap-4">
              <NAOutlinedTextField
                label="Tax ID"
                value={partiesStore.notifyParty.taxID || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        taxID: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Phone"
                type="tel"
                value={partiesStore.notifyParty.phone || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        phone: value,
                      },
                    };
                  });
                }}
              />
              <NAOutlinedTextField
                label="Fax"
                type="tel"
                value={partiesStore.notifyParty.fax || ""}
                handleValueChange={(value) => {
                  setPartiesStore((prev) => {
                    return {
                      ...prev,
                      notifyParty: {
                        ...prev.notifyParty,
                        fax: value,
                      },
                    };
                  });
                }}
              />
            </div>
            <NAOutlinedTextField
              label="Email"
              type="email"
              value={partiesStore.notifyParty.email || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    notifyParty: {
                      ...prev.notifyParty,
                      email: value,
                    },
                  };
                });
              }}
            />
            <MdOutlinedTextField
              label="Also Notify"
              type="textarea"
              rows={5}
              value={partiesStore.notifyParty.alsoNotify || ""}
              onInput={(e) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    notifyParty: {
                      ...prev.notifyParty,
                      alsoNotify: e.currentTarget.value,
                    },
                  };
                });
              }}
            />
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const ReferencesInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);

  return (
    <Disclosure defaultOpen>
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
              value={partiesStore.exportReference || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    exportReference: value,
                  };
                });
              }}
            />
            <NAOutlinedTextField
              label="Forwarding Agent References"
              type="textarea"
              rows={5}
              value={partiesStore.forwardingAgentReference || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    forwardingAgentReference: value,
                  };
                });
              }}
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
