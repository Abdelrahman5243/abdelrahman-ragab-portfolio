import { useTranslation } from "react-i18next";

const useProjectTranslations = () => {
  const { t } = useTranslation();

  return {
    categories: {
      reactjs: t("projects.categories.reactjs"),
      htmlCss: t("projects.categories.htmlCss"),
      javascript: t("projects.categories.javascript"),
    },
    projectTitles: {
      reactProject: t("projects.projectTitles.reactProject"),
      reactCssProject: t("projects.projectTitles.reactCssProject"),
      cssProject: t("projects.projectTitles.cssProject"),
      jsProject: t("projects.projectTitles.jsProject"),
    },
    descriptions: {
      reactProject: t("projects.descriptions.reactProject"),
      reactCssProject: t("projects.descriptions.reactCssProject"),
      cssProject: t("projects.descriptions.cssProject"),
      jsProject: t("projects.descriptions.jsProject"),
    },
  };
};

export default useProjectTranslations;
