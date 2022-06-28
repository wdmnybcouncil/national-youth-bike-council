import React from "react";
import Section from "../components/Section";
import PageLink from "../components/PageLink";

function PageNotFoundView() {
  return (
    <Section>
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="relative h-40 w-40 my-4 md:my-10 md:h-60 md:w-60 text-6xl md:text-8xl font-balgin text-skin-muted before:absolute before:top-0 before:left-0 before:h-40 before:w-40 md:before:h-60 md:before:w-60 before:bg-skin-fill-accent before:rounded-lg before:rotate-45 before:border-4 before:border-dashed before:border-black before:shadow-md after:absolute after:content-['404'] after:top-12 md:after:top-20 after:drop-shadow" />
        <div className="flex flex-col gap-2">
          <h2 className="relative w-full font-balgin text-2xl text-center tracking-wider text-skin-primary md:text-4xl">Page Not Found</h2>
          <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
          <div className="flex justify-center items-center">
            <PageLink type="internal" linkTo="/">Go to Home</PageLink>
          </div>
        </div>
      </div>
    </Section>
  );
}

PageNotFoundView.displayName = "PageNotFoundView";

export default PageNotFoundView;
