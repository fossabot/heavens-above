// tslint:disable function-name

import "source-map-support/register";

import assert from "assert";

import {
    Declination,
    FuzzyAzimuth,
    RightAscension
} from ".";

export function $number(text: string): number {
    return Number.parseFloat(text.replace(/,/g, ""));
}

export function $ra(text: string): RightAscension {
    const match = <RegExpMatchArray>text.match(/(?:-)?\d+/g);
    assert(match !== null);
    assert(match[0] !== undefined);
    assert(match[1] !== undefined);
    assert(match[2] !== undefined);
    return {
        hour: $number(match[0]),
        minute: $number(match[1]),
        second: $number(match[2])
    };
}

export function $declination(text: string): Declination {
    const match = <RegExpMatchArray>text.match(/(?:-)?\d+/g);
    assert(match !== null);
    assert(match[0] !== undefined);
    assert(match[1] !== undefined);
    assert(match[2] !== undefined);
    return {
        degree: $number(match[0]),
        minute: $number(match[1]),
        second: $number(match[2])
    };
}

export function $fuzzyAzimuth(text: string): FuzzyAzimuth {
    assert([
        "N",
        "NNE",
        "NE",
        "ENE",
        "E",
        "ESE",
        "SE",
        "SSE",
        "S",
        "SSW",
        "SW",
        "WSW",
        "W",
        "WNW",
        "NW",
        "NNW"
    ].includes(text));
    return <FuzzyAzimuth>text;
}
