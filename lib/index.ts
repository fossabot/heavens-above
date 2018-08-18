import "source-map-support/register";

import { Readable } from "stream";

import {
    getMoonInfo,
    getSkyChartURL,
    getSunInfo,
    HAMoonAppearance,
    HAMoonInfo,
    HASkyChartConfig,
    HASunInfo
} from "./module";

import {
    getImageStream,
    HAConfig,
    HADeclination,
    HADistanceEvent,
    HAEvent,
    HAExPosition,
    HAPosition,
    HAPositionEvent,
    HARawConfig,
    HARightAscension,
    HATimeConfig,
    toRawConfig
} from "./utils";

export {
    HAConfig,
    HADeclination,
    HADistanceEvent,
    HAEvent,
    HAExPosition,
    HAMoonAppearance,
    HAMoonInfo,
    HAPosition,
    HAPositionEvent,
    HARightAscension,
    HASkyChartConfig,
    HASunInfo,
    HATimeConfig
};

/**
 * The HeavensAbove class.
 */
export class HeavensAbove implements HAConfig {

    public readonly _config: HARawConfig = {
        lat: 0,
        lng: 0,
        alt: 0
    };

    /**
     * Create a HeavensAbove with an optional default config.
     * @param config The default config to use in each API. **Default:** `{}`
     */
    public constructor(config: Partial<HAConfig> = {}) {
        this.setConfig(config);
    }

    /**
     * Set default configs in batch.
     * @param config A pack of config.
     */
    public setConfig(config: Partial<HAConfig>): void {
        Object.assign(this._config, toRawConfig(config));
    }

    /**
     * Latitude of the default observation location (in degrees). **Default:** `0`
     */
    public get latitude(): number {
        return this._config.lat;
    }
    public set latitude(value: number) {
        this._config.lat = value;
    }

    /**
     * Longtitude of the default observation location (in degrees). **Default:** `0`
     */
    public get longtitude(): number {
        return this._config.lng;
    }
    public set longtitude(value: number) {
        this._config.lng = value;
    }

    /**
     * Elevation of the default observation location (in degrees). **Default:** `0`
     */
    public get elevation(): number {
        return this._config.alt;
    }
    public set elevation(value: number) {
        this._config.alt = value;
    }

    /**
     * Get png image stream from url.
     * @param url URL of the image.
     * @returns PNG image stream from url.
     */
    public async getImageStream(url: string): Promise<Readable> {
        return getImageStream(this, url);
    }

    /**
     * Get sky chart image URL from config.
     * @param config Config of the sky chart. **Default:** `{}`
     * @returns Sky chart image URL.
     */
    public async getSkyChartURL(config: Partial<HASkyChartConfig> = {}): Promise<string> {
        return getSkyChartURL(this, config);
    }

    /**
     * Get sun info from config.
     * @param config Config of observing location and time. **Default:** `{}`
     * @returns Sun info.
     */
    public async getSunInfo(config: Partial<HATimeConfig> = {}): Promise<HASunInfo> {
        return getSunInfo(this, config);
    }

    /**
     * Get moon info from config.
     * @param config Config of observing location and time. **Default:** `{}`
     * @returns Moon info.
     */
    public async getMoonInfo(config: Partial<HATimeConfig> = {}): Promise<HAMoonInfo> {
        return getMoonInfo(this, config);
    }

}

export default HeavensAbove;
