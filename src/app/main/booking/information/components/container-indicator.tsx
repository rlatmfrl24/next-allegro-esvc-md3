import Portal from "@/app/components/portal";
import {
	MdChipSet,
	MdDialog,
	MdFilterChip,
	MdOutlinedButton,
	MdPrimaryTab,
	MdRippleEffect,
	MdSecondaryTab,
	MdTabs,
} from "@/app/util/md3";
import type {
	ContainerInformationType,
	OpenTopContainerInformationType,
	FlatRackContainerInformationType,
	ReeferContainerInformationType,
} from "@/app/util/typeDef/booking";
import { Info, ThermostatAuto, Warning } from "@mui/icons-material";
import { type CSSProperties, useState } from "react";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { useRecoilValue } from "recoil";
import { AdditionalInformationState } from "@/app/store/booking.store";
import LabelChip from "@/app/components/label-chip";

const BasicItem = (props: {
	title: string;
	value: string;
	className?: string;
}) => {
	return (
		<div
			className={`flex flex-col gap-0.5 ${
				props.className ? props.className : ""
			}`}
		>
			<MdTypography variant="body" size="medium" prominent>
				{props.title}
			</MdTypography>
			<MdTypography variant="body" size="medium">
				{props.value || "-"}
			</MdTypography>
		</div>
	);
};

export const DangerIndicator = (props: {
	containers: ContainerInformationType[];
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const dangerContainers = props.containers.filter(
		(container) => container.dgInfo.isDangerous,
	);

	const bookingAdditionalData = useRecoilValue(AdditionalInformationState);

	const [selectedSize, setSelectedSize] = useState<ContainerInformationType>(
		dangerContainers[0],
	);

	const [selectedContainerIndex, setSelectedContainerIndex] = useState(0);
	const [selectedDangerIndex, setSelectedDangerIndex] = useState(0);

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
				onClick={() => {
					setIsDialogOpen(true);
				}}
			>
				<MdRippleEffect />
				<Warning fontSize="small" className="text-error" />
			</div>
			<Portal selector="#main-container">
				<MdDialog
					open={isDialogOpen}
					closed={() => {
						setIsDialogOpen(false);
					}}
					className="min-w-[660px] max-w-[960px]"
				>
					<div slot="headline">Danger Cargo Info</div>
					<div slot="content" className="flex flex-col gap-4">
						{props.containers.filter(
							(container) => container.dgInfo.isDangerous,
						).length > 1 && (
							<MdTabs>
								{props.containers
									.filter((container) => container.dgInfo.isDangerous)
									.map((container, index) => (
										<MdSecondaryTab
											key={`${index}_${container.uuid}`}
											selected={container.size === selectedSize.size}
											style={
												{
													"--md-secondary-tab-container-color":
														"var(--md-sys-color-surface-container-high)",
												} as CSSProperties
											}
											onClick={(e) => {
												if (container.size === selectedSize.size) {
													e.preventDefault();
													e.stopPropagation();
												} else {
													setSelectedSize(container);
													setSelectedDangerIndex(0);
												}
											}}
										>
											{`${container.type} ${container.size} * ${container.quantity}`}
										</MdSecondaryTab>
									))}
							</MdTabs>
						)}
						<MdTabs>
							{selectedSize.dgInfo.data.map((info, index) => {
								return (
									<MdSecondaryTab
										key={
											selectedSize.type +
											selectedSize.size +
											selectedSize.quantity
										}
										selected={selectedContainerIndex === index}
										style={
											{
												"--md-secondary-tab-container-color":
													"var(--md-sys-color-surface-container-low)",
											} as CSSProperties
										}
										onClick={(e) => {
											if (selectedContainerIndex === index) {
												e.preventDefault();
												e.stopPropagation();
											} else {
												setSelectedContainerIndex(index);
												setSelectedDangerIndex(0);
											}
										}}
									>
										{`${selectedSize.type} ${selectedSize.size} #${index + 1}`}
									</MdSecondaryTab>
								);
							})}
						</MdTabs>
						<DetailTitle
							title={`${selectedSize.type} ${selectedSize.size} #${selectedContainerIndex + 1}`}
						/>
						<MdChipSet>
							{selectedSize.dgInfo.data[selectedContainerIndex].map(
								(info, index) => (
									<MdFilterChip
										key={
											selectedSize.type +
											selectedSize.size +
											selectedSize.quantity +
											info.uuid
										}
										elevated
										selected={selectedDangerIndex === index}
										onClick={(e) => {
											if (selectedDangerIndex === index) {
												e.preventDefault();
												e.stopPropagation();
											} else {
												setSelectedDangerIndex(index);
											}
										}}
										label={`Dangerous Cargo #${index + 1}`}
									/>
								),
							)}
						</MdChipSet>
						<div className="grid grid-cols-2 gap-4">
							<BasicItem
								title="UN Number"
								value={
									selectedSize.dgInfo.data[selectedContainerIndex][
										selectedDangerIndex
									].unNumber
								}
							/>
							<BasicItem
								title="Class"
								value={
									selectedSize.dgInfo.data[selectedContainerIndex][
										selectedDangerIndex
									].class
								}
							/>
							<BasicItem
								title="Flash Point"
								value={
									selectedSize.dgInfo.data[selectedContainerIndex][
										selectedDangerIndex
									].flashPoint
								}
							/>
							<BasicItem
								title="Packaging Group"
								value={
									selectedSize.dgInfo.data[selectedContainerIndex][
										selectedDangerIndex
									].packingGroup
								}
							/>
							<BasicItem
								title="Proper Shipping Name"
								value={
									selectedSize.dgInfo.data[selectedContainerIndex][
										selectedDangerIndex
									].properShippingName
								}
								className="col-span-2"
							/>
						</div>

						<div>
							<MdTypography
								variant="body"
								size="medium"
								prominent
								className="mb-2"
							>
								Danger Cargo Attachment
							</MdTypography>
							<MdChipSet>
								{bookingAdditionalData.specialCargoAttachment.dangerousCargo.map(
									(file, index) => (
										<LabelChip key={file.name} label={file.name} size="small" />
									),
								)}
							</MdChipSet>
						</div>
					</div>
					<div slot="actions">
						<MdOutlinedButton
							onClick={() => {
								setIsDialogOpen(false);
							}}
						>
							Close
						</MdOutlinedButton>
					</div>
				</MdDialog>
			</Portal>
		</>
	);
};

export const AwkwardIndicator = (props: {
	containers:
		| OpenTopContainerInformationType[]
		| FlatRackContainerInformationType[];
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const awkwardContainers = props.containers.filter(
		(container) => container.isAwkward,
	);

	const bookingAdditionalData = useRecoilValue(AdditionalInformationState);

	const [selectedSize, setSelectedSize] =
		useState<OpenTopContainerInformationType>(
			awkwardContainers[0] as OpenTopContainerInformationType,
		);

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
				onClick={() => {
					setIsDialogOpen(true);
				}}
			>
				<MdRippleEffect />
				<Info fontSize="small" className="text-[#FFD300] " />
			</div>
			<Portal selector="#main-container">
				<MdDialog
					open={isDialogOpen}
					closed={() => {
						setIsDialogOpen(false);
					}}
					className="min-w-[660px]"
				>
					<div slot="headline">Awkward Cargo Info</div>
					<div slot="content" className="flex flex-col gap-4">
						{props.containers.length > 1 && (
							<MdTabs>
								{awkwardContainers.map((container, index) => {
									return (
										<MdSecondaryTab
											key={`${index}_${container.uuid}`}
											selected={container.size === selectedSize.size}
											style={
												{
													"--md-secondary-tab-container-color":
														"var(--md-sys-color-surface-container-high)",
												} as CSSProperties
											}
											onClick={(e) => {
												if (container.size === selectedSize.size) {
													e.preventDefault();
													e.stopPropagation();
												} else {
													setSelectedSize(
														container as OpenTopContainerInformationType,
													);
												}
											}}
										>
											{`${container.type} ${container.size} * ${container.quantity}`}
										</MdSecondaryTab>
									);
								})}
							</MdTabs>
						)}
						<DetailTitle
							title={`${selectedSize.type} ${selectedSize.size} * ${selectedSize.quantity}`}
						/>
						<div className="grid grid-cols-3 gap-4">
							<BasicItem
								title="Package"
								value={`${selectedSize.package} ${selectedSize.packageType}`}
								className="col-span-3"
							/>
							<BasicItem
								title="Gross Weight"
								value={`${selectedSize.grossWeight} ${selectedSize.grossWeightUnit}`}
							/>
							<BasicItem
								title="Net Weight"
								value={`${selectedSize.netWeight} ${selectedSize.netWeightUnit}`}
							/>
							<BasicItem
								title="Commodity"
								value={selectedSize.awkward.commodity.description}
							/>
							<BasicItem
								title="Length"
								value={`${selectedSize.awkward.length} ${selectedSize.awkward.unit}`}
							/>
							<BasicItem
								title="Width"
								value={`${selectedSize.awkward.width} ${selectedSize.awkward.unit}`}
							/>
							<BasicItem
								title="Height"
								value={`${selectedSize.awkward.height} ${selectedSize.awkward.unit}`}
							/>
							<BasicItem title="Remark" value={selectedSize.awkward.remark} />
						</div>
						<div>
							<MdTypography
								variant="body"
								size="medium"
								prominent
								className="mb-2"
							>
								Awkward Cargo Attachment
							</MdTypography>
							<MdChipSet>
								{bookingAdditionalData.specialCargoAttachment.awkwardCargo.map(
									(file, index) => {
										return (
											<LabelChip
												key={file.name}
												label={file.name}
												size="small"
											/>
										);
									},
								)}
							</MdChipSet>
						</div>
					</div>
					<div slot="actions">
						<MdOutlinedButton
							onClick={() => {
								setIsDialogOpen(false);
							}}
						>
							Close
						</MdOutlinedButton>
					</div>
				</MdDialog>
			</Portal>
		</>
	);
};

export const ReeferIndicator = (props: {
	containers: ReeferContainerInformationType[];
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedSize, setSelectedSize] =
		useState<ReeferContainerInformationType>(props.containers[0]);

	const bookingAdditionalData = useRecoilValue(AdditionalInformationState);

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="relative w-7 h-7 rounded-full flex items-center justify-center cursor-pointer"
				onClick={() => {
					setIsDialogOpen(true);
				}}
			>
				<MdRippleEffect />
				<ThermostatAuto fontSize="small" className="text-onSurfaceVariant" />
			</div>
			<Portal selector="#main-container">
				<MdDialog
					open={isDialogOpen}
					closed={() => {
						setIsDialogOpen(false);
					}}
					className="min-w-[400px] max-w-[960px]"
				>
					<div slot="headline">Reefer Information</div>
					<div slot="content" className="flex flex-col gap-4">
						{props.containers.length > 1 && (
							<MdTabs>
								{props.containers.map((container, index) => (
									<MdSecondaryTab
										key={`${index}_${container.uuid}`}
										selected={container.size === selectedSize.size}
										style={
											{
												"--md-secondary-tab-container-color":
													"var(--md-sys-color-surface-container-high)",
											} as CSSProperties
										}
										onClick={(e) => {
											if (container.size === selectedSize.size) {
												e.preventDefault();
												e.stopPropagation();
											} else {
												setSelectedSize(container);
											}
										}}
									>
										{`${container.type} ${container.size} * ${container.quantity}`}
									</MdSecondaryTab>
								))}
							</MdTabs>
						)}
						<DetailTitle
							title={`${selectedSize.type} ${selectedSize.size} * ${selectedSize.quantity}`}
						/>
						<div className="grid grid-cols-3 gap-4">
							<BasicItem
								title="Degree"
								value={`${selectedSize.temperature} ${selectedSize.temperatureUnit}`}
							/>
							<BasicItem
								title="Ventilation"
								value={
									selectedSize.ventilation?.toString() ??
									`- ${
										selectedSize.ventilationType === "open" ? "%Open" : "%Close"
									}`
								}
							/>
							<BasicItem title="Nature" value={selectedSize.nature} />
							<BasicItem
								title="Humidity"
								value={selectedSize.humidity?.toString() ?? "-" + "%"}
							/>
							<BasicItem
								title="Genset"
								value={selectedSize.genset ? "Yes" : "No"}
							/>
						</div>
						<div>
							<MdTypography
								variant="body"
								size="medium"
								prominent
								className="mb-2"
							>
								Special Cargo Attachment
							</MdTypography>
							<MdChipSet>
								{bookingAdditionalData.specialCargoAttachment.reeferCargo.map(
									(file, index) => (
										<LabelChip key={file.name} label={file.name} size="small" />
									),
								)}
							</MdChipSet>
						</div>
					</div>
					<div slot="actions">
						<MdOutlinedButton
							onClick={() => {
								setIsDialogOpen(false);
							}}
						>
							Close
						</MdOutlinedButton>
					</div>
				</MdDialog>
			</Portal>
		</>
	);
};
