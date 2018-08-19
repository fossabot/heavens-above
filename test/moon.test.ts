import "mocha";
import "source-map-support/register";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let ha: HeavensAbove;

describe("Moon", function (): void {

    before(function (): void {
        ha = new HeavensAbove();
    });

    it("Should be able to get moon info without config", async function (): Promise<void> {
        await ha.getMoonInfo();
    });

    it("Should be able to get moon info with config", async function (): Promise<void> {
        await ha.getMoonInfo({
            time: new Date("2018-07-01T18:00:00+0800")
        });
    });

});
