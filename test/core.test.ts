import "mocha";
import "source-map-support/register";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression

let ha: HeavensAbove;

describe("Core", function (): void {

    it("Should be able to create class", function (): void {
        ha = new HeavensAbove();
        ha = new HeavensAbove({
            lat: 116,
            lng: 40
        });
    });

    it("Should be able to set config", function (): void {
        ha.config = {
            lat: 116,
            lng: 40,
            alt: 50
        };
    });

    it("Should be able to read/write config by getter/setter", function (): void {
        ha.lat = ha.lat;
        ha.lng = ha.lng;
        ha.alt = ha.alt;
    });

    it("Should be able to get image stream", async function (): Promise<void> {
        await ha.getImageStream("/");
    });

});
