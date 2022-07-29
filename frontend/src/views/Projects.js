import React from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import FilterButton from "../components/FilterButton";
import Post from "../components/Post/Post";
import Pagination from "../components/Pagination";
import api from "../utils/api";

/**
 * The **Projects** component renders the view that shows all the projects posts.
 *
 * @version 1.0.0
 * @author [Shraddha](https://github.com/5hraddha)
 */
function Projects() {
  const [projectsViewTextContent, setProjectsViewTextContent] = React.useState([]);
  const [projectsPosts, setProjectsPosts] = React.useState([]);

  //Settings for Filtering Posts
  const [postsToShow, setPostsToShow] = React.useState(projectsPosts);
  const [selectedFilterCategory, setSelectedFilterCategory] = React.useState("All");
  const filterTagsForPosts = ["All", ...new Set(projectsPosts.map((_) => _.attributes.project_category))];

  // Get the text contents of the page
  React.useEffect(() => {
    api.getProjectsViewTextContents()
      .then(response => setProjectsViewTextContent(response.data))
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });

    api.getProjectsPosts()
      .then(response => {
        setProjectsPosts(response.data);
        setPostsToShow(response.data);
      })
      .catch(err => {
        console.log("Uh-oh! Error occurred while fetching the members data from the server.");
        console.log(err);
      });
  }, []);

  const handleFilterPosts = (selectedCategory) => {
    let newPostsToShow;
    if (selectedCategory !== "All") {
      newPostsToShow = projectsPosts.filter((_) => _.attributes.project_category === selectedCategory);
    } else {
      newPostsToShow = projectsPosts;
    }
    setSelectedFilterCategory(selectedCategory);
    setPostsToShow(newPostsToShow);
    setCurrentPage(1);
  };

  //Settings for Pagination
  let pageSize = 3;
  const [currentPage, setCurrentPage] = React.useState(1);

  const currentViewPosts = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return postsToShow.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, postsToShow, pageSize]);

  // Helper functions to render fiter butons, links and posts
  const renderFilterButtons = () => {
    return filterTagsForPosts.map((filterTag) => (
      <FilterButton key={filterTag} filterCategory={filterTag} selectedFilterCategory={selectedFilterCategory} handleFilter={handleFilterPosts} />
    ));
  };


  const renderPosts = (posts) =>
    posts.map((post) => {
      const { project_title, project_status, project_announcement_brief, project_cover_image } = post.attributes;
      const { image_file, alternate_text } = project_cover_image;

      return (
        <Post key={project_title}>
          <div className="col-span-2 place-self-center lg:row-auto">
            <Post.Img src={image_file.data.attributes.url} alt={alternate_text} className="object-cover object-center" />
          </div>
          <div className="col-span-2 mx-auto flex max-w-2xl flex-col gap-1">
            <Post.Title>{project_title}</Post.Title>
            <Post.Subtitle>{`Project Status: ${project_status}`}</Post.Subtitle>
            <Post.Text>{project_announcement_brief}</Post.Text>
            <div className="flex flex-wrap justify-center gap-8 lg:justify-start">
              <Link to={`/projects/${project_title}`} className="mt-4 gap-2 flex underline underline-offset-4 transition-all hover:decoration-skin-accent hover:opacity-90">
                Show More
              </Link>
            </div>
          </div>
        </Post>
      );
    });

  return (
    <>
      {projectsViewTextContent.length
        ? (
          <div className="my-8" aria-label="council blogs">
            <Section>
              <Section.Heading>
                {projectsViewTextContent[0].attributes.section_heading}
              </Section.Heading>
              <div className="mb-4 flex flex-wrap items-center justify-center gap-4 md:justify-start">{renderFilterButtons()}</div>
              <div className="flex flex-col gap-10">{(currentViewPosts.length) ? renderPosts(currentViewPosts) : null}</div>
              <Pagination currentPage={currentPage} totalCount={postsToShow.length} pageSize={pageSize} onPageChange={(page) => setCurrentPage(page)} />
            </Section>
          </div>
        )
        : null}
    </>
  );
}

Projects.displayName = "Projects";

export default Projects;
