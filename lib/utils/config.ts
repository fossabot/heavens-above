import "source-map-support/register";

import HeavensAbove from "..";

/**
 * Base config including observation location params.
 */
export interface Config {

    /**
     * Latitude of the observation location (degree). **Default:** `0`
     */
    lat: number;

    /**
     * Longitude of the observation location (degree). **Default:** `0`
     */
    lng: number;

    /**
     * Elevation of the observation location (meter). **Default:** `0`
     */
    alt: number;
}

/**
 * Config including observation time.
 */
export interface TimeConfig extends Config {

    /**
     * Observation time. **Default:** `new Date()`
     */
    time: Date;
}

export function purifyObject<T>(obj: Partial<T>): Partial<T> {
    for (const key of Object.keys(obj)) {
        // tslint:disable-next-line no-any
        if ((<any>obj)[key] === undefined) {
            // tslint:disable-next-line no-any no-dynamic-delete
            delete (<any>obj)[key];
        }
    }
    return obj;
}

export function toRequestConfig<T extends Config>(ha: HeavensAbove, config: Partial<T>): Config {
    return {...ha.config, ...config};
}
