import "mocha";
import "source-map-support/register";

import * as assert from "assert";
import { Readable } from "stream";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression

let HA: HeavensAbove;

describe("Core", function (): void {

    it("Should be able to create class", function (): void {
        HA = new HeavensAbove();
        HA = new HeavensAbove({
            latitude: 116,
            longtitude: 40,
            language: "zh"
        });
    });

    it("Should be able to set config", function (): void {
        HA.setConfig({
            latitude: 116,
            longtitude: 40,
            language: "zh"
        });
    });

    it("Should be able to r/w config by getter/setter", function (): void {
        HA.latitude = HA.latitude;
        HA.longtitude = HA.longtitude;
        HA.elevation = HA.elevation;
        HA.language = HA.language;
    });

    it("Should be able to get image stream", async function (): Promise<void> {
        const stream = await HA.getImageStream("/");
        assert(stream instanceof Readable);
    });

});
