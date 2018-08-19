import "source-map-support/register";

import * as moment from "moment";

import HeavensAbove from "..";

import {
    $$,
    $attr,
    $fuzzyAzimuth,
    $number,
    $text,
    getDocument,
    HAFuzzyEvent,
    HATimeConfig,
    postDocument,
    toRequestConfig
} from "../utils";

/**
 * `"morning"` or `"evening"`.
 */
export type HAPassingPeriod = "morning" | "evening";

/**
 * One of `3`, `3.5`, `4`, `4.5`, `5`.
 */
export type HAMinBrightness = 3 | 3.5 | 4 | 4.5 | 5;

/**
 * Config to get satellite passing events.
 */
export interface HAPassingConfig extends HATimeConfig {

    /**
     * Passing period.
     */
    period: HAPassingPeriod;

    /**
     * Minimum brightness.
     */
    minBrightness: HAMinBrightness;
}

/**
 * Describes a satellite passing event.
 */
export interface HAPassing {

    /**
     * Satellite name.
     */
    satellite: string;

    /**
     * Brightness (mag).
     */
    brightness: number;

    /**
     * Passing start event.
     */
    start: HAFuzzyEvent;

    /**
     * Highest point event.
     */
    highest: HAFuzzyEvent;

    /**
     * Passing end event.
     */
    end: HAFuzzyEvent;

    /**
     * URL of the passing detail.
     */
    detailURL: string;
}

const ROW_SELECTOR = "#aspnetForm > table > tbody > tr:nth-child(3) > td:nth-child(1) > table.standardTable > tbody > tr";

function parseTime(base: moment.Moment, text: string): Date {
    const time = moment(text + " Z", "HH:mm:ss Z").utc();
    time.set({
        year: base.year(),
        month: base.month(),
        date: base.date()
    });
    return time.toDate();
}

export async function getDailyPrediction(HA: HeavensAbove, config: Partial<HAPassingConfig>): Promise<HAPassing[]> {
    const time = moment(config.time).utc();
    const monthString = time.format("MMMM YYYY");
    const doc1 = await getDocument(toRequestConfig(HA, config), "/AllSats.aspx");
    let targetID: number | undefined;
    for (const el of $$(doc1, "#ctl00_cph1_TimeSelectionControl1_comboMonth > option")) {
        if ($text(el) === monthString) {
            targetID = $number($attr("value", el));
            break;
        }
    }
    if (targetID === undefined) {
        throw new Error("Time is too far from now");
    }
    const _data = {
        period: "PM",
        minBrightness: 3,
        ...config
    };
    const data = {
        ctl00$cph1$TimeSelectionControl1$comboMonth: targetID,
        ctl00$cph1$TimeSelectionControl1$comboDay: time.date(),
        ctl00$cph1$TimeSelectionControl1$radioAMPM: _data.period === "morning" ? "AM" : "PM",
        ctl00$cph1$radioButtonsMag: _data.minBrightness.toFixed(1)
    };
    const doc2 = await postDocument(toRequestConfig(HA, config), "/AllSats.aspx", data);
    return $$(doc2, ROW_SELECTOR).map((el) => ({
        satellite: $text(el, ":nth-child(1)"),
        brightness: $number($text(el, ":nth-child(2)")),
        start: {
            name: "Start",
            time: parseTime(time, $text(el, ":nth-child(3)")),
            altitude: $number($text(el, ":nth-child(4)")),
            azimuth: $fuzzyAzimuth($text(el, ":nth-child(5)"))
        },
        highest: {
            name: "Highest point",
            time: parseTime(time, $text(el, ":nth-child(6)")),
            altitude: $number($text(el, ":nth-child(7)")),
            azimuth: $fuzzyAzimuth($text(el, ":nth-child(8)"))
        },
        end: {
            name: "End",
            time: parseTime(time, $text(el, ":nth-child(9)")),
            altitude: $number($text(el, ":nth-child(10)")),
            azimuth: $fuzzyAzimuth($text(el, ":nth-child(11)"))
        },
        detailURL: $attr("href", el, ":nth-child(6) > a")
    }));
}
