import { useMemo } from "react";
import { useRecoilState } from "recoil";

import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { DetailTitle } from "@/app/components/title-components";
import { getEmptyContainerData } from "@/app/main/util";
import {
	BookingRequestStepState,
	ContainerState,
} from "@/app/store/booking.store";
import { MdFilledTonalIconButton, MdOutlinedIconButton } from "@/app/util/md3";
import {
	ContainerType,
	type DryContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";

import { AnimatePresence, motion } from "framer-motion";
import { containerVariant } from "./base";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import {
	DangerousCargoInput,
	DangerousCargoTrigger,
} from "./dangerous-cargo-input";
import {
	FlexibagCargoInput,
	FlexibagCargoTrigger,
} from "./flexibag-cargo-input";

const DryContainerInput = ({
	list,
	showRequired = true,
}: {
	list: DryContainerInformationType[];
	showRequired?: boolean;
}) => {
	const [containerInformation, setContainerInformation] =
		useRecoilState(ContainerState);
	const [bookingRequestStep] = useRecoilState(BookingRequestStepState);

	const defaultContainerSizeOptions = ["20", "40", "40HC"];

	const selectableContainerSizeOptions = useMemo(() => {
		// if container size is already selected, remove it from the options
		for (const container of containerInformation.dry) {
			const index = defaultContainerSizeOptions.indexOf(container.size);
			if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
		}

		return [...defaultContainerSizeOptions];

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerInformation.dry]);

	return (
		<Disclosure defaultOpen>
			{({ open }) => (
				<>
					<Disclosure.Button className={"flex w-full items-center gap-2"}>
						<DetailTitle title="Dry Container" />
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
								containerInformation.dry.length ===
								defaultContainerSizeOptions.length
							}
							onClick={() => {
								setContainerInformation((prev) => ({
									...prev,
									dry: [
										...prev.dry,
										getEmptyContainerData(
											ContainerType.dry,
											selectableContainerSizeOptions,
										) as DryContainerInformationType,
									],
								}));
							}}
						>
							<Add fontSize="small" />
						</MdFilledTonalIconButton>
						<div className="flex flex-col-reverse flex-1">
							<AnimatePresence>
								{list.map((container, index) => (
									<motion.div
										key={container.uuid}
										className="flex gap-4"
										variants={containerVariant}
										initial="initial"
										animate="add"
										exit="remove"
									>
										<div
											key={container.uuid}
											className="mt-6 flex flex-col gap-2 flex-1"
										>
											{list.length - 1 !== index && (
												<div className="w-full border-dotted border-b border-b-outlineVariant mb-4" />
											)}
											<div className="flex gap-2 items-start flex-1">
												<NAOutlinedListBox
													label="Size"
													required={showRequired}
													error={
														bookingRequestStep.container.visited &&
														container.size === ""
													}
													errorText="Size is required"
													className="w-[136px] text-right"
													suffixText="ft"
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
															dry: prev.dry.map((c, i) =>
																i === index ? { ...c, size: size } : c,
															),
														}));
													}}
												/>

												<NAOutlinedNumberField
													label="Quantity / Total"
													required={showRequired}
													className="w-[136px]"
													error={
														bookingRequestStep.container.visited &&
														container.quantity === 0
													}
													errorText="Quantity is required"
													value={container.quantity.toString()}
													handleValueChange={(value) => {
														// value should be greater than 1

														setContainerInformation((prev) => ({
															...prev,
															dry: prev.dry.map((c, i) =>
																i === index
																	? {
																			...c,
																			quantity:
																				(value ?? 0) < 1 ? 1 : (value ?? 0),
																		}
																	: c,
															),
														}));
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
															dry: prev.dry.map((c, i) =>
																i === index ? { ...c, soc: value ?? 0 } : c,
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
																dry: prev.dry.map((c, i) =>
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
											<div className="flex gap-2 items-start flex-1">
												<DangerousCargoTrigger
													container={container}
													type={ContainerType.dry}
												/>
												<FlexibagCargoTrigger
													container={container}
													type={ContainerType.dry}
												/>
											</div>
											<DangerousCargoInput
												container={container}
												type={ContainerType.dry}
												showRequired={showRequired}
											/>
											<FlexibagCargoInput
												container={container}
												type={ContainerType.dry}
											/>
										</div>
										<MdOutlinedIconButton
											className={list.length - 1 !== index ? "mt-16" : "mt-8"}
											onClick={() => {
												setContainerInformation((prev) => ({
													...prev,
													dry: prev.dry.filter((c, i) => i !== index),
												}));
											}}
										>
											<DeleteOutline fontSize="small" />
										</MdOutlinedIconButton>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default DryContainerInput;
