import Portal from "@/app/components/portal";
import { useSimpleTable } from "@/app/components/table/simple-table";
import { DetailTitle, SubTitle } from "@/app/components/title-components";
import { MdDialog, MdOutlinedButton } from "@/app/util/md3";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	type Table,
	useReactTable,
} from "@tanstack/react-table";
import tableStyle from "@/app/styles/table.module.css";
import { faker } from "@faker-js/faker";
import { MdTypography } from "@/app/components/typography";
import { useMemo } from "react";
import { DividerComponent } from "@/app/components/divider";

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

const GeneralTable = () => {
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

	const dummyData = useMemo(() => {
		return Array.from({ length: 10 }).map(() => ({
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
	}, []);

	const table = useReactTable<GeneralTableType>({
		columns,
		data: dummyData,
		getCoreRowModel: getCoreRowModel(),
	});

	return renderTable(table);
};

const FreightChargeTable = () => {
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

	const dummyData = useMemo(() => {
		return Array.from({ length: 10 }).map(() => ({
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
	}, []);

	const table = useReactTable<FreightChargeTableType>({
		columns,
		data: dummyData,
		getCoreRowModel: getCoreRowModel(),
	});

	return renderTable(table);
};

const CustomerInformationTable = () => {
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

	const dummyData = useMemo(() => {
		return Array.from({ length: 10 }).map(() => ({
			correctionItems: faker.helpers.arrayElement([
				"Previous",
				"Current",
				"Difference",
			]),
			previous: faker.lorem.paragraph(),
			current: faker.lorem.paragraph(),
		}));
	}, []);

	const table = useReactTable<CustomerInformationTableType>({
		columns,
		data: dummyData,
		getCoreRowModel: getCoreRowModel(),
	});

	return renderTable(table);
};

export default function CNHistoryDialog({
	open,
	handleOpen,
}: {
	open: boolean;
	handleOpen: (open: boolean) => void;
}) {
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
					<DetailTitle title="General" />
					<GeneralTable />
					<DetailTitle title="Freight & Charge" />
					<FreightChargeTable />
					<DetailTitle title="Customer Information" />
					<CustomerInformationTable />
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
