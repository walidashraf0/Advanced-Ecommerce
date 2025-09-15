import { useTranslation } from "react-i18next";

import { languageIconList, type SupportedLngsType } from "@/shared/config";
import { AppIcon, Button } from "@/shared/ui"

const LanguageSwithcher = () => {

    const { i18n } = useTranslation();

    const currentLanguage = i18n.language as SupportedLngsType
    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'en' ? "ar" : "en")
    }

    return (
        <Button onClick={toggleLang} theme="ghost">
            <AppIcon Icon={languageIconList[currentLanguage]} />
        </Button>
    )
}

export default LanguageSwithcher
