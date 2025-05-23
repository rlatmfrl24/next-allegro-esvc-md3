import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
	BookingSplitState,
	CurrentBookingDataState,
	LocationScheduleState,
} from "@/app/store/booking.store";
import {
	MdDialog,
	MdFilledButton,
	MdFilledTonalButton,
	MdOutlinedButton,
	MdOutlinedTextField,
} from "@/app/util/md3";
import type {
	BookingSplitType,
	SplitTableType,
} from "@/app/util/typeDef/booking";
import {
	type CSSProperties,
	type Dispatch,
	type SetStateAction,
	useMemo,
	useState,
} from "react";
import { useRecoilValue } from "recoil";
import { SplitInputTable } from "./table/split-input-table";
import { SplitValidationTable } from "./table/split-validation-table";
import { SplitConfirmTable } from "./table/split-confirm-table";

const BookingSplitInformation = ({
	originBooking,
}: {
	originBooking: BookingSplitType;
}) => {
	const currentBookingData = useRecoilValue(CurrentBookingDataState);
	const currentLocationScheduleData = useRecoilValue(LocationScheduleState);

	return (
		<div className="grid grid-cols-[128px_1fr_128px_1fr] gap-2 mb-6">
			<MdTypography variant="body" size="medium" className="text-outline">
				Booking No.
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{currentBookingData?.bookingNo}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				Booking Office
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{currentLocationScheduleData?.bookingOffice}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				Vessel Voyage
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{currentBookingData?.vessel.vesselName}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				Shipper
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{currentBookingData?.actualShipper}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				POL/ETD
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{`${currentBookingData?.origin}, ${currentBookingData?.estimatedTimeofDeparture.date.toFormat(
					"yyyy. MM. dd",
				)}`}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				POD/ETA
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{`${currentBookingData?.destination}, ${currentLocationScheduleData?.departureDate.toFormat("yyyy. MM. dd")}`}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				Term
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{`${currentLocationScheduleData?.originType.toUpperCase()} - ${currentLocationScheduleData?.destinationType.toUpperCase()}`}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				Booking Date
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-onSurface">
				{currentBookingData?.requestDate.toFormat("yyyy. MM. dd")}
			</MdTypography>
			<MdTypography variant="body" size="medium" className="text-outline">
				Container
			</MdTypography>
			<MdTypography
				variant="body"
				size="medium"
				className="text-onSurface col-span-3"
			>
				{originBooking?.containers
					.map((container) => {
						return `${container.typeSize} x ${container.quantity}`;
					})
					.join(", ")}
			</MdTypography>
		</div>
	);
};

export const BookingSplitProcess = ({
	originBooking,
	handleAction,
	splitCount,
	setSplitCount,
}: {
	splitCount: number;
	setSplitCount: Dispatch<SetStateAction<number>>;
	originBooking: BookingSplitType;
	handleAction: (action: string) => void;
}) => {
	const [splitCountQuery, setSplitCountQuery] = useState<string>("2");
	const splitProcessData = useRecoilValue(BookingSplitState);

	const isDataValid = useMemo(() => {
		const weightSum = splitProcessData.reduce((acc, cur) => {
			return acc + (cur.weight || 0);
		}, 0);

		// 1. make slot list with sum of slot quantity
		const slotList: {
			slot: number;
			quantity: number;
		}[] = [];

		splitProcessData.map((data) => {
			data.containers.map((container) => {
				const slot = container.slot;

				// if slotList has slot, add quantity
				const slotIndex = slotList.findIndex(
					(slotData) => slotData.slot === slot,
				);

				if (slotIndex !== -1) {
					slotList[slotIndex].quantity += container.quantity || 0;
				} else {
					slotList.push({
						slot: slot || 0,
						quantity: container.quantity || 0,
					});
				}
			});
		});

		const containerSet = [] as SplitTableType["containers"];
		let slotCursor = 1;

		originBooking?.containers.map((container) => {
			Array.from({ length: container.quantity }).map(() => {
				containerSet.push({
					typeSize: container.typeSize,
					slot: slotCursor,
					quantity: 1,
				});
				slotCursor++;
			});
		});

		console.log("slotList", slotList);

		// 2. compare slot list with container set
		// if slot number is same, quantity is same
		const slotValid =
			slotList.every((slot, index) => {
				return slot.quantity === 1;
			}) && slotList.length === containerSet.length;

		return (
			weightSum === originBooking?.weight &&
			splitProcessData.length === splitCount &&
			slotValid
		);
	}, [
		originBooking?.containers,
		originBooking?.weight,
		splitCount,
		splitProcessData,
	]);

	return (
		<>
			<div slot="headline">Booking Split</div>
			<div slot="content">
				{originBooking && (
					<>
						<BookingSplitInformation originBooking={originBooking} />
						<div className="bg-white p-4 rounded-lg">
							<DetailTitle title="Container Information & Split Result" />
							<SplitValidationTable originBooking={originBooking} />
						</div>
					</>
				)}
				<div className="bg-white p-4 rounded-lg mt-5">
					<div className="flex items-center justify-between">
						<DetailTitle title="Split Information" />
						<div className="flex gap-2 relative">
							<MdTypography
								variant="label"
								size="medium"
								className="text-onSurface absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white pr-2"
							>
								Split
							</MdTypography>
							<MdOutlinedTextField
								style={
									{
										"--md-sys-typescale-body-large-size": "14px",
										"--md-outlined-field-top-space": "0px",
										"--md-outlined-field-bottom-space": "0px",
									} as CSSProperties
								}
								className="text-right w-28 pt-0"
								type="number"
								noSpinner
								value={splitCountQuery}
								onInput={(e) => {
									const value = e.currentTarget.value;
									if (value === "") {
										setSplitCountQuery(value);
										return;
									}
									if (value.match(/^[0-9]*$/)) {
										setSplitCountQuery(value);
									}
								}}
							/>
							<MdFilledTonalButton
								className="h-fit"
								onClick={() => {
									setSplitCount(
										Number.parseInt(splitCountQuery) > 0
											? Number.parseInt(splitCountQuery)
											: 2,
									);
								}}
							>
								Apply
							</MdFilledTonalButton>
						</div>
					</div>
					{originBooking && <SplitInputTable originBooking={originBooking} />}
				</div>
			</div>
			<div slot="actions">
				<MdOutlinedButton
					onClick={() => {
						handleAction("cancel");
					}}
				>
					Cancel
				</MdOutlinedButton>
				<MdFilledButton
					disabled={!isDataValid}
					onClick={() => {
						handleAction("split");
					}}
				>
					Split
				</MdFilledButton>
			</div>
		</>
	);
};

export const BookingSplitConfirmation = ({
	originBooking,
	handleAction,
}: {
	originBooking: BookingSplitType;
	handleAction: (action: string) => void;
}) => {
	const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
		useState<boolean>(false);
	const splitProcessData = useRecoilValue(BookingSplitState);
	const parsedOriginBooking = useMemo(() => {
		const containerSet = [] as SplitTableType["containers"];
		let slotCursor = 1;

		originBooking.containers.map((container) => {
			Array.from({ length: container.quantity }).map(() => {
				containerSet.push({
					typeSize: container.typeSize,
					slot: slotCursor,
					quantity: 1,
				});
				slotCursor++;
			});
		});

		return [
			{
				bookingNumber: originBooking.bookingNumber,
				weight: originBooking.weight,
				containers: containerSet,
			},
		] as SplitTableType[];
	}, [originBooking]);

	return (
		<>
			<div slot="headline">Split Information</div>
			<div slot="content" className="gap-4 flex flex-col">
				<MdDialog open={isConfirmDialogOpen}>
					<div slot="headline">
						The values you entered will be discarded. <br />
						Do you want to proceed with the changes?
					</div>
					<div slot="actions">
						<MdOutlinedButton
							onClick={() => {
								setIsConfirmDialogOpen(false);
							}}
						>
							Close
						</MdOutlinedButton>
						<MdFilledButton
							onClick={() => {
								handleAction("close");
							}}
						>
							Yes
						</MdFilledButton>
					</div>
				</MdDialog>
				<div className="bg-white p-4 rounded-lg">
					<DetailTitle title="Before" />
					<SplitConfirmTable data={parsedOriginBooking} />
				</div>
				<div className="bg-white p-4 rounded-lg">
					<DetailTitle title="After" />
					<SplitConfirmTable
						data={splitProcessData}
						compareData={parsedOriginBooking}
					/>
				</div>
			</div>
			<div slot="actions" className="justify-between">
				<MdOutlinedButton
					onClick={() => {
						handleAction("back");
					}}
				>
					Back
				</MdOutlinedButton>
				<div className="flex gap-2">
					<MdOutlinedButton
						onClick={() => {
							// handleAction("close");
							setIsConfirmDialogOpen(true);
						}}
					>
						Close
					</MdOutlinedButton>
					<MdFilledButton
						onClick={() => {
							handleAction("split");
						}}
					>
						Split
					</MdFilledButton>
				</div>
			</div>
		</>
	);
};
