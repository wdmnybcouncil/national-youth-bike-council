// Images for Footer
import mailIcon from '../assets/images/icon-mail.svg';
import discordIcon from '../assets/images/social/icon-discord.svg';
import instagramIcon from '../assets/images/social/icon-instagram.svg';
import twitterIcon from '../assets/images/social/icon-twitter.svg';
import facebookIcon from '../assets/images/social/icon-facebook.svg';
import youtubeIcon from '../assets/images/social/icon-youtube.svg';

/**
 * WebsiteLink describes data for a link in the website
 * @typedef WebsiteLink
 * @property {string} title title of the link
 * @property {'internal' | 'external'} type type of the link - internal or external
 * @property {string} url the actual url of the link
 */

/**
 * WebsiteHeaderData describes data for different sections of the website's header
 * @typedef WebsiteHeaderData
 * @property {WebsiteLink[]} aboutUsMenu menu data for the About Us section
 * @property {WebsiteLink[]} councilPressMenu menu data for the Council Press section
 * @property {WebsiteLink[]} resourcesMenu menu data for the Resources section
 */

/**
 * WebsiteStaticData describes data for different static sections of websites
 * @typedef WebsiteStaticData
 * @property {WebsiteHeaderData} header header menu data
 * @property {object[]} footer header menu data
 */

/** @type WebsiteStaticData */
const data = {
  header: {
    aboutUsMenu: [
      {
        title: 'How It Started',
        type: 'internal',
        url: '/how-it-started',
      },
      {
        title: 'Where Are We',
        type: 'internal',
        url: '/where-are-we',
      },
      {
        title: 'Why The Council',
        type: 'internal',
        url: '/why-the-council',
      },
      {
        title: 'Council Members',
        type: 'internal',
        url: '/council-members',
      },
      {
        title: 'Advisors',
        type: 'internal',
        url: '/advisors',
      },
      {
        title: 'Board Members',
        type: 'internal',
        url: '/board-members',
      },
      {
        title: 'YBS Steering Committee',
        type: 'internal',
        url: '/ybs-steering-committee',
      },
      {
        title: 'Partners & Sponsorships',
        type: 'internal',
        url: '/sponsorships',
      },
    ],
    councilPressMenu: [
      {
        title: 'Media Coverage',
        type: 'internal',
        url: '/media-coverage',
      },
      {
        title: 'Council Blogs',
        type: 'internal',
        url: '/council-blogs',
      },
      {
        title: 'Newsletter',
        type: 'external',
        url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCLjXlghaJvNn8ijeqImKdB6KO1Mtx4bcfxqJRhns3xpxw6w/viewform?usp=sf_link',
      },
    ],
    resourcesMenu: [
      {
        title: 'Safety',
        type: 'internal',
        url: '/resources-safety',
      },
      {
        title: 'Homeroom',
        type: 'internal',
        url: '/homeroom',
      },
      {
        title: 'Impact Reports',
        type: 'internal',
        url: '/impact-reports',
      },
    ],
  },
  // have to do
  footer: [
    {
      heading: 'National Youth Bike Council',
      email: {
        address: 'info@nybcouncil.com',
        subject: 'Enquiry about the council membership',
        body: 'Hi Team!',
        icon: {
          src: mailIcon,
          alt: 'mail icon for email address',
        },
      },
    },
    {
      heading: 'About Us',
      links: [
        {
          title: 'How It Started',
          type: 'internal',
          url: '/how-it-started',
        },
        {
          title: 'Where are we?',
          type: 'internal',
          url: '/where-are-we',
        },
        {
          title: 'Why the Council?',
          type: 'internal',
          url: '/why-the-council',
        },
        {
          title: 'Youth Bike Summit',
          type: 'external',
          url: 'https://youthbikesummit.org/',
        },
      ],
    },
    {
      heading: 'Support',
      links: [
        {
          title: 'Newsletter',
          type: 'external',
          url: 'https://docs.google.com/forms/d/e/1FAIpQLSfCLjXlghaJvNn8ijeqImKdB6KO1Mtx4bcfxqJRhns3xpxw6w/viewform?usp=sf_link',
        },
        {
          title: 'Donate',
          type: 'external',
          url: 'https://www.paypal.com/donate/?hosted_button_id=VDGNBSXHUMJAW',
        },
      ],
    },
    {
      heading: 'Social',
      links: [
        {
          title: 'Discord',
          type: 'external',
          url: 'https://discord.gg/2jnVUXUkHk',
          icon: {
            src: discordIcon,
            alt: 'discord icon in white color',
          },
        },
        {
          title: 'Instagram',
          type: 'external',
          url: 'https://www.instagram.com/nationalyouthbike/?hl=en',
          icon: {
            src: instagramIcon,
            alt: 'instagram icon in white color',
          },
        },
        {
          title: 'Twitter',
          type: 'external',
          url: 'https://twitter.com/National_ybc',
          icon: {
            src: twitterIcon,
            alt: 'twitter icon in white color',
          },
        },
        {
          title: 'Facebook',
          type: 'external',
          url: 'https://www.facebook.com/Nybcouncil/',
          icon: {
            src: facebookIcon,
            alt: 'facebook icon in white color',
          },
        },
        {
          title: 'YouTube',
          type: 'external',
          url: 'https://www.youtube.com/channel/UC6J-nXvkVU4LyEFf73_mR2Q',
          icon: {
            src: youtubeIcon,
            alt: 'youtube icon in white color',
          },
        },
      ],
    },
  ],
};

export default data;
