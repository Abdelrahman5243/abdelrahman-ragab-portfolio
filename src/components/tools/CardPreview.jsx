import { cardAt } from "../../utils/cardImage";
import { CARD_ORIGIN, THUMBS_PER_SET, THUMB_SIZE } from "./constants";

const thumbUrl = (title, variant) =>
  cardAt(`${CARD_ORIGIN}/og?title=${encodeURIComponent(title)}&variant=${variant}`, THUMB_SIZE);

// A row of real cards from the Seeded Cards service: one title, several variants.
const CardPreview = ({ title, set }) => {
  const firstVariant = set * THUMBS_PER_SET + 1;

  return (
    <div dir="ltr" className="grid grid-cols-3 gap-2">
      {Array.from({ length: THUMBS_PER_SET }, (_, i) => {
        const variant = firstVariant + i;
        return (
          <img
            key={variant}
            src={thumbUrl(title, variant)}
            alt=""
            width={THUMB_SIZE.w}
            height={THUMB_SIZE.h}
            loading="lazy"
            className="w-full aspect-[40/21] rounded-md object-cover border border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary"
          />
        );
      })}
    </div>
  );
};

export default CardPreview;
