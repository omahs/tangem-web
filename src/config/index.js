const defaultConfig = {
  TANGEM_RESELLERS_API_URI: 'https://api.tangem-tech.com/v1/resellers/',
  TANGEM_GEO_API_URI: 'https://api.tangem-tech.com/v1/geo/',
  TANGEM_INSALES_API_URI: 'tangem.myinsales.ru/admin/products/318114475.json',
  TANGEM_EMAIL_URI: 'https://api.tangem-tech.com/email/partner',
  ZENDESK_HELP_CENTER_API_URI: 'https://tangem.zendesk.com/api/v2/help_center/',
}

const productionConfig =  {
  SHOPIFY_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  SHOPIFY_API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  TANGEM_COINS_API_URI: process.env.NEXT_PUBLIC_TANGEM_COINS_API_URI,
  TANGEM_RESELLERS_API_URI: process.env.NEXT_PUBLIC_TANGEM_RESELLERS_API_URI,
  TANGEM_GEO_API_URI: process.env.NEXT_PUBLIC_TANGEM_GEO_API_URI,
  TANGEM_INSALES_API_USER: process.env.NEXT_PUBLIC_TANGEM_INSALES_API_USER,
  TANGEM_INSALES_API_PASSWORD: process.env.NEXT_PUBLIC_TANGEM_INSALES_API_PASSWORD,
  TANGEM_EMAIL_URI: process.env.NEXT_PUBLIC_TANGEM_EMAIL_URI,
  RECAPTCHA_SECRET: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET,
  TANGEM_CMS_TOKEN: process.env.NEXT_PUBLIC_TANGEM_CMS_TOKEN,
  TANGEM_CMS_URI: process.env.NEXT_PUBLIC_TANGEM_CMS_URI,
  ZENDESK_HELP_CENTER_API_URI: process.env.NEXT_PUBLIC_ZENDESK_HELP_CENTER_API_URI,
}

const developmentConfig = {
  SHOPIFY_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN_DEV,
  SHOPIFY_API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY_DEV,
  TANGEM_COINS_API_URI: process.env.NEXT_PUBLIC_TANGEM_COINS_API_URI_DEV,
  TANGEM_RESELLERS_API_URI: process.env.NEXT_PUBLIC_TANGEM_RESELLERS_API_URI_DEV,
  TANGEM_GEO_API_URI: process.env.NEXT_PUBLIC_TANGEM_GEO_API_URI_DEV,
  TANGEM_INSALES_API_USER: process.env.NEXT_PUBLIC_TANGEM_INSALES_API_USER_DEV,
  TANGEM_INSALES_API_PASSWORD: process.env.NEXT_PUBLIC_TANGEM_INSALES_API_PASSWORD_DEV,
  TANGEM_EMAIL_URI: process.env.NEXT_PUBLIC_TANGEM_EMAIL_URI_DEV,
  RECAPTCHA_SECRET: process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_DEV,
  TANGEM_CMS_TOKEN: process.env.NEXT_PUBLIC_TANGEM_CMS_TOKEN_DEV,
  TANGEM_CMS_URI: process.env.NEXT_PUBLIC_TANGEM_CMS_URI_DEV,
  ZENDESK_HELP_CENTER_API_URI: process.env.NEXT_PUBLIC_ZENDESK_HELP_CENTER_API_URI_DEV,
}

const USE_DEV_CONFIG = process.env.USE_DEV_CONFIG === 'true';

module.exports = Object.entries(productionConfig).reduce(
  (acc, [key, value]) => {
    if (value) {
      acc[key] = value;
    }
    if (USE_DEV_CONFIG && developmentConfig.hasOwnProperty(key) && developmentConfig[key] ) {
      acc[key] = developmentConfig[key];
    }
    return acc;
  },
  {...defaultConfig, ...(USE_DEV_CONFIG ? developmentConfig: {})}
);
