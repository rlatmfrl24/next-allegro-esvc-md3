import {
	type ColumnDef,
	type Table,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import styles from "@/app/styles/table.module.css";
import { MdTypography } from "../typography";
import { useCallback, useEffect, useState } from "react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import tableStyle from "@/app/styles/table.module.css";
import specialCargoStyle from "@/app/styles/special-cargo.module.css";

import { DividerComponent } from "../divider";
import classNames from "classnames";

export const useSimpleTable = ({
	data,
	columns,
	getSelectionRows,
	allowMultiRowSelection = false,
}: {
	data: any[];
	columns: any[];
	getSelectionRows?: (selectedRows: any[]) => void | Promise<void>;
	allowMultiRowSelection?: boolean;
}) => {
	const cx = classNames.bind(styles);
	const [selectedRows, setSelectedRows] = useState({});
	const table = useReactTable({
		data,
		columns,
		state: {
			rowSelection: selectedRows,
		},
		onRowSelectionChange: setSelectedRows,
		getCoreRowModel: getCoreRowModel(),
		enableMultiRowSelection: allowMultiRowSelection,
	});

	useEffect(() => {
		getSelectionRows?.(
			Object.keys(selectedRows).map((key) => data[Number.parseInt(key)]),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRows]);

	const clearSelection = useCallback(() => {
		setSelectedRows({});
	}, []);

	const renderTable = (fullWidth = false) => (
		<OverlayScrollbarsComponent defer>
			<table className={cx(tableStyle.table, fullWidth ? "w-full" : "")}>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									style={{
										width: header.getSize(),
									}}
								>
									<MdTypography
										variant="body"
										size="medium"
										prominent
										className="p-2 flex-1 select-none"
									>
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
					{table.getRowModel().rows.map((row) => {
						return (
							<tr
								key={row.id}
								onClick={() => {
									row.toggleSelected();
								}}
								onKeyDown={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										row.toggleSelected();
									}
								}}
								tabIndex={0}
								className={`cursor-pointer group ${
									row.getIsSelected() ? "bg-outline-variant" : "bg-surface"
								}`}
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="p-2 group-hover:bg-surfaceContainerLow"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
		</OverlayScrollbarsComponent>
	);

	return {
		renderTable,
		clearSelection,
	};
};

export function renderDataTable<TData>(table: Table<TData>) {
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

export function renderInputTable<TData>(table: Table<TData>) {
	return (
		<table className={specialCargoStyle.table} style={{ width: "100%" }}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							const columnRelativeDepth = header.depth - header.column.depth;
							if (columnRelativeDepth > 1) {
								return null;
							}

							let rowSpan = 1;
							if (header.isPlaceholder) {
								const leafs = header.getLeafHeaders();
								rowSpan = leafs[leafs.length - 1].depth - header.depth;
							}

							return (
								<th
									key={header.id}
									className="group h-0 py-2 px-0 border-b border-b-outlineVariant"
									colSpan={header.colSpan}
									rowSpan={rowSpan}
								>
									<div
										className={`flex h-full items-center border-r border-r-outlineVariant ${
											header.column.getIsLastColumn()
												? "border-r-transparent"
												: ""
										}`}
									>
										<MdTypography
											variant="body"
											size="medium"
											prominent
											className="mx-2 flex-1 h-8 flex items-center"
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</MdTypography>
									</div>
								</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody>
				{table.getRowModel().rows.map((row) => {
					return (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								return (
									<td
										key={cell.id}
										className={specialCargoStyle.split}
										style={{
											width: `${cell.column.columnDef.size}px`,
										}}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
