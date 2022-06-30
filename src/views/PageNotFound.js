import React from "react";
import Section from "../components/Section";
import PageLink from "../components/PageLink";

function PageNotFound() {
  return (
    <div className="mt-8">
      <Section>
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="relative my-4 h-40 w-40 font-balgin text-6xl text-skin-muted before:absolute before:top-0 before:left-0 before:h-40 before:w-40 before:rotate-45 before:rounded-lg before:border-4 before:border-dashed before:border-black before:bg-skin-fill-accent before:shadow-md after:absolute after:top-12 after:drop-shadow after:content-['404'] md:my-10 md:h-60 md:w-60 md:text-8xl md:before:h-60 md:before:w-60 md:after:top-20" />
          <div className="flex flex-col gap-2">
            <h2 className="relative w-full text-center font-balgin text-2xl tracking-wider text-skin-primary md:text-4xl">Page Not Found</h2>
            <p>The page you are looking for might have been removed, had its name changed or is temporarily unavailable.</p>
            <div className="flex items-center justify-center">
              <PageLink type="internal" linkTo="/">
                Go to Home
              </PageLink>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

PageNotFound.displayName = "PageNotFound";

export default PageNotFound;
