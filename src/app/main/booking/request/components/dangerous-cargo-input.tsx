import { type CSSProperties, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import NaToggleButton from "@/app/components/na-toggle-button";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import { ContainerState } from "@/app/store/booking.store";
import { tinyInputStyles } from "@/app/util/constants";
import {
	MdChipSet,
	MdDialog,
	MdFilledButton,
	MdFilterChip,
	MdIcon,
	MdIconButton,
	MdOutlinedButton,
	MdOutlinedTextField,
	MdSwitch,
} from "@/app/util/md3";
import {
	type ContainerInformationType,
	type DangerousContainerDataType,
	ContainerType,
	type DryContainerInformationType,
} from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";
import { AddBoxOutlined, DeleteOutlineOutlined } from "@mui/icons-material";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	type Table,
	useReactTable,
} from "@tanstack/react-table";

import { GridSelectionComponent } from "../../status/components/dialog/table/util";
import { MdTypography } from "@/app/components/typography";

export const DangerousCargoInput = ({
	container,
	type,
	showRequired = true,
}: {
	container: ContainerInformationType;
	type: ContainerType;
	showRequired?: boolean;
}) => {
	const typeKey = type.toString().toLowerCase();
	const setContainerInformation = useSetRecoilState(ContainerState);
	const [isResetConfirmDialogOpen, setIsResetConfirmDialogOpen] =
		useState(false);

	const [selectedContainerIndex, setSelectedContainerIndex] = useState(0);
	const columnHelper = createColumnHelper<DangerousContainerDataType>();

	useEffect(() => {
		console.log("container", container);
	}, [container]);

	useEffect(() => {
		if (container.isDangerous) {
			setContainerInformation((prev) => ({
				...prev,
				[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
					c.uuid === container.uuid && c.type !== ContainerType.bulk
						? {
								...c,
								dangerousCargoInformation: Array.from({
									length: container.quantity,
								}).map((_, index) => {
									return {
										containerIndex: index,
										data: [
											{
												uuid: faker.string.uuid(),
												unNumber: "",
												class: "",
												flashPoint: "",
												packingGroup: "None",
												properShippingName: "",
											},
										],
									};
								}),
							}
						: c,
				),
			}));
		}
	}, [
		container.isDangerous,
		container.quantity,
		container.uuid,
		setContainerInformation,
		typeKey,
	]);

	const table = useReactTable<DangerousContainerDataType>({
		data:
			(container.isDangerous &&
				container.dangerousCargoInformation[selectedContainerIndex]?.data) ||
			[],
		columns: [
			columnHelper.display({
				header: "No.",
				size: 80,
				cell: (cell) => (
					<div className="p-2">{`DG #${cell.row.index + 1}`}</div>
				),
			}),
			columnHelper.accessor("unNumber", {
				header: "UN Number",
				size: 150,
				cell: (cell) => (
					<DGTableInput
						className="p-2 w-full text-right"
						style={tinyInputStyles}
						value={cell.getValue()}
						onBlur={(e: { currentTarget: { value: unknown } }) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								e.currentTarget.value,
							);
						}}
						required={showRequired}
					/>
				),
			}),
			columnHelper.accessor("class", {
				header: "Class",
				size: 150,
				cell: (cell) => (
					<DGTableInput
						className="p-2 w-full text-right"
						style={tinyInputStyles}
						value={cell.getValue()}
						required={showRequired}
						onBlur={(e: { currentTarget: { value: unknown } }) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								e.currentTarget.value,
							);
						}}
					/>
				),
			}),
			columnHelper.accessor("flashPoint", {
				header: "Flash Point",
				size: 150,
				cell: (cell) => (
					<MdOutlinedTextField
						className="p-2 w-full"
						style={tinyInputStyles}
						value={cell.getValue()}
						suffixText="°C"
						disabled
					/>
				),
			}),
			columnHelper.accessor("packingGroup", {
				header: "Packing Group",
				size: 150,
				cell: (cell) => (
					<GridSelectionComponent
						options={["None", "I", "II", "III"]}
						value={cell.getValue()}
						onSelectionChange={(value) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								value,
							);
						}}
					/>
				),
			}),
			columnHelper.accessor("properShippingName", {
				header: "Proper Shipping Name",
				size: 400,
				cell: (cell) => (
					<MdOutlinedTextField
						className="p-2 w-full"
						style={tinyInputStyles}
						value={cell.getValue()}
						onBlur={(e) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								e.currentTarget.value,
							);
						}}
					/>
				),
			}),
			columnHelper.display({
				header: "Edit",
				size: 50,
				cell: (cell) => (
					<MdIconButton
						className="m-2"
						onClick={() => {
							console.log("Edit", cell.row.index);
							// add empty row to the end
							if (cell.row.index === 0) {
								setContainerInformation((prev) => ({
									...prev,
									[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
										c.uuid === container.uuid && c.type !== ContainerType.bulk
											? {
													...c,
													dangerousCargoInformation:
														c.dangerousCargoInformation.map((d) =>
															d.containerIndex === selectedContainerIndex
																? {
																		...d,
																		data: [
																			...d.data,
																			{
																				uuid: faker.string.uuid(),
																				unNumber: "",
																				class: "",
																				flashPoint: "",
																				packingGroup: "None",
																				properShippingName: "",
																			},
																		],
																	}
																: d,
														),
												}
											: c,
									),
								}));
							} else {
								// remove row
								setContainerInformation((prev) => ({
									...prev,
									[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
										c.uuid === container.uuid && c.type !== ContainerType.bulk
											? {
													...c,
													dangerousCargoInformation:
														c.dangerousCargoInformation.map((d) =>
															d.containerIndex === selectedContainerIndex
																? {
																		...d,
																		data: d.data.filter(
																			(_, index) => index !== cell.row.index,
																		),
																	}
																: d,
														),
												}
											: c,
									),
								}));
							}
						}}
					>
						<MdIcon>
							{cell.row.index === 0 ? (
								<AddBoxOutlined />
							) : (
								<DeleteOutlineOutlined />
							)}
						</MdIcon>
					</MdIconButton>
				),
			}),
		],
		getCoreRowModel: getCoreRowModel<DangerousContainerDataType>(),
		meta: {
			updateData: (rowIndex, columnId, value) => {
				setContainerInformation((prev) => ({
					...prev,
					[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
						c.uuid === container.uuid && c.type !== ContainerType.bulk
							? {
									...c,
									dangerousCargoInformation: c.dangerousCargoInformation.map(
										(d) =>
											d.containerIndex === selectedContainerIndex
												? {
														...d,
														data: d.data.map((data, index) =>
															index === rowIndex
																? { ...data, [columnId]: value }
																: data,
														),
													}
												: d,
									),
								}
							: c,
					),
				}));
			},
			updateRow: (rowIndex, data) => {},
		},
	});

	return (
		<>
			{container.isDangerous && (
				<div className="flex flex-col border border-outlineVariant rounded-lg p-4 gap-3">
					<div className="flex gap-4">
						<SimpleRadioGroup
							groupName={`dangerous-cargo-separation-${container.uuid}`}
							options={["Same per Container", "Different per Container"]}
							selected={
								container.isSeparated
									? "Different per Container"
									: "Same per Container"
							}
							onChange={(value) => {
								setSelectedContainerIndex(0);
								setContainerInformation((prev) => ({
									...prev,
									[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
										c.uuid === container.uuid && c.type !== ContainerType.bulk
											? {
													...c,
													isSeparated: value === "Different per Container",
													dangerousCargoInformation:
														value === "Different per Container"
															? Array.from({ length: c.quantity }).map(
																	(_, index) => {
																		return {
																			containerIndex: index,
																			data: [
																				{
																					uuid: faker.string.uuid(),
																					unNumber: "",
																					class: "",
																					flashPoint: "",
																					packingGroup: "None",
																					properShippingName: "",
																				},
																			],
																		};
																	},
																)
															: [
																	{
																		containerIndex: 0,
																		data: [
																			{
																				uuid: faker.string.uuid(),
																				unNumber: "",
																				class: "",
																				flashPoint: "",
																				packingGroup: "None",
																				properShippingName: "",
																			},
																		],
																	},
																],
												}
											: c,
									),
								}));
							}}
						/>
						<DividerComponent orientation="vertical" />
						<MdChipSet>
							{container.isSeparated ? (
								Array.from({ length: container.quantity }).map((_, index) => (
									<MdFilterChip
										key={`container-${index + 1}`}
										label={`Container #${index + 1}`}
										selected={selectedContainerIndex === index}
										onClick={(e) => {
											if (selectedContainerIndex !== index) {
												setSelectedContainerIndex(index);
											} else {
												e.preventDefault();
												e.stopPropagation();
											}
										}}
									/>
								))
							) : (
								<MdFilterChip label="All Container" selected />
							)}
						</MdChipSet>
					</div>
					<DGCargoTable {...table} />
				</div>
			)}
		</>
	);
};

const DGTableInput = ({ ...props }) => {
	return (
		<div className="relative">
			<MdOutlinedTextField
				className="p-2 w-full"
				style={tinyInputStyles}
				{...props}
			/>
			<span
				className="absolute
				top-3
				left-3
				text-xs
				text-red-500
				font-bold
				pointer-events-none"
			>
				*
			</span>
		</div>
	);
};

const DGCargoTable = (table: Table<DangerousContainerDataType>) => {
	return (
		<table>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								className="bg-surfaceContainerHigh"
								style={{
									minWidth: header.column.columnDef.size,
									width: header.column.columnDef.size,
								}}
							>
								<div className="flex justify-between items-center">
									<span className="font-notoSans text-sm text-left p-2">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</span>
									{header.column.columnDef.header === "Edit" ? null : (
										<DividerComponent
											orientation="vertical"
											className="h-5 translate-x-0.5"
										/>
									)}
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
							<td
								key={cell.id}
								className="font-notoSans border-b border-r border-outlineVariant last:border-r-0"
							>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export const DangerousCargoTrigger = ({
	container,
	type,
}: {
	container: DryContainerInformationType;
	type: ContainerType;
}) => {
	const typeKey = type.toString().toLowerCase();
	const [isResetConfirmDialogOpen, setIsResetConfirmDialogOpen] =
		useState(false);
	const setContainerInformation = useSetRecoilState(ContainerState);

	return (
		<>
			<MdDialog
				open={isResetConfirmDialogOpen}
				closed={() => setIsResetConfirmDialogOpen(false)}
			>
				<div slot="headline">
					All input contents of the Cargo Manifest will be discarded.
				</div>
				<div slot="content">Are you sure you want to uncheck?</div>
				<div slot="actions">
					<MdOutlinedButton
						onClick={() => {
							setIsResetConfirmDialogOpen(false);
						}}
					>
						Cancel
					</MdOutlinedButton>
					<MdFilledButton
						onClick={() => {
							setIsResetConfirmDialogOpen(false);
							setContainerInformation((prev) => ({
								...prev,
								[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
									c.uuid === container.uuid && c.type !== ContainerType.bulk
										? {
												...c,
												isDangerous: !c.isDangerous,
												dangerousCargoInformation: [],
											}
										: c,
								),
							}));
						}}
					>
						Yes
					</MdFilledButton>
				</div>
			</MdDialog>
			<label
				htmlFor={`${container.uuid}-dangerous-cargo-switch`}
				className="flex items-center gap-2 w-fit"
				style={
					{
						"--md-switch-track-height": "18px",
						"--md-switch-track-width": "32px",
						"--md-switch-handle-height": "12px",
						"--md-switch-handle-width": "12px",
						"--md-switch-selected-handle-height": "12px",
						"--md-switch-selected-handle-width": "12px",
						"--md-switch-pressed-handle-height": "12px",
						"--md-switch-pressed-handle-width": "12px",
						"--md-switch-state-layer-size": "18px",
					} as CSSProperties
				}
			>
				<MdSwitch
					id={`${container.uuid}-dangerous-cargo-switch`}
					selected={container.isDangerous}
					onClick={() => {
						if (!container.isDangerous) {
							setContainerInformation((prev) => ({
								...prev,
								[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
									c.uuid === container.uuid && c.type !== ContainerType.bulk
										? { ...c, isDangerous: !c.isDangerous }
										: c,
								),
							}));
						} else {
							setIsResetConfirmDialogOpen(true);
						}
					}}
				/>
				<MdTypography variant="body" size="small" prominent>
					Dangerous Cargo
				</MdTypography>
			</label>
		</>
	);
};
