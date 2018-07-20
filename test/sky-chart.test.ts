import "mocha";
import "source-map-support/register";

import * as assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

const HA = new HeavensAbove();

describe("Sky Chart", function (): void {

    it("Should be able to get sky chart URL (first time)", async function (): Promise<void> {
        const url = await HA.getSkyChartURL();
        assert(typeof url === "string" && url.length > 0);
    });

    it("Should be able to get sky chart URL (not first time)", async function (): Promise<void> {
        const url = await HA.getSkyChartURL({
            time: new Date("2018-07-01T18:00:00+0800"),
            language: "en",
            constellationNames: false,
            colored: false,
            size: 600
        });
        assert(typeof url === "string" && url.length > 0);
    });

});
