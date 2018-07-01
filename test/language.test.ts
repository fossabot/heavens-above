import "mocha";
import "source-map-support/register";

import * as assert from "assert";

import HeavensAbove from "../lib";

// tslint:disable no-function-expression

describe("Languages", function (): void {

    it("Should be able to get language list", async function (): Promise<void> {
        const HA = new HeavensAbove();
        await HA.getLanguageList();
        const languages = await HA.getLanguageList();
        assert(languages.length > 0);
        languages.forEach((lang) => {
            assert(typeof lang.id === "string" && lang.id.length > 0);
            assert(typeof lang.name === "string" && lang.name.length > 0);
        });
    });

});
