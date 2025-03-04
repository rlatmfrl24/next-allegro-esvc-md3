import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAMultiAutoComplete from "@/app/components/na-multi-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { MdTypography } from "@/app/components/typography";
import {
	BookingRequestStepState,
	CargoPickUpReturnState,
} from "@/app/store/booking.store";
import { MdFilledButton, MdOutlinedTextField } from "@/app/util/md3";
import type { CommodityType } from "@/app/util/typeDef/booking";
import type { PlaceInformationType } from "@/app/util/typeDef/schedule";
import { faker } from "@faker-js/faker";

import { createDummyPlaceInformation } from "../../schedule/util";
import { SubTitle } from "@/app/components/title-components";
import { useSearchParams } from "next/navigation";
import { QuotationTermsState } from "@/app/store/pricing.store";
import { getWeightText } from "../../tracking/cargo/util";
import { DatePicker } from "@/app/components/datepickers/date-picker";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";

export default function CargoStep() {
	const [cargoPickUpReturnData, setCargoPickUpReturnData] = useRecoilState(
		CargoPickUpReturnState,
	);
	// const setBookingRequestStep = useSetRecoilState(BookingRequestStepState);
	const [bookingRequestStep, setBookingRequestStep] = useRecoilState(
		BookingRequestStepState,
	);

	const ValidateRequired = useCallback(() => {
		if (
			cargoPickUpReturnData.commodity.code === "" ||
			cargoPickUpReturnData.commodity.description === "" ||
			cargoPickUpReturnData.emptyPickUpDate === undefined ||
			cargoPickUpReturnData.grossWeight === "0" ||
			cargoPickUpReturnData.grossWeight === undefined
		) {
			return false;
		}
		return true;
	}, [
		cargoPickUpReturnData.commodity.code,
		cargoPickUpReturnData.commodity.description,
		cargoPickUpReturnData.emptyPickUpDate,
		cargoPickUpReturnData.grossWeight,
	]);

	const moveToContainerStep = useCallback(() => {
		setBookingRequestStep((prev) => ({
			...prev,
			cargoPickUpReturn: {
				...prev.cargoPickUpReturn,
				isSelected: false,
				visited: true,
			},
			container: {
				...prev.container,
				isSelected: true,
			},
		}));
	}, [setBookingRequestStep]);

	useEffect(() => {
		if (ValidateRequired()) {
			setBookingRequestStep((prev) => ({
				...prev,
				cargoPickUpReturn: {
					...prev.cargoPickUpReturn,
					isCompleted: true,
				},
			}));
		} else {
			setBookingRequestStep((prev) => ({
				...prev,
				cargoPickUpReturn: {
					...prev.cargoPickUpReturn,
					isCompleted: false,
				},
			}));
		}
	}, [ValidateRequired, setBookingRequestStep]);

	const portList = useMemo(() => {
		return Array.from({ length: 50 }, (_, i) =>
			createDummyPlaceInformation(
				`${faker.location.city()}, ${faker.location.country()}`.toUpperCase(),
			),
		);
	}, []);

	const tempCommodities = useMemo(() => {
		return Array.from({ length: 40 }, (_, i) => ({
			description: faker.commerce.productName(),
			code: faker.string.numeric(7),
		}));
	}, []);

	// use Quotation Data
	const params = useSearchParams();
	const quotationTerms = useRecoilValue(QuotationTermsState);

	useEffect(() => {
		if (params.has("quoteNumber")) {
			setCargoPickUpReturnData((prev) => ({
				...prev,
				commodity: {
					code: "-",
					description: "FAK (Freight of All Kinds)",
				},
				grossWeight: getWeightText(quotationTerms?.grossWeight || 0),
				grossWeightUnit: quotationTerms?.weightUnit || "KGS",
			}));
		}
	}, [quotationTerms, params, setCargoPickUpReturnData]);

	return (
		<div className="w-full flex flex-col">
			<MdTypography variant="title" size="large" className="mb-4">
				Cargo & Pick Up/Return
			</MdTypography>
			<SubTitle title="Cargo" className="mb-4" />
			<div className="flex gap-4">
				<NAMultiAutoComplete
					required
					error={
						bookingRequestStep.cargoPickUpReturn.visited &&
						cargoPickUpReturnData.commodity.code === ""
					}
					errorText="Commodity is required."
					label="Commodity"
					initialValue={cargoPickUpReturnData.commodity}
					isAllowOnlyListItems={false}
					showAllonFocus={true}
					itemList={tempCommodities}
					readOnly={params.has("quoteNumber")}
					onQueryChange={(query) => {
						setCargoPickUpReturnData((prev) => {
							return {
								...prev,
								commodity: {
									code: "-",
									description: query,
								},
							};
						});
					}}
					onItemSelection={(value) => {
						setCargoPickUpReturnData((prev) => {
							return { ...prev, commodity: value as CommodityType };
						});
					}}
				/>

				<NAOutlinedNumberField
					value={cargoPickUpReturnData.grossWeight}
					className="h-fit"
					label="Total Estimated Gross Weight"
					maxInputLength={9}
					required
					error={
						bookingRequestStep.cargoPickUpReturn.visited &&
						(cargoPickUpReturnData.grossWeight === "0" ||
							cargoPickUpReturnData.grossWeight === undefined)
					}
					errorText="Gross Weight is required."
					readOnly={params.has("quoteNumber")}
					handleValueChange={(value) => {
						setCargoPickUpReturnData((prev) => {
							return {
								...prev,
								// grossWeight: intValue > 999999999 ? "999999999" : value,
								grossWeight: value?.toString(),
							};
						});
					}}
				/>
				<NAOutlinedListBox
					className="w-32"
					readOnly={params.has("quoteNumber")}
					initialValue={cargoPickUpReturnData.grossWeightUnit}
					options={["KGS", "LBS"]}
					onSelection={(value) => {
						setCargoPickUpReturnData((prev) => {
							return { ...prev, grossWeightUnit: value as "KGS" | "LBS" };
						});
					}}
				/>
			</div>
			<SubTitle title="Container Pick Up/Return Place" className="mt-6 mb-4" />
			<div className="flex flex-col gap-6">
				<div className="flex gap-4">
					<DatePicker
						className="flex-1"
						required
						label="Empty Pick Up Date"
						initialDate={cargoPickUpReturnData.emptyPickUpDate}
						onDateChange={(date) => {
							setCargoPickUpReturnData((prev) => {
								return { ...prev, emptyPickUpDate: date };
							});
						}}
					/>

					<div className="flex-1">
						<MdOutlinedTextField
							type="time"
							value={
								cargoPickUpReturnData.emptyPickUpDate?.toFormat("HH:mm") || ""
							}
							onInput={(e) => {
								const date = cargoPickUpReturnData.emptyPickUpDate;
								const time = e.currentTarget.value;
								const hour = Number(time.split(":")[0]);
								const minute = Number(time.split(":")[1]);
								date &&
									setCargoPickUpReturnData((prev) => {
										return {
											...prev,
											emptyPickUpDate: date.set({ hour, minute }),
										};

										// return {
										//   ...prev,
										//   emptyPickUpDate: date.set({ hour, minute }),
										// };
									});
							}}
						/>
					</div>
				</div>
				<div className="flex gap-4">
					<NAOutlinedAutoComplete
						className="flex-1"
						label="Empty Pick Up CY/Depot"
						placeholder="Empty Pick Up CY/Depot (Prefered)"
						recentCookieKey="recent-port"
						initialValue={cargoPickUpReturnData.emptyPickUpLocation.yardName}
						itemList={portList.map((port) => port.yardName)}
						onItemSelection={(value) => {
							let selectedPort = portList.find(
								(port) => port.yardName === value,
							);

							if (value !== "" && selectedPort === undefined) {
								selectedPort = createDummyPlaceInformation(value);
							}

							setCargoPickUpReturnData((prev) => {
								return {
									...prev,
									emptyPickUpLocation:
										selectedPort || ({} as PlaceInformationType),
								};
							});
						}}
					/>

					<div className="flex-1 flex gap-4">
						<NAOutlinedTextField
							readOnly
							label="Tel No."
							className="flex-1"
							type="tel"
							value={cargoPickUpReturnData.emptyPickUpLocation.code || ""}
							onInput={(e) => {
								setCargoPickUpReturnData((prev) => {
									return {
										...prev,
										emptyPickUpLocation: {
											...prev.emptyPickUpLocation,
											code: e.currentTarget.value,
										},
									};
								});
							}}
						/>

						<NAOutlinedTextField
							readOnly
							label="Address"
							className="flex-1"
							value={cargoPickUpReturnData.emptyPickUpLocation.address || ""}
							onInput={(e) => {
								setCargoPickUpReturnData((prev) => {
									return {
										...prev,
										emptyPickUpLocation: {
											...prev.emptyPickUpLocation,
											address: e.currentTarget.value,
										},
									};
								});
							}}
						/>
					</div>
				</div>
				<div className="flex gap-4">
					<DatePicker
						className="flex-1"
						label="Full Container Return Date"
						initialDate={cargoPickUpReturnData.fullReturnDate}
						onDateChange={(date) => {
							setCargoPickUpReturnData((prev) => {
								return { ...prev, fullPickUpDate: date };
							});
						}}
					/>
					<div className="flex-1" />
				</div>
				<div className="flex gap-4">
					<NAOutlinedAutoComplete
						className="flex-1"
						label="Full Container Return CY"
						value={cargoPickUpReturnData.fullReturnLocation.yardName}
						itemList={portList.map((port) => port.yardName)}
						recentCookieKey="recent-port"
						onItemSelection={(value) => {
							let selectedPort = portList.find(
								(port) => port.yardName === value,
							);

							if (value !== "" && selectedPort === undefined) {
								selectedPort = createDummyPlaceInformation(value);
							}

							setCargoPickUpReturnData((prev) => {
								return {
									...prev,
									fullReturnLocation:
										selectedPort || ({} as PlaceInformationType),
								};
							});
						}}
					/>

					<div className="flex-1 flex gap-4">
						<NAOutlinedTextField
							readOnly
							label="Tel No."
							type="tel"
							className="flex-1"
							value={cargoPickUpReturnData.fullReturnLocation.code || ""}
							onInput={(e) => {
								setCargoPickUpReturnData((prev) => {
									return {
										...prev,
										fullReturnLocation: {
											...prev.fullReturnLocation,
											code: e.currentTarget.value,
										},
									};
								});
							}}
						/>
						<NAOutlinedTextField
							readOnly
							label="Address"
							className="flex-1"
							value={cargoPickUpReturnData.fullReturnLocation.address || ""}
							onInput={(e) => {
								setCargoPickUpReturnData((prev) => {
									return {
										...prev,
										fullReturnLocation: {
											...prev.fullReturnLocation,
											address: e.currentTarget.value,
										},
									};
								});
							}}
						/>
					</div>
				</div>
			</div>
			<div className="flex-1 flex items-end justify-end">
				<MdFilledButton onClick={() => moveToContainerStep()}>
					Next
				</MdFilledButton>
			</div>
		</div>
	);
}
