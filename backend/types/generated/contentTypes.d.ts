import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAdvisorsPageAdvisorsPage extends Schema.CollectionType {
  collectionName: 'advisors_pages';
  info: {
    singularName: 'advisors-page';
    pluralName: 'advisors-pages';
    displayName: 'AdvisorsPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::advisors-page.advisors-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::advisors-page.advisors-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBoardMembersPageBoardMembersPage
  extends Schema.CollectionType {
  collectionName: 'board_members_pages';
  info: {
    singularName: 'board-members-page';
    pluralName: 'board-members-pages';
    displayName: 'BoardMembersPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::board-members-page.board-members-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::board-members-page.board-members-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouncilBlogPageCouncilBlogPage
  extends Schema.CollectionType {
  collectionName: 'council_blog_pages';
  info: {
    singularName: 'council-blog-page';
    pluralName: 'council-blog-pages';
    displayName: 'CouncilBlogPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::council-blog-page.council-blog-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::council-blog-page.council-blog-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouncilBlogPostCouncilBlogPost
  extends Schema.CollectionType {
  collectionName: 'council_blog_posts';
  info: {
    singularName: 'council-blog-post';
    pluralName: 'council-blog-posts';
    displayName: 'CouncilBlogPost';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    post_title: Attribute.String & Attribute.Required & Attribute.Unique;
    post_date: Attribute.Date & Attribute.Required;
    post_author: Attribute.String;
    post_category: Attribute.String & Attribute.Required;
    post_text_brief: Attribute.RichText & Attribute.Required;
    post_text_detail: Attribute.RichText & Attribute.Required;
    post_cover_image: Attribute.Component<'image.image'> & Attribute.Required;
    post_tags: Attribute.JSON;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::council-blog-post.council-blog-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::council-blog-post.council-blog-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCouncilMembersPageCouncilMembersPage
  extends Schema.CollectionType {
  collectionName: 'council_members_pages';
  info: {
    singularName: 'council-members-page';
    pluralName: 'council-members-pages';
    displayName: 'CouncilMembersPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::council-members-page.council-members-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::council-members-page.council-members-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'Faq';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    faq_title: Attribute.String & Attribute.Required;
    faq_list: Attribute.Component<'accordion.accordion', true> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Schema.CollectionType {
  collectionName: 'home_pages';
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'HomePage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeroomPageHomeroomPage extends Schema.CollectionType {
  collectionName: 'homeroom_pages';
  info: {
    singularName: 'homeroom-page';
    pluralName: 'homeroom-pages';
    displayName: 'HomeroomPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_description: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::homeroom-page.homeroom-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::homeroom-page.homeroom-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomeroomPostHomeroomPost extends Schema.CollectionType {
  collectionName: 'homeroom_posts';
  info: {
    singularName: 'homeroom-post';
    pluralName: 'homeroom-posts';
    displayName: 'HomeroomPost';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    post_title: Attribute.String & Attribute.Required;
    post_date: Attribute.Date;
    post_author: Attribute.String;
    post_image: Attribute.Component<'image.image'> & Attribute.Required;
    post_links: Attribute.Component<'links.links'>;
    post_text: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::homeroom-post.homeroom-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::homeroom-post.homeroom-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHowItStartedPageHowItStartedPage
  extends Schema.CollectionType {
  collectionName: 'how_it_started_pages';
  info: {
    singularName: 'how-it-started-page';
    pluralName: 'how-it-started-pages';
    displayName: 'HowItStartedPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::how-it-started-page.how-it-started-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::how-it-started-page.how-it-started-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImpactReportImpactReport extends Schema.CollectionType {
  collectionName: 'impact_reports';
  info: {
    singularName: 'impact-report';
    pluralName: 'impact-reports';
    displayName: 'ImpactReport';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    pdf: Attribute.Media & Attribute.Required;
    report_date: Attribute.Date & Attribute.Required;
    report_name: Attribute.String & Attribute.Required & Attribute.Unique;
    report_image: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::impact-report.impact-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::impact-report.impact-report',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImpactReportPageImpactReportPage
  extends Schema.CollectionType {
  collectionName: 'impact_report_pages';
  info: {
    singularName: 'impact-report-page';
    pluralName: 'impact-report-pages';
    displayName: 'ImpactReportPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::impact-report-page.impact-report-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::impact-report-page.impact-report-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJoinUsBenefitJoinUsBenefit extends Schema.CollectionType {
  collectionName: 'join_us_benefits';
  info: {
    singularName: 'join-us-benefit';
    pluralName: 'join-us-benefits';
    displayName: 'JoinUsBenefit';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    role_title: Attribute.String & Attribute.Required;
    role_benefits: Attribute.RichText & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::join-us-benefit.join-us-benefit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::join-us-benefit.join-us-benefit',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJoinUsPageJoinUsPage extends Schema.CollectionType {
  collectionName: 'join_us_pages';
  info: {
    singularName: 'join-us-page';
    pluralName: 'join-us-pages';
    displayName: 'JoinUsPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::join-us-page.join-us-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::join-us-page.join-us-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiJoinUsRoleJoinUsRole extends Schema.CollectionType {
  collectionName: 'join_us_roles';
  info: {
    singularName: 'join-us-role';
    pluralName: 'join-us-roles';
    displayName: 'JoinUsRole';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    role_title: Attribute.String & Attribute.Required;
    role_description: Attribute.RichText & Attribute.Required;
    role_image: Attribute.Component<'image.image'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::join-us-role.join-us-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::join-us-role.join-us-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLiabilityTermsPageLiabilityTermsPage
  extends Schema.CollectionType {
  collectionName: 'liability_terms_pages';
  info: {
    singularName: 'liability-terms-page';
    pluralName: 'liability-terms-pages';
    displayName: 'LiabilityTermsPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText & Attribute.Required;
    section_codes_list: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::liability-terms-page.liability-terms-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::liability-terms-page.liability-terms-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMapPlaceMarkerMapPlaceMarker extends Schema.CollectionType {
  collectionName: 'map_place_markers';
  info: {
    singularName: 'map-place-marker';
    pluralName: 'map-place-markers';
    displayName: 'MapPlaceMarker';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    place_name: Attribute.String & Attribute.Required;
    place_longitude: Attribute.String & Attribute.Required;
    place_latitude: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::map-place-marker.map-place-marker',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::map-place-marker.map-place-marker',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMediaCoveragePageMediaCoveragePage
  extends Schema.CollectionType {
  collectionName: 'media_coverage_pages';
  info: {
    singularName: 'media-coverage-page';
    pluralName: 'media-coverage-pages';
    displayName: 'MediaCoveragePage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-coverage-page.media-coverage-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::media-coverage-page.media-coverage-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMediaCoveragePostMediaCoveragePost
  extends Schema.CollectionType {
  collectionName: 'media_coverage_posts';
  info: {
    singularName: 'media-coverage-post';
    pluralName: 'media-coverage-posts';
    displayName: 'MediaCoveragePost';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    post_title: Attribute.String & Attribute.Required;
    post_date: Attribute.Date;
    post_author: Attribute.String;
    post_category: Attribute.String & Attribute.Required;
    post_text: Attribute.RichText & Attribute.Required;
    post_image: Attribute.Component<'image.image'> & Attribute.Required;
    post_links: Attribute.Component<'links.links'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::media-coverage-post.media-coverage-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::media-coverage-post.media-coverage-post',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMemberMember extends Schema.CollectionType {
  collectionName: 'members';
  info: {
    singularName: 'member';
    pluralName: 'members';
    displayName: 'Member';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    first_name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    middle_name: Attribute.String;
    last_name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    profile_image: Attribute.Media & Attribute.Required;
    location: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<'USA'>;
    story_in_brief: Attribute.RichText;
    story_in_detail: Attribute.RichText;
    designation: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
    roles: Attribute.JSON &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::multi-select.multi-select',
        ['Alumni', 'Advisor', 'Co-Founder', 'Council Member', 'Board Member']
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::member.member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::member.member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Schema.CollectionType {
  collectionName: 'partners';
  info: {
    singularName: 'partner';
    pluralName: 'partners';
    displayName: 'Partner';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    partner_name: Attribute.String;
    partner_logo: Attribute.Component<'image.image'>;
    priority: Attribute.Integer & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    singularName: 'project';
    pluralName: 'projects';
    displayName: 'Project';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    project_title: Attribute.String & Attribute.Required & Attribute.Unique;
    project_announcement: Attribute.RichText & Attribute.Required;
    project_category: Attribute.String & Attribute.Required;
    project_cover_image: Attribute.Component<'image.image'> &
      Attribute.Required;
    project_announcement_brief: Attribute.RichText & Attribute.Required;
    project_status: Attribute.Enumeration<['Completed', 'In Progress']> &
      Attribute.Required &
      Attribute.DefaultTo<'In Progress'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProjectsPageProjectsPage extends Schema.CollectionType {
  collectionName: 'projects_pages';
  info: {
    singularName: 'projects-page';
    pluralName: 'projects-pages';
    displayName: 'ProjectsPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::projects-page.projects-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::projects-page.projects-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResourcesSafetyPageResourcesSafetyPage
  extends Schema.CollectionType {
  collectionName: 'resources_safety_pages';
  info: {
    singularName: 'resources-safety-page';
    pluralName: 'resources-safety-pages';
    displayName: 'ResourcesSafetyPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::resources-safety-page.resources-safety-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::resources-safety-page.resources-safety-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShareableLinkShareableLink extends Schema.CollectionType {
  collectionName: 'shareable_links';
  info: {
    singularName: 'shareable-link';
    pluralName: 'shareable-links';
    displayName: 'ShareableLink';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_title: Attribute.String;
    section_links: Attribute.Component<'link.link', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shareable-link.shareable-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shareable-link.shareable-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShareableLinksPageShareableLinksPage
  extends Schema.CollectionType {
  collectionName: 'shareable_links_pages';
  info: {
    singularName: 'shareable-links-page';
    pluralName: 'shareable-links-pages';
    displayName: 'ShareableLinksPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_title: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shareable-links-page.shareable-links-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shareable-links-page.shareable-links-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSponsorshipSponsorship extends Schema.CollectionType {
  collectionName: 'sponsorships';
  info: {
    singularName: 'sponsorship';
    pluralName: 'sponsorships';
    displayName: 'Sponsorship';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    sponsor_name: Attribute.String;
    sponsor_logo: Attribute.Component<'image.image'>;
    priority: Attribute.Integer & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sponsorship.sponsorship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sponsorship.sponsorship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSponsorshipsPageSponsorshipsPage
  extends Schema.CollectionType {
  collectionName: 'sponsorships_pages';
  info: {
    singularName: 'sponsorships-page';
    pluralName: 'sponsorships-pages';
    displayName: 'SponsorshipsPage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sponsorships-page.sponsorships-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sponsorships-page.sponsorships-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebsiteFooterWebsiteFooter extends Schema.CollectionType {
  collectionName: 'website_footers';
  info: {
    singularName: 'website-footer';
    pluralName: 'website-footers';
    displayName: 'WebsiteFooter';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    website_page_links: Attribute.Relation<
      'api::website-footer.website-footer',
      'oneToMany',
      'api::website-page-link.website-page-link'
    >;
    order: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::website-footer.website-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::website-footer.website-footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebsiteHeaderWebsiteHeader extends Schema.CollectionType {
  collectionName: 'website_headers';
  info: {
    singularName: 'website-header';
    pluralName: 'website-headers';
    displayName: 'WebsiteHeader';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    order: Attribute.Integer;
    website_page_links: Attribute.Relation<
      'api::website-header.website-header',
      'oneToMany',
      'api::website-page-link.website-page-link'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::website-header.website-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::website-header.website-header',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebsitePageLinkWebsitePageLink
  extends Schema.CollectionType {
  collectionName: 'website_page_links';
  info: {
    singularName: 'website-page-link';
    pluralName: 'website-page-links';
    displayName: 'WebsitePageLink';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    link_title: Attribute.String & Attribute.Required & Attribute.Unique;
    type_of_link: Attribute.Enumeration<['internal', 'external']> &
      Attribute.Required &
      Attribute.DefaultTo<'internal'>;
    link_url: Attribute.String & Attribute.Required;
    website_header: Attribute.Relation<
      'api::website-page-link.website-page-link',
      'manyToOne',
      'api::website-header.website-header'
    >;
    website_footer: Attribute.Relation<
      'api::website-page-link.website-page-link',
      'manyToOne',
      'api::website-footer.website-footer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::website-page-link.website-page-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::website-page-link.website-page-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWebsiteSocialLinkWebsiteSocialLink
  extends Schema.CollectionType {
  collectionName: 'website_social_links';
  info: {
    singularName: 'website-social-link';
    pluralName: 'website-social-links';
    displayName: 'WebsiteSocialLink';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    link_title: Attribute.String & Attribute.Required;
    link_url: Attribute.String & Attribute.Required;
    link_icon: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::website-social-link.website-social-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::website-social-link.website-social-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhereAreWePageWhereAreWePage extends Schema.CollectionType {
  collectionName: 'where_are_we_pages';
  info: {
    singularName: 'where-are-we-page';
    pluralName: 'where-are-we-pages';
    displayName: 'WhereAreWePage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::where-are-we-page.where-are-we-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::where-are-we-page.where-are-we-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhyTheCouncilPageWhyTheCouncilPage
  extends Schema.CollectionType {
  collectionName: 'why_the_council_pages';
  info: {
    singularName: 'why-the-council-page';
    pluralName: 'why-the-council-pages';
    displayName: 'WhyTheCouncilPage';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_hashtags: Attribute.JSON;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::why-the-council-page.why-the-council-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::why-the-council-page.why-the-council-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiYbsSteeringCommitteeMemberYbsSteeringCommitteeMember
  extends Schema.CollectionType {
  collectionName: 'ybs_steering_committee_members';
  info: {
    singularName: 'ybs-steering-committee-member';
    pluralName: 'ybs-steering-committee-members';
    displayName: 'YbsSteeringCommitteeMember';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    first_name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    middle_name: Attribute.String;
    last_name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    profile_image: Attribute.Media & Attribute.Required;
    location: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<'USA'>;
    story_in_brief: Attribute.RichText;
    story_in_detail: Attribute.RichText;
    designation: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 2;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ybs-steering-committee-member.ybs-steering-committee-member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ybs-steering-committee-member.ybs-steering-committee-member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiYbsSteeringCommitteePageYbsSteeringCommitteePage
  extends Schema.CollectionType {
  collectionName: 'ybs_steering_committee_pages';
  info: {
    singularName: 'ybs-steering-committee-page';
    pluralName: 'ybs-steering-committee-pages';
    displayName: 'YbsSteeringCommitteePage';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    section_heading: Attribute.String & Attribute.Required;
    section_text: Attribute.RichText;
    section_image: Attribute.Component<'image.image'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ybs-steering-committee-page.ybs-steering-committee-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ybs-steering-committee-page.ybs-steering-committee-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::advisors-page.advisors-page': ApiAdvisorsPageAdvisorsPage;
      'api::board-members-page.board-members-page': ApiBoardMembersPageBoardMembersPage;
      'api::council-blog-page.council-blog-page': ApiCouncilBlogPageCouncilBlogPage;
      'api::council-blog-post.council-blog-post': ApiCouncilBlogPostCouncilBlogPost;
      'api::council-members-page.council-members-page': ApiCouncilMembersPageCouncilMembersPage;
      'api::faq.faq': ApiFaqFaq;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::homeroom-page.homeroom-page': ApiHomeroomPageHomeroomPage;
      'api::homeroom-post.homeroom-post': ApiHomeroomPostHomeroomPost;
      'api::how-it-started-page.how-it-started-page': ApiHowItStartedPageHowItStartedPage;
      'api::impact-report.impact-report': ApiImpactReportImpactReport;
      'api::impact-report-page.impact-report-page': ApiImpactReportPageImpactReportPage;
      'api::join-us-benefit.join-us-benefit': ApiJoinUsBenefitJoinUsBenefit;
      'api::join-us-page.join-us-page': ApiJoinUsPageJoinUsPage;
      'api::join-us-role.join-us-role': ApiJoinUsRoleJoinUsRole;
      'api::liability-terms-page.liability-terms-page': ApiLiabilityTermsPageLiabilityTermsPage;
      'api::map-place-marker.map-place-marker': ApiMapPlaceMarkerMapPlaceMarker;
      'api::media-coverage-page.media-coverage-page': ApiMediaCoveragePageMediaCoveragePage;
      'api::media-coverage-post.media-coverage-post': ApiMediaCoveragePostMediaCoveragePost;
      'api::member.member': ApiMemberMember;
      'api::partner.partner': ApiPartnerPartner;
      'api::project.project': ApiProjectProject;
      'api::projects-page.projects-page': ApiProjectsPageProjectsPage;
      'api::resources-safety-page.resources-safety-page': ApiResourcesSafetyPageResourcesSafetyPage;
      'api::shareable-link.shareable-link': ApiShareableLinkShareableLink;
      'api::shareable-links-page.shareable-links-page': ApiShareableLinksPageShareableLinksPage;
      'api::sponsorship.sponsorship': ApiSponsorshipSponsorship;
      'api::sponsorships-page.sponsorships-page': ApiSponsorshipsPageSponsorshipsPage;
      'api::website-footer.website-footer': ApiWebsiteFooterWebsiteFooter;
      'api::website-header.website-header': ApiWebsiteHeaderWebsiteHeader;
      'api::website-page-link.website-page-link': ApiWebsitePageLinkWebsitePageLink;
      'api::website-social-link.website-social-link': ApiWebsiteSocialLinkWebsiteSocialLink;
      'api::where-are-we-page.where-are-we-page': ApiWhereAreWePageWhereAreWePage;
      'api::why-the-council-page.why-the-council-page': ApiWhyTheCouncilPageWhyTheCouncilPage;
      'api::ybs-steering-committee-member.ybs-steering-committee-member': ApiYbsSteeringCommitteeMemberYbsSteeringCommitteeMember;
      'api::ybs-steering-committee-page.ybs-steering-committee-page': ApiYbsSteeringCommitteePageYbsSteeringCommitteePage;
    }
  }
}
