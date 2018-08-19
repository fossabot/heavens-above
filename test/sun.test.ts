import "mocha";
import "source-map-support/register";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression mocha-no-side-effect-code

let ha: HeavensAbove;

describe("Sun", function (): void {

    before(function (): void {
        ha = new HeavensAbove();
    });

    it("Should be able to get sun info without config", async function (): Promise<void> {
        await ha.getSunInfo();
    });

    it("Should be able to get sun info with config", async function (): Promise<void> {
        await ha.getSunInfo({
            time: new Date("2018-07-01T18:00:00+0800")
        });
    });

});
