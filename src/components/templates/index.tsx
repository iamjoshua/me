import PhilosophyArticle from "./PhilosophyArticle";
import MinimalArticle from "./MinimalArticle";

interface TemplateProps {
  frontmatter: Record<string, any>;
  content: string;
}

export default function Template({ frontmatter, content }: TemplateProps) {
  const template = frontmatter.template || "minimal";

  switch (template) {
    case "philosophy":
      return <PhilosophyArticle frontmatter={frontmatter} content={content} />;
    case "minimal":
      return <MinimalArticle frontmatter={frontmatter} content={content} />;
    default:
      return <MinimalArticle frontmatter={frontmatter} content={content} />;
  }
}

