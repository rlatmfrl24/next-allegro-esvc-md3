import type React from "react";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { MdOutlinedTextField as MdOutlinedTextFieldBase } from "../util/md3";
import { MdTypography } from "./typography";
import { tinyInputStyles } from "../util/constants";

type MdOutlinedTextFieldProps = React.ComponentProps<
	typeof MdOutlinedTextFieldBase
>;

export const NAOutlinedNumberField = ({
	handleValueChange,
	maxInputLength,
	enableNumberSeparator = true,
	hideZeroPlaceholder = false,
	className,
	sizeVariant = "normal",
	...props
}: {
	handleValueChange?: (value: number | undefined) => void;
	maxInputLength?: number;
	enableNumberSeparator?: boolean;
	hideZeroPlaceholder?: boolean;
	sizeVariant?: "tiny" | "normal";
	className?: string;
} & MdOutlinedTextFieldProps) => {
	const hasValue = useMemo(() => {
		return (
			props.value !== undefined && props.value !== null && props.value !== ""
		);
	}, [props.value]);

	const [isFocused, setIsFocused] = useState(false);

	const currentValue = useMemo(() => {
		if (hasValue) {
			if (isFocused) {
				return props.value;
			}
			if (enableNumberSeparator) {
				return props.value
					?.toLocaleString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					.split(".")
					.map((v, i) => (i === 0 ? v : v.replaceAll(",", "")))
					.join(".");
			}
			return props.value;
		}
		if (isFocused || hideZeroPlaceholder) {
			return "";
		}
		return "0";
	}, [
		enableNumberSeparator,
		hasValue,
		hideZeroPlaceholder,
		isFocused,
		props.value,
	]);

	return (
		<>
			<div className={`relative h-fit ${className ? className : ""}`}>
				<MdOutlinedTextFieldBase
					{...props}
					placeholder={
						props.placeholder
							? props.placeholder
							: hideZeroPlaceholder
								? ""
								: "0"
					}
					required={false}
					type={isFocused ? "number" : "text"}
					noSpinner
					onFocus={(e) => {
						setIsFocused(true);
						e.currentTarget.select();
						// e.currentTarget.value = "";
					}}
					style={
						{
							"--md-outlined-text-field-error-input-text-color": !hasValue
								? "var(--md-sys-color-outline-variant)"
								: "inherit",
							"--md-outlined-text-field-input-text-color": !hasValue
								? "var(--md-sys-color-outline-variant)"
								: "inherit",
							// if size is tiny, use tinyInputStyles
							...(sizeVariant === "tiny" ? tinyInputStyles : {}),
						} as CSSProperties
					}
					value={currentValue}
					onInput={(e) => {
						if (
							maxInputLength &&
							e.currentTarget.value.length > maxInputLength
						) {
							e.currentTarget.value = e.currentTarget.value.slice(
								0,
								maxInputLength,
							);
						}
					}}
					onBlur={(e) => {
						setIsFocused(false);
						if (enableNumberSeparator) {
							e.currentTarget.value = e.currentTarget.value.replace(
								/\B(?=(\d{3})+(?!\d))/g,
								",",
							);
						}

						if (handleValueChange) {
							handleValueChange(
								e.currentTarget.value === ""
									? undefined
									: Number.parseFloat(e.currentTarget.value.replace(/,/g, "")),
							);
						}
					}}
					className={`text-right w-full ${
						props.readOnly ? "bg-surfaceContainer" : ""
					}`}
				/>
				{props.required && (
					<MdTypography
						variant="label"
						size="large"
						className={`text-error absolute ${
							sizeVariant === "tiny" ? "top-2 left-3" : "top-0.5 left-1.5"
						}`}
					>
						*
					</MdTypography>
				)}
			</div>
		</>
	);
};
