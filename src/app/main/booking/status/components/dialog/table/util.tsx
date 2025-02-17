import { MdList, MdListItem } from "@/app/util/md3";
import {
	useFloating,
	offset,
	shift,
	autoUpdate,
	useInteractions,
	useFocus,
	useClick,
	useDismiss,
	FloatingFocusManager,
	flip,
	size,
} from "@floating-ui/react";
import { ArrowDropDown } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import {
	useRef,
	useCallback,
	useEffect,
	type CSSProperties,
	useState,
} from "react";
import { flushSync } from "react-dom";

export function useSkipper() {
	const shouldSkipRef = useRef(true);
	const shouldSkip = shouldSkipRef.current;

	// Wrap a function with this to skip a pagination reset temporarily
	const skip = useCallback(() => {
		shouldSkipRef.current = false;
	}, []);

	useEffect(() => {
		shouldSkipRef.current = true;
	});

	return [shouldSkip, skip] as const;
}

export const GridSelectionComponent = ({
	value,
	options,
	onSelectionChange,
}: {
	value?: string;
	options?: string[];
	onSelectionChange?: (value: string) => void;
}) => {
	const [isListOpen, setIsListOpen] = useState(false);
	const [maxHeight, setMaxHeight] = useState(0);

	const { refs, floatingStyles, context, placement } = useFloating({
		open: isListOpen,
		onOpenChange: setIsListOpen,
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
					flushSync(() => {
						setMaxHeight(availableHeight);
					});
				},
			}),
		],
		whileElementsMounted: autoUpdate,
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([
		useFocus(context),
		useClick(context),
		useDismiss(context),
	]);

	return (
		<div
			ref={refs.setReference}
			{...getReferenceProps()}
			className="relative w-full cursor-pointer py-0.5 border-b border-b-outlineVariant last:border-b-0"
		>
			<div className="flex items-center h-12 p-2">
				<div className="flex-1">{value}</div>
				<ArrowDropDown />
			</div>
			{isListOpen && options && options.length > 0 && (
				<FloatingFocusManager context={context}>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className="z-10 rounded"
						{...getFloatingProps()}
					>
						<MdList
							style={
								{
									boxShadow:
										"0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3) ",
									maxHeight: maxHeight,
									minHeight: "2rem",
								} as CSSProperties
							}
							className="relative bg-surfaceContainerLow rounded overflow-y-auto"
						>
							<OverlayScrollbarsComponent defer>
								{options?.map((option, index) => {
									return (
										<MdListItem
											key={typeof option === "string" ? option : index}
											className="cursor-pointer hover:bg-surfaceContainerHighest"
											onClick={() => {
												onSelectionChange?.(option);
											}}
										>
											{option}
										</MdListItem>
									);
								})}
							</OverlayScrollbarsComponent>
						</MdList>
					</div>
				</FloatingFocusManager>
			)}
		</div>
	);
};
