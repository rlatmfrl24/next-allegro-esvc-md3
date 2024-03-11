import { MdTypography } from "@/app/components/typography";
import { MdDialog, MdTextButton } from "@/app/util/md3";
import React from "react";
import VesselIcon from "@/../public/icon_vessel.svg";
import { VesselInfoType } from "@/app/util/typeDef/schedule";

export default function VesselInformationDialog({
  open,
  handleOpen,
  data,
}: {
  open: boolean;
  handleOpen: (open: boolean) => void;
  data: VesselInfoType;
}) {
  const TableHeader = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <MdTypography
        variant="body"
        size="medium"
        className={`bg-surfaceVariant h-9 flex items-center px-2 ${className}`}
      >
        {children}
      </MdTypography>
    );
  };

  const TableCell = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <MdTypography
        variant="body"
        size="medium"
        className={`bg-surfaceContainerLowest h-9 flex items-center px-2 ${className}`}
      >
        {children}
      </MdTypography>
    );
  };

  return (
    <div className="z-50">
      <MdDialog
        open={open}
        closed={() => {
          handleOpen(false);
        }}
        className="min-w-[960px]"
      >
        <div slot="headline">Vessel Information</div>
        <div slot="content">
          <span className="text-primary flex items-center gap-2 mb-6">
            <VesselIcon />
            <MdTypography
              variant="body"
              size="large"
              className="text-onSurface"
            >
              {data.vesselName + " (" + data.vesselCode + ")"}
            </MdTypography>
          </span>
          <div className="grid grid-cols-[200px_1fr_200px_1fr] border border-outlineVariant bg-outlineVariant gap-px">
            <TableHeader>Owner</TableHeader>
            <TableCell>{data.owner}</TableCell>
            <TableHeader>Flag</TableHeader>
            <TableCell>{data.flag}</TableCell>
            <TableHeader>Owner Name</TableHeader>
            <TableCell className="col-span-3">{data.ownerName}</TableCell>
            <TableHeader>Class No.</TableHeader>
            <TableCell>{data.classNumber}</TableCell>
            <TableHeader>Official No.</TableHeader>
            <TableCell>{data.officialNumber}</TableCell>
            <TableHeader>IMO No.</TableHeader>
            <TableCell>{data.IMONumber}</TableCell>
            <TableHeader>Call Sign</TableHeader>
            <TableCell>{data.callSign}</TableCell>
            <TableHeader>Built On</TableHeader>
            <TableCell>{data.builtOn}</TableCell>
            <TableHeader>Age</TableHeader>
            <TableCell>{data.age}</TableCell>
            <TableHeader>Gross WT.</TableHeader>
            <TableCell>{data.grossWeight}</TableCell>
            <TableHeader>Net WT.</TableHeader>
            <TableCell>{data.netWeight}</TableCell>
            <TableHeader>Port of Registry</TableHeader>
            <TableCell className="col-span-3">{data.portOfRegistry}</TableCell>
          </div>
        </div>
        <div slot="actions">
          <MdTextButton
            onClick={() => {
              handleOpen(false);
            }}
          >
            Close
          </MdTextButton>
        </div>
      </MdDialog>
    </div>
  );
}
