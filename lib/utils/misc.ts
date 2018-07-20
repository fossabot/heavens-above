import "source-map-support/register";

import { Moment } from "moment";

export function getCheckboxValue(value: boolean): string | undefined {
    return value ? "on" : undefined;
}

// tslint:disable-next-line typedef
export function getTimeData(time: Moment) {
    return {
        ctl00$cph1$TimeSelectionControl1$comboYear: time.year(),
        ctl00$cph1$TimeSelectionControl1$comboMonth: time.month() + 1,
        ctl00$cph1$TimeSelectionControl1$comboDay: time.date(),
        ctl00$cph1$TimeSelectionControl1$txtTime: time.format("HH:mm:ss")
    };
}
