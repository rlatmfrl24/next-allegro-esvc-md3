import { DividerComponent } from "@/app/components/divider";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { MdElevation, MdFilledButton } from "@/app/util/md3";
import { SignUpFormProps } from "@/app/util/typeDef/sign";
import {
  AccessTime,
  ContactPhoneOutlined,
  ManageAccountsOutlined,
  MarkEmailUnreadOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { CSSProperties, ReactNode } from "react";

export const SignUpPreview = (props: { formData: SignUpFormProps }) => {
  const router = useRouter();

  return (
    <div className="px-8 pb-6 pt-2">
      <div className="fixed bottom-0 left-0 w-full px-4 py-2 z-10">
        <div
          style={
            {
              "--md-elevation-level": "2",
            } as CSSProperties
          }
          className="relative w-full p-2 rounded-full text-right bg-surfaceContainerLow "
        >
          <MdElevation />
          <MdFilledButton
            onClick={() => {
              router.push("/sign");
            }}
          >
            Go to Main
          </MdFilledButton>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1">
          <DetailTitle title="User Information" />
          <div className="grid grid-cols-[160px_1fr] gap-2 py-4">
            <BasicItem title="User ID" value={props.formData.userId} />
            <BasicItem title="First Name" value={props.formData.firstName} />
            <BasicItem title="Last Name" value={props.formData.lastName} />
            <BasicItem title="Tel No." value={props.formData.tel} />
            <BasicItem title="Fax No." value={props.formData.fax} />
            <BasicItem title="Email" value={props.formData.email} />
            <BasicItem title="Comment" value={props.formData.comment} />
          </div>
        </div>
        <DividerComponent className="border-dashed" orientation="vertical" />
        <div className="flex-1">
          <DetailTitle title="Company Information" />
          <div className="grid grid-cols-[160px_1fr] gap-2 py-4">
            <BasicItem
              title="Company Name"
              value={props.formData.companyName}
            />
            <BasicItem
              title="Company Type"
              value={props.formData.companyType}
            />
            <BasicItem
              title="Contact Office"
              value={props.formData.contactOffice}
            />
            <BasicItem title="Trade" value={props.formData.trade} />
            <BasicItem title="Country" value={props.formData.address.country} />
            <BasicItem
              title="Zip Code"
              value={props.formData.address.zipCode}
            />
            <BasicItem title="City" value={props.formData.address.city} />
            <BasicItem title="Street" value={props.formData.address.street} />
          </div>
        </div>
      </div>
      <DividerComponent className="border-dashed my-6" />
      <MdTypography variant="body" size="medium" prominent>
        e-Service Notice
      </MdTypography>
      <div className="flex gap-4 mt-4">
        <NoticeItem
          title="Standard Approval Procedure"
          value="Within 24 hours (1 business day) of submission"
          icon={<AccessTime />}
        />
        <NoticeItem
          title="Send Confirmation Email"
          value="A confirmation email will be sent to your registered email address."
          icon={<MarkEmailUnreadOutlined />}
        />
        <NoticeItem
          title="Contact your Local Office"
          value="If you require assistance or are experiencing an unannounced delay, please contact your local office directly."
          icon={<ContactPhoneOutlined />}
        />
        <NoticeItem
          title="New export service account"
          value="Please contact responsible sales representative in order to be provided a shipper code to match the account prior to approval."
          icon={<ManageAccountsOutlined />}
        />
      </div>
    </div>
  );
};

const NoticeItem = (props: {
  title: string;
  value: string;
  icon: ReactNode;
}) => {
  return (
    <div className="border-2 border-secondaryContainer rounded-lg text-outline flex-1 flex flex-col items-center p-6 gap-2 justify-center">
      {props.icon}
      <MdTypography variant="label" size="large">
        {props.title}
      </MdTypography>
      <MdTypography variant="body" size="small" className="text-center">
        {props.value}
      </MdTypography>
    </div>
  );
};

const BasicItem = (props: { title: string; value: string }) => {
  return (
    <>
      <MdTypography variant="body" size="medium" className="text-outline">
        {props.title}
      </MdTypography>
      <MdTypography variant="body" size="large" className="text-onSurface ml-2">
        {props.value.split("\n").map((line, index) => (
          <span key={index}>
            {line}
            <br />
          </span>
        ))}
      </MdTypography>
    </>
  );
};
