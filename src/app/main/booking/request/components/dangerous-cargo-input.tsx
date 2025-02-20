import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { useSetRecoilState } from "recoil";

import { DividerComponent } from "@/app/components/divider";
import { SimpleRadioGroup } from "@/app/components/simple-radio-group";
import { ContainerState } from "@/app/store/booking.store";
import { tinyInputStyles, tinySwitchStyles } from "@/app/util/constants";
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
import specialCargoStyle from "@/app/styles/special-cargo.module.css";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import { NAOutlinedTextField } from "@/app/components/na-textfield";

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
					<NAOutlinedNumberField
						sizeVariant="tiny"
						className="p-2"
						enableNumberSeparator={false}
						required={showRequired}
						value={cell.getValue()}
						handleValueChange={(value) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								value,
							);
						}}
					/>
				),
			}),
			columnHelper.accessor("class", {
				header: "Class",
				size: 150,
				cell: (cell) => (
					<NAOutlinedNumberField
						sizeVariant="tiny"
						className="p-2"
						enableNumberSeparator={false}
						required={showRequired}
						value={cell.getValue()}
						handleValueChange={(value) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								value,
							);
						}}
					/>
				),
			}),
			columnHelper.accessor("flashPoint", {
				header: "Flash Point",
				size: 150,
				cell: (cell) => (
					<NAOutlinedNumberField
						sizeVariant="tiny"
						className="p-2"
						suffixText="°C"
						required={showRequired}
						value={cell.getValue()}
						handleValueChange={(value) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								value,
							);
						}}
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
					<NAOutlinedTextField
						sizeVariant="tiny"
						className="p-2"
						required={showRequired}
						value={cell.getValue()}
						handleValueChange={(value) => {
							cell.table.options.meta?.updateData(
								cell.row.index,
								cell.column.id,
								value,
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

const DGCargoTable = (table: Table<DangerousContainerDataType>) => {
	return (
		<table className={specialCargoStyle.table}>
			<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th
								key={header.id}
								style={{
									minWidth: header.column.columnDef.size,
									width: header.column.columnDef.size,
								}}
							>
								<div>
									<span>
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
							<td key={cell.id}>
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
				style={tinySwitchStyles}
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
