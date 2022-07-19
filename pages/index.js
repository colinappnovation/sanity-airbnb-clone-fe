import { PortableText } from "@portabletext/react";
import client from "../lib/client";
import { getHero } from "../lib/queries";
import Image from "next/image";
import { urlFor } from "../utils/image";
import Link from "next/link";


const myPortableTextComponents = {
  types: {
    listingBlock: ({ value }) => {
      return (
        <div className="no-prose">
          <div>Icon: {value.icon}</div>
          <div>Icon Size: {value.iconSize}</div>
          {value.body && <PortableText value={value.body} />}
        </div>
      )
    },
  },
}

// index.js
const Index = ({ hero }) => {
  return (
    <div className="prose">
      <div>
        <Image
          src={urlFor(hero.image, client).width(800).height(400).url()}
          width={800}
          height={400}
          layout="responsive"
        />
        <h1>{hero.title}</h1>
        <h2>{hero.subTitle}</h2>
        {hero.text && <PortableText value={hero.text} components={myPortableTextComponents} />}
        {hero.buttons && (<div>
          {hero.buttons.map(b => {
            return <Link href={b.url}><a>{b.linkText}</a></Link>
          })}
        </div>)}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const hero = await client.fetch(getHero);
  return {
    props: {
      hero: hero[0] || null,
    },
  }
}

export default Index;
