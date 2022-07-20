/**
 * This module takes care of all the requests made to the Strapi REST API - 
 * @module Api
 */
import qs from "qs";

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
  _checkResponseStatus = response => {
    return (response.ok)
      ? response.json()
      : Promise.reject(`Error Code: ${response.status} | Error Message: ${response.statusText}`);
  }


  /**
   * Get all the founding members of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getFoundingMembers = () => {
    const query = qs.stringify({
      filters: {
        roles: {
          $containsi: "Co-Founder",
        },
      },
      populate: '*',
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }


  /**
   * Get all the council members of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getCouncilMembers = () => {
    const query = qs.stringify({
      filters: {
        roles: {
          $containsi: "Council Member",
        },
      },
      populate: '*',
      pagination: {
        pageSize: 50,
        page: 1,
      },
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }


  /**
   * Get all the alumni members of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getAlumniMembers = () => {
    const query = qs.stringify({
      filters: {
        roles: {
          $containsi: "Alumni",
        },
      },
      populate: '*',
      pagination: {
        pageSize: 50,
        page: 1,
      },
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }


  /**
   * Get all the advisor members of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getAdvisorMembers = () => {
    const query = qs.stringify({
      filters: {
        roles: {
          $containsi: "Advisor",
        },
      },
      populate: '*',
      pagination: {
        pageSize: 50,
        page: 1,
      },
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }


  /**
   * Get all the board members of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getBoardMembers = () => {
    const query = qs.stringify({
      filters: {
        roles: {
          $containsi: "Board Member",
        },
      },
      populate: '*',
      pagination: {
        pageSize: 50,
        page: 1,
      },
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the members of the council to show on the Home view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getHomeViewMembers = () => {
    const query = qs.stringify({
      filters: {
        first_name: {
          $in: ["Zoe", "Lot", "Luly"],
        },
      },
      populate: '*',
    });

    return fetch(`${this._baseUrl}/members?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the sponsers of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getSponsers = () => {
    const query = qs.stringify({
      populate: {
        "sponsor_logo": {
          populate: ["image_file"],
        }
      },
    });

    return fetch(`${this._baseUrl}/sponsorships?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the partners of the council.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getPartners = () => {
    const query = qs.stringify({
      populate: {
        "partner_logo": {
          populate: ["image_file"],
        }
      },
    });

    return fetch(`${this._baseUrl}/partners?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the text contents to show on the Home view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getHomeViewTextContents = () => {
    const query = qs.stringify({
      populate: {
        "section_image": {
          populate: ["image_file"],
        }
      },
    });

    return fetch(`${this._baseUrl}/home-pages?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
 * Get all the text contents to show on the How It Started view.
 * @return {Promise} The Promise of the Fetch API call.
 */
  getHowItStartedViewTextContents = () => {
    const query = qs.stringify({
      populate: {
        "section_image": {
          populate: ["image_file"],
        }
      },
    });

    return fetch(`${this._baseUrl}/how-it-started-pages?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the text contents to show on the Where Are We view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getWhereAreWeViewTextContents = () => {
    return fetch(`${this._baseUrl}/where-are-we-pages`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the place markers to show on the USA map.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getPlaceMarkers = () => {
    return fetch(`${this._baseUrl}/map-place-markers`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }


  /**
 * Get all the text contents to show on the Why The Council view.
 * @return {Promise} The Promise of the Fetch API call.
 */
  getWhyTheCouncilViewTextContents = () => {
    const query = qs.stringify({
      populate: {
        "section_image": {
          populate: ["image_file"],
        }
      },
    });

    return fetch(`${this._baseUrl}/why-the-council-pages?${query}`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the text contents to show on the Council Members view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getCouncilMembersViewTextContents = () => {
    return fetch(`${this._baseUrl}/council-members-pages`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }

  /**
   * Get all the text contents to show on the Sponsorships view.
   * @return {Promise} The Promise of the Fetch API call.
   */
  getSponsorshipsViewTextContents = () => {
    return fetch(`${this._baseUrl}/sponsorships-pages`, {
      headers: this._headers
    })
      .then(this._checkResponseStatus);
  }
}

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:1337/api';

export default new Api({
  baseUrl: BASE_URL,
  headers: {
    authorization: `Bearer ${process.env.REACT_APP_STRAPI_API_TOKEN}`,
  }
});