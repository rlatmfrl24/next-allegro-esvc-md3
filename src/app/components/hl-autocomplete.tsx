import { forwardRef, useState } from "react";
import { Combobox } from "@headlessui/react";
import { MdOutlinedTextField } from "../util/md3";

let CustomInput = forwardRef(function CustomInput(props, ref) {
  return <MdOutlinedTextField {...props} ref={ref as any} />;
});

export function useAutoCompleteComponent() {
  const [selectedItem, setSelectedItem] = useState("");
  const [query, setQuery] = useState("");

  const component = (
    <Combobox value={selectedItem} onChange={setSelectedItem}>
      <Combobox.Input
        // as={CustomInput}
        onInput={(e) => setQuery(e.currentTarget.value)}
      />
      <Combobox.Options></Combobox.Options>
    </Combobox>
  );

  return {
    component,
    selectedItem,
    setQuery,
  };
}
