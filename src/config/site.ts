// properties of type
type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "Adu Dev MDX Blog",
  description:
    "An Open source prototype Technical Blog platform with Next.js 15 with shadcn/ui, prisma and markdown support.",
  url: "https://next-mdx-blog-adudev.vercel.app",
  ogImage: "",
  links: {
    twitter: "https://twitter.com/herman_adu",
    github: "https://github.com/herman_adu",
  },
};
