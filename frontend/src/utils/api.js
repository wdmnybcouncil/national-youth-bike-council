/**
 * This module takes care of all the requests made to the Strapi REST API -
 * @module Api
 */
import qs from 'qs';

/** Class representing all the API related requests */
class Api {
  /**
   * Sets the base URL and header authorization token for the API endpoints.
   * @param {options} obj - An object having the base URL and headers
   */
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Checks the server's response of the Fetch API call to tell whether it was successful or not.
   * @param {Object} response The response of the Fetch API call.
   * @return {Object} If the response was successful, returns the JSON else a Promise object with a given reason.
   */
  _checkResponseStatus = (response) => {
    return response.ok ? response.json() : Promise.reject(`Error Code: ${response.status} | Error Message: ${response.statusText}`);
  };

  /**
   * Get all the members of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getAllMembers = () => {
    const query = qs.stringify({
      populate: '*',
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the sponsers of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getSponsers = () => {
    const query = qs.stringify({
      sort: ['priority'],
      populate: {
        sponsor_logo: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/sponsorships?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the partners of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getPartners = () => {
    const query = qs.stringify({
      sort: ['priority'],
      populate: {
        partner_logo: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/partners?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Home view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getHomeViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/home-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the How It Started view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getHowItStartedViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/how-it-started-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Where Are We view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getWhereAreWeViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/where-are-we-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the place markers to show on the USA map.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getPlaceMarkers = () => {
    return fetch(`${this._baseUrl}/map-place-markers`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Why The Council view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getWhyTheCouncilViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/why-the-council-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Council Members view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getCouncilMembersViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/council-members-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Advisors view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getAdvisorsViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/advisors-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Board Members view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getBoardMembersViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/board-members-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Sponsorships view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getSponsorshipsViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/sponsorships-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Media Coverage view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getMediaCoverageViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/media-coverage-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the posts related to media coverage.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getMediaCoveragePosts = () => {
    const query = qs.stringify({
      sort: ['post_category:desc', 'createdAt:desc'],
      populate: ['post_image.image_file', 'post_links'],
    });

    return fetch(`${this._baseUrl}/media-coverage-posts?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Council Blogs view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getCouncilBlogsViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/council-blog-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the posts related to council blogs.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getCouncilBlogPosts = () => {
    const query = qs.stringify({
      sort: ['post_category:desc', 'createdAt:desc'],
      populate: ['post_cover_image.image_file'],
    });

    return fetch(`${this._baseUrl}/council-blog-posts?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get a single post from council blogs.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getCouncilBlogPost = (blogTitle) => {
    const query = qs.stringify({
      filters: {
        post_title: {
          $eq: blogTitle,
        },
      },
      populate: ['post_cover_image.image_file'],
    });

    return fetch(`${this._baseUrl}/council-blog-posts?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Projects view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getProjectsViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/projects-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the posts related to projects.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getProjectsPosts = () => {
    const query = qs.stringify({
      sort: ['project_category:desc', 'createdAt:desc'],
      populate: ['project_cover_image.image_file'],
    });

    return fetch(`${this._baseUrl}/projects?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get a single post from projects.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getProjectPost = (projectTitle) => {
    const query = qs.stringify({
      filters: {
        project_title: {
          $eq: projectTitle,
        },
      },
      populate: ['project_cover_image.image_file'],
    });

    return fetch(`${this._baseUrl}/projects?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Resources Safety view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getResourcesSafetyViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/resources-safety-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Join Us view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getJoinUsViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/join-us-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the benefits of joining the council to show on the Join Us view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getJoinUsBenefits = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/join-us-benefits?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the roles in the council to show on the Join Us view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getJoinUsRoles = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        role_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/join-us-roles?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the faqs to show on the Join Us view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getFaqs = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: ['faq_list'],
    });

    return fetch(`${this._baseUrl}/faqs?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get the liability terms for the Liability Terms view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getLiabilityTermTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/liability-terms-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get the agreement code for the Liability Terms view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getAgreementCodesList = () => {
    const query = qs.stringify({
      sort: ['id'],
      fields: ['section_codes_list'],
    });

    return fetch(`${this._baseUrl}/liability-terms-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the Homeroom view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getHomeroomViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/homeroom-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the posts related to Homeroom view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getHomeroomPosts = () => {
    const query = qs.stringify({
      sort: ['post_title', 'createdAt:desc'],
      populate: ['post_image.image_file', 'post_links', 'post_links.pdf'],
    });

    return fetch(`${this._baseUrl}/homeroom-posts?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the YbsSteeringCommittee view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getSteeringCommitteeViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
      populate: {
        section_image: {
          populate: ['image_file'],
        },
      },
    });

    return fetch(`${this._baseUrl}/ybs-steering-committee-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the members of the YbsSteeringCommittee.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getSteeringCommitteeMembers = () => {
    const query = qs.stringify({
      populate: '*',
    });

    return fetch(`${this._baseUrl}/ybs-steering-committee-members?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the text contents to show on the ImpactReports view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getImpactReportsViewTextContents = () => {
    const query = qs.stringify({
      sort: ['id'],
    });

    return fetch(`${this._baseUrl}/impact-report-pages?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };

  /**
   * Get all the Impact Reports.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getImpactReports = () => {
    const query = qs.stringify({
      populate: '*',
    });

    return fetch(`${this._baseUrl}/impact-reports?${query}`, {
      headers: this._headers,
    }).then(this._checkResponseStatus);
  };
}

const BASE_URL = import.meta.env.PROD ? 'https://nybc-strapi.herokuapp.com/api' : 'http://localhost:1337/api';

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
  },
});
