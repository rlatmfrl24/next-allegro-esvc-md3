import NAOutlinedAutoComplete from "@/app/components/na-autocomplete";
import NAOutlinedListBox from "@/app/components/na-outline-listbox";
import { NAOutlinedTextField } from "@/app/components/na-textfield";
import NaToggleButton from "@/app/components/na-toggle-button";
import { DetailTitle } from "@/app/components/title-components";
import { MdTypography } from "@/app/components/typography";
import { DividerComponent } from "@/app/main/booking/information/components/base";
import { createDummyPlaceInformation } from "@/app/main/schedule/util";
import { MdFilledButton, MdOutlinedTextField, MdRadio } from "@/app/util/md3";
import { faker } from "@faker-js/faker";
import { PlaceOutlined } from "@mui/icons-material";
import { useMemo } from "react";

export default function StepRouteBL() {
  const tempPortList = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      return createDummyPlaceInformation(
        faker.location.city() + ", " + faker.location.country()
      );
    });
  }, []);

  return (
    <div className="w-full flex flex-col">
      <MdTypography variant="title" size="large" className="mb-6">
        Route & BL Information
      </MdTypography>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
          <NAOutlinedTextField required label="Vessel Voy(Flag)" />
          <NAOutlinedTextField required label="Pre-Carriage By" />
          <div></div>
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Pier or Place of Receipt"
            itemList={tempPortList.map((item) => item.yardName)}
          />
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Port of Loading"
            itemList={tempPortList.map((item) => item.yardName)}
          />
          <NaToggleButton label="Same as Place of Receipt" state="unchecked" />
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Port of Discharging"
            itemList={tempPortList.map((item) => item.yardName)}
          />
          <NAOutlinedAutoComplete
            required
            icon={<PlaceOutlined />}
            label="Place of Delivery (By On Carrier)"
            itemList={tempPortList.map((item) => item.yardName)}
          />
          <NaToggleButton
            label="Same as Place of Discharging"
            state="unchecked"
          />
          <NAOutlinedTextField label="Point of Country of Origin" />
          <NAOutlinedTextField label="Final Destination" />
          <div></div>
          <div className="flex gap-2">
            <NAOutlinedListBox
              options={["CY", "Door"]}
              initialValue="CY"
              label="Service Type"
            />
            <NAOutlinedListBox options={["CY", "Door"]} initialValue="CY" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <DetailTitle title="BL Type" />
            <DividerComponent className="flex-1" />
          </div>
          <form className="flex gap-9">
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="flex items-center gap-2 "
            >
              <MdRadio name="blType" />
              Original B/L
            </MdTypography>
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="flex items-center gap-2 "
            >
              <MdRadio name="blType" />
              B/L Surrender
            </MdTypography>
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="flex items-center gap-2 "
            >
              <MdRadio name="blType" />
              Sea Waybill
            </MdTypography>
          </form>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <DetailTitle title="Freight Terms" />
            <DividerComponent className="flex-1" />
          </div>
          <form className="flex gap-9">
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="flex items-center gap-2 "
            >
              <MdRadio name="blType" />
              Prepaid
            </MdTypography>
            <MdTypography
              tag="label"
              variant="label"
              size="large"
              className="flex items-center gap-2 "
            >
              <MdRadio name="blType" />
              Collect
            </MdTypography>
          </form>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <DetailTitle title="Remark" />
            <DividerComponent className="flex-1" />
          </div>
          <MdOutlinedTextField
            label="Remark"
            type="textarea"
            rows={5}
            className="w-full"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <DetailTitle title="House B/L Involve" />
            <DividerComponent className="flex-1" />
          </div>
          <NAOutlinedListBox
            label="House B/L Involve"
            className="w-fit mt-4"
            options={["Console (Exit)", "Simple (Do not Exist)"]}
          />
        </div>
      </div>
      <MdFilledButton className="w-fit self-end mt-4">Next</MdFilledButton>
    </div>
  );
}
