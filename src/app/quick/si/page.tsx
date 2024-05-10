"use client";

import { DividerComponent } from "@/app/components/divider";
import PageTitle, { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import styles from "@/app/styles/base.module.css";
import { MdFilledTonalButton, MdOutlinedButton } from "@/app/util/md3";
import {
  ContactPhoneOutlined,
  DocumentScannerOutlined,
  KeyboardArrowRight,
  PermDeviceInformationOutlined,
  PlagiarismOutlined,
  WarningAmber,
} from "@mui/icons-material";
import classNames from "classnames/bind";
import Link from "next/link";
import ImgStepOne from "@/../public/images/img_simple_si_step_1.svg";
import ImgStepTwo from "@/../public/images/img_simple_si_step_2.svg";

export default function SimpleSI() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx(styles.container, "h-full flex flex-col")}>
      <div className="flex items-center h-fit justify-between">
        <PageTitle title="Simple S/I" hasFavorite={false} />
        <div className="flex gap-2">
          <Link href="/quick/guide">
            <MdOutlinedButton>e-Service Guide</MdOutlinedButton>
          </Link>
          <MdFilledTonalButton>Excel Download</MdFilledTonalButton>
        </div>
      </div>
      <div className={cx(styles.area, "flex-1")}>
        <div className="flex flex-col gap-1">
          <DetailTitle title="Simple Shipping Instruction" />
          <MdTypography
            tag="p"
            variant="body"
            size="medium"
            className="text-outline"
          >
            {`
            To provide an accessible e-service to our customers with minimal
            e-network, KAMBARA KISEN Co.,Ltd. newly introduces the “Simple S/I”
            in which you can easily submit the 'Shipping Instruction' by a
            single e-mail.
            `}
          </MdTypography>
          <p>
            <MdTypography
              tag="span"
              variant="body"
              size="medium"
              className="text-outline"
            >
              By using our standard B/L instruction provided in Excel format,
              the submitted data will directly be delivered to&nbsp;
            </MdTypography>
            <MdTypography
              tag="span"
              variant="body"
              size="medium"
              prominent
              className="text-primary"
            >
              KAMBARA KISEN Co.,Ltd.’s system securely and accurately, improving
              document accuracy as well as reducing your document completion
              time.
            </MdTypography>
          </p>
        </div>
        <DividerComponent />
        <div className="flex gap-6 flex-1">
          <div className="flex flex-col">
            <DetailTitle
              title="Benefits by Simple S/I Service"
              className="mb-2"
            />
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="flex flex-col text-outline items-center justify-center rounded-lg border-2 border-secondaryContainer w-72 gap-2">
                <DocumentScannerOutlined />
                <MdTypography variant="label" size="large">
                  Improves documentation accuracy
                </MdTypography>
              </div>
              <div className="flex flex-col text-outline items-center justify-center rounded-lg border-2 border-secondaryContainer w-72 gap-2">
                <PlagiarismOutlined />
                <MdTypography variant="label" size="large">
                  Allows faster retrieval of your draft B/L
                </MdTypography>
              </div>
              <div className="flex flex-col text-outline items-center justify-center rounded-lg border-2 border-secondaryContainer w-72 gap-2">
                <ContactPhoneOutlined />
                <MdTypography
                  variant="label"
                  size="large"
                  className="text-center"
                >
                  Reduces communication costs <br />
                  (fax and phone)
                </MdTypography>
              </div>
              <div className="flex flex-col text-outline items-center justify-center rounded-lg border-2 border-secondaryContainer w-72 gap-2">
                <PermDeviceInformationOutlined />
                <MdTypography
                  variant="label"
                  size="large"
                  className="text-center"
                >
                  Replaces hard-copies and physical
                  <br /> storage to electronic information
                </MdTypography>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <DetailTitle title="How to Use Simple S/I" className="mb-2" />
            <div className="flex items-center justify-center rounded-lg border-2 border-secondaryContainer h-full">
              <div className="flex flex-col gap-4 items-center">
                <ImgStepOne />
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="text-onSurfaceVariant text-center"
                >
                  Save our B/L Instruction Excel format by selecting
                  <br /> “Excel Download”
                </MdTypography>
              </div>
              <KeyboardArrowRight className="bg-secondaryContainer rounded-full mx-14" />
              <div className="flex flex-col items-center">
                <ImgStepTwo />
                <MdTypography
                  variant="body"
                  size="medium"
                  prominent
                  className="text-onSurfaceVariant text-center mt-4"
                >
                  Input the S/I details and send it to&nbsp;
                  <span className="underline text-primary">
                    kk.si@tsuneishi.com
                  </span>
                </MdTypography>
                <MdTypography
                  variant="body"
                  size="small"
                  className="text-center text-outline "
                >
                  Mail Subject/Title must always be your Booking Number <br />
                  (eg. HKG123456789)
                </MdTypography>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-secondaryFixed rounded-lg">
          <MdTypography
            tag="p"
            variant="body"
            size="medium"
            className="text-outline"
          >
            For details on the use and data input to our Simple S/I, please
            refer to:&nbsp;
            <Link href={`/quick/guide`}>
              <MdTypography
                tag="span"
                variant="body"
                size="medium"
                prominent
                className="text-primary underline"
              >
                e-Service Guide
              </MdTypography>
            </Link>
            &nbsp;or contact our booking staff of your nearest KAMBARA KISEN
            Co.,Ltd. office for further assistance.
          </MdTypography>
          <MdTypography
            variant="body"
            size="medium"
            className="text-error flex gap-1 items-center mt-1"
          >
            <WarningAmber fontSize="small" />
            Replaces hard-copies and physical storage to electronic information
          </MdTypography>
        </div>
      </div>
    </div>
  );
}
