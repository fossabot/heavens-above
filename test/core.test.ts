import "mocha";
import "source-map-support/register";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression

let ha: HeavensAbove;

describe("Core", function (): void {

    it("Should be able to create class", function (): void {
        ha = new HeavensAbove();
        ha = new HeavensAbove({
            latitude: 116,
            longtitude: 40
        });
    });

    it("Should be able to set config", function (): void {
        ha.setConfig({
            latitude: 116,
            longtitude: 40
        });
    });

    it("Should be able to read/write config by getter/setter", function (): void {
        ha.latitude = ha.latitude;
        ha.longtitude = ha.longtitude;
        ha.elevation = ha.elevation;
    });

    it("Should be able to get image stream", async function (): Promise<void> {
        await ha.getImageStream("/");
    });

});
