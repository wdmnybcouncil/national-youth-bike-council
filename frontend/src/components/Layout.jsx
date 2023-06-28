import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

// Import footer data to pass on to the components
import data from '../constants/data';

/**
 * The **Layout** component renders the implementation details of every page in the web app.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Layout() {
  const { footer } = data;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>National Youth Bike Council | Community for youth empowerment</title>
        <meta
          name="description"
          content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community."
        />
        <meta name="keywords" content="national youth bike council, youth, bike, bicycle, leadership, learning, joshua funches, joshua" />
        <meta name="author" content="Shraddha | https://github.com/5hraddha" />
        {/* Google / Search Engine Tags */}
        <meta itemprop="name" content="National Youth Bike Council | Community for youth empowerment" />
        <meta
          itemprop="description"
          content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community."
        />
        <meta itemprop="image" content="https://raw.githubusercontent.com/5hraddha/national-youth-bike-council/main/src/assets/images/nybc-seo-image.png" />
        {/* Twitter card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://raw.githubusercontent.com/5hraddha/national-youth-bike-council/main/src/assets/images/nybc-seo-image.png" />
        <meta name="twitter:title" content="National Youth Bike Council | Community for youth empowerment" />
        <meta name="twitter:creator" content="@senorTeNecesito" />
        <meta name="twitter:site" content="@National_ybc" />
        <meta
          name="twitter:description"
          content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community."
        />
        {/* Facebook card meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="www.nybcouncil.com" />
        <meta property="og:title" content="National Youth Bike Council | Community for youth empowerment" />
        <meta
          property="og:description"
          content="A youth-led non-profit biking council that creates a space for peers to feel empowered and have the tools, leadership skills, and youth role models necessary to be leaders in their own community."
        />
        <meta property="og:image" content="https://raw.githubusercontent.com/5hraddha/national-youth-bike-council/main/src/assets/images/nybc-seo-image.png" />
      </Helmet>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer footer={footer} />
    </>
  );
}

Layout.displayName = 'Layout';

export default Layout;
