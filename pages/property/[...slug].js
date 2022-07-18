import client from "../../lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "../../utils/image";
import { getPropertyBySlug, getPropertyPaths } from "../../lib/queries";
import ErrorPage from "next/error";

const Property = ({ property }) => {
  if (!property) {
    return <ErrorPage statusCode={404} />;
  }

  const { title, price, desc, categories, mainImage, features, gallery } =
    property;

  return (
    <div class="md:container mt-10 md:mx-auto tracking-wide flex items-center justify-center">
      <article class="prose md:prose-lg lg:prose-xl">
        <h1 class="font-extralight tracking-tighter">
          {title}
          {price && (
            <span class="font-bold tracking-normal text-sm align-middle inline-block py-1 px-2 uppercase rounded-full text-white bg-purple-600 last:mr-0 mr-1">
              Price per night £{price}
            </span>
          )}
        </h1>
        {mainImage && (
          <div>
            <Image
              src={urlFor(mainImage, client).width(800).height(400).url()}
              width={800}
              height={400}
              layout="responsive"
            />
          </div>
        )}
        {gallery && (
          <div class="flex flex-auto w-auto h-auto">
            {gallery.map((g) => {
              return (
                <Image
                  src={urlFor(g.galleryImage, client)
                    .width(230)
                    .height(230)
                    .focalPoint(0, 0)
                    .fit("crop")
                    .url()}
                  width={230}
                  height={230}
                />
              );
            })}
          </div>
        )}

        {desc && (
          <>
            <div class="font-mono mt-5">Description</div>
            <div class="text-base">
              <PortableText value={desc} />
            </div>
          </>
        )}
        {categories && (
          <div class="not-prose mt-10">
            <div class="font-mono">Posted in</div>
            <ul class="flex list-none gap-2">
              {categories.map((category) => (
                <li
                  class="text-xs font-semibold inline-block py-1 px-2 rounded-full text-white bg-slate-500 uppercase last:mr-0 mr-1"
                  key={category._id}
                >
                  {category.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {features && (
          <div class="not-prose mt-5">
            <div class="font-mono">Features</div>
            <ul class="flex list-none gap-2">
              {features.map((feature) => (
                <li
                  class="text-xs font-semibold inline-block py-1 px-2 rounded-full text-white bg-orange-400  uppercase last:mr-0 mr-1"
                  key={feature._id}
                >
                  {feature.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = await client.fetch(getPropertyPaths);

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = "" } = params;
  const property = await client.fetch(getPropertyBySlug, {
    slug: `/property/${slug}`,
  });
  return {
    props: {
      property,
    },
  };
}

export default Property;
