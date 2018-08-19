import "mocha";
import "source-map-support/register";

import * as assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let ha: HeavensAbove;

describe("Sky Chart", function (): void {

    before(function (): void {
        ha = new HeavensAbove();
    });

    it("Should be able to get sky chart URL without config", async function (): Promise<void> {
        const url = await ha.getSkyChartURL();
        assert(typeof url === "string" && url.length > 0);
    });

    it("Should be able to get sky chart URL with config", async function (): Promise<void> {
        const url = await ha.getSkyChartURL({
            time: new Date("2018-07-01T18:00:00+0800"),
            constellationNames: false,
            colored: false,
            size: 600
        });
        assert(typeof url === "string" && url.length > 0);
    });

});
