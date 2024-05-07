"use client";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckApprover } from "./check-approver";

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
