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

export const ConsigneeInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);
  const SIEditStep = useRecoilValue(SIEditStepState);

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

  const countryList = Array.from({ length: 100 }, (_, i) => {
    const location = faker.location;
    return location.country();
  }).filter((value, index, self) => self.indexOf(value) === index);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <DetailTitle title="Consignee" />
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
                    fullAddress: "",
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
                  },
                };
              });
            }
          }}
        />
      </div>
      <div className={`flex flex-col gap-4 mb-6`}>
        <NAMultiAutoComplete
          label="Company Name"
          className="flex-1"
          required
          error={
            SIEditStep.parties.visited &&
            partiesStore.consignee.companyName === ""
          }
          type="textarea"
          maxLength={70}
          rows={2}
          errorText="Company Name is required"
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
                consignee: {
                  ...prev.consignee,
                  companyName: splitTexts as string,
                },
              }));
            }
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
                return {
                  ...prev,
                  consignee: {
                    ...prev.consignee,
                    companyName: item.name,
                    fullAddress: item.address,
                  },
                };
              });
            }
          }}
        />
        <NAOutlinedTextField
          required
          error={
            SIEditStep.parties.visited &&
            partiesStore.consignee.fullAddress === ""
          }
          errorText="Full Address is required"
          label="Address (State Name, City, State & Zip Code, Country Name)"
          maxLength={105}
          rows={3}
          className="flex-1"
          type="textarea"
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
                consignee: {
                  ...prev.consignee,
                  fullAddress: splitTexts as string,
                },
              }));
            }
          }}
        />
        <div className="grid grid-cols-4 gap-4">
          <NAOutlinedAutoComplete
            label="Country"
            itemList={countryList}
            isAllowOnlyListItems={false}
            initialValue={partiesStore.consignee.addressCountry || ""}
            onQueryChange={(query) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  consignee: {
                    ...prev.consignee,
                    addressCountry: query,
                  },
                };
              });
            }}
            onItemSelection={(country) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  consignee: {
                    ...prev.consignee,
                    addressCountry: country,
                  },
                };
              });
            }}
          />

          <NAOutlinedTextField
            label="City / State"
            maxLength={30}
            value={partiesStore.consignee.addressCity || ""}
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
          <div className="col-span-2 flex gap-4">
            <NAOutlinedTextField
              label="Zip Code"
              className="w-36"
              maxLength={10}
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
            <NAOutlinedTextField
              label="Street / P.O Box"
              className="flex-1"
              maxLength={50}
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
          </div>
        </div>

        <Disclosure
          defaultOpen={
            Boolean(partiesStore.consignee.eoriNumber) ||
            Boolean(partiesStore.consignee.usccNumber) ||
            Boolean(partiesStore.consignee.taxID) ||
            Boolean(partiesStore.consignee.phone) ||
            Boolean(partiesStore.consignee.fax) ||
            Boolean(partiesStore.consignee.email) ||
            Boolean(partiesStore.consignee.contactPerson)
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
                  maxLength={17}
                  className="col-span-2"
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
                  maxLength={30}
                  className="col-span-2"
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
                <NAOutlinedTextField
                  label="Tax ID"
                  maxLength={30}
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
                  maxLength={20}
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
                  maxLength={20}
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
                <NAOutlinedTextField
                  label="Email"
                  type="email"
                  maxLength={100}
                  className="col-span-2"
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
                  className="col-span-2"
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
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};
