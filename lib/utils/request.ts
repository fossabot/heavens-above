import "source-map-support/register";

import { stringify } from "querystring";
import { Readable } from "stream";

import axios from "axios";
import { JSDOM } from "jsdom";

import HeavensAbove from "..";

import {
    $attr,
    HARawConfig
} from ".";

const viewstate = new Map<string, string>();

function parseDocument(text: string, url: string): Document {
    const document = new JSDOM(text).window.document;
    viewstate.set(url, $attr("value", document, "#__VIEWSTATE"));
    return document;
}

export async function getDocument(config: HARawConfig, url: string): Promise<Document> {
    const response = await axios.get<string>(url, {
        baseURL: "https://www.heavens-above.com/",
        responseType: "text",
        params: {
            tz: "UCT",
            ...config
        },
        headers: {
            Cookie: "userInfo=cul=en"
        }
    });
    return parseDocument(response.data, url);
}

export async function postDocument(config: HARawConfig, url: string, data: object): Promise<Document> {
    if (viewstate.has(url) === false) {
        await getDocument(config, url);
    }
    const _data = stringify({
        __VIEWSTATE: viewstate.get(url),
        ...data
    });
    const response = await axios.post<string>(url, _data, {
        baseURL: "https://www.heavens-above.com/",
        responseType: "text",
        params: {
            tz: "UCT",
            ...config
        },
        headers: {
            Cookie: "userInfo=cul=en",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return parseDocument(response.data, url);
}

export async function getImageStream(HA: HeavensAbove, url: string): Promise<Readable> {
    const response = await axios.get<Readable>(url, {
        baseURL: "https://www.heavens-above.com/",
        responseType: "stream"
    });
    return response.data;
}
