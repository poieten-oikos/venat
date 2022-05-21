import axios, { AxiosResponse } from 'axios';
import { LookupResult } from '@the-convocation/venat-core';

export interface XIVAPIItem {
  ID: number;
  Name: string;
  ItemSearchCategory: {
    ID: number | null;
  };
}

export interface XIVAPISearchResponse {
  Results: XIVAPIItem[];
}

export enum XIVAPILanguage {
  EN = 'en',
  JA = 'ja',
  DE = 'de',
  FR = 'fr',
}

export async function getItemIdByName(
  name: string,
  lang: XIVAPILanguage,
): Promise<LookupResult<XIVAPIItem>> {
  let res: AxiosResponse<XIVAPISearchResponse, any>;
  try {
    res = await axios.get<XIVAPISearchResponse>(
      `https://xivapi.com/search?string=${encodeURIComponent(
        name,
      )}&language=${lang}&indexes=Item&columns=ID,Name,ItemSearchCategory.ID`,
    );
  } catch (err) {
    if (!(err instanceof Error)) {
      throw err;
    }
    return { success: false, err };
  }

  const nameLower = name.toLowerCase();
  for (const item of res.data.Results) {
    if (nameLower === item.Name.toLowerCase()) {
      return { value: item, success: true };
    }
  }

  return {
    err: new Error(`The item ${name} could not be found.`),
    success: false,
  };
}
