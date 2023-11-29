import type { Schema, Attribute } from '@strapi/strapi';

export interface AccordionAccordion extends Schema.Component {
  collectionName: 'components_accordion_accordions';
  info: {
    displayName: 'Accordion';
    icon: 'caret-right';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.RichText & Attribute.Required;
  };
}

export interface ImageImage extends Schema.Component {
  collectionName: 'components_image_images';
  info: {
    displayName: 'Image';
    icon: 'image';
    description: '';
  };
  attributes: {
    alternate_text: Attribute.String & Attribute.Required;
    image_file: Attribute.Media & Attribute.Required;
  };
}

export interface LinksLinks extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    displayName: 'links';
    icon: 'link';
    description: '';
  };
  attributes: {
    social_media_post: Attribute.String;
    article: Attribute.String;
    video: Attribute.String;
    pdf: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'accordion.accordion': AccordionAccordion;
      'image.image': ImageImage;
      'links.links': LinksLinks;
    }
  }
}
