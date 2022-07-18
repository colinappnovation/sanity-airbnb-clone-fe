import imageUrlBuilder from "@sanity/image-url";

const urlFor = (source, client) => {
  return imageUrlBuilder(client).image(source);
};

export { urlFor };
