import { MdTypography } from "@/app/components/typography";
import { InfoOutlined } from "@mui/icons-material";
import { CycleSelector, SubscriptionItemContainer } from "./component";
import {
  MdChipSet,
  MdOutlinedButton,
  MdOutlinedTextField,
} from "@/app/util/md3";
import { DividerComponent } from "@/app/components/divider";
import { useState } from "react";
import { RemovableChip } from "@/app/components/removable-chip";

export const VisibilitySubscription = () => {
  const [summaryRecipients, setSummaryRecipients] = useState<string[]>([]);
  const [eventRecipients, setEventRecipients] = useState<string[]>([]);
  const [vesselRecipients, setVesselRecipients] = useState<string[]>([]);

  return (
    <div className="flex flex-col">
      <MdTypography variant="title" size="large" className="mt-2">
        Visibility
      </MdTypography>
      <div className="flex flex-col gap-6 mt-6">
        <SubscriptionItemContainer name="Visibility Summary">
          <div slot="actions">
            <MdOutlinedButton>Setting</MdOutlinedButton>
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
              <CycleSelector label="Sending Cycle" />
              <DividerComponent orientation="vertical" />
              <div className="flex-1">
                <MdOutlinedTextField
                  label="Recipients"
                  className="w-full mb-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.currentTarget.value === "") {
                        return;
                      }
                      if (summaryRecipients.includes(e.currentTarget.value)) {
                        return;
                      }
                      setSummaryRecipients([
                        ...summaryRecipients,
                        e.currentTarget.value,
                      ]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <MdChipSet>
                  {summaryRecipients.map((recipient, index) => (
                    <RemovableChip
                      key={recipient}
                      label={recipient}
                      onRemove={() => {
                        setSummaryRecipients((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            </div>
          </div>
        </SubscriptionItemContainer>
        <SubscriptionItemContainer name="Event Notification">
          <div slot="actions">
            <MdOutlinedButton>Setting</MdOutlinedButton>
          </div>
          <div slot="content" className="p-6 flex flex-col">
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
            <div className="flex gap-2">
              <CycleSelector label="Sending Cycle" />
              <DividerComponent orientation="vertical" />
              <div className="flex-1">
                <MdOutlinedTextField
                  label="Recipients"
                  className="w-full mb-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.currentTarget.value === "") {
                        return;
                      }
                      if (eventRecipients.includes(e.currentTarget.value)) {
                        return;
                      }
                      setEventRecipients([
                        ...eventRecipients,
                        e.currentTarget.value,
                      ]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <MdChipSet>
                  {eventRecipients.map((recipient, index) => (
                    <RemovableChip
                      key={recipient}
                      label={recipient}
                      onRemove={() => {
                        setEventRecipients((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            </div>
          </div>
        </SubscriptionItemContainer>
        <SubscriptionItemContainer name="Vessel Schedule Updates">
          <div slot="actions">
            <MdOutlinedButton>Setting</MdOutlinedButton>
          </div>
          <div slot="content" className="p-6 flex flex-col">
            <MdTypography
              variant="body"
              size="medium"
              className="text-outline text-right"
            >
              <InfoOutlined fontSize="small" className="mr-1" />
              To enter multiple values, separated by a comma or space.
            </MdTypography>
            <div className="flex gap-2">
              <CycleSelector label="Sending Cycle" />
              <DividerComponent orientation="vertical" />
              <div className="flex-1">
                <MdOutlinedTextField
                  label="Recipients"
                  className="w-full mb-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.currentTarget.value === "") {
                        return;
                      }
                      if (vesselRecipients.includes(e.currentTarget.value)) {
                        return;
                      }
                      setVesselRecipients([
                        ...vesselRecipients,
                        e.currentTarget.value,
                      ]);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <MdChipSet>
                  {vesselRecipients.map((recipient, index) => (
                    <RemovableChip
                      key={recipient}
                      label={recipient}
                      onRemove={() => {
                        setVesselRecipients((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                    />
                  ))}
                </MdChipSet>
              </div>
            </div>
          </div>
        </SubscriptionItemContainer>
      </div>
    </div>
  );
};
