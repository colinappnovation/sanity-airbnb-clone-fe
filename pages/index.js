import { PortableText } from "@portabletext/react";
import client from "../lib/client";
import { getHero } from "../lib/queries";
import Image from "next/image";
import { urlFor } from "../utils/image";
import Link from "next/link";

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
        {hero.text && <PortableText value={hero.text} />}
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
