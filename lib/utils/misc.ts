import "source-map-support/register";

export function getCheckboxValue(value: boolean): string | undefined {
    return value ? "on" : undefined;
}
