import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { MdTypography } from "@/app/components/typography";
import { ContainerState } from "@/app/store/booking.store";
import { tinyInputStyles, tinySwitchStyles } from "@/app/util/constants";
import { MdOutlinedTextField, MdSwitch } from "@/app/util/md3";
import {
	ContainerType,
	type FlatRackContainerInformationType,
	type OpenTopContainerInformationType,
} from "@/app/util/typeDef/booking";
import styles from "@/app/styles/special-cargo.module.css";
import { useSetRecoilState } from "recoil";
import { DividerComponent } from "@/app/components/divider";
import type { ComponentProps, CSSProperties } from "react";
import { GridSelectionComponent } from "../../status/components/dialog/table/util";

export const AwkwardContainerTrigger = ({
	container,
	type,
}: {
	container: OpenTopContainerInformationType | FlatRackContainerInformationType;
	type: ContainerType.opentop | ContainerType.flatrack;
}) => {
	const typeKey = type.toString().toLowerCase();
	const setContainerInformation = useSetRecoilState(ContainerState);

	return (
		<>
			<label
				htmlFor={`${container.uuid}-${typeKey}-awkward-switch`}
				className="flex items-center gap-2 w-fit"
			>
				<MdSwitch
					id={`${container.uuid}-${typeKey}-awkward-switch`}
					selected={container.isAwkward}
					style={tinySwitchStyles}
					onClick={(e) => {
						e.preventDefault();
						setContainerInformation((prev) => ({
							...prev,
							[typeKey]: prev[typeKey as keyof typeof prev].map((c) =>
								c.uuid === container.uuid
									? {
											...c,
											isAwkward: !container.isAwkward,
										}
									: c,
							),
						}));
					}}
				/>
				<MdTypography variant="body" size="small" prominent>
					Awkward Cargo
				</MdTypography>
			</label>
		</>
	);
};

export const AwkwardContainerInput = ({
	container,
	type,
}: {
	container: OpenTopContainerInformationType | FlatRackContainerInformationType;
	type: ContainerType.opentop | ContainerType.flatrack;
}) => {
	const typeKey = type.toString().toLowerCase();
	const setContainerInformation = useSetRecoilState(ContainerState);

	const headerList = [
		"Package Qty / Type",
		"Gross Weight",
		"Net Weight",
		"Commodity",
		"Length",
		"Width",
		"Height",
		"Unit",
		"Remark",
	];

	return (
		<>
			{container.isAwkward && (
				<div className="flex flex-col border border-outlineVariant rounded-lg p-4 gap-3">
					<MdTypography variant="title" size="small" className="text-primary">
						Awkward Cargo
					</MdTypography>
					<table className={styles.table}>
						<thead>
							<tr>
								{headerList.map((header, index) => (
									<th key={header}>
										<div>
											<span>{header}</span>
											<DividerComponent
												orientation="vertical"
												className="h-5 translate-x-0.5"
											/>
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>
									<div className="flex">
										<NAOutlinedNumberField
											sizeVariant="tiny"
											className="p-2 w-24"
											required
											maxInputLength={9}
											value={container.package?.toString() ?? ""}
											handleValueChange={(value) => {
												setContainerInformation((prev) => ({
													...prev,
													[typeKey]: prev[typeKey as keyof typeof prev].map(
														(c) =>
															c.uuid === container.uuid &&
															(c.type === ContainerType.opentop ||
																c.type === ContainerType.flatrack)
																? {
																		...c,
																		package: value,
																	}
																: c,
													),
												}));
											}}
										/>
										<NAOutlinedListBox
											className="p-2 w-48"
											required
											sizeVariant="tiny"
											style={tinyInputStyles}
											initialValue={container.packageType}
											options={[
												"Aerosol",
												"Bag",
												"Box",
												"Crate",
												"Drum",
												"Pallet",
												"Reel",
												"Roll",
												"Other",
											]}
											onSelection={(packageType) => {
												setContainerInformation((prev) => ({
													...prev,
													[typeKey]: prev[typeKey as keyof typeof prev].map(
														(c) =>
															c.uuid === container.uuid &&
															(c.type === ContainerType.opentop ||
																c.type === ContainerType.flatrack)
																? {
																		...c,
																		packageType: packageType,
																	}
																: c,
													),
												}));
											}}
										/>
									</div>
								</td>
								<td>
									<div className="flex">
										<NAOutlinedNumberField
											sizeVariant="tiny"
											required
											className="p-2"
											value={container.grossWeight?.toString() ?? ""}
											maxInputLength={9}
											handleValueChange={(value) => {
												setContainerInformation((prev) => ({
													...prev,
													[typeKey]: prev[typeKey as keyof typeof prev].map(
														(c) =>
															c.uuid === container.uuid &&
															(c.type === ContainerType.opentop ||
																c.type === ContainerType.flatrack)
																? {
																		...c,
																		grossWeight: value,
																	}
																: c,
													),
												}));
											}}
										/>
										<div className="w-32">
											<GridSelectionComponent
												options={["KGS", "LBS"]}
												value={container.grossWeightUnit}
												onSelectionChange={(unit) => {
													setContainerInformation((prev) => ({
														...prev,
														[typeKey]: prev[typeKey as keyof typeof prev].map(
															(c) =>
																c.uuid === container.uuid &&
																(c.type === ContainerType.opentop ||
																	c.type === ContainerType.flatrack)
																	? {
																			...c,
																			grossWeightUnit: unit,
																			netWeightUnit: unit,
																		}
																	: c,
														),
													}));
												}}
											/>
										</div>
									</div>
								</td>
								<td>
									<div className="flex">
										<NAOutlinedNumberField
											sizeVariant="tiny"
											required
											className="p-2"
											maxInputLength={9}
											value={container.netWeight?.toString() ?? ""}
											handleValueChange={(value) => {
												setContainerInformation((prev) => ({
													...prev,
													[typeKey]: prev[typeKey as keyof typeof prev].map(
														(c) =>
															c.uuid === container.uuid &&
															(c.type === ContainerType.opentop ||
																c.type === ContainerType.flatrack)
																? {
																		...c,
																		netWeight: value,
																	}
																: c,
													),
												}));
											}}
										/>
										<div className="w-32">
											<GridSelectionComponent
												options={["KGS", "LBS"]}
												value={container.netWeightUnit}
												onSelectionChange={(unit) => {
													setContainerInformation((prev) => ({
														...prev,
														[typeKey]: prev[typeKey as keyof typeof prev].map(
															(c) =>
																c.uuid === container.uuid &&
																(c.type === ContainerType.opentop ||
																	c.type === ContainerType.flatrack)
																	? {
																			...c,
																			grossWeightUnit: unit,
																			netWeightUnit: unit,
																		}
																	: c,
														),
													}));
												}}
											/>
										</div>
									</div>
								</td>
								<td width={176}>
									<NAOutlinedTextField
										sizeVariant="tiny"
										className="p-2"
										required
										value={container.awkward.commodity.description}
										handleValueChange={(value) => {
											setContainerInformation((prev) => ({
												...prev,
												[typeKey]: prev[typeKey as keyof typeof prev].map(
													(c) =>
														c.uuid === container.uuid &&
														(c.type === ContainerType.opentop ||
															c.type === ContainerType.flatrack)
															? {
																	...c,
																	awkward: {
																		...c.awkward,
																		commodity: {
																			...c.awkward.commodity,
																			description: value,
																		},
																	},
																}
															: c,
												),
											}));
										}}
									/>
								</td>
								<td>
									<NAOutlinedNumberField
										sizeVariant="tiny"
										className="p-2"
										required
										value={container.awkward.length?.toString()}
										handleValueChange={(value) => {
											setContainerInformation((prev) => ({
												...prev,
												[typeKey]: prev[typeKey as keyof typeof prev].map(
													(c) =>
														c.uuid === container.uuid &&
														(c.type === ContainerType.opentop ||
															c.type === ContainerType.flatrack)
															? {
																	...c,
																	awkward: {
																		...c.awkward,
																		length: value,
																	},
																}
															: c,
												),
											}));
										}}
									/>
								</td>
								<td>
									<NAOutlinedNumberField
										sizeVariant="tiny"
										className="p-2"
										required
										value={container.awkward.width?.toString()}
										handleValueChange={(value) => {
											setContainerInformation((prev) => ({
												...prev,
												[typeKey]: prev[typeKey as keyof typeof prev].map(
													(c) =>
														c.uuid === container.uuid &&
														(c.type === ContainerType.opentop ||
															c.type === ContainerType.flatrack)
															? {
																	...c,
																	awkward: {
																		...c.awkward,
																		width: value,
																	},
																}
															: c,
												),
											}));
										}}
									/>
								</td>
								<td>
									<NAOutlinedNumberField
										sizeVariant="tiny"
										className="p-2"
										required
										value={container.awkward.height?.toString()}
										handleValueChange={(value) => {
											setContainerInformation((prev) => ({
												...prev,
												[typeKey]: prev[typeKey as keyof typeof prev].map(
													(c) =>
														c.uuid === container.uuid &&
														(c.type === ContainerType.opentop ||
															c.type === ContainerType.flatrack)
															? {
																	...c,
																	awkward: {
																		...c.awkward,
																		height: value,
																	},
																}
															: c,
												),
											}));
										}}
									/>
								</td>
								<td width={80}>
									<GridSelectionComponent
										options={["CM", "INCH"]}
										value={container.awkward.unit}
										onSelectionChange={(unit) => {
											setContainerInformation((prev) => ({
												...prev,
												[typeKey]: prev[typeKey as keyof typeof prev].map(
													(c) =>
														c.uuid === container.uuid &&
														(c.type === ContainerType.opentop ||
															c.type === ContainerType.flatrack)
															? {
																	...c,
																	awkward: {
																		...c.awkward,
																		unit: unit,
																	},
																}
															: c,
												),
											}));
										}}
									/>
								</td>
								<td width={176}>
									<NAOutlinedTextField
										sizeVariant="tiny"
										className="p-2"
										value={container.awkward.remark}
										handleValueChange={(value) => {
											setContainerInformation((prev) => ({
												...prev,
												[typeKey]: prev[typeKey as keyof typeof prev].map(
													(c) =>
														c.uuid === container.uuid &&
														(c.type === ContainerType.opentop ||
															c.type === ContainerType.flatrack)
															? {
																	...c,
																	awkward: {
																		...c.awkward,
																		remark: value,
																	},
																}
															: c,
												),
											}));
										}}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			)}
		</>
	);
};
