import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
  SIEditContactInformationState,
  SIEditStepState,
} from "@/app/store/si.store";
import {
  MdCheckbox,
  MdChipSet,
  MdDialog,
  MdFilledButton,
  MdFilledTonalButton,
  MdIcon,
  MdIconButton,
  MdInputChip,
  MdList,
  MdListItem,
  MdOutlinedButton,
  MdOutlinedTextField,
  MdRippleEffect,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { DeleteOutline, MailOutline } from "@mui/icons-material";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function StepContactInformation() {
  // const setSIEditStep = useSetRecoilState(SIEditStepState);
  const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);
  const [contactInformationStore, setContactInformationStore] = useRecoilState(
    SIEditContactInformationState
  );
  const [isManageEmailDialogOpen, setIsManageEmailDialogOpen] = useState(false);
  const tempEmailRecipients = useMemo(() => {
    return [
      faker.internet.email(),
      faker.internet.email(),
      faker.internet.email(),
      ...contactInformationStore.emailRecipient,
    ];
  }, [contactInformationStore.emailRecipient]);
  const [emailRecipients, setEmailRecipients] =
    useState<Array<string>>(tempEmailRecipients);
  const [newEmailInput, setNewEmailInput] = useState<string>("");
  const [newEmailRecipients, setNewEmailRecipients] = useState<Array<string>>(
    []
  );

  useEffect(() => {
    setSIEditStep((prev) => ({
      ...prev,
      contactInformation: {
        ...prev.contactInformation,
        isCompleted:
          !!contactInformationStore.name &&
          !!contactInformationStore.telNumber &&
          !!contactInformationStore.address &&
          !!contactInformationStore.email,
      },
    }));
  }, [
    contactInformationStore.name,
    contactInformationStore.telNumber,
    contactInformationStore.email,
    contactInformationStore.address,
    setSIEditStep,
  ]);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-4">
        Contact Information
      </MdTypography>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-4 gap-4">
          <NAOutlinedTextField
            required
            error={
              SIEditStep.contactInformation.visited &&
              contactInformationStore.name === ""
            }
            errorText="Name is required"
            label="Name"
            value={contactInformationStore.name}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  name: value,
                };
              });
            }}
          />
          {/* <NAOutlinedTextField
            required
            error={
              SIEditStep.contactInformation.visited &&
              contactInformationStore.email === ""
            }
            errorText="Email is required"
            label="Email"
            type="email"
            value={contactInformationStore.email}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  email: value,
                };
              });
            }}
          /> */}
          <NAOutlinedTextField
            required
            error={
              SIEditStep.contactInformation.visited &&
              contactInformationStore.telNumber === ""
            }
            errorText="Tel No. is required"
            label="Tel No."
            type="tel"
            value={contactInformationStore.telNumber}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  telNumber: value,
                };
              });
            }}
          />
          <NAOutlinedTextField
            label="Fax"
            type="tel"
            value={contactInformationStore.fax}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  fax: value,
                };
              });
            }}
          />
          <NAOutlinedTextField
            required
            error={
              SIEditStep.contactInformation.visited &&
              contactInformationStore.address === ""
            }
            errorText="Address is required"
            className="col-span-2"
            type="textarea"
            label="Address"
            value={contactInformationStore.address}
            handleValueChange={(value) => {
              setContactInformationStore((prev) => {
                return {
                  ...prev,
                  address: value,
                };
              });
            }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <DetailTitle title="Email Recipient" />
          <div className="flex items-center gap-4">
            <MdOutlinedButton
              hasIcon
              onClick={() => {
                setIsManageEmailDialogOpen(true);
              }}
            >
              <MdIcon slot="icon">
                <MailOutline fontSize="small" />
              </MdIcon>
              Manage Email
            </MdOutlinedButton>
            {contactInformationStore.emailRecipient.length > 0 && (
              <MdChipSet>
                {contactInformationStore.emailRecipient.map((email) => {
                  return (
                    <MdInputChip
                      key={email}
                      label={email}
                      selected
                      remove={() => {
                        setContactInformationStore((prev) => {
                          return {
                            ...prev,
                            emailRecipient: prev.emailRecipient.filter(
                              (e) => e !== email
                            ),
                          };
                        });
                      }}
                    />
                  );
                })}
              </MdChipSet>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <DetailTitle title="Email Notification Subscription" />
          <div className="flex flex-col gap-1">
            <NaToggleButton
              label="Roll-Over (Including T/S)"
              className="w-fit"
              state={
                contactInformationStore.subscrition.rollOver
                  ? "checked"
                  : "unchecked"
              }
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    subscrition: {
                      ...prev.subscrition,
                      rollOver: !prev.subscrition.rollOver,
                    },
                  };
                });
              }}
            />
            <NaToggleButton
              label="Vessel Departure"
              className="w-fit"
              state={
                contactInformationStore.subscrition.vesselDeparture
                  ? "checked"
                  : "unchecked"
              }
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    subscrition: {
                      ...prev.subscrition,
                      vesselDeparture: !prev.subscrition.vesselDeparture,
                    },
                  };
                });
              }}
            />
            <NaToggleButton
              label="Vessel Advance / Delay"
              className="w-fit"
              state={
                contactInformationStore.subscrition.vesselAdvanceDelay
                  ? "checked"
                  : "unchecked"
              }
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    subscrition: {
                      ...prev.subscrition,
                      vesselAdvanceDelay: !prev.subscrition.vesselAdvanceDelay,
                    },
                  };
                });
              }}
            />
          </div>
        </div>
      </div>
      <Portal selector="#main-container">
        <MdDialog
          className="min-w-[720px]"
          open={isManageEmailDialogOpen}
          opened={() => {
            setNewEmailRecipients(contactInformationStore.emailRecipient);
          }}
          closed={() => {
            setIsManageEmailDialogOpen(false);
          }}
        >
          <div slot="headline">Manage Email</div>
          <div slot="content" className="flex flex-col">
            <div className="flex w-full gap-2 items-center">
              <NAOutlinedTextField
                className="flex-1"
                label="Email"
                placeholder="e.g. email@email.com"
                type="email"
                value={newEmailInput}
                required
                handleValueChange={(value) => {
                  setNewEmailInput(value);
                }}
              />
              <MdFilledTonalButton
                className="h-fit"
                onClick={() => {
                  //check email validation by regex
                  const emailRegex =
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                  if (!emailRegex.test(newEmailInput)) {
                    return;
                  } else {
                    setEmailRecipients([...emailRecipients, newEmailInput]);
                    setNewEmailInput("");
                  }
                }}
              >
                Add Email
              </MdFilledTonalButton>
            </div>
            <MdTypography variant="title" size="medium" className="mt-6">
              Email Recipient
            </MdTypography>
            <MdList className="bg-surfaceContainerLow">
              {emailRecipients.map((email) => {
                return (
                  <MdListItem
                    key={email}
                    className="relative cursor-pointer"
                    onClick={() => {
                      setNewEmailRecipients(
                        newEmailRecipients.includes(email)
                          ? newEmailRecipients.filter((e) => e !== email)
                          : [...newEmailRecipients, email]
                      );
                    }}
                  >
                    <MdRippleEffect />
                    <MdCheckbox
                      slot="start"
                      checked={newEmailRecipients.includes(email)}
                    />
                    <MdTypography variant="body" size="large">
                      {email}
                    </MdTypography>
                    <div slot="end">
                      <MdIconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setEmailRecipients(
                            emailRecipients.filter((e) => e !== email)
                          );
                          setNewEmailRecipients(
                            newEmailRecipients.filter((e) => e !== email)
                          );
                        }}
                      >
                        <DeleteOutline fontSize="small" />
                      </MdIconButton>
                    </div>
                  </MdListItem>
                );
              })}
            </MdList>
          </div>
          <div slot="actions" className="flex gap-2">
            <MdTextButton
              onClick={() => {
                setNewEmailRecipients([]);
                setIsManageEmailDialogOpen(false);
              }}
            >
              Close
            </MdTextButton>
            <MdFilledButton
              onClick={() => {
                setContactInformationStore((prev) => {
                  return {
                    ...prev,
                    emailRecipient: newEmailRecipients,
                  };
                });
                setIsManageEmailDialogOpen(false);
              }}
            >
              Apply
            </MdFilledButton>
          </div>
        </MdDialog>
      </Portal>
    </div>
  );
}
