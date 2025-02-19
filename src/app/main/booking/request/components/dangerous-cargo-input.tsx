import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
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

import {
	GridSelectionComponent,
	useSkipper,
} from "../../status/components/dialog/table/util";
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

	const [selectedContainerIndex, setSelectedContainerIndex] = useState(0);
	const [autoResetPageIndex, resetAutoRestPageIndex] = useSkipper();

	useEffect(() => {
		console.log("container", container.dgInfo.data);
	}, [container]);

	useEffect(() => {
		console.log(
			"selectedTableData",
			container.dgInfo.isSeparated
				? container.dgInfo.data[selectedContainerIndex]
				: container.dgInfo.data[0],
		);
	}, [
		container.dgInfo.data,
		container.dgInfo.isSeparated,
		selectedContainerIndex,
	]);

	const columnDefs = useMemo(() => {
		function AddNewDGCargo() {
			setContainerInformation((prev) => ({
				...prev,
				[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
					c.uuid === container.uuid && c.type !== ContainerType.bulk
						? {
								...c,
								dgInfo: {
									...c.dgInfo,
									//add empty row in selected container index if separated
									data: c.dgInfo.isSeparated
										? c.dgInfo.data.map((d, i) =>
												i === selectedContainerIndex
													? [
															...d,
															{
																uuid: faker.string.uuid(),
																unNumber: "",
																class: "",
																flashPoint: "",
																packingGroup: "",
																properShippingName: "",
															},
														]
													: d,
											)
										: //add empty row in all container if not separated
											c.dgInfo.data.map((d) => [
												...d,
												{
													uuid: faker.string.uuid(),
													unNumber: "",
													class: "",
													flashPoint: "",
													packingGroup: "",
													properShippingName: "",
												},
											]),
								},
							}
						: c,
				),
			}));
		}
		function RemoveDGCargo(rowIndex: number) {
			setContainerInformation((prev) => ({
				...prev,
				[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
					c.uuid === container.uuid && c.type !== ContainerType.bulk
						? {
								...c,
								dgInfo: {
									...c.dgInfo,
									data: c.dgInfo.isSeparated
										? c.dgInfo.data.map((d, i) =>
												i === selectedContainerIndex
													? d.filter((_, index) => index !== rowIndex)
													: d,
											)
										: c.dgInfo.data.map((d) =>
												d.filter((_, index) => index !== rowIndex),
											),
								},
							}
						: c,
				),
			}));
		}
		const columnHelper = createColumnHelper<DangerousContainerDataType>();

		return [
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
							if (cell.row.index === 0) {
								AddNewDGCargo();
							} else {
								RemoveDGCargo(cell.row.index);
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
		];
	}, [
		container.uuid,
		selectedContainerIndex,
		setContainerInformation,
		showRequired,
		typeKey,
	]);

	const table = useReactTable<DangerousContainerDataType>({
		data: container.dgInfo.isSeparated
			? container.dgInfo.data[selectedContainerIndex]
			: container.dgInfo.data[0],
		columns: columnDefs,
		autoResetPageIndex,
		getCoreRowModel: getCoreRowModel<DangerousContainerDataType>(),
		meta: {
			updateData: (rowIndex, columnId, value) => {
				resetAutoRestPageIndex();
				if (container.dgInfo.isSeparated) {
					setContainerInformation((prev) => ({
						...prev,
						[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
							c.uuid === container.uuid && c.type !== ContainerType.bulk
								? {
										...c,
										dgInfo: {
											...c.dgInfo,
											data: c.dgInfo.data.map((d, index) =>
												index === selectedContainerIndex
													? d.map((r, i) =>
															i === rowIndex ? { ...r, [columnId]: value } : r,
														)
													: d,
											),
										},
									}
								: c,
						),
					}));
				} else {
					setContainerInformation((prev) => ({
						...prev,
						[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
							c.uuid === container.uuid && c.type !== ContainerType.bulk
								? {
										...c,
										dgInfo: {
											...c.dgInfo,
											data: c.dgInfo.data.map((d) =>
												d.map((r, i) =>
													i === rowIndex ? { ...r, [columnId]: value } : r,
												),
											),
										},
									}
								: c,
						),
					}));
				}
			},
			updateRow: (rowIndex, data) => {},
		},
	});

	const [prevDGCargoData, setPrevDGCargoData] = useState([
		[
			{
				uuid: faker.string.uuid(),
				unNumber: "",
				class: "",
				flashPoint: "",
				packingGroup: "",
				properShippingName: "",
			},
		],
	]);

	useEffect(() => {
		setContainerInformation((prev) => ({
			...prev,
			[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
				c.uuid === container.uuid && c.type !== ContainerType.bulk
					? {
							...c,
							dgInfo: {
								...c.dgInfo,
								data: Array.from({ length: container.dgInfo.quantity }, () => [
									{
										uuid: faker.string.uuid(),
										unNumber: "",
										class: "",
										flashPoint: "",
										packingGroup: "",
										properShippingName: "",
									},
								]),
							},
						}
					: c,
			),
		}));
		setPrevDGCargoData(
			Array.from({ length: container.dgInfo.quantity }, () => [
				{
					uuid: faker.string.uuid(),
					unNumber: "",
					class: "",
					flashPoint: "",
					packingGroup: "",
					properShippingName: "",
				},
			]),
		);
	}, [
		container.dgInfo.quantity,
		container.uuid,
		setContainerInformation,
		typeKey,
	]);

	return (
		<>
			{container.dgInfo.isDangerous && (
				<div className="flex flex-col border border-outlineVariant rounded-lg px-4 pt-3 pb-4 gap-3">
					<div className="flex gap-4 items-center">
						<MdTypography variant="title" size="small" className="text-primary">
							Dangerous Cargo
						</MdTypography>
						<SimpleRadioGroup
							groupName={`dangerous-cargo-separation-${container.uuid}`}
							options={["Same per Container", "Different per Container"]}
							selected={
								container.dgInfo.isSeparated
									? "Different per Container"
									: "Same per Container"
							}
							onChange={(value) => {
								setSelectedContainerIndex(0);
								const newDGCargoData = prevDGCargoData;
								setPrevDGCargoData(container.dgInfo.data);
								setContainerInformation((prev) => ({
									...prev,
									[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
										c.uuid === container.uuid && c.type !== ContainerType.bulk
											? {
													...c,
													dgInfo: {
														...c.dgInfo,
														isSeparated: value === "Different per Container",
														data: newDGCargoData,
													},
												}
											: c,
									),
								}));
							}}
						/>
						<DividerComponent orientation="vertical" />
						<MdChipSet>
							{container.dgInfo.isSeparated ? (
								Array.from({ length: container.dgInfo.data.length }).map(
									(_, index) => (
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
									),
								)
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
				type="number"
				noSpinner
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
	container: ContainerInformationType;
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
												dgInfo: {
													...c.dgInfo,
													isDangerous: !c.dgInfo.isDangerous,
													quantity: 0,
													data: [[]],
												},
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
				htmlFor={`${container.uuid}-${typeKey}-dangerous-cargo-switch`}
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
					id={`${container.uuid}-${typeKey}-dangerous-cargo-switch`}
					selected={container.dgInfo.isDangerous}
					onClick={(e) => {
						e.preventDefault();
						if (!container.dgInfo.isDangerous) {
							setContainerInformation((prev) => ({
								...prev,
								[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
									c.uuid === container.uuid && c.type !== ContainerType.bulk
										? {
												...c,
												dgInfo: {
													...c.dgInfo,
													isDangerous: !c.dgInfo.isDangerous,
													quantity: 1,
													data: [
														[
															{
																uuid: faker.string.uuid(),
																unNumber: "",
																class: "",
																flashPoint: "",
																packingGroup: "",
																properShippingName: "",
															},
														],
													],
												},
											}
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
