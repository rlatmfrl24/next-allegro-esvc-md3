import { DateTime } from "luxon";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import RemarkIcon from "@/../public/icon_long_range_remark.svg";
import StatusFilterComponent from "@/app/components/status-filter";
import { BasicTable } from "@/app/components/table/basic-table";
import { MdTypography } from "@/app/components/typography";
import { useVesselScheduleDialog } from "@/app/components/common-dialog-hooks";
import { createDummyVesselInformation } from "@/app/main/schedule/util";
import {
	MdCheckbox,
	MdChipSet,
	MdFilterChip,
	MdIcon,
	MdIconButton,
	MdTextButton,
} from "@/app/util/md3";
import { type SISearchTableProps, SIState } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { Download, History } from "@mui/icons-material";
import { Row, createColumnHelper } from "@tanstack/react-table";

import ActionButtons from "./table-action-buttons";
import { isEqual, set } from "lodash";
import { AnimatePresence, motion } from "framer-motion";
import { BLIssueStatusChip, CNStatusChip, SIStateChip } from "./si-state-chip";
import CNHistoryDialog from "./cn-history-popup";

function createDummySITableData(count = 10) {
	return Array.from({ length: count }, (_, i) => {
		const blState = faker.helpers.arrayElement(Object.values(SIState));
		const blIssueStatus =
			blState === SIState.BLIssueClosed
				? faker.helpers.arrayElement([
						"B/L Issue Request",
						"B/L Issue Confirm",
						"B/L Issue Rejected",
						"B/L Issue Pending",
					])
				: "";
		const cnIssueStatus =
			blState === SIState.BLIssueClosed
				? faker.helpers.arrayElement(["Request", "Rejected", "Confirmed", ""])
				: "";

		return {
			requestNumber: `R${faker.string.numeric(10)}`,
			bookingNumber: faker.string.alphanumeric(12).toUpperCase(),
			blState: blState,
			blIssueStatus: blIssueStatus,
			cnIssueStatus: cnIssueStatus,
			blNumber: faker.string.alphanumeric(12).toUpperCase(),
			requestBlType: faker.helpers.arrayElement([
				"Original B/L",
				"Sea Waybill",
				"B/L Surrender",
				"None",
			]),
			actualShipper: faker.person.fullName(),
			SiCutOffTime: DateTime.local(),
			requestUpdateDate: DateTime.local(),
			vessel: createDummyVesselInformation(),
			origin: faker.location.city(),
			destination: faker.location.city(),
			bookingVia: faker.helpers.arrayElement(["web", "edi", "general"]),
			estimatedTimeofBerth: DateTime.local(),
			estimatedTimeofDeparture: DateTime.local(),
			estimatedTimeofArrival: DateTime.local(),
			blType: faker.helpers.arrayElement(["", "FCL", "LCL"]),
			remarks: faker.helpers.maybe(() => faker.lorem.sentence()),
		};
	});
}

export default function SITable() {
	const tempTableData: SISearchTableProps[] = useMemo(
		() => createDummySITableData(900),
		[],
	);
	const [tableData, setTableData] =
		useState<SISearchTableProps[]>(tempTableData);
	const [selectedRows, setSelectedRows] = useState<SISearchTableProps[]>([]);
	const [stateFilter, setStateFilter] = useState<string[]>(
		Object.values(SIState),
	);
	const { renderDialog, setCurrentVessel, setIsVesselScheduleDialogOpen } =
		useVesselScheduleDialog();
	const [isCnHistoryDialogOpen, setIsCnHistoryDialogOpen] = useState(false);

	useEffect(() => {
		if (stateFilter.length > 0) {
			setTableData(
				tempTableData.filter((row) => stateFilter.includes(row.blState)),
			);
		} else {
			setTableData(tempTableData);
		}
	}, [stateFilter, tempTableData]);

	const columnHelper = createColumnHelper<SISearchTableProps>();
	const columns = [
		columnHelper.display({
			id: "select",
			header: () => (
				<MdCheckbox
					className="mx-2"
					checked={
						!!(
							selectedRows.length !== 0 &&
							selectedRows.length ===
								tableData.filter((row) => {
									return !(
										row.blState === SIState.Rejected ||
										row.blState === SIState.Pending ||
										row.blState === SIState.BLIssueClosed
									);
								}).length
						)
					}
					indeterminate={
						!!(
							selectedRows.length !== 0 &&
							selectedRows.length !==
								tableData.filter((row) => {
									return !(
										row.blState === SIState.Rejected ||
										row.blState === SIState.Pending ||
										row.blState === SIState.BLIssueClosed
									);
								}).length
						)
					}
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						if (selectedRows.length !== 0) {
							setSelectedRows([]);
						} else {
							setSelectedRows(
								tableData.filter((row) => {
									return !(
										row.blState === SIState.Rejected ||
										row.blState === SIState.Pending ||
										row.blState === SIState.BLIssueClosed
									);
								}),
							);
						}
					}}
				/>
			),
			cell: (info) => (
				<MdCheckbox className="mx-2" checked={info.row.getIsSelected()} />
			),
			size: 52,
			minSize: 52,
		}),
		columnHelper.accessor("requestNumber", {
			id: "requestNumber",
			header: "Request No.",
			cell: (info) => {
				return (
					<span className="flex justify-between items-start gap-2">
						<Link href={`/main/documents/si/preview?reqNo=${info.getValue()}`}>
							<MdTypography variant="body" size="medium" className="underline">
								{info.getValue()}
							</MdTypography>
						</Link>
						{info.row.original.remarks && (
							<MdIconButton
								className="-translate-y-2"
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
								<MdIcon>
									<div className="flex items-center justify-center">
										<RemarkIcon />
									</div>
								</MdIcon>
							</MdIconButton>
						)}
					</span>
				);
			},
			size: 165,
			minSize: 165,
		}),
		columnHelper.accessor("bookingNumber", {
			id: "bookingNumber",
			header: "Booking No.",
			cell: (info) => (
				<Link
					href={"/main/booking/information/confirmation"}
					className="w-fit block"
				>
					<MdTypography variant="body" size="medium" className="underline">
						{info.getValue()}
					</MdTypography>
				</Link>
			),
			size: 160,
			minSize: 160,
		}),
		columnHelper.accessor("blState", {
			id: "blState",
			header: "Status",
			cell: (info) =>
				info.getValue() === SIState.None ? (
					<></>
				) : (
					<SIStateChip state={info.getValue()} />
				),
			size: 150,
			minSize: 150,
			filterFn: (row, id, filterValue) => {
				return filterValue.includes(row.getValue(id));
			},
		}),
		columnHelper.accessor("blIssueStatus", {
			id: "blIssueStatus",
			header: "B/L Issue Status",
			cell: (info) => <BLIssueStatusChip status={info.getValue()} />,
			size: 200,
			minSize: 200,
		}),
		columnHelper.accessor("cnIssueStatus", {
			id: "cnIssueStatus",
			header: "C/N Status",
			cell: (info) => (
				<div className="flex items-start gap-2">
					<CNStatusChip status={info.getValue()} />
					{info.getValue() === "Confirmed" && (
						<MdIconButton
							className="-translate-y-2"
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								setIsCnHistoryDialogOpen(true);
							}}
						>
							<MdIcon>
								<History />
							</MdIcon>
						</MdIconButton>
					)}
				</div>
			),
			size: 150,
			minSize: 150,
		}),
		columnHelper.accessor("blNumber", {
			header: "B/L No.",
			id: "blNumber",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("requestBlType", {
			id: "requestBlType",
			header: "Request B/L Type",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("actualShipper", {
			header: "Actual Shipper",
			id: "actualShipper",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue()}
				</MdTypography>
			),
			size: 150,
			minSize: 150,
		}),
		columnHelper.accessor("SiCutOffTime", {
			header: "S/I Cut Off Time",
			id: "SiCutOffTime",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue().toFormat("yyyy-MM-dd HH:mm")}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("requestUpdateDate", {
			header: "Request (Update) Date",
			id: "requestUpdateDate",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue().toFormat("yyyy-MM-dd HH:mm")}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("vessel", {
			header: "Vessel",
			id: "vessel",
			cell: (info) => (
				<MdTypography
					variant="body"
					size="medium"
					className="underline cursor-pointer w-fit"
					onClick={(e) => {
						e.stopPropagation();
						setCurrentVessel(info.getValue());
						setIsVesselScheduleDialogOpen(true);
					}}
				>
					{info.getValue().vesselName}
				</MdTypography>
			),
			size: 300,
		}),
		columnHelper.accessor("origin", {
			header: "Origin",
			id: "origin",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue()}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("destination", {
			header: "Destination",
			id: "destination",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue()}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("bookingVia", {
			header: "Booking Via",
			id: "bookingVia",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{
						{
							web: "Web",
							edi: "EDI",
							general: "General",
						}[info.getValue()]
					}
				</MdTypography>
			),
		}),
		columnHelper.accessor("estimatedTimeofBerth", {
			header: "Estimated Time of Berth",
			id: "estimatedTimeofBerth",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue().toFormat("yyyy-MM-dd HH:mm")}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("estimatedTimeofDeparture", {
			header: "Estimated Time of Departure",
			id: "estimatedTimeofDeparture",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue().toFormat("yyyy-MM-dd HH:mm")}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("estimatedTimeofArrival", {
			header: "Estimated Time of Arrival",
			id: "estimatedTimeofArrival",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue().toFormat("yyyy-MM-dd HH:mm")}
				</MdTypography>
			),
			size: 120,
			minSize: 120,
		}),
		columnHelper.accessor("blType", {
			header: "B/L Type",
			id: "blType",
			cell: (info) => (
				<MdTypography variant="body" size="medium">
					{info.getValue()}
				</MdTypography>
			),
			size: 80,
			minSize: 80,
		}),
	];

	return (
		<div>
			<CNHistoryDialog
				open={isCnHistoryDialogOpen}
				handleOpen={setIsCnHistoryDialogOpen}
			/>
			{renderDialog()}
			<BasicTable
				ActionComponent={(table) => {
					return (
						<div className="flex flex-1 gap-2 items-center">
							<MdChipSet>
								<StatusFilterComponent
									initialStatus={
										(table.getColumn("blState")?.getFilterValue() as []) ??
										Object.values(SIState)
									}
									statusOptions={Object.values(SIState)}
									onChange={(states) => {
										table.resetRowSelection();
										table.setColumnFilters([
											{
												id: "blState",
												value: states,
											},
										]);
									}}
								/>
								<MdFilterChip label="My Shipment" />
							</MdChipSet>

							<MdTextButton>
								<div slot="icon">
									<Download fontSize="small" />
								</div>
								Download
							</MdTextButton>
						</div>
					);
				}}
				columns={columns}
				data={tableData}
				controlColumns={["select"]}
				pinningColumns={["select", "requestNumber", "bookingNumber"]}
				getSelectionRows={(rows, table) => {
					// get last selected row

					if (selectedRows.length >= rows.length) {
						setSelectedRows(rows);
					} else {
						const newSelectedRow = rows.filter((row) => {
							return !selectedRows.includes(row);
						})[0];
						if (
							newSelectedRow.blState === SIState.Rejected ||
							newSelectedRow.blState === SIState.Pending ||
							newSelectedRow.blState === SIState.BLIssueClosed
						) {
							setSelectedRows([newSelectedRow]);
							table.getSelectedRowModel().rows.map((row) => {
								if (
									row.original.requestNumber !== newSelectedRow.requestNumber
								) {
									row.toggleSelected();
								}
							});
						} else {
							const newSelectedRows = rows.filter((row) => {
								return !(
									row.blState === SIState.Rejected ||
									row.blState === SIState.Pending ||
									row.blState === SIState.BLIssueClosed
								);
							});
							setSelectedRows(newSelectedRows);
							table.getRowModel().rows.map((row) => {
								if (!newSelectedRows.includes(row.original)) {
									row.toggleSelected(false);
								}
							});
						}
					}
				}}
			/>
			<div className="z-50 bottom-0 fixed -translate-x-10 w-[calc(100%-72px)]">
				<AnimatePresence>
					{selectedRows.length > 0 && (
						<motion.div
							key="action-button"
							initial={{ y: 57 }}
							animate={{ y: 0 }}
							exit={{ y: 57 }}
							transition={{ type: "spring", bounce: 0, duration: 0.5 }}
							className="bg-white border-t flex justify-end gap-2 pr-5 p-2 rounded-bl-2xl"
						>
							<ActionButtons
								selectionList={selectedRows}
								setTableData={setTableData}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);

	function handleSITableRowSelection(newRow: SISearchTableProps) {
		if (selectedRows.includes(newRow)) {
			setSelectedRows(selectedRows.filter((selected) => selected !== newRow));
		} else {
			if (
				newRow.blState === SIState.Rejected ||
				newRow.blState === SIState.Pending ||
				newRow.blState === SIState.BLIssueClosed
			) {
				setSelectedRows([newRow]);
			} else {
				if (
					selectedRows.length > 0 &&
					(selectedRows[0].blState === SIState.Rejected ||
						selectedRows[0].blState === SIState.Pending ||
						selectedRows[0].blState === SIState.BLIssueClosed)
				) {
					setSelectedRows([newRow]);
				} else {
					setSelectedRows([...selectedRows, newRow]);
				}
			}
		}
	}
}
