import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Wrench } from "lucide-react";
import { sectionHeaderVariants } from "../../animations/variants";
import ToolCard from "./ToolCard";

const ToolsStrip = () => {
  const { t } = useTranslation("main");
  const tools = t("tools", { returnObjects: true });

  if (!Array.isArray(tools?.items) || tools.items.length === 0) return null;

  return (
    <section id="tools" className="my-16 w-full" aria-labelledby="tools-title">
      <motion.div
        className="flex gap-3 items-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionHeaderVariants}
      >
        <motion.div
          className="relative"
          whileHover={{
            rotate: [0, -10, 10, -10, 0],
            scale: 1.1,
            transition: { duration: 0.5 },
          }}
        >
          <div className="absolute inset-0 bg-light-blue dark:bg-dark-blue opacity-15 blur-xl rounded-full" />
          <Wrench
            className="relative text-light-blue dark:text-dark-blue"
            aria-hidden="true"
            size={36}
          />
        </motion.div>
        <h2
          id="tools-title"
          className="font-bold text-2xl sm:text-3xl md:text-4xl text-light-title dark:text-dark-title"
        >
          {tools.title}
        </h2>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.items.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} labels={tools} />
        ))}
      </div>
    </section>
  );
};

export default ToolsStrip;
