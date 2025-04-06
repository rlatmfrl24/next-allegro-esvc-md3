import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
	SIEditMarkDescriptionState,
	SIEditStepState,
} from "@/app/store/si.store";
import {
	MdChipSet,
	MdFilledButton,
	MdInputChip,
	MdOutlinedButton,
	MdOutlinedTextField,
} from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { Upload } from "@mui/icons-material";
import { useCallback, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

export default function StepMarkDescription() {
	const [markDescriptionStore, setMarkDescriptionStore] = useRecoilState(
		SIEditMarkDescriptionState,
	);
	// const setSIEditStep = useSetRecoilState(SIEditStepState);
	const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);
	const fileRef = useRef<HTMLInputElement>(null);
	const handleUploadClick = () => {
		fileRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// change attachment to selected single file
		const file = e.target.files?.[0];

		if (file) {
			setMarkDescriptionStore((prev) => {
				return {
					...prev,
					descriptionFile: file,
				};
			});
		}
		e.currentTarget.value = "";
	};

	useEffect(() => {
		setSIEditStep((prev) => ({
			...prev,
			markDescription: {
				...prev.markDescription,
				isCompleted: !!markDescriptionStore.hsCode,
			},
		}));
	}, [markDescriptionStore.hsCode, setSIEditStep]);

	const moveToContactInformationStep = useCallback(() => {
		setSIEditStep((prev) => ({
			...prev,
			markDescription: {
				...prev.markDescription,
				isSelected: false,
				visited: true,
			},
			contactInformation: {
				...prev.contactInformation,
				isSelected: true,
			},
		}));
	}, [setSIEditStep]);

	return (
		<div className="w-full flex flex-col">
			<MdTypography variant="title" size="large" className="mb-4">
				Mark & Description
			</MdTypography>
			<div className="flex flex-col gap-4">
				<div className="flex gap-2">
					<NAOutlinedTextField
						error={
							SIEditStep.markDescription.visited &&
							markDescriptionStore.hsCode === ""
						}
						errorText="HS Code is required."
						label="HS Code"
						maxInputLength={10}
						value={markDescriptionStore.hsCode}
						handleValueChange={(value) => {
							setMarkDescriptionStore((prev) => ({
								...prev,
								hsCode: value,
							}));
						}}
					/>
					<NAOutlinedTextField
						// error={
						//   SIEditStep.markDescription.visited &&
						//   markDescriptionStore.customsCommodity === ""
						// }
						required
						className="flex-1"
						maxInputLength={350}
						// errorText="Customs Commodity is required."
						placeholder="Customs Commodity"
						value={markDescriptionStore.customsCommodity}
						handleValueChange={(value) => {
							setMarkDescriptionStore((prev) => ({
								...prev,
								customsCommodity: value,
							}));
						}}
					/>
				</div>
				<div className="flex gap-6">
					<div className="flex-1 flex flex-col gap-4">
						<DetailTitle title="Mark" />
						<NAOutlinedTextField
							label="Mark"
							type="textarea"
							maxInputLength={2300}
							rows={10}
							className="resize-y flex-1"
							value={markDescriptionStore.mark}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									mark: value,
								}));
							}}
						/>
					</div>
					<div className="flex-1 flex flex-col gap-4">
						<DetailTitle title="Description" />
						<NAOutlinedTextField
							placeholder="Description"
							type="textarea"
							maxInputLength={2450}
							rows={10}
							className="resize-y"
							value={markDescriptionStore.description}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									description: value,
								}));
							}}
						/>
						<div className="flex gap-4 items-center">
							<MdOutlinedButton onClick={handleUploadClick}>
								<div slot="icon">
									<Upload fontSize="small" />
								</div>
								File Upload
							</MdOutlinedButton>
							<MdChipSet>
								{markDescriptionStore.descriptionFile && (
									<MdInputChip
										key={faker.string.uuid()}
										label={markDescriptionStore.descriptionFile.name}
										selected
										remove={() => {
											setMarkDescriptionStore((prev) => {
												return {
													...prev,
													descriptionFile: null,
												};
											});
										}}
									/>
								)}
							</MdChipSet>
							<input
								type="file"
								ref={fileRef}
								onInput={handleFileChange}
								hidden
							/>
						</div>
					</div>
				</div>
				<MdFilledButton
					className="w-fit self-end"
					onClick={() => {
						moveToContactInformationStep();
					}}
				>
					Next
				</MdFilledButton>
			</div>
		</div>
	);
}
