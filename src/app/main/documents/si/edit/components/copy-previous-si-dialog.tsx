import { MdRangeDatePicker } from "@/app/components/datepickers/old/range-picker";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import {
	renderDataTable,
	useSimpleTable,
} from "@/app/components/table/simple-table";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import {
	CurrentSIConditionState,
	SIEditMarkDescriptionState,
	SIEditPartiesState,
	SIEditRouteBLState,
} from "@/app/store/si.store";
import {
	MdDialog,
	MdFilledButton,
	MdOutlinedButton,
	MdRadio,
} from "@/app/util/md3";
import type {
	SIEditContactInformationType,
	SIEditDataType,
	SIEditMarkDescriptionType,
	SIEditPartiesType,
	SIRouteBLType,
} from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

export const CopyPreviousSIDialog = ({
	isOpen,
	handleOpen,
	previousSIData,
}: {
	isOpen: boolean;
	handleOpen: (open: boolean) => void;
	previousSIData: SITableProps[];
}) => {
	// const dummyData = useMemo(
	// 	() => Array.from({ length: 10 }).map(() => createDummySITableData()),
	// 	[],
	// );

	const setSIEditParties = useSetRecoilState(SIEditPartiesState);
	const setSIEditRouteBL = useSetRecoilState(SIEditRouteBLState);
	const setSIEditMarkDescription = useSetRecoilState(
		SIEditMarkDescriptionState,
	);

	const [searchQuery, setSearchQuery] = useState({
		pol: "",
		pod: "",
		shipperName: "",
		onBoardDate: {
			start: DateTime.now(),
			end: DateTime.now(),
		},
	});

	const [tableData, setTableData] = useState(previousSIData);
	const [selectedRows, setSelectedRows] = useState<SITableProps[]>([]);

	return (
		<MdDialog
			open={isOpen}
			closed={() => handleOpen(false)}
			className="min-w-[1240px]"
		>
			<div slot="headline">Copy Previous S/I</div>
			<div slot="content">
				<div className="flex gap-4 items-center">
					<NAOutlinedAutoComplete
						label="POL"
						defaultValue={searchQuery.pol}
						onItemSelection={(value) =>
							setSearchQuery((prev) => ({ ...prev, pol: value }))
						}
						itemList={previousSIData.map((item) => item.pol)}
					/>
					<NAOutlinedAutoComplete
						label="POD"
						defaultValue={searchQuery.pod}
						onItemSelection={(value) =>
							setSearchQuery((prev) => ({ ...prev, pod: value }))
						}
						itemList={previousSIData.map((item) => item.pod)}
					/>
					<NAOutlinedTextField
						label="Shipper Name"
						value={searchQuery.shipperName}
						handleValueChange={(value) =>
							setSearchQuery((prev) => ({ ...prev, shipperName: value }))
						}
					/>
					<MdRangeDatePicker
						label="On Board Date"
						defaultStartDate={searchQuery.onBoardDate.start}
						defaultEndDate={searchQuery.onBoardDate.end}
						handleDateRangeSelected={(dateRange) => {
							setSearchQuery((prev) => ({
								...prev,
								onBoardDate: {
									start: dateRange[0],
									end: dateRange[1],
								},
							}));
						}}
					/>
					<MdOutlinedButton
						onClick={() => {
							const filteredData = previousSIData.filter((item) => {
								return (
									item.pol.includes(searchQuery.pol) &&
									item.pod.includes(searchQuery.pod) &&
									item.shipperName.includes(searchQuery.shipperName)
								);
							});
							setTableData(filteredData);
						}}
					>
						Search
					</MdOutlinedButton>
				</div>
				<div className="flex w-full mt-6">
					<SITable
						data={tableData}
						onSelectedRowsChange={(selectedRows) => {
							setSelectedRows(selectedRows);
						}}
					/>
				</div>
			</div>
			<div slot="actions">
				<MdOutlinedButton
					onClick={() => {
						handleOpen(false);
					}}
				>
					Cancel
				</MdOutlinedButton>
				<MdFilledButton
					disabled={selectedRows.length === 0}
					onClick={() => {
						setSIEditParties(
							(prev) =>
								({
									...prev,
									shipper: {
										...prev.shipper,
										companyName:
											selectedRows[0].originData.parties.shipper.companyName,
									},
								}) as SIEditPartiesType,
						);
						setSIEditRouteBL(
							(prev) =>
								({
									...prev,
									pol: selectedRows[0].originData.routeBL.pol,
									pod: selectedRows[0].originData.routeBL.pod,
								}) as SIRouteBLType,
						);

						setSIEditMarkDescription(
							(prev) =>
								({
									...prev,
									customsCommodity:
										selectedRows[0].originData.markDescription.customsCommodity,
								}) as SIEditMarkDescriptionType,
						);

						handleOpen(false);
					}}
				>
					Apply
				</MdFilledButton>
			</div>
		</MdDialog>
	);
};

type SITableProps = {
	blNo: string;
	pol: string;
	pod: string;
	shipperName: string;
	container: {
		typeSize: string;
		quantity: number;
	}[];
	commodity: string;
	originData: SIEditDataType;
};

const SITable = ({
	data,
	onSelectedRowsChange,
}: {
	data: SITableProps[];
	onSelectedRowsChange?: (selectedRows: SITableProps[]) => void;
}) => {
	const columnHelper = createColumnHelper<SITableProps>();

	const columns = [
		columnHelper.accessor("blNo", {
			header: "BL No.",
			cell: (info) => (
				<div className="flex gap-4">
					<MdRadio checked={info.row.getIsSelected()} />
					<p>{info.getValue()}</p>
				</div>
			),
		}),
		columnHelper.accessor("pol", {
			header: "POL",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("pod", {
			header: "POD",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("shipperName", {
			header: "Shipper Name",
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor("container", {
			header: "Container",
			cell: (info) => {
				return (
					<p>
						{Object.values(info.getValue()).map((item) => (
							<span key={item.typeSize}>
								{`${item.typeSize} (${item.quantity})`}
								<br />
							</span>
						))}
					</p>
				);
			},
		}),
		columnHelper.accessor("commodity", {
			header: "Commodity",
			cell: (info) => info.getValue(),
		}),
	];

	const { renderTable } = useSimpleTable({
		data,
		columns,
		getSelectionRows: (selectedRows) => {
			onSelectedRowsChange?.(selectedRows as SITableProps[]);
		},
	});

	return renderTable(true);
};

export function createDummySITableData(): SITableProps {
	const originData = {
		parties: {
			shipper: {
				companyName: faker.company.name(),
			},
		} as SIEditPartiesType,
		routeBL: {
			pol: createDummyPlaceInformation(faker.location.city()),
			pod: createDummyPlaceInformation(faker.location.city()),
		} as SIRouteBLType,
		container: {
			dry: Array.from({
				length: faker.number.int({
					min: 0,
					max: 5,
				}),
			}).map((_, i) => ({
				containerType: "Dry",
				containerSize: faker.helpers.arrayElement(["20", "40", "40HC", "45"]),
				uuid: faker.string.uuid(),
			})),
			reefer: Array.from({
				length: faker.number.int({
					min: 0,
					max: 5,
				}),
			}).map((_, i) => ({
				containerType: "Reefer",
				containerSize: faker.helpers.arrayElement(["20", "40", "40HC", "45"]),
				uuid: faker.string.uuid(),
			})),
			opentop: Array.from({
				length: faker.number.int({
					min: 0,
					max: 5,
				}),
			}).map((_, i) => ({
				containerType: "OpenTop",
				containerSize: faker.helpers.arrayElement(["20", "40", "40HC", "45"]),
				uuid: faker.string.uuid(),
			})),
			tank: Array.from({
				length: faker.number.int({
					min: 0,
					max: 5,
				}),
			}).map((_, i) => ({
				containerType: "Tank",
				containerSize: faker.helpers.arrayElement(["20", "40", "40HC", "45"]),
				uuid: faker.string.uuid(),
			})),
			flatrack: Array.from({
				length: faker.number.int({
					min: 0,
					max: 5,
				}),
			}).map((_, i) => ({
				containerType: "FlatRack",
				containerSize: faker.helpers.arrayElement(["20", "40", "40HC", "45"]),
				uuid: faker.string.uuid(),
			})),
			bulk: Array.from({
				length: faker.number.int({
					min: 0,
					max: 5,
				}),
			}).map((_, i) => ({
				containerType: "Bulk",
				containerSize: faker.helpers.arrayElement(["20", "40", "40HC", "45"]),
				uuid: faker.string.uuid(),
			})),
		},
		markDescription: {
			customsCommodity: faker.commerce.productName(),
		} as SIEditMarkDescriptionType,
		contactInformation: {} as SIEditContactInformationType,
	};

	// Create a brief container list with typesize and quantity
	// typeSize: `${containerType} ${containerSize}`
	// quantity: merge all containers with the same typeSize and count them
	const briefContainer = [
		...originData.container.dry,
		...originData.container.reefer,
		...originData.container.opentop,
		...originData.container.tank,
		...originData.container.flatrack,
		...originData.container.bulk,
	].reduce(
		(acc, container) => {
			const typeSize = `${container.containerType} ${container.containerSize}`;
			if (acc[typeSize]) {
				acc[typeSize].quantity += 1;
			} else {
				acc[typeSize] = {
					typeSize,
					uuid: container.uuid,
					quantity: 1,
				};
			}
			return acc;
		},
		{} as {
			[key: string]: { typeSize: string; quantity: number; uuid: string };
		},
	);

	return {
		blNo: faker.string.alphanumeric(10).toUpperCase(),
		pol: originData.routeBL.pol.yardName,
		pod: originData.routeBL.pod.yardName,
		shipperName: originData.parties.shipper.companyName,
		container: briefContainer,
		commodity: originData.markDescription.customsCommodity,
		originData,
	} as unknown as SITableProps;
}
