import {
	MdCheckbox,
	MdElevatedCard,
	MdList,
	MdListItem,
	MdOutlinedTextField,
} from "@/app/util/md3";
import {
	autoUpdate,
	flip,
	offset,
	shift,
	size,
	useClick,
	useDismiss,
	useFloating,
	useFocus,
	useInteractions,
	useListNavigation,
	useTransitionStyles,
} from "@floating-ui/react";
import { ArrowDropDown } from "@mui/icons-material";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { basicDropdownStyles } from "../util/constants";
import { DividerComponent } from "./divider";

type MdOutlinedTextFieldProps = React.ComponentProps<
	typeof MdOutlinedTextField
>;

export default function NAOutlinedMultiListBox({
	options,
	initialValue,
	className,
	unit,
	...props
}: {
	options: string[];
	initialValue?: string[];
	className?: string;
	unit?: string;
} & MdOutlinedTextFieldProps) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const listRef = useRef<any[]>([]);
	const [isOptionOpen, setIsOptionOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [maxHeight, setMaxHeight] = useState(0);
	const [selectedOptions, setSelectedOptions] = useState<string[]>(
		initialValue || [],
	);

	const { refs, floatingStyles, context, placement } = useFloating({
		open: isOptionOpen,
		onOpenChange: setIsOptionOpen,
		middleware: [
			offset(2),
			shift(),
			flip({
				padding: 20,
			}),
			size({
				apply({ rects, elements, availableHeight }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
					});
					flushSync(() => setMaxHeight(availableHeight));
				},
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	const { isMounted, styles: transitionStyles } = useTransitionStyles(
		context,
		basicDropdownStyles,
	);

	const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions(
		[
			useFocus(context),
			useClick(context),
			useDismiss(context),
			useListNavigation(context, {
				listRef,
				activeIndex,
				onNavigate: setActiveIndex,
			}),
		],
	);

	return (
		<>
			<MdOutlinedTextField
				{...props}
				readOnly
				required={false}
				ref={refs.setReference}
				{...getReferenceProps()}
				value={
					selectedOptions.length === options.length
						? `All${unit ? ` ${unit}` : ""}`
						: selectedOptions.join(", ")
				}
				className={className}
			>
				<div slot="trailing-icon">
					<ArrowDropDown fontSize="small" />
				</div>
			</MdOutlinedTextField>
			{isMounted && options.length > 0 && (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					className="z-10"
				>
					<MdElevatedCard className="py-1" style={transitionStyles}>
						<MdList
							className="bg-surfaceContainerLow rounded"
							style={{ maxHeight: `${maxHeight}px`, overflowY: "auto" }}
						>
							<MdListItem
								type="button"
								onClick={() => {
									if (selectedOptions.length === options.length) {
										setSelectedOptions([]);
									} else {
										setSelectedOptions(options);
									}
								}}
							>
								<MdCheckbox
									slot="start"
									checked={selectedOptions.length === options.length}
								/>
								({selectedOptions.length} / {options.length})
							</MdListItem>
							<DividerComponent />
							{options.map((option, index) => (
								<MdListItem
									key={option}
									type="button"
									{...getItemProps()}
									tabIndex={activeIndex === index ? 0 : -1}
									ref={(node) => {
										listRef.current[index] = node;
									}}
									onClick={() => {
										if (selectedOptions.includes(option)) {
											setSelectedOptions(
												selectedOptions.filter((o) => o !== option),
											);
										} else {
											setSelectedOptions([...selectedOptions, option]);
										}
									}}
								>
									<MdCheckbox
										slot="start"
										checked={selectedOptions.includes(option)}
									/>
									{option}
								</MdListItem>
							))}
						</MdList>
					</MdElevatedCard>
				</div>
			)}
		</>
	);
}
