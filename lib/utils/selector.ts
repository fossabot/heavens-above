// tslint:disable function-name

import "source-map-support/register";

import * as assert from "assert";

export function $(root: NodeSelector, selector: string): Element {
    const element = root.querySelector(selector);
    assert(element !== null);
    return <Element>element;
}

export function $$(root: NodeSelector, selector: string): Element[] {
    return Array.from(root.querySelectorAll(selector));
}

export function $text(element: Node): string;
export function $text(element: NodeSelector, selector: string): string;
export function $text(element: Node | NodeSelector, selector?: string): string {
    const node = selector === undefined ? <Node>element : $(<NodeSelector>element, selector);
    const text = node.textContent;
    assert(typeof text === "string");
    return <string>text;
}

export function $attr(attribute: string, element: Element): string;
export function $attr(attribute: string, element: NodeSelector, selector: string): string;
export function $attr(attribute: string, element: Element | NodeSelector, selector?: string): string {
    const node = selector === undefined ? <Element>element : $(<NodeSelector>element, selector);
    const attr = node.getAttribute(attribute);
    assert(typeof attr === "string");
    return <string>attr;
}
