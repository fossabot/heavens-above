import "mocha";
import "source-map-support/register";

import * as assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let HA: HeavensAbove;

describe("Daily prediction", function (): void {

    before(function (): void {
        HA = new HeavensAbove();
    });

    it("Should be able to get daily prediction without config", async function (): Promise<void> {
        await HA.getDailyPrediction();
    });

    it("Should be able to get daily prediction with config", async function (): Promise<void> {
        await HA.getDailyPrediction({
            time: new Date("2018-07-01"),
            period: "morning",
            minBrightness: 5
        });
    });

    it("Should fail to get daily prediction with far away date", async function (): Promise<void> {
        try {
            await HA.getDailyPrediction({
                time: new Date("1949-10-01")
            });
            assert(false);
        } catch {}
    });

});
