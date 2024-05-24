import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import { MdDialog, MdFilledButton, MdOutlinedButton } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { InfoOutlined } from "@mui/icons-material";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

export const CompanyUpdateDialog = (props: {
  originalCompanyName: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onRequestUpdate?: (companyName: string) => void;
}) => {
  const tempCompanyList = useMemo(() => {
    return Array.from({ length: 200 }, (_, i) => faker.company.name());
  }, []);
  const [selectedCompany, setSelectedCompany] = useState<string>("");

  return (
    <MdDialog
      open={props.open}
      closed={() => {
        setSelectedCompany("");
        props.onOpenChange(false);
      }}
    >
      <div slot="headline">Company Update</div>
      <div slot="content" className="flex flex-col gap-8 overflow-y-visible">
        <MdTypography variant="body" size="medium">
          Company name is case-sensitive.
          <br />
          Please input with caution to capitalization of letters.
        </MdTypography>
        <NAOutlinedTextField
          value={props.originalCompanyName}
          readOnly
          label="Current Company Name"
        />
        <NAOutlinedAutoComplete
          itemList={tempCompanyList}
          label="New Company Name"
          initialValue={selectedCompany}
          onItemSelection={(item) => {
            setSelectedCompany(item);
          }}
        />
        <div className="flex text-outline mb-8">
          <InfoOutlined fontSize="small" />
          <MdTypography variant="body" size="medium">
            Update for Company name requires re-approval by Administrator.
            <br /> Before the re-approval, your e-Service usage will be limited.
          </MdTypography>
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
          disabled={!selectedCompany}
          onClick={() => {
            props.onRequestUpdate?.(selectedCompany);
            props.onOpenChange(false);
          }}
        >
          Request for Update
        </MdFilledButton>
      </div>
    </MdDialog>
  );
};
