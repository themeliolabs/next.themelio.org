import { page } from "$app/stores";
import { derived, Readable } from "svelte/store";

export enum Language {
  EN_US = "en-US",
  ZH_TW = "zh-TW",
  ZH_CN = "zh-CN",
}
export type Obj<T> = { [key: string]: T };
type l10nLoader = (a: Obj<string>, b: Language) => (c: string) => string;

export const l10nLoad: l10nLoader = (mapping, lang) => (name: string) => {
  // console.log(lang, name, mapping[name][lang]);
  try {
    let value = mapping[name][lang];
    if (value == "empty") throw Error;
    return value;
  } catch (e) {
    return undefined;
  }
};

export const lang: Readable<string> = derived(page, (p) => {
  let param: string | undefined = p.params.lang;
  return param ? param : "en";
});
