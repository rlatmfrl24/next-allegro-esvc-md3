import { DividerComponent } from "@/app/components/divider";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { SignUpFormProps } from "@/app/util/typeDef/sign";

export const SignUpPreview = (props: { formData: SignUpFormProps }) => {
  return (
    <div className="min-w-[640px]">
      <DetailTitle title="Company Information" />
      <div className="grid grid-cols-[160px_1fr] gap-2 py-4">
        <BasicItem title="Company Name" value={props.formData.companyName} />
        <BasicItem title="Company Type" value={props.formData.companyType} />
        <BasicItem title="Country" value={props.formData.address.country} />
        <BasicItem title="Zip Code" value={props.formData.address.zipCode} />
        <BasicItem title="City" value={props.formData.address.city} />
        <BasicItem title="Street" value={props.formData.address.street} />
      </div>
      <DividerComponent className="mb-4" />
      <DetailTitle title="User Information" />
      <div className="grid grid-cols-[160px_1fr] gap-2 py-4">
        <BasicItem title="User ID" value={props.formData.userId} />
        <BasicItem title="First Name" value={props.formData.firstName} />
        <BasicItem title="Last Name" value={props.formData.lastName} />
      </div>
      <DividerComponent className="mb-4 border-dotted" />
      <div className="grid grid-cols-[160px_1fr] gap-4">
        <BasicItem title="Tel No." value={props.formData.tel} />
        <BasicItem title="Fax No." value={props.formData.fax} />
        <BasicItem title="Email" value={props.formData.email} />
        <BasicItem title="Trade" value={props.formData.trade} />
        <BasicItem
          title="Contact Office"
          value={props.formData.contactOffice}
        />
        <BasicItem
          title="Recent B/L Number"
          value={props.formData.recentBLNumber}
        />
        <BasicItem title="Comment" value={props.formData.comment} />
      </div>
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
