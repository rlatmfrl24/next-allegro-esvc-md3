import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { MdTypography } from "@/app/components/typography";
import { getEmptyContainerData } from "@/app/main/util";
import {
	BookingRequestStepState,
	ContainerState,
} from "@/app/store/booking.store";
import {
	MdFilledTonalIconButton,
	MdIconButton,
	MdOutlinedIconButton,
	MdOutlinedTextField,
} from "@/app/util/md3";
import {
	ContainerType,
	type OpenTopContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { DetailTitle } from "@/app/components/title-components";
import { useMemo } from "react";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { AnimatePresence, motion } from "framer-motion";
import { containerVariant } from "./base";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import {
	DangerousCargoInput,
	DangerousCargoTrigger,
} from "./dangerous-cargo-input";
import {
	AwkwardContainerInput,
	AwkwardContainerTrigger,
} from "./awkward-container-input";

const OpenTopContainerInput = ({
	list,
	showRequired = true,
}: {
	list: OpenTopContainerInformationType[];
	showRequired?: boolean;
}) => {
	const [containerInformation, setContainerInformation] =
		useRecoilState(ContainerState);
	const [bookingRequestStep] = useRecoilState(BookingRequestStepState);

	const defaultContainerSizeOptions = ["20", "40", "40HC"];

	const selectableContainerSizeOptions = useMemo(() => {
		// if container size is already selected, remove it from the options
		for (const container of containerInformation.opentop) {
			const index = defaultContainerSizeOptions.indexOf(container.size);
			if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
		}

		return [...defaultContainerSizeOptions];

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerInformation.opentop]);

	return (
		<Disclosure defaultOpen>
			{({ open }) => {
				return (
					<>
						<Disclosure.Button className={"flex w-full items-center gap-2"}>
							<DetailTitle title="Open Top Container" />
							<div className="flex-1 border-b border-b-outlineVariant" />
							<ArrowDropDown
								className={`transform transition-transform ${
									open ? "rotate-180" : "rotate-0"
								}`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel className={"flex gap-4"}>
							<MdFilledTonalIconButton
								className="mt-8 min-w-[40px] min-h-[40px]"
								disabled={
									containerInformation.opentop.length ===
									defaultContainerSizeOptions.length
								}
								onClick={() => {
									setContainerInformation((prev) => ({
										...prev,
										opentop: [
											...prev.opentop,
											getEmptyContainerData(
												ContainerType.opentop,
												selectableContainerSizeOptions,
											) as OpenTopContainerInformationType,
										],
									}));
								}}
							>
								<Add fontSize="small" />
							</MdFilledTonalIconButton>
							<div className="flex flex-1 flex-col-reverse">
								<AnimatePresence>
									{list.map((container, index) => {
										return (
											<motion.div
												key={container.uuid}
												className="flex flex-1 gap-4"
												variants={containerVariant}
												initial="initial"
												animate="add"
												exit="remove"
											>
												<div
													key={container.uuid}
													className="mt-6 flex flex-col flex-1 gap-2"
												>
													{list.length - 1 !== index && (
														<div className="w-full border-dotted border-b border-b-outlineVariant mb-4" />
													)}
													<div className="flex gap-4 items-start">
														<div className="flex gap-2">
															<NAOutlinedListBox
																label="Size"
																className="w-[136px] text-right"
																suffixText="ft"
																required={showRequired}
																error={
																	bookingRequestStep.container.visited &&
																	container.size === ""
																}
																errorText="Size is required"
																initialValue={container.size}
																options={
																	container.size !== ""
																		? [
																				container.size,
																				...selectableContainerSizeOptions,
																			].sort()
																		: selectableContainerSizeOptions
																}
																onSelection={(size) => {
																	setContainerInformation((prev) => ({
																		...prev,
																		opentop: prev.opentop.map((c, i) =>
																			i === index
																				? { ...c, size: size as string }
																				: c,
																		),
																	}));
																}}
															/>
															<NAOutlinedNumberField
																label="Quantity / Total"
																className="w-[136px]"
																required={showRequired}
																error={
																	bookingRequestStep.container.visited &&
																	container.quantity === 0
																}
																errorText="Quantity is required"
																value={container.quantity.toString()}
																handleValueChange={(value) => {
																	setContainerInformation((prev) => ({
																		...prev,
																		opentop: prev.opentop.map((c, i) =>
																			i === index
																				? { ...c, quantity: value ?? 0 }
																				: c,
																		),
																	}));
																}}
																onBlur={(e) => {
																	e.target.value =
																		container.quantity.toString();
																}}
															/>
															<NAOutlinedNumberField
																label="Quantity / SOC"
																className="w-[136px]"
																value={container.soc.toString()}
																error={container.soc > container.quantity}
																errorText="SOC cannot be greater than Quantity"
																handleValueChange={(value) => {
																	setContainerInformation((prev) => ({
																		...prev,
																		opentop: prev.opentop.map((c, i) =>
																			i === index
																				? { ...c, soc: value ?? 0 }
																				: c,
																		),
																	}));
																}}
																onBlur={(e) => {
																	e.target.value = container.soc.toString();
																}}
															/>
															{container.dgInfo.isDangerous && (
																<NAOutlinedNumberField
																	label="Quantity / DG"
																	className="w-[136px]"
																	value={container.dgInfo.quantity.toString()}
																	handleValueChange={(value) => {
																		// adjust value should be less than or equal to quantity and least 1
																		const adjustedValue =
																			(value ?? 0) > container.quantity
																				? container.quantity
																				: (value ?? 0) < 1
																					? 1
																					: value;

																		setContainerInformation((prev) => ({
																			...prev,
																			opentop: prev.opentop.map((c, i) =>
																				i === index
																					? {
																							...c,
																							dgInfo: {
																								...c.dgInfo,
																								quantity: adjustedValue ?? 0,
																							},
																						}
																					: c,
																			),
																		}));
																	}}
																/>
															)}
														</div>
														{container.isAwkward && (
															<>
																<div className="flex gap-2">
																	<NAOutlinedNumberField
																		label="Package"
																		maxInputLength={9}
																		value={container.package?.toString() ?? ""}
																		handleValueChange={(value) => {
																			setContainerInformation((prev) => ({
																				...prev,
																				opentop: prev.opentop.map((c, i) =>
																					i === index
																						? {
																								...c,
																								package: value ?? undefined,
																							}
																						: c,
																				),
																			}));
																		}}
																	/>
																	<NAOutlinedListBox
																		label=""
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
																				opentop: prev.opentop.map((c, i) =>
																					i === index
																						? { ...c, packageType }
																						: c,
																				),
																			}));
																		}}
																	/>
																</div>
																<div className="flex gap-2">
																	<NAOutlinedNumberField
																		label="Gross Weight"
																		className="flex-1"
																		value={
																			container.grossWeight?.toString() ?? ""
																		}
																		maxInputLength={9}
																		handleValueChange={(value) => {
																			setContainerInformation((prev) => ({
																				...prev,
																				opentop: prev.opentop.map((c, i) =>
																					i === index
																						? {
																								...c,
																								grossWeight: value ?? undefined,
																							}
																						: c,
																				),
																			}));
																		}}
																	/>
																	<NAOutlinedListBox
																		className="w-28 min-w-[28]"
																		options={["KGS", "LBS"]}
																		initialValue={container.grossWeightUnit}
																		onSelection={(selectedUnit) => {
																			setContainerInformation((prev) => ({
																				...prev,
																				opentop: prev.opentop.map((c, i) =>
																					i === index
																						? {
																								...c,
																								grossWeightUnit: selectedUnit as
																									| "KGS"
																									| "LBS",
																								netWeightUnit: selectedUnit as
																									| "KGS"
																									| "LBS",
																							}
																						: c,
																				),
																			}));
																		}}
																	/>
																</div>
																<div className="flex gap-2">
																	<NAOutlinedNumberField
																		label="Net Weight"
																		className="flex-1"
																		maxInputLength={9}
																		value={
																			container.netWeight?.toString() ?? ""
																		}
																		handleValueChange={(value) => {
																			setContainerInformation((prev) => ({
																				...prev,
																				opentop: prev.opentop.map((c, i) =>
																					i === index
																						? {
																								...c,
																								netWeight: value ?? undefined,
																							}
																						: c,
																				),
																			}));
																		}}
																	/>
																	<NAOutlinedListBox
																		className="w-28"
																		options={["KGS", "LBS"]}
																		initialValue={container.netWeightUnit}
																		onSelection={(selectedUnit) => {
																			setContainerInformation((prev) => ({
																				...prev,
																				opentop: prev.opentop.map((c, i) =>
																					i === index
																						? {
																								...c,
																								grossWeightUnit: selectedUnit as
																									| "KGS"
																									| "LBS",
																								netWeightUnit: selectedUnit as
																									| "KGS"
																									| "LBS",
																							}
																						: c,
																				),
																			}));
																		}}
																	/>
																</div>
															</>
														)}
													</div>
													<AwkwardContainerTrigger
														container={container}
														type={ContainerType.opentop}
													/>
													<AwkwardContainerInput
														container={container}
														type={ContainerType.opentop}
													/>
													<DangerousCargoTrigger
														container={container}
														type={ContainerType.opentop}
													/>
													<DangerousCargoInput
														container={container}
														type={ContainerType.opentop}
														showRequired={showRequired}
													/>
												</div>
												<MdOutlinedIconButton
													className={
														list.length - 1 !== index ? "mt-16" : "mt-8"
													}
													onClick={() => {
														setContainerInformation((prev) => ({
															...prev,
															opentop: prev.opentop.filter(
																(c, i) => i !== index,
															),
														}));
													}}
												>
													<DeleteOutline fontSize="small" />
												</MdOutlinedIconButton>
											</motion.div>
										);
									})}
								</AnimatePresence>
							</div>
						</Disclosure.Panel>
					</>
				);
			}}
		</Disclosure>
	);
};

export default OpenTopContainerInput;
