import React from "react";
import { createComponent } from "@lit/react";
import { MdRipple } from "@material/web/ripple/ripple.js";
import { MdFilledButton as MdFilledButtonWebComponent } from "@material/web/button/filled-button.js";
import { MdFilledTonalButton as MdFilledTonalButtonWebComponent } from "@material/web/button/filled-tonal-button.js";
import { MdElevatedButton as MdElevatedButtonWebComponent } from "@material/web/button/elevated-button.js";
import { MdOutlinedButton as MdOutlinedButtonWebComponent } from "@material/web/button/outlined-button.js";
import { MdTextButton as MdTextButtonWebComponent } from "@material/web/button/text-button.js";
import { MdOutlinedTextField as MdOutlinedTextFieldWebComponent } from "@material/web/textfield/outlined-text-field.js";
import { MdIcon as MdIconWebComponent } from "@material/web/icon/icon";
import { MdIconButton as MdIconButtonWebComponent } from "@material/web/iconbutton/icon-button";
import { MdFilledIconButton as MdFilledIconButtonWebComponent } from "@material/web/iconbutton/filled-icon-button";
import { MdFilledTonalIconButton as MdFilledTonalIconButtonWebComponent } from "@material/web/iconbutton/filled-tonal-icon-button";
import { MdOutlinedIconButton as MdOutlinedIconButtonWebComponent } from "@material/web/iconbutton/outlined-icon-button";
import { MdElevation as MdElevationWebComponent } from "@material/web/elevation/elevation";
import { MdCheckbox as MdCheckboxWebComponent } from "@material/web/checkbox/checkbox";
import { MdTabs as MdTabsWebComponent } from "@material/web/tabs/tabs";
import { MdPrimaryTab as MdPrimaryTabWebComponent } from "@material/web/tabs/primary-tab";
import { MdSecondaryTab as MdSecondaryTabWebComponent } from "@material/web/tabs/secondary-tab";
import { MdOutlinedSelect as MdOutlinedSelectWebComponent } from "@material/web/select/outlined-select";
import { MdSelectOption as MdSelectOptionWebComponent } from "@material/web/select/select-option";
import { MdChipSet as MdChipSetWebComponent } from "@material/web/chips/chip-set";
import { MdAssistChip as MdAssistChipWebComponent } from "@material/web/chips/assist-chip";
import { MdFilterChip as MdFilterChipWebComponent } from "@material/web/chips/filter-chip";
import { MdInputChip as MdInputChipWebComponent } from "@material/web/chips/input-chip";
import { MdSuggestionChip as MdSuggestionChipWebComponent } from "@material/web/chips/suggestion-chip";
import { MdSwitch as MdSwitchWebComponent } from "@material/web/switch/switch";
import { MdRadio as MdRadioWebComponent } from "@material/web/radio/radio";
import { MdMenu as MdMenuWebComponent } from "@material/web/menu/menu";
import { MdMenuItem as MdMenuItemWebComponent } from "@material/web/menu/menu-item";
import { MdElevatedCard as MdElevatedCardWebComponent } from "@material/web/labs/card/elevated-card";
import { MdOutlinedCard as MdOutlinedCardWebComponent } from "@material/web/labs/card/outlined-card";
import { MdFilledCard as MdFilledCardWebComponent } from "@material/web/labs/card/filled-card";
import { MdOutlinedSegmentedButtonSet as MdOutlinedSegmentedButtonSetWebComponent } from "@material/web/labs/segmentedbuttonset/outlined-segmented-button-set";
import { MdOutlinedSegmentedButton as MdOutlinedSegmentedButtonWebComponent } from "@material/web/labs/segmentedbutton/outlined-segmented-button";
import { MdBadge as MdBadgeWebComponent } from "@material/web/labs/badge/badge";
import { MdNavigationBar as MdNavigationBarWebComponent } from "@material/web/labs/navigationbar/navigation-bar";
import { MdNavigationDrawer as MdNavigationDrawerWebComponent } from "@material/web/labs/navigationdrawer/navigation-drawer";
import { MdNavigationTab as MdNavigationTabWebComponent } from "@material/web/labs/navigationtab/navigation-tab";
import { MdCircularProgress as MdCircularProgressWebComponent } from "@material/web/progress/circular-progress";
import { MdLinearProgress as MdLinearProgressWebComponent } from "@material/web/progress/linear-progress";
import { MdDialog as MdDialogWebComponent } from "@material/web/dialog/dialog";
import { MdList as MdListWebComponent } from "@material/web/list/list";
import { MdListItem as MdListItemWebComponent } from "@material/web/list/list-item";

import { MdFilledSelect as MdFilledSelectWebComponent } from "@material/web/select/filled-select";

export const MdRippleEffect = createComponent({
  tagName: "md-ripple",
  elementClass: MdRipple,
  react: React,
});

export const MdFilledButton = createComponent({
  tagName: "md-filled-button",
  elementClass: MdFilledButtonWebComponent,
  react: React,
});

export const MdFilledTonalButton = createComponent({
  tagName: "md-filled-tonal-button",
  elementClass: MdFilledTonalButtonWebComponent,
  react: React,
});

export const MdElevationButton = createComponent({
  tagName: "md-elevated-button",
  elementClass: MdElevatedButtonWebComponent,
  react: React,
});

export const MdOutlinedButton = createComponent({
  tagName: "md-outlined-button",
  elementClass: MdOutlinedButtonWebComponent,
  react: React,
});

export const MdTextButton = createComponent({
  tagName: "md-text-button",
  elementClass: MdTextButtonWebComponent,
  react: React,
});

export const MdOutlinedTextField = createComponent({
  tagName: "md-outlined-text-field",
  elementClass: MdOutlinedTextFieldWebComponent,
  react: React,
  events: {
    focus: "focus",
  },
});

export const MdCheckbox = createComponent({
  tagName: "md-checkbox",
  elementClass: MdCheckboxWebComponent,
  react: React,
  events: {
    onchange: "change",
  },
});

export const MdIcon = createComponent({
  tagName: "md-icon",
  elementClass: MdIconWebComponent,
  react: React,
});

export const MdIconButton = createComponent({
  tagName: "md-icon-button",
  elementClass: MdIconButtonWebComponent,
  react: React,
});

export const MdFilledIconButton = createComponent({
  tagName: "md-filled-icon-button",
  elementClass: MdFilledIconButtonWebComponent,
  react: React,
});

export const MdFilledTonalIconButton = createComponent({
  tagName: "md-filled-tonal-icon-button",
  elementClass: MdFilledTonalIconButtonWebComponent,
  react: React,
});

export const MdOutlinedIconButton = createComponent({
  tagName: "md-outlined-icon-button",
  elementClass: MdOutlinedIconButtonWebComponent,
  react: React,
});

export const MdElevation = createComponent({
  tagName: "md-elevation",
  elementClass: MdElevationWebComponent,
  react: React,
});

export const MdTabs = createComponent({
  tagName: "md-tabs",
  elementClass: MdTabsWebComponent,
  react: React,
  events: {
    onchange: "change",
  },
});

export const MdPrimaryTab = createComponent({
  tagName: "md-primary-tab",
  elementClass: MdPrimaryTabWebComponent,
  react: React,
});

export const MdSecondaryTab = createComponent({
  tagName: "md-secondary-tab",
  elementClass: MdSecondaryTabWebComponent,
  react: React,
});

export const MdOutlinedSelect = createComponent({
  tagName: "md-outlined-select",
  elementClass: MdOutlinedSelectWebComponent,
  react: React,
  events: {
    onchange: "change",
  },
});

export const MdSelectOption = createComponent({
  tagName: "md-select-option",
  elementClass: MdSelectOptionWebComponent,
  react: React,
});

export const MdChipSet = createComponent({
  tagName: "md-chip-set",
  elementClass: MdChipSetWebComponent,
  react: React,
});

export const MdAssistChip = createComponent({
  tagName: "md-assist-chip",
  elementClass: MdAssistChipWebComponent,
  react: React,
  events: {
    handleTrailingActionFocus: "handleTrailingActionFocus",
  },
});

export const MdFilterChip = createComponent({
  tagName: "md-filter-chip",
  elementClass: MdFilterChipWebComponent,
  react: React,
  events: {
    handleTrailingActionFocus: "handleTrailingActionFocus",
  },
});

export const MdInputChip = createComponent({
  tagName: "md-input-chip",
  elementClass: MdInputChipWebComponent,
  react: React,
  events: {
    handleTrailingActionFocus: "handleTrailingActionFocus",
  },
});

export const MdSuggestionChip = createComponent({
  tagName: "md-suggestion-chip",
  elementClass: MdSuggestionChipWebComponent,
  react: React,
  events: {
    handleTrailingActionFocus: "handleTrailingActionFocus",
  },
});

export const MdSwitch = createComponent({
  tagName: "md-switch",
  elementClass: MdSwitchWebComponent,
  react: React,
});

export const MdRadio = createComponent({
  tagName: "md-radio",
  elementClass: MdRadioWebComponent,
  react: React,
});

export const MdMenu = createComponent({
  tagName: "md-menu",
  elementClass: MdMenuWebComponent,
  react: React,
});

export const MdMenuItem = createComponent({
  tagName: "md-menu-item",
  elementClass: MdMenuItemWebComponent,
  react: React,
});

export const MdElevatedCard = createComponent({
  tagName: "md-elevated-card",
  elementClass: MdElevatedCardWebComponent,
  react: React,
});

export const MdOutlinedCard = createComponent({
  tagName: "md-outlined-card",
  elementClass: MdOutlinedCardWebComponent,
  react: React,
});

export const MdFilledCard = createComponent({
  tagName: "md-filled-card",
  elementClass: MdFilledCardWebComponent,
  react: React,
});

export const MdOutlinedSegmentedButtonSet = createComponent({
  tagName: "md-outlined-segmented-button-set",
  elementClass: MdOutlinedSegmentedButtonSetWebComponent,
  react: React,
});

export const MdOutlinedSegmentedButton = createComponent({
  tagName: "md-outlined-segmented-button",
  elementClass: MdOutlinedSegmentedButtonWebComponent,
  react: React,
});

export const MdBadge = createComponent({
  tagName: "md-badge",
  elementClass: MdBadgeWebComponent,
  react: React,
});

export const MdNavigationBar = createComponent({
  tagName: "md-navigation-bar",
  elementClass: MdNavigationBarWebComponent,
  react: React,
});

export const MdNavigationDrawer = createComponent({
  tagName: "md-navigation-drawer",
  elementClass: MdNavigationDrawerWebComponent,
  react: React,
});

export const MdNavigationTab = createComponent({
  tagName: "md-navigation-tab",
  elementClass: MdNavigationTabWebComponent,
  react: React,
});

export const MdCircularProgress = createComponent({
  tagName: "md-circular-progress",
  elementClass: MdCircularProgressWebComponent,
  react: React,
});

export const MdLinearProgress = createComponent({
  tagName: "md-linear-progress",
  elementClass: MdLinearProgressWebComponent,
  react: React,
});

export const MdDialog = createComponent({
  tagName: "md-dialog",
  elementClass: MdDialogWebComponent,
  react: React,
  events: {
    opened: "opened",
    closed: "closed",
    cancel: "cancel",
  },
});

export const MdList = createComponent({
  tagName: "md-list",
  elementClass: MdListWebComponent,
  react: React,
});

export const MdListItem = createComponent({
  tagName: "md-list-item",
  elementClass: MdListItemWebComponent,
  react: React,
});

export const MdFilledSelect = createComponent({
  tagName: "md-filled-select",
  elementClass: MdFilledSelectWebComponent,
  react: React,
  events: {
    onchange: "change",
  },
});
