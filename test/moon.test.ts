import "mocha";
import "source-map-support/register";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let HA: HeavensAbove;

describe("Moon", function (): void {

    before(function (): void {
        HA = new HeavensAbove();
    });

    it("Should be able to get moon info without config", async function (): Promise<void> {
        await HA.getMoonInfo();
    });

    it("Should be able to get moon info with config", async function (): Promise<void> {
        await HA.getMoonInfo({
            time: new Date("2018-07-01T18:00:00+0800")
        });
    });

});
