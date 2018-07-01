import "source-map-support/register";

import HeavensAbove from "..";

export interface HARawConfig {
    lat: number;
    lng: number;
    alt: number;
    cul: string;
}

export interface HARequestConfig extends HARawConfig {
    HOST: string;
}

/**
 * Base configs
 */
export interface HAConfig {

    /**
     * Latitude of the observation location (in degrees). **Default:** `0`
     */
    latitude: number;

    /**
     * Longitude of the observation location (in degrees). **Default:** `0`
     */
    longtitude: number;

    /**
     * Elevation of the observation location (in meters). **Default:** `0`
     */
    elevation: number;

    /**
     * ID of the selected language. Only available in specific APIs. **Default:** `"en"`
     */
    language: string;
}

export function purifyObject<T>(obj: Partial<T>): Partial<T> {
    for (const key of Object.keys(obj)) {
        // tslint:disable-next-line no-any
        if ((<any>obj)[key] === undefined) {
            // tslint:disable-next-line no-any
            delete (<any>obj)[key];
        }
    }
    return obj;
}

export function toRawConfig(config: Partial<HAConfig>): Partial<HARawConfig> {
    return purifyObject({
        lat: config.latitude,
        lng: config.longtitude,
        alt: config.elevation,
        cul: config.language
    });
}

export function toRequestConfig<T extends HAConfig>(HA: HeavensAbove,
                                                    config: Partial<T> = {},
                                                    i18n: boolean = false): HARequestConfig {
    // tslint:disable-next-line:no-any
    const _config: Partial<T> = {...<any>config};
    const result = {
        HOST: HA.HOST,
        ...HA._config,
        ...toRawConfig(_config)
    };
    delete _config.latitude;
    delete _config.longtitude;
    delete _config.elevation;
    delete _config.language;
    // tslint:disable-next-line:no-any
    Object.assign(result, purifyObject(_config));
    if (!i18n) {
        result.cul = "en";
    }
    return result;
}
