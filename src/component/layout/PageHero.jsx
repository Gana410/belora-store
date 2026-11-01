import Breadcrumbs from "../common/Breadcrumbs";

/** Compact page banner: breadcrumbs, serif title and optional subtitle. */
export default function PageHero({ title, subtitle, eyebrow, breadcrumbs }) {
  return (
    <section className="page-hero">
      <div className="container">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {subtitle && <p className="page-hero__sub">{subtitle}</p>}
      </div>
    </section>
  );
}
