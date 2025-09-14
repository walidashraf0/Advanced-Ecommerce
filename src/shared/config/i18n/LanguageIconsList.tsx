import type { FunctionComponent, SVGProps } from "react";
import type { supportedLngs } from "./i18n";

import GermanIcon from "@/shared/assets/icons/German.svg?react"
import EnglishIcon from "@/shared/assets/icons/English.svg?react"

export type SupportedLngsType = (typeof supportedLngs)[number];

type LanuageIconListType = Record<SupportedLngsType, FunctionComponent<SVGProps<SVGSVGElement>>>

export const languageIconList: LanuageIconListType = {
    en: EnglishIcon,
    ar: GermanIcon,
};