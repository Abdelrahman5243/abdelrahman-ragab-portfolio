import { Helmet } from "react-helmet-async";

const SITE_URL = "https://abdelrahman-ragab-portfolio-ten.vercel.app";
const DEFAULT_IMAGE = `${SITE_URL}/og_image.jpg`;

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
