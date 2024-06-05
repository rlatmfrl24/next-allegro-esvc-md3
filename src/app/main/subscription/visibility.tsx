import { MdTypography } from "@/app/components/typography";
import { InfoOutlined } from "@mui/icons-material";
import {
  CycleSelector,
  SubscriptionItemContainer,
} from "./components/component";
import {
  MdChipSet,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { DividerComponent } from "@/app/components/divider";
import { useEffect, useState } from "react";
import { RemovableChip } from "@/app/components/removable-chip";
import {
  EventDialog,
  SummaryDialog,
  VesselDialog,
} from "./components/visibility-dialog";
import { useSetRecoilState } from "recoil";
import { BottomFloatingState } from "@/app/store/subscription.store";
import Portal from "@/app/components/portal";

export const VisibilitySubscription = () => {
  const [summaryRecipients, setSummaryRecipients] = useState<string[]>([]);
  const [eventRecipients, setEventRecipients] = useState<string[]>([]);
  const [vesselRecipients, setVesselRecipients] = useState<string[]>([]);

  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [isVesselDialogOpen, setIsVesselDialogOpen] = useState(false);

  const [isSummarySubscribed, setIsSummarySubscribed] = useState(false);
  const [isEventSubscribed, setIsEventSubscribed] = useState(false);
  const [isVesselSubscribed, setIsVesselSubscribed] = useState(false);

  const setIsBottomFloatingVisible = useSetRecoilState(BottomFloatingState);

  function handeAddRecipient(
    e: React.KeyboardEvent<any>,
    recipients: string[],
    setRecipients: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    if (e.key === "Enter") {
      if (e.currentTarget.value === "") {
        return;
      }
      if (recipients.includes(e.currentTarget.value)) {
        return;
      }
      setRecipients([...recipients, e.currentTarget.value]);
      setIsBottomFloatingVisible(true);
      e.currentTarget.value = "";
    }
  }

  function handleRemoveRecipient(
    index: number,
    setRecipients: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setRecipients((prev) => prev.filter((_, i) => i !== index));
    setIsBottomFloatingVisible(true);
  }

  return (
    <div className="flex flex-col">
      <MdTypography variant="title" size="large" className="mt-2">
        Visibility
      </MdTypography>
      <div className="flex flex-col gap-6 mt-6">
        <SubscriptionItemContainer
          name="Visibility Summary"
          isSwitchOn={isSummarySubscribed}
          onSwitchChange={(value) => setIsSummarySubscribed(value)}
        >
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsSummaryDialogOpen(true);
              }}
            >
              Setting
            </MdOutlinedButton>
          </div>
          <div slot="content" className="p-6 flex flex-col">
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right mb-4"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
            <div className="flex gap-2">
              <CycleSelector
                label="Sending Cycle"
                onChanges={() => {
                  console.log("change");
                  setIsBottomFloatingVisible(true);
                }}
              />
              <DividerComponent orientation="vertical" />
              <div className="flex-1">
                <MdOutlinedTextField
                  label="Recipients"
                  className="w-full mb-4"
                  onKeyDown={(e) => {
                    handeAddRecipient(
                      e,
                      summaryRecipients,
                      setSummaryRecipients
                    );
                  }}
                />
                <MdChipSet>
                  {summaryRecipients.map((recipient, index) => (
                    <RemovableChip
                      key={recipient}
                      label={recipient}
                      onRemove={() => {
                        handleRemoveRecipient(index, setSummaryRecipients);
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            </div>
          </div>
        </SubscriptionItemContainer>
        <SubscriptionItemContainer
          name="Event Notification"
          isSwitchOn={isEventSubscribed}
          onSwitchChange={(value) => setIsEventSubscribed(value)}
        >
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsEventDialogOpen(true);
              }}
            >
              Setting
            </MdOutlinedButton>
          </div>
          <div slot="content" className="p-6 flex flex-col">
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right mb-4"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
            <div className="flex gap-2">
              <CycleSelector
                label="Sending Cycle"
                onChanges={() => {
                  setIsBottomFloatingVisible(true);
                }}
              />
              <DividerComponent orientation="vertical" />
              <div className="flex-1">
                <MdOutlinedTextField
                  label="Recipients"
                  className="w-full mb-4"
                  onKeyDown={(e) => {
                    handeAddRecipient(e, eventRecipients, setEventRecipients);
                  }}
                />
                <MdChipSet>
                  {eventRecipients.map((recipient, index) => (
                    <RemovableChip
                      key={recipient}
                      label={recipient}
                      onRemove={() => {
                        handleRemoveRecipient(index, setEventRecipients);
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            </div>
          </div>
        </SubscriptionItemContainer>
        <SubscriptionItemContainer
          name="Vessel Schedule Updates"
          isSwitchOn={isVesselSubscribed}
          onSwitchChange={(value) => setIsVesselSubscribed(value)}
        >
          <div slot="actions">
            <MdOutlinedButton
              onClick={() => {
                setIsVesselDialogOpen(true);
              }}
            >
              Setting
            </MdOutlinedButton>
          </div>
          <div slot="content" className="p-6 flex flex-col">
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right mb-4"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
            <div className="flex gap-2">
              <CycleSelector
                label="Sending Cycle"
                onChanges={() => {
                  setIsBottomFloatingVisible(true);
                }}
              />
              <DividerComponent orientation="vertical" />
              <div className="flex-1">
                <MdOutlinedTextField
                  label="Recipients"
                  className="w-full mb-4"
                  onKeyDown={(e) => {
                    handeAddRecipient(e, vesselRecipients, setVesselRecipients);
                  }}
                />
                <MdChipSet>
                  {vesselRecipients.map((recipient, index) => (
                    <RemovableChip
                      key={recipient}
                      label={recipient}
                      onRemove={() => {
                        handleRemoveRecipient(index, setVesselRecipients);
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            </div>
          </div>
        </SubscriptionItemContainer>
      </div>
      <Portal selector="#main-container">
        <SummaryDialog
          open={isSummaryDialogOpen}
          onOpenChange={setIsSummaryDialogOpen}
        />
        <EventDialog
          open={isEventDialogOpen}
          onOpenChange={setIsEventDialogOpen}
        />
        <VesselDialog
          open={isVesselDialogOpen}
          onOpenChange={setIsVesselDialogOpen}
        />
      </Portal>
    </div>
  );
};
