/**
 * Describes right ascension.
 */
export interface RightAscension {

    /**
     * Hour part of the right ascension.
     */
    hour: number;

    /**
     * Minute part of the right ascension.
     */
    minute: number;

    /**
     * Second part of the right ascension.
     */
    second: number;
}

/**
 * Describes declination.
 */
export interface Declination {

    /**
     * Degree part of the declination.
     */
    degree: number;

    /**
     * Minute part of the declination.
     */
    minute: number;

    /**
     * Second part of the declination.
     */
    second: number;
}
/**
 * Basic event including name and time.
 */
export interface Event {

    /**
     * Name of the event.
     */
    name: string;

    /**
     * Time of the event.
     */
    time: Date;
}

/**
 * Event with distance info.
 */
export interface DistanceEvent extends Event {

    /**
     * Distance of the event (km).
     */
    distance: number;
}

/**
 * Basic position with altitude and azimuth.
 */
export interface Position {

    /**
     * Altitude of the position (degree).
     */
    altitude: number;

    /**
     * Azimuth of the position (degree).
     */
    azimuth: number;
}

/**
 * Position including more data.
 */
export interface ExPosition extends Position {

    /**
     * Right ascension of the position.
     */
    rightAscension: RightAscension;

    /**
     * Declination of the position.
     */
    declination: Declination;

    /**
     * Range (distance) of the position (in AU if not specified).
     */
    range: number;

    /**
     * The constellation whick the position belongs to.
     */
    constellation: string;
}

/**
 * Event including position.
 */
export interface PositionEvent extends Event, Position {}

/**
 * Fuzzy azimuth. One of `"N"`, `"NNE"`, `"NE"`, `"ENE"`, `"E"`, `"ESE"`, `"SE"`, `"SSE"`, `"S"`, `"SSW"`, `"SW"`, `"WSW"`, `"W"`, `"WNW"`, `"NW"`, `"NNW"`
 */
export type FuzzyAzimuth = "N" | "NNE" | "NE" | "ENE" | "E" | "ESE" | "SE" | "SSE" | "S" | "SSW" | "SW" | "WSW" | "W" | "WNW" | "NW" | "NNW";

/**
 * Basic fuzzy position including altitude and fuzzy azimuth.
 */
export interface FuzzyPosition {

    /**
     * Altitude of the position.
     */
    altitude: number;

    /**
     * Azimuth of the position.
     */
    azimuth: FuzzyAzimuth;
}

/**
 * Event including fuzzy position.
 */
export interface FuzzyEvent extends Event, FuzzyPosition {}
