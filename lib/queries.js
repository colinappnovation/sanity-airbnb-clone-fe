import groq from "groq";

const getPropertyBySlug = groq`*[_type == "property" && slug.current == $slug][0]{
    title,
    categories[]->{title, _id},
    price,
    desc,
    mainImage,
    features[]->{title, _id},
    gallery[],
  }`;

const getPropertyPaths = groq`*[_type == "property" && defined(slug.current)][].slug.current`;

const getHero = groq`*[_type=='hero']{ ..., buttons[]->{ url, linkText, type}}`

export { getPropertyBySlug, getPropertyPaths, getHero };
