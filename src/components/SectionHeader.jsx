import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { sectionHeaderVariants } from "../animations/variants";

// `layout` varies each section's opener so the page doesn't read as one
// widget stamped six times: "line" keeps the eyebrow+title+rule (default),
// "aside" moves the eyebrow beside the title in a narrow column,
// "stacked" drops the connecting rule for a tighter, compact opener.
const SectionHeader = ({ id, title, eyebrow, layout = "line", trailing }) => (
  <motion.div
    className={`section-heading section-heading-${layout}`}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={sectionHeaderVariants}
  >
    {eyebrow && (
      <span className="section-heading-kicker">
        <span className="section-heading-dot" aria-hidden="true" />
        {eyebrow}
      </span>
    )}
    <div className="section-heading-row">
      <h2 id={id}>{title}</h2>
      {layout === "line" && <span className="section-heading-line" aria-hidden="true" />}
      {trailing && <div className="section-heading-trailing">{trailing}</div>}
    </div>
  </motion.div>
);

SectionHeader.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  layout: PropTypes.oneOf(["line", "aside", "stacked"]),
  trailing: PropTypes.node,
};

export default SectionHeader;
