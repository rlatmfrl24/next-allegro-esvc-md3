"use client";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { useSimpleTable } from "@/app/components/table/simple-table";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import {
  MdDialog,
  MdElevatedCard,
  MdFilledButton,
  MdOutlinedButton,
  MdOutlinedSegmentedButton,
  MdOutlinedSegmentedButtonSet,
  MdTextButton,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { PasswordOutlined, PersonSearchOutlined } from "@mui/icons-material";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function FindIDPassword() {
  const [findTarget, setFindTarget] = useState<"id" | "password">("id");
  const [defaultQuery, setDefaultQuery] = useState({
    email: "",
    id: "",
  });
  const router = useRouter();

  const FindID = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [queryId, setQueryId] = useState(defaultQuery.id);
    const [queryEmail, setQueryEmail] = useState(defaultQuery.email);

    return (
      <>
        <div className="flex flex-col items-center gap-6 my-6">
          <div className="flex flex-col items-center gap-2">
            <PersonSearchOutlined fontSize="large" className="text-primary" />
            <MdTypography variant="headline" size="medium">
              Find ID
            </MdTypography>
            <MdTypography variant="body" size="medium">
              Please enter the E-mail address registered or your User ID.
            </MdTypography>
          </div>
          <NAOutlinedTextField
            label="Email"
            type="email"
            className="w-full"
            value={queryEmail}
            handleValueChange={(value) => {
              setQueryEmail(value);
            }}
          />
          <div className="flex gap-2 w-full ">
            <CheckApprover />
            <div className="flex-1"></div>
            <MdOutlinedButton
              onClick={() => {
                router.push("/sign/in");
              }}
            >
              Back to Sign in
            </MdOutlinedButton>
            <MdFilledButton
              onClick={() => {
                setIsEmailValid(faker.datatype.boolean());
                setQueryId(faker.internet.userName());
                setIsDialogOpen(true);
              }}
            >
              Search
            </MdFilledButton>
          </div>
        </div>
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
        >
          <div slot="headline" className="flex flex-col items-start">
            {isEmailValid ? (
              "Find ID"
            ) : (
              <>
                <div>Your E-mail address is not found.</div>
                <div>Please check and try again.</div>
              </>
            )}
          </div>
          <div slot="content" className="flex gap-1">
            {isEmailValid ? (
              <>
                Your ID is
                <MdTypography variant="body" size="medium" prominent>
                  {queryId}
                </MdTypography>
              </>
            ) : (
              <>If the problem continues, please contact your ID approver.</>
            )}
          </div>
          <div slot="actions">
            {isEmailValid ? (
              <>
                <MdTextButton
                  onClick={() => {
                    setIsDialogOpen(false);
                    setFindTarget("password");
                    setDefaultQuery({ email: queryEmail, id: queryId });
                  }}
                >
                  Search Password
                </MdTextButton>
                <MdFilledButton
                  onClick={() => {
                    router.push("/sign/in");
                  }}
                >
                  Back to Sign in
                </MdFilledButton>
              </>
            ) : (
              <>
                <CheckApprover />
                <MdFilledButton
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Try Again
                </MdFilledButton>
              </>
            )}
          </div>
        </MdDialog>
      </>
    );
  };

  const FindPassword = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [queryId, setQueryId] = useState(defaultQuery.id);
    const [queryEmail, setQueryEmail] = useState(defaultQuery.email);

    return (
      <>
        <div className="flex flex-col items-center gap-6 my-6">
          <div className="flex flex-col items-center gap-2">
            <PasswordOutlined fontSize="large" className="text-primary" />
            <MdTypography variant="headline" size="medium">
              Find Password
            </MdTypography>
            <MdTypography variant="body" size="medium" className="text-center">
              Please enter your User ID and E-mail address registered for your
              log-in.
              <br /> Your temporary password will be sent to your E-mail
            </MdTypography>
          </div>
          <NAOutlinedTextField
            label="User ID"
            className="w-full"
            value={queryId}
            handleValueChange={(value) => {
              setQueryId(value);
            }}
          />
          <NAOutlinedTextField
            label="Email"
            className="w-full"
            value={queryEmail}
            handleValueChange={(value) => {
              setQueryEmail(value);
            }}
          />
          <div className="flex gap-2 w-full">
            <CheckApprover />
            <div className="flex-1"></div>
            <MdOutlinedButton
              onClick={() => {
                router.push("/sign/in");
              }}
            >
              Back to Sign in
            </MdOutlinedButton>
            <MdFilledButton
              onClick={() => {
                setIsEmailValid(faker.datatype.boolean());
                setIsDialogOpen(true);
              }}
            >
              Search
            </MdFilledButton>
          </div>
        </div>
        <MdDialog
          open={isDialogOpen}
          closed={() => {
            setIsDialogOpen(false);
          }}
        >
          <div slot="headline">
            {isEmailValid
              ? "Email has been sent!"
              : "The inputted information is not correct. Please check and try again."}
          </div>
          <div slot="content">
            {isEmailValid ? (
              <>
                The inputted information has been confirmed.
                <br /> Please find your temporary password at
                <br />
                <span className="underline">{queryEmail}</span>
              </>
            ) : (
              <>If the problem continues, Please contact your ID approver.</>
            )}
          </div>
          <div slot="actions">
            {isEmailValid ? (
              <MdFilledButton
                onClick={() => {
                  router.push("/sign/in");
                }}
              >
                Back to Sign in
              </MdFilledButton>
            ) : (
              <>
                <CheckApprover />
                <MdFilledButton
                  onClick={() => {
                    setIsDialogOpen(false);
                  }}
                >
                  Try Again
                </MdFilledButton>
              </>
            )}
          </div>
        </MdDialog>
      </>
    );
  };

  return (
    <div className="h-full flex justify-center items-center">
      <MdElevatedCard className="p-8 ">
        <MdOutlinedSegmentedButtonSet>
          <MdOutlinedSegmentedButton
            label="Find ID"
            selected={findTarget === "id"}
            onClick={() => {
              setFindTarget("id");
            }}
          />
          <MdOutlinedSegmentedButton
            label="Find Password"
            selected={findTarget === "password"}
            onClick={() => {
              setFindTarget("password");
            }}
          />
        </MdOutlinedSegmentedButtonSet>
        {findTarget === "id" ? <FindID /> : <FindPassword />}
      </MdElevatedCard>
    </div>
  );
}

const CheckApprover = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  type CheckApproverProps = {
    office: string;
    country: string;
    name: string;
    email: string;
    tel: string;
  };

  const tempData: CheckApproverProps[] = useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      office: faker.location.city() + " Office",
      country: faker.location.country(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      tel: faker.phone.number(),
    }));
  }, []);

  const columnHelper = createColumnHelper<CheckApproverProps>();

  const columnDefs = [
    columnHelper.accessor("office", {
      header: "Office",
    }),
    columnHelper.accessor("country", {
      header: "Country",
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("tel", {
      header: "Tel",
    }),
  ];

  const { renderTable } = useSimpleTable({
    data: tempData,
    columns: columnDefs,
  });

  return (
    <>
      <MdTextButton
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Check Approver
      </MdTextButton>
      <MdDialog
        open={isDialogOpen}
        closed={() => {
          setIsDialogOpen(false);
        }}
        className="min-w-fit"
      >
        <div slot="headline">Check Approver</div>
        <div slot="content" className="flex flex-col gap-4">
          <input className="h-0" />
          <div className="flex gap-2">
            <NAOutlinedListBox
              initialValue="All"
              options={tempData
                .map((item) => {
                  return item.country;
                })
                .filter((value, index, self) => self.indexOf(value) === index)}
              label="Country"
              className="flex-1"
            />
            <NAOutlinedListBox
              initialValue="All"
              options={tempData
                .map((item) => {
                  return item.office;
                })
                .filter((value, index, self) => self.indexOf(value) === index)}
              label="Contact Office"
              className="flex-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <MdTextButton>Reset</MdTextButton>
            <MdFilledButton>Search</MdFilledButton>
          </div>
          <DividerComponent />
          {renderTable()}
        </div>
        <div slot="actions"></div>
      </MdDialog>
    </>
  );
};
