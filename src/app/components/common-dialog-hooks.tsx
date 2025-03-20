import { useState } from "react";

import Portal from "@/app/components/portal";
import VesselScheduleDialog from "@/app/main/schedule/popup/vessel-schedule";
import { createDummyVesselSchedules } from "@/app/main/schedule/util";
import type {
	PlaceInformationType,
	VesselInfoType,
} from "@/app/util/typeDef/schedule";

import PlaceInformationDialog from "../main/schedule/popup/place-information";
import VesselInformationDialog from "../main/schedule/popup/vessel-information";

export const usePlaceInfoDialog = (portal?: string) => {
	const [isPlaceInfoDialogOpen, setIsPlaceInfoDialogOpen] = useState(false);
	const [currentPlace, setCurrentPlace] = useState({} as PlaceInformationType);

	function renderDialog() {
		if (portal) {
			return (
				<Portal selector={portal}>
					<PlaceInformationDialog
						open={isPlaceInfoDialogOpen}
						handleOpen={setIsPlaceInfoDialogOpen}
						data={currentPlace}
					/>
				</Portal>
			);
		}
		return (
			<PlaceInformationDialog
				open={isPlaceInfoDialogOpen}
				handleOpen={setIsPlaceInfoDialogOpen}
				data={currentPlace}
			/>
		);
	}

	return {
		renderDialog,
		setCurrentPlace,
		setIsPlaceInfoDialogOpen,
	};
};

export const useVesselInfoDialog = (portal?: string) => {
	const [isVesselInfoDialogOpen, setIsVesselInfoDialogOpen] = useState(false);
	const [currentVessel, setCurrentVessel] = useState<VesselInfoType>(
		{} as VesselInfoType,
	);

	function renderDialog() {
		if (portal) {
			return (
				<Portal selector={portal}>
					<VesselInformationDialog
						open={isVesselInfoDialogOpen}
						handleOpen={setIsVesselInfoDialogOpen}
						data={currentVessel}
					/>
				</Portal>
			);
		}
		return (
			<VesselInformationDialog
				open={isVesselInfoDialogOpen}
				handleOpen={setIsVesselInfoDialogOpen}
				data={currentVessel}
			/>
		);
	}

	return {
		renderDialog,
		setCurrentVessel,
		setIsVesselInfoDialogOpen,
	};
};

export const useVesselScheduleDialog = (portal?: string) => {
	const [isVesselScheduleDialogOpen, setIsVesselScheduleDialogOpen] =
		useState(false);
	const [currentVessel, setCurrentVessel] = useState<VesselInfoType>(
		{} as VesselInfoType,
	);

	function renderDialog() {
		if (portal) {
			return (
				currentVessel && (
					<Portal selector="#main-container">
						<VesselScheduleDialog
							open={isVesselScheduleDialogOpen}
							handleOpen={setIsVesselScheduleDialogOpen}
							vesselInfo={currentVessel}
							vesselSchedules={createDummyVesselSchedules()}
						/>
					</Portal>
				)
			);
		}
		return (
			currentVessel && (
				<VesselScheduleDialog
					open={isVesselScheduleDialogOpen}
					handleOpen={setIsVesselScheduleDialogOpen}
					vesselInfo={currentVessel}
					vesselSchedules={createDummyVesselSchedules()}
				/>
			)
		);
	}

	return {
		renderDialog,
		currentVessel,
		setCurrentVessel,
		setIsVesselScheduleDialogOpen,
	};
};
