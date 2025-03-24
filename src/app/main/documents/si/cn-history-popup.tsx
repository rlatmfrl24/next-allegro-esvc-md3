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
		<table className={`${tableStyle.table} w-full`}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} style={{ width: header.getSize() }}>
								<MdTypography variant="body" size="medium">
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</MdTypography>
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody>
				{Array.from({ length: 10 }).map((_, index) => (
					<tr key={faker.string.uuid()}>
						<td>faker</td>
						<td>faker</td>
						<td>Correction Item</td>
						<td>Previous</td>
						<td>Current</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

const GeneralTable = () => {
	const columnHelper = createColumnHelper<GeneralTableType>();
	const columns = [
		columnHelper.accessor("correctionGroup", {
			header: "Correction Group",
			cell: (row) => (
				<MdTypography variant="body" size="medium">
					{row.getValue()}
				</MdTypography>
			),
		}),
		columnHelper.accessor("correctionItem", {
			header: "Correction Item",
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
		data: Array.from({ length: 10 }).map(() => ({
			correctionGroup: faker.word.sample(),
			correctionItem: faker.word.sample(),
			previous: faker.word.sample(),
			current: faker.word.sample(),
		})),
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
	//TODO: Add the data for the tables

	return (
		<Portal selector="#portal">
			<MdDialog
				open={open}
				closed={() => {
					handleOpen(false);
				}}
				className="min-w-[720px]"
			>
				<div slot="headline">C/N History</div>
				<div slot="content">
					<DetailTitle title="General" />
					<GeneralTable />
					<DetailTitle title="Freight & Charge" />
					<DetailTitle title="Customer Information" />
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
