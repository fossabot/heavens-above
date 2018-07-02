// tslint:disable function-name

import "source-map-support/register";

import * as assert from "assert";

import {
    HADeclination,
    HARightAscension
} from ".";

export function $number(text: string): number {
    return Number.parseFloat(text);
}

export function $ra(text: string): HARightAscension {
    const match = <RegExpMatchArray>text.match(/\d+/g);
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

export function $declination(text: string): HADeclination {
    const match = <RegExpMatchArray>text.match(/\d+/g);
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