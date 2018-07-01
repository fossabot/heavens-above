import "mocha";
import "source-map-support/register";

import * as assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression

describe("Sky Chart", function (): void {

    it("Should be able to get sky chart URL", async function (): Promise<void> {
        const HA = new HeavensAbove();
        const urls = await Promise.all([
            HA.getSkyChartURL(),
            HA.getSkyChartURL({
                time: new Date("2018-07-01T18:00:00+0800"),
                language: "en",
                constellationNames: false,
                colored: false,
                size: 600
            })
        ]);
        urls.forEach((url) => {
            assert(typeof url === "string" && url.length > 0);
        });
    });

});
