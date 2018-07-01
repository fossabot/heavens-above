import "source-map-support/register";

import HeavensAbove from "..";

import {
    $attr,
    getCheckboxValue,
    HAConfig,
    postDocument,
    purifyObject,
    toRequestConfig
} from "../utils";

/**
 * Configs related to sky chart
 */
export interface HASkyChartConfig extends HAConfig {

    /**
     * Observation time (accurate to minute). **Default:** `new Date()`
     */
    time: Date;

    /**
     * Display constellation lines. **Default:** `true`
     */
    constellationLines: boolean;

    /**
     * Display constellation names. **Default:** `true`
     */
    constellationNames: boolean;

    /**
     * Display constellation boundaries. **Default:** `false`
     */
    constellationBoundaries: boolean;

    /**
     * Display ecliptic plane. **Default:** `false`
     */
    eclipticPlane: boolean;

    /**
     * Display colored sky chart instead of black and white. **Default:** `true`
     */
    colored: boolean;

    /**
     * The size of the sky chart (in pixels, from 500 to 1600). **Default:** `800`
     */
    size: number;
}

export async function getSkyChartURL(HA: HeavensAbove, config: Partial<HASkyChartConfig>): Promise<string> {
    const _data = {
        time: new Date(),
        constellationLines: true,
        constellationNames: true,
        constellationBoundaries: false,
        eclipticPlane: false,
        colored: true,
        size: 800,
        ...config
    };
    const data = purifyObject({
        ctl00$cph1$txtYear: _data.time.getUTCFullYear(),
        ctl00$cph1$txtMonth: _data.time.getUTCMonth() + 1,
        ctl00$cph1$txtDay: _data.time.getUTCDate(),
        ctl00$cph1$txtHour: _data.time.getUTCHours(),
        ctl00$cph1$txtMinute: _data.time.getUTCMinutes(),
        ctl00$cph1$chkShowLines: getCheckboxValue(_data.constellationLines),
        ctl00$cph1$chkShowNames: getCheckboxValue(_data.constellationNames),
        ctl00$cph1$chkBoundaries: getCheckboxValue(_data.constellationBoundaries),
        ctl00$cph1$chkEcliptic: getCheckboxValue(_data.eclipticPlane),
        ctl00$cph1$radioColours: _data.colored ? "radioColour" : "radioBW",
        ctl00$cph1$txtSize: _data.size
    });
    const document = await postDocument(toRequestConfig(HA, config, true), "/SkyChart.aspx", data);
    return $attr("src", document, "#ctl00_cph1_imgSkyChart");
}
