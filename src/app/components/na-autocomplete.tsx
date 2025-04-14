import {
	type CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import {
	MdElevation,
	MdIcon,
	MdIconButton,
	MdList,
	MdListItem,
	MdOutlinedTextField as MdOutlinedTextFieldBase,
	MdRippleEffect,
} from "../util/md3";
import {
	autoUpdate,
	offset,
	shift,
	size,
	useDismiss,
	useFloating,
	useFocus,
	useInteractions,
	useListNavigation,
	useRole,
} from "@floating-ui/react";
import { CancelOutlined as CancelIcon } from "@mui/icons-material";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { MdTypography } from "./typography";
import RestoreIcon from "@mui/icons-material/Restore";
import { getCookie, setCookie } from "cookies-next";
import { flushSync } from "react-dom";
import { tinyInputStyles } from "../util/constants";

type MdOutlinedTextFieldProps = React.ComponentProps<
	typeof MdOutlinedTextFieldBase
>;

export default function NAOutlinedAutoComplete({
	itemList,
	icon,
	required,
	recentCookieKey,
	initialValue,
	onItemSelection: onSelection,
	onQueryChange,
	isAllowOnlyListItems = true,
	removeQueryOnSelect = false,
	className,
	maxInputLength,
	showAllonFocus = false,
	maxListHeight = 600,
	sizeVariant = "normal",
	...props
}: {
	itemList: string[];
	required?: boolean;
	recentCookieKey?: string;
	icon?: React.ReactNode;
	initialValue?: string;
	onItemSelection?: (value: string) => void;
	onQueryChange?: (value: string) => void;
	isAllowOnlyListItems?: boolean;
	removeQueryOnSelect?: boolean;
	maxListHeight?: number;
	maxInputLength?: number;
	showAllonFocus?: boolean;
	className?: string;
	sizeVariant?: "tiny" | "normal";
} & MdOutlinedTextFieldProps) {
	const [query, setQuery] = useState<string>("");
	const [defaultValue, setDefaultValue] = useState(initialValue || "");
	const [isListOpen, setIsListOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const [maxHeight, setMaxHeight] = useState(maxListHeight);

	const loadRecentItems = useCallback(() => {
		return recentCookieKey
			? (JSON.parse(getCookie(recentCookieKey) || "[]") as string[])
			: ([] as string[]);
	}, [recentCookieKey]);

	const [recentItems, setRecentItems] = useState(loadRecentItems());

	function addRecentItems(value: string) {
		const maxRecentItems = 5;

		if (recentCookieKey) {
			const recent = JSON.parse(getCookie(recentCookieKey) || "[]") as string[];
			if (recent.includes(value)) {
				const index = recent.indexOf(value);
				recent.splice(index, 1);
				recent.unshift(value);
			} else {
				recent.unshift(value);
			}

			if (recent.length > maxRecentItems) {
				recent.pop();
			}

			setCookie(recentCookieKey, JSON.stringify(recent), {
				maxAge: 31536000,
			});
		}

		setRecentItems(loadRecentItems());
	}

	function removeRecentItem(value: string) {
		if (recentCookieKey) {
			const recent = JSON.parse(getCookie(recentCookieKey) || "[]") as string[];
			const index = recent.indexOf(value);
			recent.splice(index, 1);
			setCookie(recentCookieKey, JSON.stringify(recent), {
				maxAge: 31536000,
			});
		}

		setRecentItems(loadRecentItems());
	}

	const listRef = useRef<any[]>([]);

	const { refs, floatingStyles, context } = useFloating({
		open: isListOpen,
		onOpenChange: setIsListOpen,
		middleware: [
			offset(2),
			shift(),
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

	const focus = useFocus(context);
	const dismiss = useDismiss(context);
	const role = useRole(context);
	const listNavigation = useListNavigation(context, {
		listRef,
		activeIndex,
		onNavigate: setActiveIndex,
	});

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
		[dismiss, role, listNavigation, focus],
	);

	useEffect(() => {
		//when list is close, reset the value to default value
		if (!isListOpen && isAllowOnlyListItems) {
			setQuery(defaultValue);
		}
	}, [defaultValue, isAllowOnlyListItems, isListOpen, setQuery]);

	useEffect(() => {
		setQuery(initialValue || "");
		setDefaultValue(initialValue || "");
	}, [initialValue]);

	// useEffect(() => {
	//   onQueryChange?.(query);
	// }, [query, onQueryChange]);

	function handleItemSelect(item: string) {
		let returnValue = item;

		if (maxInputLength && item.length > maxInputLength) {
			returnValue = item.slice(0, maxInputLength);
		}

		if (removeQueryOnSelect) {
			setQuery("");
			setDefaultValue("");
		} else {
			setQuery(returnValue);
			setDefaultValue(returnValue);
		}
		setIsListOpen(false);
		onSelection?.(returnValue);
		item !== "" && addRecentItems(returnValue);
	}

	const showRecommand = useCallback(() => {
		if (props.readOnly) {
			return false;
		}

		if (
			recentItems.filter((item) => {
				return item.toLowerCase().includes(query.toLowerCase());
			}).length > 0
		) {
			return true;
		}

		if (query.length > 2 || showAllonFocus) {
			const queryResult = itemList.filter((value) => {
				return value.toLowerCase().includes(query.toLowerCase());
			});

			if (queryResult.length > 0) {
				return true;
			}
		}

		return false;
	}, [itemList, props.readOnly, query, recentItems, showAllonFocus]);

	return (
		<div className={`relative ${className}`}>
			<MdOutlinedTextFieldBase
				{...props}
				ref={refs.setReference}
				style={sizeVariant === "tiny" ? tinyInputStyles : {}}
				{...getReferenceProps()}
				value={query}
				className={`w-full ${props.readOnly ? "bg-surfaceContainer" : ""}`}
				required={false}
				onClick={(e) => {
					e.currentTarget.shadowRoot?.querySelector("input")?.select();
				}}
				onInput={(e) => {
					if (maxInputLength && e.currentTarget.value.length > maxInputLength) {
						e.currentTarget.value = e.currentTarget.value.slice(
							0,
							maxInputLength,
						);
					}

					setQuery(e.currentTarget.value);
					onQueryChange?.(e.currentTarget.value);
				}}
			>
				{icon && <MdIcon slot="leading-icon">{icon}</MdIcon>}
				{query !== "" && !props.readOnly && sizeVariant !== "tiny" && (
					<div slot="trailing-icon" className="mr-2">
						<div
							className="cursor-pointer relative flex items-center justify-center w-10 h-10 rounded-full"
							tabIndex={-1}
							onClick={() => {
								handleItemSelect("");
							}}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									handleItemSelect("");
								}
							}}
						>
							<MdRippleEffect />
							<MdIcon>
								<CancelIcon />
							</MdIcon>
						</div>
					</div>
				)}
			</MdOutlinedTextFieldBase>
			{showRecommand() && isListOpen && (
				<div
					ref={refs.setFloating}
					style={
						{
							"--md-elevation-level": 2,
							...floatingStyles,
						} as CSSProperties
					}
					{...getFloatingProps()}
					className="relative z-50 bg-surfaceContainerLow rounded focus:outline-none"
				>
					<MdElevation />
					<MdList
						style={{ maxHeight: maxHeight - 10 }}
						className="relative overflow-y-auto rounded bg-surfaceContainerLow"
					>
						<OverlayScrollbarsComponent defer>
							{recentItems &&
								recentItems.length > 0 &&
								recentItems
									.filter((item) => {
										return item.toLowerCase().includes(query.toLowerCase());
									})
									.sort((a, b) => {
										//sort by matched index
										const aIndex = a.toLowerCase().indexOf(query.toLowerCase());
										const bIndex = b.toLowerCase().indexOf(query.toLowerCase());
										if (aIndex < bIndex) {
											return -1;
										}
										if (aIndex > bIndex) {
											return 1;
										}
										return 0;
									})
									.map((item, index) => (
										<MdListItem
											key={item}
											type="button"
											className="focus:bg-surfaceContainerHighest focus:outline-none "
											{...getItemProps()}
											tabIndex={activeIndex === index ? 0 : -1}
											ref={(node) => {
												listRef.current[index] = node;
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													handleItemSelect(item);
												}
											}}
											onClick={() => {
												handleItemSelect(item);
											}}
										>
											<MdIcon slot="start">
												<RestoreIcon />
											</MdIcon>
											{highlightText(item, query, sizeVariant === "tiny")}
											<MdIconButton
												slot="end"
												className="ml-2"
												onClick={(e) => {
													e.stopPropagation();
													removeRecentItem(item);
												}}
											>
												<MdIcon>
													<CancelIcon />
												</MdIcon>
											</MdIconButton>
										</MdListItem>
									))}
							{recentItems &&
								recentItems.filter((item) => {
									return item.toLowerCase().includes(query.toLowerCase());
								}).length > 0 &&
								itemList.filter((item) => {
									return item.toLowerCase().includes(query.toLowerCase());
								}).length > 0 &&
								query.length > 2 && (
									<div
										aria-label="recent-divider"
										className="h-px w-full bg-outlineVariant"
									/>
								)}
							{(showAllonFocus || query.length > 2) &&
								itemList
									.filter((item) => {
										return item.toLowerCase().includes(query.toLowerCase());
									})
									.sort((a, b) => {
										//sort by matched index
										const aIndex = a.toLowerCase().indexOf(query.toLowerCase());
										const bIndex = b.toLowerCase().indexOf(query.toLowerCase());
										if (aIndex < bIndex) {
											return -1;
										}
										if (aIndex > bIndex) {
											return 1;
										}
										return 0;
									})
									.map((item, index) => (
										<MdListItem
											key={item}
											type="button"
											className="focus:bg-surfaceContainerHighest focus:outline-none"
											{...getItemProps()}
											tabIndex={
												activeIndex === index + (recentItems?.length || 0)
													? 0
													: -1
											}
											ref={(node) => {
												listRef.current[index + (recentItems?.length || 0)] =
													node;
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													handleItemSelect(item);
												}
											}}
											onClick={() => {
												handleItemSelect(item);
											}}
										>
											{highlightText(item, query, sizeVariant === "tiny")}
										</MdListItem>
									))}
						</OverlayScrollbarsComponent>
					</MdList>
				</div>
			)}
			{required && (
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
	);
}

function highlightText(text: string, highlight: string, isTiny: boolean) {
	const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const parts = text.split(new RegExp(`(${escapedHighlight})`, "gi"));

	return (
		<MdTypography
			variant="body"
			size={isTiny ? "medium" : "large"}
			style={{ whiteSpace: "pre-line" }}
			className="flex-1"
		>
			<span>
				{parts.map((part) => (
					<span
						key={part + Math.random()}
						className={
							part.toLowerCase() === highlight.toLowerCase()
								? "text-error"
								: "text-onSurface"
						}
					>
						{part}
					</span>
				))}
			</span>
		</MdTypography>
	);
}
