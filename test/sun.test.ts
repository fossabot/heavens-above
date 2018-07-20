import "mocha";
import "source-map-support/register";

import * as assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

const HA = new HeavensAbove();

describe("Sun", function (): void {

    it("Should be able to get sun info (first time)", async function (): Promise<void> {
        const data = await HA.getSunInfo();
        assert(typeof data === "object");
    });

    it("Should be able to get sun info (not first time)", async function (): Promise<void> {
        const data = await HA.getSunInfo({
            time: new Date("2018-07-01T18:00:00+0800")
        });
        assert(typeof data === "object");
    });

});
