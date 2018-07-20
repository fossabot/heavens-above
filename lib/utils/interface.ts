// tslint:disable no-use-before-declare

/**
 * Event with distance info.
 */
export interface HADistanceEvent extends HAEvent {

    /**
     * Distance of event (in km).
     */
    distance: number;
}

/**
 * Event with name and time.
 */
export interface HAEvent {

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
 * Position with altitude and azimuth.
 */
export interface HAPosition {

    /**
     * Altitude of the position.
     */
    altitude: number;

    /**
     * Azimuth of the position.
     */
    azimuth: number;
}

/**
 * Position with more data.
 */
export interface HAExPosition extends HAPosition {

    /**
     * Right ascension of the position.
     */
    rightAscension: HARightAscension;

    /**
     * Declination of the position.
     */
    declination: HADeclination;

    /**
     * Range (distance) of the position.
     */
    range: number;

    /**
     * The constellation whick the position belongs to.
     */
    constellation: string;
}

/**
 * Event with position info.
 */
export interface HAPositionEvent extends HAEvent, HAPosition {}

/**
 * Right ascension.
 */
export interface HARightAscension {

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
 * Declination.
 */
export interface HADeclination {

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
