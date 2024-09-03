import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { SIEditPartiesState, SIEditStepState } from "@/app/store/si.store";
import { MdCheckbox } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { ArrowDropDown } from "@mui/icons-material";
import { useRecoilState, useRecoilValue } from "recoil";
import { splitForSIForm } from "./util";
import { useMemo } from "react";

export const NotifyPartyInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);
  const SIEditStep = useRecoilValue(SIEditStepState);

  const companyList = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const location = faker.location;
      return {
        name: faker.company.name(),
        street: location.streetAddress(),
        country: location.country(),
        city: location.city(),
        postalCode: location.zipCode(),
      };
    });
  }, []);

  const countryList = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      const location = faker.location;
      return location.country();
    }).filter((value, index, self) => self.indexOf(value) === index);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <DetailTitle title="Notify Party" />
        <NaToggleButton
          label="Same as Consignee"
          state={
            partiesStore.consignee.isToOrder ||
            partiesStore.consignee.companyName === "" ||
            partiesStore.consignee.fullAddress === ""
              ? "disabled"
              : partiesStore.consignee.companyName ===
                  partiesStore.notifyParty.companyName &&
                partiesStore.consignee.fullAddress ===
                  partiesStore.notifyParty.fullAddress &&
                partiesStore.consignee.addressCountry ===
                  partiesStore.notifyParty.addressCountry &&
                partiesStore.consignee.addressCity ===
                  partiesStore.notifyParty.addressCity &&
                partiesStore.consignee.addressState ===
                  partiesStore.notifyParty.addressState &&
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
                    addressCity: "",
                    addressZipCode: "",
                    addressStreet: "",
                    addressState: "",
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
                    addressCity: partiesStore.consignee.addressCity,
                    addressState: partiesStore.consignee.addressState,
                    addressZipCode: partiesStore.consignee.addressZipCode,
                    addressStreet: partiesStore.consignee.addressStreet,
                  },
                };
              });
            }
          }}
        />
      </div>
      <div className={`flex flex-col gap-4`}>
        <NAMultiAutoComplete
          label="Company Name"
          className="flex-1"
          required
          type="textarea"
          rows={2}
          error={
            SIEditStep.parties.visited &&
            partiesStore.notifyParty.companyName === ""
          }
          errorText="Company Name is required"
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
          onBlur={(e) => {
            // split 35 characters
            let splitTexts = e.currentTarget.value
              .replaceAll("\n", "")
              .match(/.{1,35}/g)
              ?.join("\n")
              .toUpperCase();

            if (splitTexts) {
              e.currentTarget.value = splitTexts;
              setPartiesStore((prev) => ({
                ...prev,
                notifyParty: {
                  ...prev.notifyParty,
                  companyName: splitTexts as string,
                },
              }));
            }
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
                    companyName: splitForSIForm(item.name) as string,
                    fullAddress: splitForSIForm(item.address) as string,
                  },
                };
              });
            }
          }}
        />
        <NAOutlinedTextField
          required
          rows={3}
          error={
            SIEditStep.parties.visited &&
            partiesStore.notifyParty.fullAddress === ""
          }
          errorText="Full Address is required"
          label="Address (State Name, City, State & Zip Code, Country Name)"
          className="flex-1"
          type="textarea"
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
          onBlur={(e) => {
            // split 35 characters
            let splitTexts = e.currentTarget.value
              .replaceAll("\n", "")
              .match(/.{1,35}/g)
              ?.join("\n")
              .toUpperCase();

            if (splitTexts) {
              e.currentTarget.value = splitTexts;
              setPartiesStore((prev) => ({
                ...prev,
                notifyParty: {
                  ...prev.notifyParty,
                  fullAddress: splitTexts as string,
                },
              }));
            }
          }}
        />
        <div className="flex gap-2">
          <NAOutlinedAutoComplete
            label="Country"
            itemList={countryList}
            isAllowOnlyListItems={false}
            initialValue={partiesStore.notifyParty.addressCountry || ""}
            onQueryChange={(query) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  notifyParty: {
                    ...prev.notifyParty,
                    addressCountry: query,
                  },
                };
              });
            }}
            onItemSelection={(country) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  notifyParty: {
                    ...prev.notifyParty,
                    addressCountry: country,
                  },
                };
              });
            }}
          />

          <NAOutlinedTextField
            label="City"
            value={partiesStore.notifyParty.addressCity || ""}
            handleValueChange={(value) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  notifyParty: {
                    ...prev.notifyParty,
                    addressCity: value,
                  },
                };
              });
            }}
          />
          <NAOutlinedTextField
            label="State"
            enableClearButton={false}
            className="w-24"
            value={partiesStore.notifyParty.addressState || ""}
            handleValueChange={(value) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  notifyParty: {
                    ...prev.notifyParty,
                    addressState: value,
                  },
                };
              });
            }}
          />

          <NAOutlinedTextField
            label="Zip Code"
            className="w-44"
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

        <Disclosure
          defaultOpen={
            Boolean(partiesStore.notifyParty.eoriNumber) ||
            Boolean(partiesStore.notifyParty.usccNumber) ||
            Boolean(partiesStore.notifyParty.taxID) ||
            Boolean(partiesStore.notifyParty.phone) ||
            Boolean(partiesStore.notifyParty.fax) ||
            Boolean(partiesStore.notifyParty.email) ||
            Boolean(partiesStore.notifyParty.contactPerson)
          }
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`w-fit p-2 flex items-center gap-3`}
              >
                <MdCheckbox checked={open} />
                <MdTypography variant="title" size="small">
                  Additional Information
                </MdTypography>
              </Disclosure.Button>
              <Disclosure.Panel className={`grid grid-cols-4 gap-4`}>
                <NAOutlinedTextField
                  label="EORI No"
                  className="col-span-2"
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
                  className="col-span-2"
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
                <NAOutlinedTextField
                  label="Email"
                  type="email"
                  className="col-span-2"
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
                <NAOutlinedTextField
                  label="Contact Person"
                  className="col-span-2"
                  value={partiesStore.notifyParty.contactPerson || ""}
                  handleValueChange={(value) => {
                    setPartiesStore((prev) => {
                      return {
                        ...prev,
                        notifyParty: {
                          ...prev.notifyParty,
                          contactPerson: value,
                        },
                      };
                    });
                  }}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
