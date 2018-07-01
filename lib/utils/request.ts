import "source-map-support/register";

import { stringify } from "querystring";
import { Readable } from "stream";

import axios from "axios";
import { JSDOM } from "jsdom";

import HeavensAbove from "..";

import { HARequestConfig } from ".";

const viewstate: string = "";

function parseDocument(text: string): Document {
    return new JSDOM(text).window.document;
}

export async function getDocument(config: HARequestConfig, url: string): Promise<Document> {
    // tslint:disable-next-line no-any
    const response = await axios.get<string>(url, {
        baseURL: config.HOST,
        responseType: "text",
        params: {
            tz: "UCT",
            ...config
        },
        headers: {
            Cookie: "userInfo=cul=" + config.cul
        }
    });
    return parseDocument(response.data);
}

export async function postDocument(config: HARequestConfig, url: string, data: object): Promise<Document> {
    // tslint:disable-next-line no-any
    const _data = stringify({
        __VIEWSTATE: viewstate,
        ...data
    });
    const response = await axios.post<string>(url, _data, {
        baseURL: config.HOST,
        responseType: "text",
        params: {
            tz: "UCT",
            ...config
        },
        headers: {
            Cookie: "userInfo=cul=" + config.cul,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
    return parseDocument(response.data);
}

export async function getImageStream(HA: HeavensAbove, url: string): Promise<Readable> {
    const response = await axios.get<Readable>(url, {
        baseURL: HA.HOST,
        responseType: "stream"
    });
    return response.data;
}
