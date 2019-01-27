// tslint:disable function-name

import "source-map-support/register";

export function $(root: NodeSelector, selector: string): Element {
    return <Element>root.querySelector(selector);
}

export function $$(root: NodeSelector, selector: string): Element[] {
    return Array.from(root.querySelectorAll(selector));
}

export function $text(element: Node): string;
export function $text(element: NodeSelector, selector: string): string;
export function $text(element: Node | NodeSelector, selector?: string): string {
    const node = selector === undefined ? <Node>element : $(<NodeSelector>element, selector);
    return <string>node.textContent;
}

export function $attr(attribute: string, element: Element): string;
export function $attr(attribute: string, element: NodeSelector, selector: string): string;
export function $attr(attribute: string, element: Element | NodeSelector, selector?: string): string {
    const node = selector === undefined ? <Element>element : $(<NodeSelector>element, selector);
    return <string>node.getAttribute(attribute);
}
