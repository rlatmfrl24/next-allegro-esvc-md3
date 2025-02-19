import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
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
	type TankContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Disclosure } from "@headlessui/react";
import { Add, ArrowDropDown, DeleteOutline } from "@mui/icons-material";

import { containerVariant } from "./base";
import {
	DangerousCargoInput,
	DangerousCargoTrigger,
} from "./dangerous-cargo-input";

const TankContainerInput = ({
	list,
	showRequired = true,
}: {
	list: TankContainerInformationType[];
	showRequired?: boolean;
}) => {
	const [containerInformation, setContainerInformation] =
		useRecoilState(ContainerState);
	const [bookingRequestStep] = useRecoilState(BookingRequestStepState);

	const defaultContainerSizeOptions = ["20", "40", "40HC"];

	const selectableContainerSizeOptions = useMemo(() => {
		// if container size is already selected, remove it from the options
		for (const container of containerInformation.tank) {
			const index = defaultContainerSizeOptions.indexOf(container.size);
			if (index !== -1) defaultContainerSizeOptions.splice(index, 1);
		}

		return [...defaultContainerSizeOptions];

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerInformation.tank]);

	return (
		<Disclosure defaultOpen>
			{({ open }) => (
				<>
					<Disclosure.Button className={"flex w-full items-center gap-2"}>
						<DetailTitle title="Tank Container" />
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
								defaultContainerSizeOptions.length === 0 ||
								containerInformation.tank.length === 4
							}
							onClick={() => {
								setContainerInformation((prev) => ({
									...prev,
									tank: [
										...prev.tank,
										getEmptyContainerData(
											ContainerType.tank,
											selectableContainerSizeOptions,
										) as TankContainerInformationType,
									],
								}));
							}}
						>
							<Add fontSize="small" />
						</MdFilledTonalIconButton>
						<div className="flex flex-1 flex-col-reverse">
							<AnimatePresence>
								{list.map((container, index) => (
									<motion.div
										key={container.uuid}
										className="flex gap-4 flex-1"
										variants={containerVariant}
										initial="initial"
										exit="remove"
										animate="add"
									>
										<div className="mt-6 flex flex-1 flex-col gap-2">
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
																tank: prev.tank.map((c, i) =>
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
																tank: prev.tank.map((c, i) =>
																	i === index
																		? { ...c, quantity: value ?? 0 }
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
																tank: prev.tank.map((c, i) =>
																	i === index ? { ...c, soc: value ?? 0 } : c,
																),
															}));
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
																	tank: prev.tank.map((c, i) =>
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
											</div>
											<DangerousCargoTrigger
												container={container}
												type={ContainerType.tank}
											/>
											<DangerousCargoInput
												container={container}
												type={ContainerType.tank}
												showRequired={showRequired}
											/>
										</div>
										<MdOutlinedIconButton
											className={list.length - 1 !== index ? "mt-16" : "mt-8"}
											onClick={() => {
												setContainerInformation((prev) => ({
													...prev,
													tank: prev.tank.filter((c, i) => i !== index),
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

export default TankContainerInput;
