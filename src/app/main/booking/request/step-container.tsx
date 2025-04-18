import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import EmptyContainerPlaceholder from "@/../public/image_empty_container_placeholder.svg";
import DryContainerImage from "@/../public/img_dry_container.svg";
import ReeferContainerImage from "@/../public/img_reefer_container.svg";
import OpenTopContainerImage from "@/../public/img_open_top_container.svg";
import FlatRackContainerImage from "@/../public/img_flat_rack_container.svg";
import TankContainerImage from "@/../public/img_tank_container.svg";
import BulkContainerImage from "@/../public/img_bulk_container.svg";
import { SubTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
	BookingRequestStepState,
	ContainerState,
} from "@/app/store/booking.store";
import { QuotationTermsState } from "@/app/store/pricing.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import {
	ContainerType,
	type DangerousContainerDataType,
	type DryContainerInformationType,
} from "@/app/util/typeDef/booking";
import { faker } from "@faker-js/faker";

import { getEmptyContainerData } from "../../util";
import BulkContainerInput from "./components/bulk-container-input";
import ContainerToggleButton from "./components/container-toggle-button";
import DryContainerInput from "./components/dry-container-input";
import FlatRackContainerInput from "./components/flatrack-container-input";
import OpenTopContainerInput from "./components/opentop-container-input";
import ReeferContainerInput from "./components/reefer-container-input";
import TankContainerInput from "./components/tank-container-input";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DividerComponent } from "@/app/components/divider";
import { DangerousCargoStatusProps } from "../special-cargo/util";

export default function ContainerStep() {
	// const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
	const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
		BookingRequestStepState,
	);
	const [containerInformation, setContainerInformation] =
		useRecoilState(ContainerState);
	const [typeSelections, setTypeSelections] = useState<ContainerType[]>(
		Object.keys(ContainerType).map(
			(key) => ContainerType[key as keyof typeof ContainerType],
		),
	);

	function ValidateContainerInput() {
		let isValid = true;

		const totalContainerQuantity =
			containerInformation.dry.reduce((acc, curr) => acc + curr.quantity, 0) +
			containerInformation.reefer.reduce(
				(acc, curr) => acc + curr.quantity,
				0,
			) +
			containerInformation.opentop.reduce(
				(acc, curr) => acc + curr.quantity,
				0,
			) +
			containerInformation.flatrack.reduce(
				(acc, curr) => acc + curr.quantity,
				0,
			) +
			containerInformation.tank.reduce((acc, curr) => acc + curr.quantity, 0) +
			containerInformation.bulk.length;

		if (totalContainerQuantity === 0) {
			isValid = false;
		}

		for (const container of containerInformation.dry) {
			if (container.size === "" || container.quantity === 0) {
				isValid = false;
			}
		}

		for (const container of containerInformation.reefer) {
			if (
				container.size === "" ||
				container.quantity === 0 ||
				container.nature === "" ||
				container.genset === undefined
			) {
				isValid = false;
			}
		}

		for (const container of containerInformation.opentop) {
			if (container.size === "" || container.quantity === 0) {
				isValid = false;
			}
		}
		for (const container of containerInformation.flatrack) {
			if (container.size === "" || container.quantity === 0) {
				isValid = false;
			}
		}
		for (const container of containerInformation.tank) {
			if (container.size === "" || container.quantity === 0) {
				isValid = false;
			}
		}

		const allDangerousCargo: DangerousContainerDataType[] = [
			...containerInformation.dry,
			...containerInformation.reefer,
			...containerInformation.opentop,
			...containerInformation.flatrack,
			...containerInformation.tank,
		].reduce((acc, curr) => {
			const dangerousCargo = curr.dgInfo.data.reduce((acc, curr) => {
				return acc.concat(...curr);
			}, [] as DangerousContainerDataType[]);

			return acc.concat(
				dangerousCargo.map((dangerousCargo) => {
					return dangerousCargo;
				}),
			);
		}, [] as DangerousContainerDataType[]);

		// Check if Dangerous Cargo required data is empty
		for (const dangerousCargo of allDangerousCargo) {
			if (
				dangerousCargo.unNumber === "" ||
				dangerousCargo.class === "" ||
				dangerousCargo.unNumber === "0" ||
				dangerousCargo.class === "0"
			) {
				isValid = false;
			}
		}

		//check if awkward cargo required data is empty
		[...containerInformation.flatrack, ...containerInformation.opentop]
			.filter((container) => container.isAwkward)
			.map((container) => {
				if (
					container.package === 0 ||
					container.package === undefined ||
					container.packageType === "" ||
					container.packageType === undefined ||
					container.grossWeight === 0 ||
					container.grossWeight === undefined ||
					container.awkward.commodity.description === "" ||
					container.awkward.commodity.description === undefined ||
					container.awkward.height === 0 ||
					container.awkward.height === undefined ||
					container.awkward.length === 0 ||
					container.awkward.length === undefined ||
					container.awkward.width === 0 ||
					container.awkward.width === undefined
				) {
					isValid = false;
				}
			});

		return isValid;
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const isValid = useCallback(ValidateContainerInput, [
		containerInformation.bulk.length,
		containerInformation.dry,
		containerInformation.flatrack,
		containerInformation.opentop,
		containerInformation.reefer,
		containerInformation.tank,
	]);

	useEffect(() => {
		setBookingRequestStep((prev) => ({
			...prev,
			container: {
				...prev.container,
				isCompleted: isValid(),
			},
		}));
	}, [isValid, setBookingRequestStep]);

	const moveToAdditionalInformationStep = () => {
		setBookingRequestStep((prev) => ({
			...prev,
			container: {
				...prev.container,
				isSelected: false,
				visited: true,
			},
			additionalInformation: {
				...prev.additionalInformation,
				isSelected: true,
			},
		}));
	};

	function handleTypeSelections(type: ContainerType) {
		if (typeSelections.includes(type)) {
			setTypeSelections((prev) => prev.filter((t) => t !== type));
		} else {
			setTypeSelections((prev) => [...prev, type]);
		}

		const defaultContainerSizeOptions = ["20", "40", "40HC"];

		const typeKey = type.toLowerCase() as keyof typeof containerInformation;
		const emptyData = getEmptyContainerData(type, defaultContainerSizeOptions);

		if (containerInformation[typeKey].length === 0) {
			setContainerInformation((prev) => ({
				...prev,
				[typeKey]: [
					...prev[type.toLowerCase() as keyof typeof prev],
					emptyData,
				],
			}));
		}
	}

	useEffect(() => {
		containerInformation.dry.length === 0 &&
			setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.dry));
		containerInformation.reefer.length === 0 &&
			setTypeSelections((prev) =>
				prev.filter((t) => t !== ContainerType.reefer),
			);
		containerInformation.opentop.length === 0 &&
			setTypeSelections((prev) =>
				prev.filter((t) => t !== ContainerType.opentop),
			);
		containerInformation.flatrack.length === 0 &&
			setTypeSelections((prev) =>
				prev.filter((t) => t !== ContainerType.flatrack),
			);
		containerInformation.tank.length === 0 &&
			setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.tank));
		containerInformation.bulk.length === 0 &&
			setTypeSelections((prev) => prev.filter((t) => t !== ContainerType.bulk));
	}, [
		containerInformation.bulk.length,
		containerInformation.dry.length,
		containerInformation.flatrack.length,
		containerInformation.opentop.length,
		containerInformation.reefer.length,
		containerInformation.tank.length,
	]);

	// use Quotation Data
	const params = useSearchParams();
	const quotationTerms = useRecoilValue(QuotationTermsState);

	useEffect(() => {
		if (params.has("quoteNumber")) {
			const dryList = quotationTerms.containers.map((container) => {
				return {
					uuid: faker.string.uuid(),
					size: {
						"Dry 20": "20",
						"Dry 40": "40",
						"Dry 45": "45",
					}[container.containerType],
					type: ContainerType.dry,
					soc: 0,
					quantity: container.quantity,
				} as DryContainerInformationType;
			});

			setContainerInformation((prev) => ({
				...prev,
				dry: dryList,
			}));
		}
	}, [quotationTerms, params, setContainerInformation]);

	return (
		<div className="w-full flex flex-col">
			<MdTypography variant="title" size="large">
				Container
			</MdTypography>
			{params.has("quoteNumber") ? (
				<>
					<div className="w-fit mt-4">
						<ContainerToggleButton
							image={<DryContainerImage />}
							isSelected={typeSelections.includes(ContainerType.dry)}
							onClick={() => {
								// handleTypeSelections(ContainerType.dry);
							}}
							title="Dry"
							count={
								containerInformation.dry.length === 0
									? undefined
									: containerInformation.dry.length
							}
						/>
					</div>
					<div className="mt-6">
						<SubTitle title="Dry Container" className="mb-6" />
						{quotationTerms.containers.map((container, index) => {
							return (
								<>
									<div
										key={
											container.containerType + container.quantity.toString()
										}
										className="flex gap-4"
									>
										<NAOutlinedTextField
											readOnly
											label="Size"
											className="text-right"
											value={
												{
													"Dry 20": "20",
													"Dry 40": "40",
													"Dry 45": "45",
												}[container.containerType]
											}
											suffixText="ft"
										/>
										<NAOutlinedTextField
											readOnly
											className="text-right"
											label="Quantity / Total"
											value={container.quantity.toString()}
										/>
									</div>
									{index !== quotationTerms.containers.length - 1 && (
										<DividerComponent className="border-dotted my-4" />
									)}
								</>
							);
						})}
					</div>
				</>
			) : (
				<>
					<div className="flex gap-4 mt-4">
						<ContainerToggleButton
							image={<DryContainerImage />}
							isSelected={typeSelections.includes(ContainerType.dry)}
							onClick={() => {
								handleTypeSelections(ContainerType.dry);
							}}
							title="Dry"
							count={
								containerInformation.dry.length === 0
									? undefined
									: containerInformation.dry.reduce(
											(acc, curr) => acc + curr.quantity,
											0,
										)
							}
							hoverText={
								<div>
									{containerInformation.dry.map((container, index) => {
										return (
											container.size &&
											container.quantity !== 0 && (
												<div
													key={container.size + container.quantity.toString()}
													className="flex gap-4"
												>
													<MdTypography
														variant="title"
														size="medium"
														className="text-white"
													>
														{`${container.size} x${container.quantity}`}
													</MdTypography>
												</div>
											)
										);
									})}
								</div>
							}
						/>
						<ContainerToggleButton
							image={<ReeferContainerImage />}
							isSelected={typeSelections.includes(ContainerType.reefer)}
							onClick={() => {
								handleTypeSelections(ContainerType.reefer);
							}}
							title="Reefer"
							count={
								containerInformation.reefer.length === 0
									? undefined
									: containerInformation.reefer.reduce(
											(acc, curr) => acc + curr.quantity,
											0,
										)
							}
							hoverText={
								<div>
									{containerInformation.reefer.map((container, index) => {
										return (
											container.size &&
											container.quantity !== 0 && (
												<div
													key={container.size + container.quantity.toString()}
													className="flex gap-4"
												>
													<MdTypography
														variant="title"
														size="medium"
														className="text-white"
													>
														{`${container.size} x${container.quantity}`}
													</MdTypography>
												</div>
											)
										);
									})}
								</div>
							}
						/>
						<ContainerToggleButton
							image={<OpenTopContainerImage />}
							isSelected={typeSelections.includes(ContainerType.opentop)}
							onClick={() => {
								handleTypeSelections(ContainerType.opentop);
							}}
							title="Open Top"
							count={
								containerInformation.opentop.length === 0
									? undefined
									: containerInformation.opentop.reduce(
											(acc, curr) => acc + curr.quantity,
											0,
										)
							}
							hoverText={
								<div>
									{containerInformation.opentop.map((container, index) => {
										return (
											container.size &&
											container.quantity !== 0 && (
												<div
													key={container.size + container.quantity.toString()}
													className="flex gap-4"
												>
													<MdTypography
														variant="title"
														size="medium"
														className="text-white"
													>
														{`${container.size} x${container.quantity}`}
													</MdTypography>
												</div>
											)
										);
									})}
								</div>
							}
						/>
						<ContainerToggleButton
							image={<FlatRackContainerImage />}
							isSelected={typeSelections.includes(ContainerType.flatrack)}
							onClick={() => {
								handleTypeSelections(ContainerType.flatrack);
							}}
							title="Flat Rack"
							count={
								containerInformation.flatrack.length === 0
									? undefined
									: containerInformation.flatrack.reduce(
											(acc, curr) => acc + curr.quantity,
											0,
										)
							}
							hoverText={
								<div>
									{containerInformation.flatrack.map((container, index) => {
										return (
											container.size &&
											container.quantity !== 0 && (
												<div
													key={container.size + container.quantity.toString()}
													className="flex gap-4"
												>
													<MdTypography
														variant="title"
														size="medium"
														className="text-white"
													>
														{`${container.size} x${container.quantity}`}
													</MdTypography>
												</div>
											)
										);
									})}
								</div>
							}
						/>
						<ContainerToggleButton
							image={<TankContainerImage />}
							isSelected={typeSelections.includes(ContainerType.tank)}
							onClick={() => {
								handleTypeSelections(ContainerType.tank);
							}}
							title="Tank"
							count={
								containerInformation.tank.length === 0
									? undefined
									: containerInformation.tank.reduce(
											(acc, curr) => acc + curr.quantity,
											0,
										)
							}
							hoverText={
								<div>
									{containerInformation.tank.map((container, index) => {
										return (
											container.size &&
											container.quantity !== 0 && (
												<div
													key={container.size + container.quantity.toString()}
													className="flex gap-4"
												>
													<MdTypography
														variant="title"
														size="medium"
														className="text-white"
													>
														{`${container.size} x${container.quantity}`}
													</MdTypography>
												</div>
											)
										);
									})}
								</div>
							}
						/>
						<ContainerToggleButton
							image={<BulkContainerImage />}
							isSelected={typeSelections.includes(ContainerType.bulk)}
							onClick={() => {
								handleTypeSelections(ContainerType.bulk);
							}}
							title="Bulk"
							// Bulk container does not have quantity
							count={
								containerInformation.bulk.length === 0
									? undefined
									: containerInformation.bulk.length
							}
							hoverText={
								<div>
									{containerInformation.bulk.length !== 0 && (
										<MdTypography
											variant="title"
											size="medium"
											className="text-white"
										>
											{`Bulk x${containerInformation.bulk.length}`}
										</MdTypography>
									)}
								</div>
							}
						/>
					</div>
					<div className="flex flex-1 justify-end flex-col-reverse w-full mt-6 gap-6">
						{typeSelections.map((type) => {
							return (
								<div key={type}>
									{type === ContainerType.dry && (
										<DryContainerInput list={containerInformation.dry} />
									)}
									{type === ContainerType.reefer && (
										<ReeferContainerInput list={containerInformation.reefer} />
									)}
									{type === ContainerType.opentop && (
										<OpenTopContainerInput
											list={containerInformation.opentop}
										/>
									)}
									{type === ContainerType.flatrack && (
										<FlatRackContainerInput
											list={containerInformation.flatrack}
										/>
									)}
									{type === ContainerType.tank && (
										<TankContainerInput list={containerInformation.tank} />
									)}
									{type === ContainerType.bulk && (
										<BulkContainerInput list={containerInformation.bulk} />
									)}
								</div>
							);
						})}
						{typeSelections.length === 0 && (
							<div className="flex-1 flex-col flex items-center justify-center gap-8">
								<EmptyContainerPlaceholder />
								<MdTypography
									variant="headline"
									size="medium"
									className="text-outlineVariant"
								>
									Please select the container type you want to add.
								</MdTypography>
							</div>
						)}
					</div>
				</>
			)}

			<div className="flex items-end justify-end mt-6 ">
				<MdFilledButton onClick={() => moveToAdditionalInformationStep()}>
					Next
				</MdFilledButton>
			</div>
		</div>
	);
}
