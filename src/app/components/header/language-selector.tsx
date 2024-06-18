import { LanguageOptions } from "@/app/util/constants";
import { MdIcon, MdIconButton, MdMenu, MdMenuItem } from "@/app/util/md3";
import { Check } from "@mui/icons-material";
import LanguageOutlined from "@mui/icons-material/LanguageOutlined";
import { useState } from "react";

export const LanguageSelector = () => {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  return (
    <div className="relative">
      <MdIconButton
        id="language-anchor"
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
      >
        <MdIcon>
          <LanguageOutlined />
        </MdIcon>
      </MdIconButton>
      <MdMenu
        id="language-menu"
        anchor="language-anchor"
        open={isLanguageMenuOpen}
        close={() => setIsLanguageMenuOpen(false)}
      >
        {LanguageOptions.map((language) => (
          <MdMenuItem
            key={language}
            onClick={() => setCurrentLanguage(language)}
          >
            <div slot="headline">{language}</div>
            {currentLanguage === language && (
              <MdIcon slot="start">
                <Check />
              </MdIcon>
            )}
          </MdMenuItem>
        ))}
      </MdMenu>
    </div>
  );
};
