// tslint:disable function-name

import "source-map-support/register";

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
    return {
        hour: $number(match[0]),
        minute: $number(match[1]),
        second: $number(match[2])
    };
}

export function $declination(text: string): Declination {
    const match = <RegExpMatchArray>text.match(/(?:-)?\d+/g);
    return {
        degree: $number(match[0]),
        minute: $number(match[1]),
        second: $number(match[2])
    };
}

export function $fuzzyAzimuth(text: string): FuzzyAzimuth {
    return <FuzzyAzimuth>text;
}
