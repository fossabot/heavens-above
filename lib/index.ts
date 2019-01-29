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
    RightAscension,
    TimeConfig
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

    public readonly config: Config;

    /**
     * Create a HeavensAbove instance with an optional default config.
     * @param config Default config for each API. **Default:** `{}`
     */
    public constructor(config: Partial<Config> = {}) {
        this.config = {
            lat: 0,
            lng: 0,
            alt: 0,
            ...config
        };
    }

    /**
     * Latitude of the default observation location (degree). **Default:** `0`
     */
    public get lat(): number {
        return this.config.lat;
    }
    public set lat(value: number) {
        this.config.lat = value;
    }

    /**
     * Longtitude of the default observation location (degree). **Default:** `0`
     */
    public get lng(): number {
        return this.config.lng;
    }
    public set lng(value: number) {
        this.config.lng = value;
    }

    /**
     * Elevation of the default observation location (meter). **Default:** `0`
     */
    public get alt(): number {
        return this.config.alt;
    }
    public set alt(value: number) {
        this.config.alt = value;
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
