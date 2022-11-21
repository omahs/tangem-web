module.exports = {
  SHOPIFY_DOMAIN: getValue('NEXT_PUBLIC_SHOPIFY_DOMAIN'),
  SHOPIFY_API_KEY: getValue('NEXT_PUBLIC_SHOPIFY_API_KEY'),
  TANGEM_COINS_API_URI: getValue('NEXT_PUBLIC_TANGEM_COINS_API_URI'),
  TANGEM_RESELLERS_API_URI: getValue('NEXT_PUBLIC_TANGEM_RESELLERS_API_URI','https://api.tangem-tech.com/v1/resellers/'),
  TANGEM_GEO_API_URI: getValue('NEXT_PUBLIC_TANGEM_GEO_API_URI', 'https://api.tangem-tech.com/v1/geo/'),
  TANGEM_INSALES_API_URI: getValue(undefined,'tangem.myinsales.ru/admin/products/318114475.json'),
  TANGEM_INSALES_API_USER: getValue('NEXT_PUBLIC_TANGEM_INSALES_API_USER'),
  TANGEM_INSALES_API_PASSWORD: getValue('NEXT_PUBLIC_TANGEM_INSALES_API_PASSWORD'),
  TANGEM_EMAIL_URI: getValue('NEXT_PUBLIC_TANGEM_EMAIL_URI', 'https://api.tangem-tech.com/email/partner'),
  RECAPTCHA_SECRET: getValue('NEXT_PUBLIC_RECAPTCHA_SECRET'),
  TANGEM_CMS_TOKEN: getValue('NEXT_PUBLIC_TANGEM_CMS_TOKEN'),
  TANGEM_CMS_URI: getValue('NEXT_PUBLIC_TANGEM_CMS_URI'),
  ZENDESK_HELP_CENTER_API_URI: getValue('NEXT_PUBLIC_ZENDESK_HELP_CENTER_API_URI', 'https://tangem.zendesk.com/api/v2/help_center/'),
}

function getValue(name, defaultValue) {
  if (process.env.USE_DEV_CONFIG && process.env[`${name}_DEV`]) {
    return process.env[`${name}_DEV`];
  }
  return  process.env[name] || defaultValue;
}
