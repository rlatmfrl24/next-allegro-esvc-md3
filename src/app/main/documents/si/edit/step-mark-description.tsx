import { NAOutlinedNumberField } from "@/app/components/na-number-filed";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import { renderInputTable } from "@/app/components/table/simple-table";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import {
	SIEditMarkDescriptionState,
	SIEditStepState,
} from "@/app/store/si.store";
import { MdChipSet, MdFilledButton, MdInputChip } from "@/app/util/md3";
import type { ExportInformationProps } from "@/app/util/typeDef/si";
import { faker } from "@faker-js/faker";
import { BackupOutlined } from "@mui/icons-material";
import {
	createColumnHelper,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRecoilState } from "recoil";

export default function StepMarkDescription() {
	const [markDescriptionStore, setMarkDescriptionStore] = useRecoilState(
		SIEditMarkDescriptionState,
	);
	// const setSIEditStep = useSetRecoilState(SIEditStepState);
	const [SIEditStep, setSIEditStep] = useRecoilState(SIEditStepState);

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
					<DetailTitle title="Export Information" />
					<ExportInformationTable />
				</div>
				<div>
					<DetailTitle title="Attachment" />
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

const ExportInformationTable = () => {
	const columnHelper = createColumnHelper<ExportInformationProps>();

	const columns = [
		columnHelper.display({
			id: "index",
			header: "No.",
			cell: (info) => info.row.index + 1,
		}),
		columnHelper.accessor("licenseNo", {
			id: "licenseNo",
			header: "License No.",
			cell: (info) => (
				<NAOutlinedTextField
					value={info.getValue()}
					handleValueChange={(value) => {
						info.row.original.licenseNo = value;
					}}
				/>
			),
		}),
		columnHelper.accessor("otherReferenceNo", {
			id: "otherReferenceNo",
			header: "Other Reference No.",
			cell: (info) => (
				<NAOutlinedTextField
					value={info.getValue()}
					handleValueChange={(value) => {
						info.row.original.otherReferenceNo = value;
					}}
				/>
			),
		}),
		columnHelper.accessor("package", {
			id: "package",
			header: "Package Qty/Type",
			cell: (info) => (
				<div className="flex gap-2">
					<NAOutlinedNumberField
						value={info.getValue().quantity.toString()}
						handleValueChange={(value) => {
							info.row.original.package.quantity = value as number;
						}}
					/>
					<NAOutlinedTextField value={info.getValue().type} />
				</div>
			),
		}),
		columnHelper.accessor("weight", {
			id: "weight",
			header: "Weight",
			cell: (info) => (
				<NAOutlinedNumberField
					value={info.getValue().toString()}
					handleValueChange={(value) => {
						info.row.original.weight = value as number;
					}}
				/>
			),
		}),
		columnHelper.accessor("division", {
			id: "division",
			header: "Division",
			cell: (info) => (
				<NAOutlinedTextField
					value={info.getValue()}
					handleValueChange={(value) => {
						info.row.original.division = value;
					}}
				/>
			),
		}),
		columnHelper.accessor("samePacking", {
			id: "samePacking",
			header: "Same Packing",
			cell: (info) => (
				<NAOutlinedTextField
					value={info.getValue()}
					handleValueChange={(value) => {
						info.row.original.samePacking = value;
					}}
				/>
			),
		}),
		columnHelper.accessor("samePackage", {
			id: "samePackage",
			header: "Same Package",
			cell: (info) => (
				<div className="flex gap-2">
					<NAOutlinedNumberField
						value={info.getValue().number.toString()}
						handleValueChange={(value) => {
							info.row.original.samePackage.number = value as number;
						}}
					/>
					<NAOutlinedTextField value={info.getValue().name} />
				</div>
			),
		}),
	];

	const exportInformationTable = useReactTable({
		data: [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		meta: {
			updateData: (rowIndex: number, columnId: string, value: unknown) => {
				const row = exportInformationTable.getRowModel().rows[rowIndex];
				const column = row.getVisibleCells().find((c) => c.id === columnId);
				if (column) {
					// @ts-ignore
					column.setValue(value);
				}
			},
			updateRow: (rowIndex: number, value: unknown) => {},
		},
	});

	return renderInputTable(exportInformationTable);
};

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
