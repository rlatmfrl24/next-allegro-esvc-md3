import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { SIEditPartiesState, SIEditStepState } from "@/app/store/si.store";
import { MdCheckbox } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Disclosure } from "@headlessui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { splitForSIForm } from "./util";
import { slice } from "lodash";
import { useMemo } from "react";

export const ShipperInfo = () => {
  const [partiesStore, setPartiesStore] = useRecoilState(SIEditPartiesState);
  //   const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);
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
      <DetailTitle title="Shipper" className="mb-4" />
      <div className={`flex flex-col gap-4`}>
        <NAMultiAutoComplete
          label="Company Name"
          required
          error={
            SIEditStep.parties.visited &&
            partiesStore.shipper.companyName === ""
          }
          errorText="Company Name is required"
          className="flex-1"
          initialValue={{
            name: partiesStore.shipper.companyName,
            address: partiesStore.shipper.fullAddress,
          }}
          type="textarea"
          rows={2}
          isAllowOnlyListItems={false}
          maxLength={70}
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
          onBlur={(e) => {
            // split 35 characters
            let splitTexts = splitForSIForm(e.currentTarget.value);

            if (splitTexts) {
              e.currentTarget.value = splitTexts;
              setPartiesStore((prev) => ({
                ...prev,
                shipper: {
                  ...prev.shipper,
                  companyName: splitTexts as string,
                },
              }));
            }
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
                return {
                  ...prev,
                  shipper: {
                    ...prev.shipper,
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
          error={
            SIEditStep.parties.visited &&
            partiesStore.shipper.fullAddress === ""
          }
          maxLength={105}
          rows={3}
          errorText="Full Address is required"
          label="Address (State Name, City, State & Zip Code, Country Name)"
          type="textarea"
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
                shipper: {
                  ...prev.shipper,
                  fullAddress: splitTexts as string,
                },
              }));
            }
          }}
        />
        <div className="flex gap-4">
          <NAOutlinedAutoComplete
            label="Country"
            itemList={countryList}
            isAllowOnlyListItems={false}
            initialValue={partiesStore.shipper.addressCountry || ""}
            onQueryChange={(query) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  shipper: {
                    ...prev.shipper,
                    addressCountry: query,
                  },
                };
              });
            }}
            onItemSelection={(country) => {
              setPartiesStore((prev) => {
                return {
                  ...prev,
                  shipper: {
                    ...prev.shipper,
                    addressCountry: country,
                  },
                };
              });
            }}
          />
          <div className="flex gap-2">
            <NAOutlinedTextField
              label="City"
              maxLength={30}
              value={partiesStore.shipper.addressCity || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    shipper: {
                      ...prev.shipper,
                      addressCity: value,
                    },
                  };
                });
              }}
            />
            <NAOutlinedTextField
              label="State"
              maxLength={2}
              className="w-24"
              enableClearButton={false}
              value={partiesStore.shipper.addressState || ""}
              handleValueChange={(value) => {
                setPartiesStore((prev) => {
                  return {
                    ...prev,
                    shipper: {
                      ...prev.shipper,
                      addressState: value,
                    },
                  };
                });
              }}
            />
          </div>
          <NAOutlinedTextField
            label="Zip Code"
            className="w-44"
            maxLength={10}
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
          className="col-span-4"
          maxLength={50}
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
        <Disclosure
          defaultOpen={
            Boolean(partiesStore.shipper.eoriNumber) ||
            Boolean(partiesStore.shipper.usccNumber) ||
            Boolean(partiesStore.shipper.taxID) ||
            Boolean(partiesStore.shipper.phone) ||
            Boolean(partiesStore.shipper.fax) ||
            Boolean(partiesStore.shipper.email)
          }
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`w-fit p-2 flex items-center gap-2`}
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
                  maxLength={17}
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
                  maxLength={30}
                  className="col-span-2"
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
                <NAOutlinedTextField
                  label="Tax ID"
                  maxLength={30}
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
                  maxLength={20}
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
                  maxLength={20}
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
                <NAOutlinedTextField
                  label="Email"
                  type="email"
                  maxLength={100}
                  className="col-span-2"
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
      </div>
    </div>
  );
};
