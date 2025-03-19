import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import { MdTypography } from "@/app/components/typography";
import { ContainerState } from "@/app/store/booking.store";
import { tinySwitchStyles } from "@/app/util/constants";
import { MdSwitch } from "@/app/util/md3";
import type {
	ContainerInformationType,
	ContainerType,
	DryContainerInformationType,
	FlexibagContainerDataType,
} from "@/app/util/typeDef/booking";
import { faker, tr } from "@faker-js/faker";
import { useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
	GridSelectionComponent,
	useSkipper,
} from "../../status/components/dialog/table/util";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	type Table,
	useReactTable,
} from "@tanstack/react-table";
import specialCargoStyle from "@/app/styles/special-cargo.module.css";

import { DividerComponent } from "@/app/components/divider";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

export const FlexibagCargoInput = ({
	container,
	type,
}: {
	container: DryContainerInformationType;
	type: ContainerType;
}) => {
	const typeKey = type.toString().toLowerCase();
	const setContainerInformation = useSetRecoilState(ContainerState);

	const [autoResetPageIndex, resetAutoRestPageIndex] = useSkipper();
	const [prevCargoData, setPrevCargoData] = useState(container.flexibag.data);

	useEffect(() => {
		setContainerInformation((prev) => ({
			...prev,
			[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
				c.uuid === container.uuid && "flexibag" in c
					? {
							...c,
							flexibag: {
								...(c as DryContainerInformationType).flexibag,
								data: Array(
									!container.flexibag.isSeparated ? 1 : container.quantity,
								).fill({
									uuid: faker.string.uuid(),
									separatedNumber: 0,
									grossWeight: 0,
									commodity: "",
									flexibag: {
										actualWeight: 0,
										maxCapacity: 0,
										ratio: 0,
									},
									manufacturer: "",
									valveSpecification: {
										location: "",
										size: "",
									},
									msds: false,
								}),
							},
						}
					: c,
			),
		}));
	}, [
		container.flexibag.isSeparated,
		container.quantity,
		container.uuid,
		setContainerInformation,
		typeKey,
	]);

	const columnDefs = useMemo(() => {
		const columnHelper = createColumnHelper<FlexibagContainerDataType>();

		return [
			columnHelper.display({
				header: "Sep.",
				size: 80,
				cell: (cell) => <div className="p-2">{`#${cell.row.index + 1}`}</div>,
			}),
			columnHelper.accessor("grossWeight", {
				header: "Gross Weight",
				cell: (cell) => (
					<NAOutlinedNumberField
						sizeVariant="tiny"
						className="p-2"
						enableNumberSeparator
						required
						suffixText="KGS"
						value={cell.getValue().toString()}
					/>
				),
			}),
			columnHelper.accessor("commodity", {
				header: "Commodity",
				size: 150,
				cell: (cell) => (
					<NAOutlinedTextField
						sizeVariant="tiny"
						className="p-2"
						required
						value={cell.getValue().toString()}
					/>
				),
			}),
			columnHelper.accessor("manufacturer", {
				header: "Manufacturer",
				size: 150,
				cell: (cell) => (
					<NAOutlinedTextField
						sizeVariant="tiny"
						className="p-2"
						required
						value={cell.getValue().toString()}
					/>
				),
			}),
			columnHelper.group({
				header: "Flexi-Bag",
				columns: [
					columnHelper.accessor("flexibag.maxCapacity", {
						header: "Max Capacity",
						cell: (cell) => (
							<NAOutlinedNumberField
								sizeVariant="tiny"
								className="p-2"
								enableNumberSeparator
								required
								suffixText="L"
								value={cell.getValue().toString()}
							/>
						),
					}),
					columnHelper.accessor("flexibag.actualWeight", {
						header: "Actual Weight",
						cell: (cell) => (
							<NAOutlinedNumberField
								sizeVariant="tiny"
								className="p-2"
								enableNumberSeparator
								required
								suffixText="L"
								value={cell.getValue().toString()}
							/>
						),
					}),
					columnHelper.accessor("flexibag.ratio", {
						header: "Ratio(%)",
						cell: (cell) => (
							<NAOutlinedNumberField
								sizeVariant="tiny"
								className="p-2"
								enableNumberSeparator
								required
								suffixText="%"
								value={cell.getValue().toString()}
							/>
						),
					}),
				],
			}),
			columnHelper.group({
				header: "Valve Specification",
				columns: [
					columnHelper.accessor("valveSpecification.type", {
						header: "type",
						cell: (cell) => (
							<GridSelectionComponent
								options={[
									"2″ Ball Valve",
									"2″ Butterfly Valve",
									"3″ Ball Valve",
									"3″ Butterfly Valve",
								]}
							/>
						),
					}),
					columnHelper.accessor("valveSpecification.location", {
						header: "Location",
						cell: (cell) => (
							<GridSelectionComponent options={["Top", "Bottom"]} />
						),
					}),
				],
			}),
			columnHelper.accessor("msds", {
				header: "MSDS",
				size: 80,
				cell: (cell) => <GridSelectionComponent options={["Y", "N"]} />,
			}),
		];
	}, []);

	//TODO: DGCargo Input 참조해서 updater 추가
	const table = useReactTable<FlexibagContainerDataType>({
		data: container.flexibag.data,
		columns: columnDefs,
		autoResetPageIndex,
		getCoreRowModel: getCoreRowModel<FlexibagContainerDataType>(),
	});

	return (
		<>
			{container.flexibag.isFlexibag && (
				<div className="flex flex-col border border-outlineVariant rounded-lg px-4 pt-3 pb-4 gap-3">
					<div className="flex gap-4 items-center">
						<MdTypography variant="title" size="small" className="text-primary">
							Flexi-Bag
						</MdTypography>
						<SimpleRadioGroup
							groupName={`flexibag-separation-${container.uuid}`}
							options={["Same per Container", "Different per Compartment"]}
							selected={
								container.flexibag.isSeparated
									? "Different per Compartment"
									: "Same per Container"
							}
							onChange={(value) => {
								const newFlexibagData = prevCargoData;
								setPrevCargoData(container.flexibag.data);
								setContainerInformation((prev) => ({
									...prev,
									[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
										c.uuid === container.uuid
											? {
													...c,
													flexibag: {
														isFlexibag: true,
														isSeparated: value === "Different per Compartment",
														data: newFlexibagData,
													},
												}
											: c,
									),
								}));
							}}
						/>
					</div>
					<FlexiBagTable {...table} />
				</div>
			)}
		</>
	);
};

const FlexiBagTable = (table: Table<FlexibagContainerDataType>) => {
	return (
		// <table className={specialCargoStyle.table}>
		// 	<thead>
		// 		{table.getHeaderGroups().map((headerGroup) => (
		// 			<tr key={headerGroup.id}>
		// 				{headerGroup.headers.map((header) => (
		// 					<th
		// 						key={header.id}
		// 						style={{
		// 							minWidth: header.column.columnDef.size,
		// 							width: header.column.columnDef.size,
		// 						}}
		// 					>
		// 						<div>
		// 							<span>
		// 								{header.isPlaceholder
		// 									? null
		// 									: flexRender(
		// 											header.column.columnDef.header,
		// 											header.getContext(),
		// 										)}
		// 							</span>
		// 							{header.column.columnDef.header === "Edit" ? null : (
		// 								<DividerComponent
		// 									orientation="vertical"
		// 									className="h-5 translate-x-0.5"
		// 								/>
		// 							)}
		// 						</div>
		// 					</th>
		// 				))}
		// 			</tr>
		// 		))}
		// 	</thead>
		// 	<tbody>
		// 		{table.getRowModel().rows.map((row) => (
		// 			<tr key={row.id}>
		// 				{row.getVisibleCells().map((cell) => (
		// 					<td key={cell.id}>
		// 						{flexRender(cell.column.columnDef.cell, cell.getContext())}
		// 					</td>
		// 				))}
		// 			</tr>
		// 		))}
		// 	</tbody>
		// </table>
		<table className={specialCargoStyle.table}>
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
											header.column.columnDef.header === "MSDS"
												? "border-r-0"
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
};

export const FlexibagCargoTrigger = ({
	container,
	type,
}: {
	container: DryContainerInformationType;
	type: ContainerType;
}) => {
	const setContainerInformation = useSetRecoilState(ContainerState);
	const typeKey = type.toString().toLowerCase();

	return (
		<label
			htmlFor={`${container.uuid}-flexibag-cargo-switch`}
			className="flex items-center gap-2 w-fit"
			style={tinySwitchStyles}
		>
			<MdSwitch
				id={`${container.uuid}-flexibag-cargo-switch`}
				selected={container.flexibag.isFlexibag}
				onClick={(e) => {
					e.preventDefault();
					if (!container.flexibag.isFlexibag) {
						setContainerInformation((prev) => ({
							...prev,
							[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
								c.uuid === container.uuid
									? {
											...c,
											flexibag: {
												isFlexibag: true,
												isSeparated: false,
												data: [
													{
														uuid: faker.string.uuid(),
														separatedNumber: 0,
														grossWeight: 0,
														commodity: "",
														flexibag: {
															actualWeight: 0,
															maxCapacity: 0,
															ratio: 0,
														},
														manufacturer: "",
														valveSpecification: {
															location: "",
															size: "",
														},
														msds: false,
													},
												],
											},
										}
									: c,
							),
						}));
					} else {
						setContainerInformation((prev) => ({
							...prev,
							[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
								c.uuid === container.uuid
									? {
											...c,
											flexibag: {
												isFlexibag: false,
												isSeparated: false,
												data: [],
											},
										}
									: c,
							),
						}));
					}
				}}
			/>
			<MdTypography variant="body" size="small" prominent>
				Flexi-Bag
			</MdTypography>
		</label>
	);
};
