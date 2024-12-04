import { Country, FlagData, PixabayImage, JsonDataType } from "src/types/types";
import { PIXABAY_URL, PIXABAY_KEY, REST_COUNTRIES } from "src/../config";

export const processFlags = (flagsData: FlagData[]): Record<string, string> => {
  const flagsObj: Record<string, string> = {};
  flagsData.forEach((flagData) => {
    flagsObj[flagData.flag] = flagData.flags.png;
  });
  return flagsObj;
};

export const processImages = (
  countries: Country[],
  images: PixabayImage[],
  flagsObj: Record<string, string>
): Country[] => {
  return countries.map((country, index) => {
    const imageData = images[index];
    const imageUrl =
      imageData?.hits?.length > 0
        ? imageData.hits[0].webformatURL
        : flagsObj[country.emoji];

    return { ...country, imageUrl, flag: flagsObj[country.emoji] };
  });
};

export const fetchPixabayAndFlags = async (
  countries: Country[]
): Promise<{ countriesWithImages: Country[] }> => {
  const urls = countries.map(
    (v) =>
      `${PIXABAY_URL}/?key=${PIXABAY_KEY}&q=${encodeURIComponent(
        v.name
      )}&image_type=photo`
  );
  urls.push(REST_COUNTRIES);

  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const jsonData = (await Promise.all(
    responses.map((res) => res.json())
  )) as JsonDataType;

  const images = jsonData.slice(0, -1) as PixabayImage[];
  const flagsData = jsonData[jsonData.length - 1] as FlagData[];
  const flagsObj = processFlags(flagsData);

  return {
    countriesWithImages: processImages(countries, images, flagsObj),
  };
};
