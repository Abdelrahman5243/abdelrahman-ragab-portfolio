import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import ProjectCard from "./ProjectCard";

const RelatedProjects = ({ currentId }) => {
  const { t, i18n } = useTranslation("main");
  const scrollerRef = useRef(null);
  const dragState = useRef({ isDown: false, startX: 0, startScroll: 0, moved: false });
  const projectsData = t("projects", { returnObjects: true });

  const all = Object.keys(projectsData).map((pid) => ({ id: pid, ...projectsData[pid] }));
  const current = all.find((p) => p.id === currentId);
  const others = all.filter((p) => p.id !== currentId);

  const sameCategory = others.filter((p) => p.categories === current?.categories);
  const rest = others.filter((p) => p.categories !== current?.categories);
  const related = [...sameCategory, ...rest].slice(0, 6);

  if (related.length === 0) return null;

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-related-card]");
    const cardWidth = card ? card.getBoundingClientRect().width + 20 : 300;
    const isRtl = i18n.language === "ar";
    const delta = isRtl ? -direction : direction;
    el.scrollBy({ left: delta * cardWidth, behavior: "smooth" });
  };

  const onPointerDown = (e) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    const el = scrollerRef.current;
    const state = dragState.current;
    if (!el || !state.isDown) return;
    const delta = e.clientX - state.startX;
    if (Math.abs(delta) > 3) state.moved = true;
    el.scrollLeft = state.startScroll - delta;
  };

  const endDrag = () => {
    dragState.current.isDown = false;
  };

  const onClickCapture = (e) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
    dragState.current.moved = false;
  };

  return (
    <div className="mt-16 sm:mt-20">
      <div className="flex items-center justify-between gap-4 mb-6 px-2 sm:px-4">
        <div className="flex items-center gap-3">
          <Layers className="text-light-blue dark:text-dark-blue" aria-hidden="true" size={24} />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-light-title dark:text-dark-title">
            {t("relatedProjects", "More Projects")}
          </h2>
        </div>

        <div className="hidden sm:flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-secondary/80 dark:bg-dark-secondary/80 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-200"
            aria-label={t("previous", "Previous")}
          >
            {i18n.language === "ar" ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-light-border dark:border-dark-border bg-light-secondary/80 dark:bg-dark-secondary/80 hover:border-light-blue/60 dark:hover:border-dark-blue/60 transition-colors duration-200"
            aria-label={t("next", "Next")}
          >
            {i18n.language === "ar" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex gap-5 overflow-x-auto pb-2 px-2 sm:px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide cursor-grab active:cursor-grabbing select-none"
      >
        {related.map((project) => (
          <div
            key={project.id}
            data-related-card
            className="flex-shrink-0 snap-start w-[260px] xs:w-[280px] sm:w-[300px] lg:w-[320px]"
          >
            <ProjectCard id={project.id} project={project} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;
