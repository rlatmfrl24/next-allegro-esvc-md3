import { DateTime } from "luxon";
import { type CSSProperties, useMemo, useState } from "react";

import { DividerComponent } from "@/app/components/divider";
import Portal from "@/app/components/portal";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import tableStyle from "@/app/styles/table.module.css";
import {
	MdDialog,
	MdIcon,
	MdOutlinedButton,
	MdOutlinedTextField,
	MdSelectOption,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Listbox } from "@headlessui/react";
import { ArrowDropDown } from "@mui/icons-material";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	type Table,
	useReactTable,
} from "@tanstack/react-table";
import { renderDataTable } from "@/app/components/table/simple-table";

type GeneralTableType = {
	correctionGroup: string;
	correctionItem: string;
	previous: string;
	current: string;
};

type FreightChargeTableType = {
	correctionItems: string;
	freight: string;
	perType: number;
	ratedAs: number;
	currency: string;
	rate: number;
	amount: number;
	term: string;
	prepaid: number;
	collect: number;
	third: number;
};

type CustomerInformationTableType = {
	correctionItems: string;
	previous: string;
	current: string;
};

type CNDataType = {
	cnNo: string;
	createdAt: Date;
	generalTableData: GeneralTableType[];
	freightChargeTableData: FreightChargeTableType[];
	customerInformationTableData: CustomerInformationTableType[];
};

function renderTable<TData>(table: Table<TData>) {
	return (
		<table className={`${tableStyle.table} w-full mt-4 mb-6`}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} style={{ width: header.getSize() }}>
								<div className="flex items-center">
									<MdTypography
										variant="body"
										size="medium"
										className="p-2 font-semibold flex-1"
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</MdTypography>
									{
										// detect is the last column
										headerGroup.headers[headerGroup.headers.length - 1] ===
										header ? null : (
											<DividerComponent
												orientation="vertical"
												className="h-8"
											/>
										)
									}
								</div>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className="p-2 bg-white">
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

function makeDummyData(): CNDataType {
	const generalTableData = Array.from({ length: 10 }).map(() => ({
		correctionGroup: faker.helpers.arrayElement([
			"Freight & Charge",
			"Customer Information",
		]),
		correctionItem: faker.helpers.arrayElement([
			"Charge Detail",
			"Freight Detail",
			"Customer Detail",
			"Notify Name",
			"Consignee Name",
		]),
		previous: `${faker.location.county()} ${faker.location.city()} ${faker.location.streetAddress()}`,
		current: `${faker.location.county()} ${faker.location.city()} ${faker.location.streetAddress()}`,
	}));

	const freightChargeTableData = Array.from({ length: 10 }).map(() => ({
		correctionItems: faker.helpers.arrayElement([
			"Previous",
			"Current",
			"Difference",
		]),
		freight: faker.helpers.arrayElement(["OFT"]),
		perType: faker.number.int({ min: 1, max: 10 }),
		ratedAs: faker.number.int({ min: 1, max: 10 }),
		currency: faker.finance.currencyCode(),
		rate: Number.parseFloat(faker.finance.amount()),
		amount: Number.parseFloat(faker.finance.amount()),
		term: faker.helpers.arrayElement(["Prepaid", "Collect", "Third"]),
		prepaid: Number.parseFloat(faker.finance.amount()),
		collect: Number.parseFloat(faker.finance.amount()),
		third: Number.parseFloat(faker.finance.amount()),
	}));

	const customerInformationTableData = Array.from({ length: 10 }).map(() => ({
		correctionItems: faker.helpers.arrayElement([
			"Previous",
			"Current",
			"Difference",
		]),
		previous: faker.lorem.paragraph(),
		current: faker.lorem.paragraph(),
	}));

	return {
		cnNo: `CN0000${faker.string.numeric(10)}`,
		createdAt: faker.date.past(),
		generalTableData,
		freightChargeTableData,
		customerInformationTableData,
	};
}

const GeneralTable = ({
	data,
}: {
	data: GeneralTableType[];
}) => {
	const columnHelper = createColumnHelper<GeneralTableType>();
	const columns = [
		columnHelper.display({
			header: "No.",
			size: 30,
			cell: (cell) => (
				<MdTypography variant="body" size="medium">
					{cell.row.index + 1}
				</MdTypography>
			),
		}),
		columnHelper.accessor("correctionGroup", {
			header: "Correction Group",
			size: 100,
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("correctionItem", {
			header: "Correction Item",
			size: 100,
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("previous", {
			header: "Previous",
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("current", {
			header: "Current",
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
	];

	const table = useReactTable<GeneralTableType>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return renderDataTable(table);
};

const FreightChargeTable = ({ data }: { data: FreightChargeTableType[] }) => {
	const columnHelper = createColumnHelper<FreightChargeTableType>();
	const columns = [
		columnHelper.display({
			header: "No.",
			size: 50,
			cell: (cell) => (
				<MdTypography variant="body" size="medium">
					{cell.row.index + 1}
				</MdTypography>
			),
		}),
		columnHelper.accessor("correctionItems", {
			header: "Correction Items",
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("freight", {
			header: "Freight",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("perType", {
			header: "Per Type",
			size: 90,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("ratedAs", {
			header: "Rated As",
			size: 90,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("currency", {
			header: "Currency",
			size: 100,
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("rate", {
			header: "Rate",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("amount", {
			header: "Amount",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("term", {
			header: "Term",
			size: 90,
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("prepaid", {
			header: "Prepaid",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("collect", {
			header: "Collect",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("third", {
			header: "Third",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium" className="text-right">
					{row.getValue()}
				</MdTypography>
			),
		}),
	];

	const table = useReactTable<FreightChargeTableType>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return renderDataTable(table);
};

const CustomerInformationTable = ({
	data,
}: {
	data: CustomerInformationTableType[];
}) => {
	const columnHelper = createColumnHelper<CustomerInformationTableType>();
	const columns = [
		columnHelper.accessor("correctionItems", {
			header: "Correction Items",
			size: 80,
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("previous", {
			header: "Previous",
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("current", {
			header: "Current",
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
	];

	const table = useReactTable<CustomerInformationTableType>({
		columns,
		data,
		getCoreRowModel: getCoreRowModel(),
	});

	return renderDataTable(table);
};

export default function CNHistoryDialog({
	open,
	handleOpen,
}: {
	open: boolean;
	handleOpen: (open: boolean) => void;
}) {
	const dataList = useMemo(() => {
		return Array.from({ length: 10 }).map(() => makeDummyData());
	}, []);

	const [selectedData, setSelectedData] = useState<CNDataType>(dataList[0]);

	return (
		<Portal selector="#portal">
			<MdDialog
				open={open}
				closed={() => {
					handleOpen(false);
				}}
				className="min-w-[1240px]"
			>
				<div slot="headline">C/N History</div>
				<div slot="content">
					<CNSelector
						value={selectedData}
						options={dataList}
						onChange={(data) => {
							setSelectedData(data);
						}}
					/>
					<DetailTitle title="General" className="mt-4" />
					<GeneralTable data={selectedData.generalTableData} />
					<DetailTitle title="Freight & Charge" />
					<FreightChargeTable data={selectedData.freightChargeTableData} />
					<DetailTitle title="Customer Information" />
					<CustomerInformationTable
						data={selectedData.customerInformationTableData}
					/>
				</div>
				<div slot="actions">
					<MdOutlinedButton
						onClick={() => {
							handleOpen(false);
						}}
					>
						Close
					</MdOutlinedButton>
				</div>
			</MdDialog>
		</Portal>
	);
}

const CNSelector = ({
	value,
	options,
	onChange,
}: {
	value: CNDataType;
	options: CNDataType[];
	onChange: (data: CNDataType) => void;
}) => {
	return (
		<Listbox
			value={value}
			onChange={(cnNo) => {
				const selectedData = options.find((data) => data.cnNo === cnNo.cnNo);
				if (selectedData) {
					onChange(selectedData);
				}
			}}
		>
			<Listbox.Button>
				<MdOutlinedTextField
					label="C/N No."
					prefixText={DateTime.fromJSDate(value.createdAt).toFormat(
						"yyyy-MM-dd HH:mm:ss",
					)}
					value={value.cnNo}
					className="relative cursor-pointer"
					readOnly
					hasTrailingIcon
					style={
						{
							"--md-outlined-text-field-input-text-prefix-trailing-space":
								"8px",
						} as CSSProperties
					}
				>
					<MdIcon slot="trailing-icon">
						<ArrowDropDown />
					</MdIcon>
				</MdOutlinedTextField>
			</Listbox.Button>
			<Listbox.Options
				className="absolute z-10 bg-surfaceContainerLow rounded-md w-96 max-h-96 overflow-auto"
				style={
					{
						boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
					} as CSSProperties
				}
			>
				{options.map((option) => (
					<Listbox.Option key={option.cnNo} value={option}>
						<MdSelectOption className="flex flex-col gap-2">
							{option.cnNo}
							<MdTypography
								variant="body"
								size="medium"
								className="text-onSurfaceVariant"
							>
								{DateTime.fromJSDate(option.createdAt).toFormat(
									"yyyy-MM-dd HH:mm:ss",
								)}
							</MdTypography>
						</MdSelectOption>
					</Listbox.Option>
				))}
			</Listbox.Options>
		</Listbox>
	);
};
