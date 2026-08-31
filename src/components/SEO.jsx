import { Helmet } from "react-helmet-async";

const SITE_URL = "https://abdelrahman-ragab-portfolio-ten.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/og_image.jpg`;

/**
 * index.html ships a full set of Open Graph and Twitter tags so a scraper that
 * never runs JS still gets something sensible. Helmet replaces a tag only when
 * it renders one with the same identifying attribute, so every tag the static
 * head defines has to be restated here — otherwise an article page keeps the
 * site-wide image, title and canonical.
 *
 * Note this only corrects the DOM after React mounts. Classic scrapers read the
 * static HTML and still see the defaults; per-article cards in social previews
 * need the routes prerendered at build time.
 */
const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt,
  type = "website",
}) => {
  const url = `${SITE_URL}${path}`;
  const alt = imageAlt || title;
  // Seeded cards come back as PNG; the bundled fallback is a JPEG.
  const imageType = /\.jpe?g($|\?)/i.test(image) ? "image/jpeg" : "image/png";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content={imageType} />
      <meta property="og:image:alt" content={alt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={alt} />
    </Helmet>
  );
};

export default SEO;
