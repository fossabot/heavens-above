import "source-map-support/register";

import * as moment from "moment";

import HeavensAbove from "..";

import {
    $$,
    $attr,
    $declination,
    $number,
    $ra,
    $text,
    getTimeData,
    HADistanceEvent,
    HAEvent,
    HAExPosition,
    HAPositionEvent,
    HATimeConfig,
    postDocument,
    toRequestConfig
} from "../utils";

/**
 * Describes moon appearance.
 */
export interface HAMoonAppearance {

    /**
     * Diameter of the moon (minute).
     */
    diameter: number;

    /**
     * Illumination of disk of the moon (%).
     */
    illumination: number;

    /**
     * Libration in longitude of the moon (degree).
     */
    longitudeLibration: number;

    /**
     * Libration in latitude of the moon (degree).
     */
    latitudeLibration: number;
}

/**
 * Moon info.
 */
export interface HAMoonInfo {

    /**
     * Position of the moon. `range` is in km.
     */
    position: HAExPosition;

    /**
     * Appearence of the moon.
     */
    appearence: HAMoonAppearance;

    /**
     * Events of the moon.
     */
    event: HAPositionEvent[];

    /**
     * Monthly phases of the moon.
     */
    monthlyPhase: HAEvent[];

    /**
     * Perigee and apogee of the moon.
     */
    perigeeApogee: HADistanceEvent[];

    /**
     * URL of the moon position image.
     */
    positionImageURL: string;

    /**
     * URL of the moon appearence image. (celestial north is upwards)
     */
    appearenceImageURL: string;

}

const EVENT_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table:nth-child(6) > tbody > tr > td:nth-child(1) > table:nth-child(5) > tbody > tr";
const MONTHLY_PHASE_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table:nth-child(6) > tbody > tr > td:nth-child(1) > table:nth-child(7) > tbody > tr";
const PERIGEE_APOGEE_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table:nth-child(6) > tbody > tr > td:nth-child(1) > table:nth-child(9) > tbody > tr";

function parseTime(base: moment.Moment, text: string): Date {
    const time = moment(text + " Z", "HH:mm Z").utc();
    time.set({
        year: base.year(),
        month: base.month(),
        date: base.date()
    });
    return time.toDate();
}

function parseDate(base: moment.Moment, text: string): Date {
    const time = moment(text + " Z", "DD MMM YYYY, HH:mm Z").utc();
    time.year(base.year());
    return time.toDate();
}

export async function getMoonInfo(HA: HeavensAbove, config: Partial<HATimeConfig>): Promise<HAMoonInfo> {
    const time = moment(config.time || new Date()).utc();
    const data = getTimeData(time);
    const document = await postDocument(toRequestConfig(HA, config), "/Moon.aspx", data);
    return {
        position: {
            altitude: $number($text(document, "#ctl00_cph1_lblAltitude")),
            azimuth: $number($text(document, "#ctl00_cph1_lblAzimuth")),
            rightAscension: $ra($text(document, "#ctl00_cph1_lblRA")),
            declination: $declination($text(document, "#ctl00_cph1_lblDec")),
            range: $number($text(document, "#ctl00_cph1_lblRange")),
            constellation: $text(document, "#ctl00_cph1_linkConstellation")
        },
        appearence: {
            diameter: $number($text(document, "#ctl00_cph1_lblDiameter")),
            illumination: $number($text(document, "#ctl00_cph1_lblPercentIllumination")),
            longitudeLibration: $number($text(document, "#ctl00_cph1_lblLibLong")),
            latitudeLibration: $number($text(document, "#ctl00_cph1_lblLibLat"))
        },
        event: $$(document, EVENT_SELECTOR).map((el) => ({
            name: $text(el, ":nth-child(1)"),
            time: parseTime(time, $text(el, ":nth-child(2)")),
            altitude: $number($text(el, ":nth-child(3)")),
            azimuth: $number($text(el, ":nth-child(4)"))
        })),
        monthlyPhase: $$(document, MONTHLY_PHASE_SELECTOR).map((el) => ({
            name: $text(el, ":nth-child(1)"),
            time: parseDate(time, $text(el, ":nth-child(2)"))
        })),
        perigeeApogee: $$(document, PERIGEE_APOGEE_SELECTOR).map((el) => ({
            name: $text(el, ":nth-child(1)"),
            distance: $number($text(el, ":nth-child(2)")),
            time: parseDate(time, $text(el, ":nth-child(3)"))
        })),
        positionImageURL: $attr("src", document, "#ctl00_cph1_imageSky"),
        appearenceImageURL: $attr("src", document, "#ctl00_cph1_imageMoon")
    };
}
