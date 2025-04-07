import { DividerComponent } from "@/app/components/divider";
import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { GridSelectComponent } from "@/app/components/table/grid-select";
import { renderInputTable } from "@/app/components/table/simple-table";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { useSkipper } from "@/app/main/booking/status/components/dialog/table/util";
import {
	SIEditMarkDescriptionState,
	SIEditStepState,
} from "@/app/store/si.store";
import {
	MdChipSet,
	MdFilledButton,
	MdIcon,
	MdIconButton,
	MdInputChip,
} from "@/app/util/md3";
import type { ExportInformationProps } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import {
	AddBox,
	AddBoxOutlined,
	BackupOutlined,
	DeleteOutline,
} from "@mui/icons-material";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";

export default function StepMarkDescription() {
	const [markDescriptionStore, setMarkDescriptionStore] = useRecoilState(
		SIEditMarkDescriptionState,
	);
	const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);
	const columnHelper = createColumnHelper<ExportInformationProps>();
	const [autoResetPageIndex, resetAutoRestPageIndex] = useSkipper();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const columns = useMemo(() => {
		return [
			columnHelper.display({
				id: "index",
				header: "No.",
				size: 50,
				cell: (info) => (
					<MdTypography variant="body" size="medium" className="p-2">
						{info.row.index + 1}
					</MdTypography>
				),
			}),
			columnHelper.accessor("licenseNo", {
				id: "licenseNo",
				header: "License No.",
				cell: (info) => (
					<NAOutlinedTextField
						required
						sizeVariant="tiny"
						className="p-2"
						value={info.getValue()}
						handleValueChange={(value) => {
							info.table.options.meta?.updateData(
								info.row.index,
								info.column.id,
								value,
							);
						}}
					/>
				),
			}),
			columnHelper.accessor("otherReferenceNo", {
				id: "otherReferenceNo",
				header: "Other Reference No.",
				cell: (info) => (
					<NAOutlinedTextField
						sizeVariant="tiny"
						className="p-2"
						value={info.getValue()}
						handleValueChange={(value) => {
							info.table.options.meta?.updateData(
								info.row.index,
								info.column.id,
								value,
							);
						}}
					/>
				),
			}),
			columnHelper.accessor("package", {
				id: "package",
				header: "Package Qty/Type",
				cell: (info) => (
					<div className="flex">
						<NAOutlinedNumberField
							sizeVariant="tiny"
							className="p-2 w-32"
							required
							value={info.getValue().quantity?.toString() || ""}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									exportInformation: prev.exportInformation.map(
										(row, index) => {
											if (index === info.row.index) {
												return {
													...row,
													package: {
														...row.package,
														quantity: value || 0,
													},
												};
											}
											return row;
										},
									),
								}));
							}}
						/>
						<DividerComponent orientation="vertical" />
						<NAOutlinedTextField
							sizeVariant="tiny"
							className="p-2"
							value={info.getValue().type}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									exportInformation: prev.exportInformation.map(
										(row, index) => {
											if (index === info.row.index) {
												return {
													...row,
													package: {
														...row.package,
														type: value,
													},
												};
											}
											return row;
										},
									),
								}));
							}}
						/>
					</div>
				),
			}),
			columnHelper.accessor("weight", {
				id: "weight",
				header: "Weight",
				size: 100,
				cell: (info) => (
					<div className="flex items-center">
						<NAOutlinedNumberField
							sizeVariant="tiny"
							className="p-2"
							required
							value={info.getValue().toString()}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									exportInformation: prev.exportInformation.map(
										(row, index) => {
											if (index === info.row.index) {
												return {
													...row,
													weight: value || 0,
												};
											}
											return row;
										},
									),
								}));
							}}
						/>
						<GridSelectComponent
							options={["KGS", "LBS"]}
							onChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									exportInformation: prev.exportInformation.map(
										(row, index) => {
											if (index === info.row.index) {
												return {
													...row,
													weightUnit: value,
												};
											}
											return row;
										},
									),
								}));
							}}
							initialSelection={
								markDescriptionStore.exportInformation
									? markDescriptionStore.exportInformation[info.row.index]
											?.weightUnit
									: "KGS"
							}
						/>
					</div>
				),
			}),
			columnHelper.accessor("division", {
				id: "division",
				header: "Division",
				size: 50,
				cell: (info) => (
					<GridSelectComponent
						options={["1", "2", "3", "4", "5"]}
						onChange={(value) => {
							info.table.options.meta?.updateData(
								info.row.index,
								info.column.id,
								value,
							);
						}}
						initialSelection={
							markDescriptionStore.exportInformation
								? markDescriptionStore.exportInformation[info.row.index]
										?.division
								: ""
						}
					/>
				),
			}),
			columnHelper.accessor("samePacking", {
				id: "samePacking",
				header: "Same Packing",
				size: 80,
				cell: (info) => (
					<GridSelectComponent
						options={[
							...Array.from({ length: 26 }, (_, i) =>
								String.fromCharCode(i + 65),
							),
						]}
						onChange={(value) => {
							info.table.options.meta?.updateData(
								info.row.index,
								info.column.id,
								value,
							);
						}}
						initialSelection={
							markDescriptionStore.exportInformation
								? markDescriptionStore.exportInformation[info.row.index]
										?.samePacking
								: ""
						}
					/>
				),
			}),
			columnHelper.accessor("samePackage", {
				id: "samePackage",
				header: "Same Package",
				cell: (info) => (
					<div className="flex">
						<NAOutlinedNumberField
							sizeVariant="tiny"
							className="p-2 w-32"
							value={info.getValue().number?.toString() || ""}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									exportInformation: prev.exportInformation.map(
										(row, index) => {
											if (index === info.row.index) {
												return {
													...row,
													samePackage: {
														...row.samePackage,
														number: value || 0,
													},
												};
											}
											return row;
										},
									),
								}));
							}}
						/>
						<DividerComponent orientation="vertical" />
						<NAOutlinedTextField
							sizeVariant="tiny"
							className="p-2"
							value={info.getValue().name || ""}
							handleValueChange={(value) => {
								setMarkDescriptionStore((prev) => ({
									...prev,
									exportInformation: prev.exportInformation.map(
										(row, index) => {
											if (index === info.row.index) {
												return {
													...row,
													samePackage: {
														...row.samePackage,
														name: value,
													},
												};
											}
											return row;
										},
									),
								}));
							}}
						/>
					</div>
				),
			}),
			columnHelper.display({
				id: "action",
				header: "Edit",
				size: 50,
				cell: (info) => (
					<div className="flex items-center justify-center">
						{info.row.index === 0 ? (
							<MdIconButton
								onClick={() => {
									setMarkDescriptionStore((prev) => ({
										...prev,
										exportInformation: [
											...prev.exportInformation,
											{
												licenseNo: "",
												otherReferenceNo: "",
												package: {
													quantity: 0,
													type: "",
												},
												weight: 0,
												weightUnit: "KGS",
												division: "",
												samePacking: "",
												samePackage: {
													number: 0,
													name: "",
												},
											},
										],
									}));
								}}
							>
								<MdIcon>
									<AddBoxOutlined />
								</MdIcon>
							</MdIconButton>
						) : (
							<MdIconButton
								onClick={() => {
									setMarkDescriptionStore((prev) => ({
										...prev,
										exportInformation: prev.exportInformation.filter(
											(_, index) => index !== info.row.index,
										),
									}));
								}}
							>
								<MdIcon>
									<DeleteOutline />
								</MdIcon>
							</MdIconButton>
						)}
					</div>
				),
			}),
		];
	}, []);

	useEffect(() => {
		if (
			markDescriptionStore.exportInformation === undefined ||
			markDescriptionStore.exportInformation.length === 0
		) {
			setMarkDescriptionStore((prev) => ({
				...prev,
				exportInformation: [
					{
						licenseNo: "",
						otherReferenceNo: "",
						package: {
							quantity: 0,
							type: "",
						},
						weight: 0,
						weightUnit: "KGS",
						division: "",
						samePacking: "",
						samePackage: {
							number: 0,
							name: "",
						},
					},
				],
			}));
		}
	}, [
		markDescriptionStore.exportInformation,
		markDescriptionStore.exportInformation?.length,
		setMarkDescriptionStore,
	]);

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

	const exportInformationTable = useReactTable({
		data: markDescriptionStore.exportInformation,
		columns,
		getCoreRowModel: getCoreRowModel(),
		autoResetPageIndex,
		meta: {
			updateData: (rowIndex: number, columnId: string, value: unknown) => {
				resetAutoRestPageIndex();
				setMarkDescriptionStore((prev) => ({
					...prev,
					exportInformation: prev.exportInformation.map((row, index) => {
						if (index === rowIndex) {
							return {
								...row,
								[columnId]: value,
							};
						}
						return row;
					}),
				}));
			},
			updateRow: (rowIndex: number, value: unknown) => {},
		},
	});

	return (
		<div className="w-full flex flex-col">
			<MdTypography variant="title" size="large" className="mb-4">
				Mark & Description
			</MdTypography>
			<div className="flex flex-col gap-4">
				<div className="flex gap-2">
					<NAOutlinedTextField
						// error={
						// 	SIEditStep.markDescription.visited &&
						// 	markDescriptionStore.hsCode === ""
						// }
						// errorText="HS Code is required."
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
					</div>
				</div>
				<div>
					<DetailTitle title="Export Information" className="mb-4" />
					{markDescriptionStore.exportInformation
						? renderInputTable(exportInformationTable)
						: null}
				</div>
				<div>
					<DetailTitle title="Attachment" className="mb-4" />
					<DndFileUploadPlaceholder
						initialFiles={
							markDescriptionStore.descriptionFile
								? [markDescriptionStore.descriptionFile]
								: []
						}
						onFilesChange={(files) => {
							if (files.length > 0) {
								setMarkDescriptionStore((prev) => ({
									...prev,
									descriptionFile: files[0],
								}));
							}
						}}
					/>
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

const DndFileUploadPlaceholder = ({
	className,
	initialFiles,
	onFilesChange,
	maxFiles = 10,
	maxFileSize = 10485760, // 10MB
}: {
	className?: string;
	initialFiles?: File[];
	onFilesChange?: (files: File[]) => void;
	maxFiles?: number;
	maxFileSize?: number;
}) => {
	const {
		getRootProps,
		getInputProps,
		acceptedFiles,
		fileRejections,
		isFocused,
		isDragAccept,
	} = useDropzone({
		maxFiles: maxFiles,
		maxSize: maxFileSize,
		// Accept zip, 7z, rar, txt, pdf, xlsx, doc, docx, rtf, html, ppt, ods, odt, odp, jpg, tif, png, .avif, .bmp, jpeg, jpg, svg, tiff
		accept: {
			"image/jpg": [".jpg"],
			"image/jpeg": [".jpeg"],
			"image/svg": [".svg"],
			"image/tiff": [".tiff"],
			"image/tif": [".tif"],
			"image/bmp": [".bmp"],
			"image/avif": [".avif"],
			"image/png": [".png"],
			"application/pdf": [".pdf"],
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
				".xlsx",
			],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document":
				[".docx"],
			"application/zip": [".zip"],
			"application/x-7z-compressed": [".7z"],
			"application/x-rar-compressed": [".rar"],
			"text/plain": [".txt"],
			"application/vnd.oasis.opendocument.spreadsheet": [".ods"],
			"application/vnd.oasis.opendocument.text": [".odt"],
			"application/vnd.oasis.opendocument.presentation": [".odp"],
			"application/vnd.ms-powerpoint": [".ppt"],
			"application/msword": [".doc"],
			"application/rtf": [".rtf"],
			"text/html": [".html"],
		},
	});
	const [files, setFiles] = useState<File[]>(initialFiles || []);

	useEffect(() => {
		// add accepted files to state
		setFiles((prev) => [...prev, ...acceptedFiles]);

		// if files exceed 10, remove the last file
		if (files.length + acceptedFiles.length > maxFiles) {
			setFiles((prev) => prev.slice(0, maxFiles - 1));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [acceptedFiles]);

	useEffect(() => {
		// if file rejections exist, show alert
		if (fileRejections.length > 0) {
			alert("Some files are rejected. Please check the file types and sizes.");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fileRejections]);

	useEffect(() => {
		onFilesChange?.(files);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [files]);

	useEffect(() => {
		console.log(isDragAccept);
	}, [isDragAccept]);

	return (
		<div
			className={`flex flex-col gap-4 ${className ? className : ""}
	}`}
		>
			<div
				className={`border-2 border-dashed border-outlineVariant rounded-lg flex flex-col gap-2 items-center justify-center flex-1 py-8 hover:cursor-pointer hover:bg-surfaceContainerHigh ${
					isDragAccept ? "bg-surfaceContainerHigh" : "bg-surfaceContainerLow"
				}`}
				{...getRootProps({ isFocused, isDragAccept })}
			>
				<input {...getInputProps()} />
				<BackupOutlined className="text-outline" />
				<MdTypography variant="body" size="large" prominent>
					<span className="underline text-primary cursor-pointer">
						Click to upload
					</span>
					&nbsp;or drop files here
				</MdTypography>
				<MdTypography
					variant="body"
					size="small"
					prominent
					className="text-outline"
				>
					{`(Maximum ${maxFiles} files, Max file size : ${
						maxFileSize / 1024 / 1024
					}MB)`}
				</MdTypography>
				<MdTypography variant="body" size="small" className="text-outline mt-4">
					zip, 7z, rar, txt, pdf, xlsx, doc, docx, rtf, html, ppt, ods, odt,
					odp, jpg, tif, png, .avif, .bmp, jpeg, jpg, svg, tiff
				</MdTypography>
			</div>
			<MdChipSet>
				{files.map((file) => (
					<div key={faker.string.uuid()}>
						<MdInputChip
							label={file.name}
							selected
							remove={() => {
								setFiles((prev) => prev.filter((f) => f.name !== file.name));
							}}
						/>
					</div>
				))}
			</MdChipSet>
		</div>
	);
};
