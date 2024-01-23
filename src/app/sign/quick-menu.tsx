import { MdElevation } from "../util/md3";

export default function QuickMenu() {
  return (
    <div className="flex flex-col gap-6 h-full absolute z-10 right-0 p-16 w-[720px]">
      <div className="bg-white">Quick Search</div>
      <div className="relative bg-white p-12 rounded-xl">
        <MdElevation />
        Notice
      </div>
    </div>
  );
}
