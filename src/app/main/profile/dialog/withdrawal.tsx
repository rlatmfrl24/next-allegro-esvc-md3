import { DividerComponent } from "@/app/components/divider";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import {
  MdCheckbox,
  MdDialog,
  MdFilledButton,
  MdOutlinedButton,
} from "@/app/util/md3";
import { Dispatch, SetStateAction, useState } from "react";

type WithdrawalDialogProps = {
  singleOffer: boolean;
  singleOfferDetail: string;
  switchToAnotherCompany: boolean;
  notExpectedService: boolean;
  other: boolean;
  otherDetail: string;
  comment: string;
};

const CheckItem = (props: {
  label: string;
  checked: boolean;
  onCheckChange: (checked: boolean) => void;
}) => {
  return (
    <MdTypography
      tag="label"
      variant="title"
      size="medium"
      className="flex items-center gap-2 whitespace-nowrap cursor-pointer h-fit"
    >
      <MdCheckbox
        checked={props.checked}
        onClick={() => {
          props.onCheckChange(!props.checked);
        }}
      />
      {props.label}
    </MdTypography>
  );
};

export const WithdrawalDialog = (props: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const [withdrawalReason, setWithdrawalReason] =
    useState<WithdrawalDialogProps>({
      singleOffer: false,
      singleOfferDetail: "",
      switchToAnotherCompany: false,
      notExpectedService: false,
      other: false,
      otherDetail: "",
      comment: "",
    });

  function clearWithdrawalReason() {
    setWithdrawalReason({
      singleOffer: false,
      singleOfferDetail: "",
      switchToAnotherCompany: false,
      notExpectedService: false,
      other: false,
      otherDetail: "",
      comment: "",
    });
  }

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        props.onOpenChange(false);
        clearWithdrawalReason();
      }}
      className="min-w-[840px] min-h-[660px]"
    >
      <div slot="headline">Withdrawal</div>
      <div slot="content" className="flex flex-col">
        <div className="flex flex-col gap-4">
          <MdTypography variant="title" size="medium" className="mb-4">
            1. Why do you want to withdraw your membership from e-Service?
          </MdTypography>
          <CheckItem
            label="Signed up for a one-time offer.  (Please provide more detailed reason.)"
            checked={withdrawalReason.singleOffer}
            onCheckChange={(checked) => {
              setWithdrawalReason({
                ...withdrawalReason,
                singleOffer: checked,
              });
            }}
          />
          {withdrawalReason.singleOffer && (
            <NAOutlinedTextField
              className="pl-8"
              label="Detail Reason"
              value={withdrawalReason.singleOfferDetail}
              handleValueChange={(value) => {
                setWithdrawalReason({
                  ...withdrawalReason,
                  singleOfferDetail: value,
                });
              }}
            />
          )}
          <CheckItem
            label="Switch to another company that provided better information."
            checked={withdrawalReason.switchToAnotherCompany}
            onCheckChange={(checked) => {
              setWithdrawalReason({
                ...withdrawalReason,
                switchToAnotherCompany: checked,
              });
            }}
          />
          <CheckItem
            label="The content is not what I expected."
            checked={withdrawalReason.notExpectedService}
            onCheckChange={(checked) => {
              setWithdrawalReason({
                ...withdrawalReason,
                notExpectedService: checked,
              });
            }}
          />
          <CheckItem
            label="Other (Please provide more detailed reason.) "
            checked={withdrawalReason.other}
            onCheckChange={(checked) => {
              setWithdrawalReason({
                ...withdrawalReason,
                other: checked,
              });
            }}
          />
          {withdrawalReason.other && (
            <NAOutlinedTextField
              className="pl-8"
              label="Detail Reason"
              value={withdrawalReason.otherDetail}
              handleValueChange={(value) => {
                setWithdrawalReason({
                  ...withdrawalReason,
                  otherDetail: value,
                });
              }}
            />
          )}
        </div>
        <DividerComponent className="border-dotted my-4" />
        <div className="flex flex-col">
          <MdTypography variant="title" size="medium" className="mb-4">
            2. If you have any comments or advice about e-Service, please
            comment.
          </MdTypography>
          <NAOutlinedTextField
            className="pl-8 "
            label="Comment"
            value={withdrawalReason.comment}
            handleValueChange={(value) => {
              setWithdrawalReason({
                ...withdrawalReason,
                comment: value,
              });
            }}
          />
        </div>
      </div>
      <div slot="actions">
        <MdOutlinedButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Cancel
        </MdOutlinedButton>
        <MdFilledButton
          onClick={() => {
            props.onOpenChange(false);
          }}
        >
          Withdrawal
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
