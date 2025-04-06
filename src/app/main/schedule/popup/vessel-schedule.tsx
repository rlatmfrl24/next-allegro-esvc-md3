import { MdDialog, MdTextButton } from "@/app/util/md3";
import { VesselScheduleResult } from "../vessel/search-result";
import type {
	VesselInfoType,
	VesselScheduleType,
} from "@/app/util/typeDef/schedule";
import Portal from "@/app/components/portal";

export default function VesselScheduleDialog({
	open,
	handleOpen,
	vesselInfo,
	vesselSchedules,
}: {
	open: boolean;
	handleOpen: (open: boolean) => void;
	vesselInfo: VesselInfoType;
	vesselSchedules: VesselScheduleType[];
}) {
	return (
		<Portal selector="#portal">
			<MdDialog
				open={open}
				closed={() => {
					handleOpen(false);
				}}
				className="min-w-[1280px]"
			>
				<div slot="headline">Vessel Schedule</div>
				<div slot="content" className="flex flex-col gap-4">
					<VesselScheduleResult
						vesselData={vesselInfo}
						vesselSchedules={vesselSchedules}
					/>
				</div>
				<div slot="actions">
					<MdTextButton
						onClick={(e) => {
							const DialogElement =
								e.currentTarget.parentElement?.parentElement;
							(DialogElement as HTMLDialogElement)?.close();
						}}
					>
						Close
					</MdTextButton>
				</div>
			</MdDialog>
		</Portal>
	);
}
