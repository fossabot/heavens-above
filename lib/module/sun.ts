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
    HAEvent,
    HAExPosition,
    HAPositionEvent,
    HATimeConfig,
    postDocument,
    toRequestConfig
} from "../utils";

/**
 * Describes sun.
 */
export interface HASunInfo {

    /**
     * Position of the sun.
     */
    position: HAExPosition;

    /**
     * Daily events of the sun.
     */
    dailyEvent: HAPositionEvent[];

    /**
     * Yearly events of the sun.
     */
    yearlyEvent: HAEvent[];

    /**
     * URL of the sun position image.
     */
    positionImageURL: string;

    /**
     * URL of the Latest sun image.
     */
    sunImageURL: string;
}

const CONSTELLATION_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table:nth-child(8) > tbody > tr > td:nth-child(1) > div > table:nth-child(9) > tbody > tr:nth-child(6) > td:nth-child(2)";
const DAILY_EVENT_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table:nth-child(8) > tbody > tr > td:nth-child(1) > div > table:nth-child(5) > tbody > tr";
const YEARLY_EVENT_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table:nth-child(8) > tbody > tr > td:nth-child(1) > div > table:nth-child(7) > tbody > tr";

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
    const time = moment(text + " Z", "MMM DD, HH:mm Z").utc();
    time.year(base.year());
    return time.toDate();
}

export async function getSunInfo(HA: HeavensAbove, config: Partial<HATimeConfig>): Promise<HASunInfo> {
    const time = moment(config.time || new Date()).utc();
    const data = getTimeData(time);
    const document = await postDocument(toRequestConfig(HA, config), "/Sun.aspx", data);
    return {
        position: {
            altitude: $number($text(document, "#ctl00_cph1_lblAltitude")),
            azimuth: $number($text(document, "#ctl00_cph1_lblAzimuth")),
            rightAscension: $ra($text(document, "#ctl00_cph1_lblRA")),
            declination: $declination($text(document, "#ctl00_cph1_lblDec")),
            range: $number($text(document, "#ctl00_cph1_lblRange")),
            constellation: $text(document, CONSTELLATION_SELECTOR).trim()
        },
        dailyEvent: $$(document, DAILY_EVENT_SELECTOR).map((el) => ({
            name: $text(el, ":nth-child(1)"),
            time: parseTime(time, $text(el, ":nth-child(2)")),
            altitude: $number($text(el, ":nth-child(3)")),
            azimuth: $number($text(el, ":nth-child(4)"))
        })),
        yearlyEvent: $$(document, YEARLY_EVENT_SELECTOR).map((el) => ({
            name: $text(el, ":nth-child(1)"),
            time: parseDate(time, $text(el, ":nth-child(2)"))
        })),
        positionImageURL: $attr("src", document, "#ctl00_cph1_imageSky"),
        sunImageURL: $attr("src", document, "#ctl00_cph1_imgLatest")
    };
}
