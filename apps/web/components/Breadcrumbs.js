import Link from "next/link";
import { sitePath } from "../lib/site";

export function Breadcrumbs({ items }) {
  const crumbs = [{ label: "Home", href: "/" }, ...items].filter((item) => item?.label && item?.href);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: sitePath(item.href),
    })),
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((item, index) => (
            <li key={item.href}>
              {index === crumbs.length - 1 ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
