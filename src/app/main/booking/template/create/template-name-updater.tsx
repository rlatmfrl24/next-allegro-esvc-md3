import PageTitle from "@/app/components/title-components";
import { MdIcon, MdIconButton, MdRippleEffect } from "@/app/util/md3";
import { Check, Close, Edit } from "@mui/icons-material";
import { useState } from "react";

export const TemplateNameUpdater = (props: {
  defaultName: string;
  onUpdateTemplateName?: (name: string) => void;
}) => {
  const [process, setProcess] = useState<"edit" | "view">("view");
  const [templateName, setTemplateName] = useState(props.defaultName);
  const [query, setQuery] = useState(props.defaultName);

  return process === "view" ? (
    <div className="flex items-center gap-4">
      <PageTitle title={templateName} hasFavorite={false} />
      <div
        className={`relative w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-surfaceContainerHighest text-primary`}
        onClick={() => {
          setProcess("edit");
        }}
      >
        <MdRippleEffect />
        <Edit fontSize="small" />
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <input
        className="border-2 border-primary rounded outline-primary bg-surfaceContainer px-2 py-1.5 font-pretendard w-fit"
        defaultValue={templateName}
        autoFocus
        onInput={(e) => {
          const value = e.currentTarget.value;
          setQuery(value);
        }}
      />
      <div
        className={`relative w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-primary text-onPrimary`}
        onClick={() => {
          setProcess("view");
          setTemplateName(query);
          props.onUpdateTemplateName?.(query);
        }}
      >
        <MdRippleEffect />
        <Check />
      </div>
      <div
        className={`relative w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-onSurfaceVariant text-onPrimary`}
        onClick={() => {
          setProcess("view");
        }}
      >
        <MdRippleEffect />
        <Close />
      </div>
    </div>
  );
};
