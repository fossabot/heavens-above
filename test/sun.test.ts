import "mocha";
import "source-map-support/register";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let HA: HeavensAbove;

describe("Sun", function (): void {

    before(function (): void {
        HA = new HeavensAbove();
    });

    it("Should be able to get sun info without config", async function (): Promise<void> {
        await HA.getSunInfo();
    });

    it("Should be able to get sun info with config", async function (): Promise<void> {
        await HA.getSunInfo({
            time: new Date("2018-07-01T18:00:00+0800")
        });
    });

});
