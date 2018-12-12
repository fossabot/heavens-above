import "source-map-support/register";

import HeavensAbove from "..";

export interface RawConfig {
    lat: number;
    lng: number;
    alt: number;
}

/**
 * Base config including observation location params.
 */
export interface Config {

    /**
     * Latitude of the observation location (degree). **Default:** `0`
     */
    latitude: number;

    /**
     * Longitude of the observation location (degree). **Default:** `0`
     */
    longtitude: number;

    /**
     * Elevation of the observation location (meter). **Default:** `0`
     */
    elevation: number;
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

export function toRawConfig(config: Partial<Config>): Partial<RawConfig> {
    return purifyObject({
        lat: config.latitude,
        lng: config.longtitude,
        alt: config.elevation
    });
}

export function toRequestConfig<T extends Config>(ha: HeavensAbove, config: Partial<T>): RawConfig {
    // tslint:disable-next-line:no-any
    const _config: Partial<T> = {...<any>config};
    const result = {
        ...ha._config,
        ...toRawConfig(_config)
    };
    delete _config.latitude;
    delete _config.longtitude;
    delete _config.elevation;
    Object.assign(result, purifyObject(_config));
    return result;
}
