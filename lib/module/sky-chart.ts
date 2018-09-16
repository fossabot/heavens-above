import "source-map-support/register";

import moment from "moment";

import HeavensAbove from "..";

import {
    $attr,
    getCheckboxValue,
    postDocument,
    purifyObject,
    TimeConfig,
    toRequestConfig
} from "../utils";

/**
 * Configs including sky chart params.
 */
export interface SkyChartConfig extends TimeConfig {

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
     * The size of the sky chart (px, from 500 to 1600). **Default:** `800`
     */
    size: number;
}

export async function getSkyChartURL(ha: HeavensAbove, config: Partial<SkyChartConfig>): Promise<string> {
    const time = moment(config.time || new Date()).utc();
    const _data = {
        constellationLines: true,
        constellationNames: true,
        constellationBoundaries: false,
        eclipticPlane: false,
        colored: true,
        size: 800,
        ...config
    };
    const data = purifyObject({
        ctl00$cph1$txtYear: time.year(),
        ctl00$cph1$txtMonth: time.month() + 1,
        ctl00$cph1$txtDay: time.date(),
        ctl00$cph1$txtHour: time.hour(),
        ctl00$cph1$txtMinute: time.minute(),
        ctl00$cph1$chkShowLines: getCheckboxValue(_data.constellationLines),
        ctl00$cph1$chkShowNames: getCheckboxValue(_data.constellationNames),
        ctl00$cph1$chkBoundaries: getCheckboxValue(_data.constellationBoundaries),
        ctl00$cph1$chkEcliptic: getCheckboxValue(_data.eclipticPlane),
        ctl00$cph1$radioColours: _data.colored ? "radioColour" : "radioBW",
        ctl00$cph1$txtSize: _data.size
    });
    const document = await postDocument(toRequestConfig(ha, config), "/SkyChart.aspx", data);
    return $attr("src", document, "#ctl00_cph1_imgSkyChart");
}
