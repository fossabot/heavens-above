import "source-map-support/register";

import { Readable } from "stream";

import {
    getLanguageList,
    getSkyChartURL,
    HALanguage,
    HASkyChartConfig
} from "./module";

import {
    getImageStream,
    HAConfig,
    HARawConfig,
    toRawConfig
} from "./utils";

export {
    HAConfig,
    HASkyChartConfig,
    HALanguage
};

/**
 * The HeavensAbove class.
 */
export class HeavensAbove implements HAConfig {

    public readonly HOST: string = "https://www.heavens-above.com/";

    public readonly _config: HARawConfig = {
        lat: 0,
        lng: 0,
        alt: 0,
        cul: "en"
    };

    public readonly _languageList: HALanguage[] = [];

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
     * ID of the default language. Only useful in specific APIs. **Default:** `"en"`
     */
    public get language(): string {
        return this._config.cul;
    }
    public set language(value: string) {
        this._config.cul = value;
    }

    /**
     * Get avaliable language list.
     * @returns List of Avaliable languages.
     */
    public async getLanguageList(): Promise<HALanguage[]> {
        return getLanguageList(this);
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

}

export default HeavensAbove;
