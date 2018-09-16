import "mocha";
import "source-map-support/register";

import assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let ha: HeavensAbove;

describe("Daily prediction", function (): void {

    before(function (): void {
        ha = new HeavensAbove();
    });

    it("Should be able to get daily prediction without config", async function (): Promise<void> {
        await ha.getDailyPrediction();
    });

    it("Should be able to get daily prediction with config", async function (): Promise<void> {
        await ha.getDailyPrediction({
            time: new Date("2018-07-01"),
            period: "morning",
            minBrightness: 5
        });
    });

    it("Should fail to get daily prediction with far away date", async function (): Promise<void> {
        try {
            await ha.getDailyPrediction({
                time: new Date("1949-10-01")
            });
            assert(false);
        } catch {}
    });

});
