import { closestCenter, closestCorners, pointerWithin } from "@dnd-kit/core";

// Custom collision detection algorithm for Maximum update depth exceeded error
export function customCollisionDetectionAlgorithm(args: any) {
  const closestCornersCollisions = closestCorners(args);
  const closestCenterCollisions = closestCenter(args);
  const pointerWithinCollisions = pointerWithin(args);

  if (
    closestCornersCollisions.length > 0 &&
    closestCenterCollisions.length > 0 &&
    pointerWithinCollisions.length > 0
  ) {
    return pointerWithinCollisions;
  }

  return [];
}
