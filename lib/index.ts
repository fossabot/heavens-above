import "source-map-support/register";

import { Readable } from "stream";

import {
    getDailyPrediction,
    getMoonInfo,
    getSkyChartURL,
    getSunInfo,
    MinBrightness,
    MoonAppearance,
    MoonInfo,
    Passing,
    PassingConfig,
    PassingPeriod,
    SkyChartConfig,
    SunInfo
} from "./module";

import {
    Config,
    Declination,
    DistanceEvent,
    Event,
    ExPosition,
    getImageStream,
    Position,
    PositionEvent,
    RawConfig,
    RightAscension,
    TimeConfig,
    toRawConfig
} from "./utils";

export {
    Config,
    Declination,
    DistanceEvent,
    Event,
    ExPosition,
    MinBrightness,
    MoonAppearance,
    MoonInfo,
    Position,
    Passing,
    PassingConfig,
    PassingPeriod,
    PositionEvent,
    RightAscension,
    SkyChartConfig,
    SunInfo,
    TimeConfig
};

/**
 * The HeavensAbove class.
 */
export class HeavensAbove implements Config {

    public readonly _config: RawConfig = {
        lat: 0,
        lng: 0,
        alt: 0
    };

    /**
     * Create a HeavensAbove instance with an optional default config.
     * @param config Default config for each API. **Default:** `{}`
     */
    public constructor(config: Partial<Config> = {}) {
        this.setConfig(config);
    }

    /**
     * Set default config.
     * @param config New default config.
     */
    public setConfig(config: Partial<Config>): void {
        Object.assign(this._config, toRawConfig(config));
    }

    /**
     * Latitude of the default observation location (degree). **Default:** `0`
     */
    public get latitude(): number {
        return this._config.lat;
    }
    public set latitude(value: number) {
        this._config.lat = value;
    }

    /**
     * Longtitude of the default observation location (degree). **Default:** `0`
     */
    public get longtitude(): number {
        return this._config.lng;
    }
    public set longtitude(value: number) {
        this._config.lng = value;
    }

    /**
     * Elevation of the default observation location (meter). **Default:** `0`
     */
    public get elevation(): number {
        return this._config.alt;
    }
    public set elevation(value: number) {
        this._config.alt = value;
    }

    /**
     * Get PNG image stream from url.
     * @param url URL of the image.
     * @returns PNG image stream from url.
     */
    public async getImageStream(url: string): Promise<Readable> {
        return getImageStream(this, url);
    }

    /**
     * Get sky chart URL by config.
     * @param config Config to get the sky chart. **Default:** `{}`
     * @returns Sky chart image URL.
     */
    public async getSkyChartURL(config: Partial<SkyChartConfig> = {}): Promise<string> {
        return getSkyChartURL(this, config);
    }

    /**
     * Get sun information by config.
     * @param config Config of observing location and time. **Default:** `{}`
     * @returns Sun information.
     */
    public async getSunInfo(config: Partial<TimeConfig> = {}): Promise<SunInfo> {
        return getSunInfo(this, config);
    }

    /**
     * Get moon information by config.
     * @param config Config of observing location and time. **Default:** `{}`
     * @returns Moon information.
     */
    public async getMoonInfo(config: Partial<TimeConfig> = {}): Promise<MoonInfo> {
        return getMoonInfo(this, config);
    }

    /**
     * Get daily passing prediction by config.
     * @param config Config to get daily passing prediction. **Default:** `{}`
     * @returns Daily passing prediction list.
     */
    public async getDailyPrediction(config: Partial<PassingConfig> = {}): Promise<Passing[]> {
        return getDailyPrediction(this, config);
    }

}

export default HeavensAbove;
