import "source-map-support/register";

import HeavensAbove from "..";

import {
    $$,
    $attr,
    $text,
    getDocument,
    toRequestConfig
} from "../utils";

/**
 * An available language
 */
export interface HALanguage {

    /**
     * ID of the language
     */
    id: string;

    /**
     * Name of the Language
     */
    name: string;
}

export async function getLanguageList(HA: HeavensAbove): Promise<HALanguage[]> {
    if (HA._languageList.length === 0) {
        const document = await getDocument(toRequestConfig(HA), "/SelectLocation.aspx");
        $$(document, "#ctl00_ddlCulture > option").map((el) => {
            HA._languageList.push({
                id: $attr("value", el),
                name: $text(el)
            });
        });
    }
    return HA._languageList;
}
