module.exports = {
  SHOPIFY_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
  SHOPIFY_API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY,
  TANGEM_COINS_API_URI: process.env.NEXT_PUBLIC_TANGEM_COINS_API_URI,
  TANGEM_RESELLERS_API_URI: process.env.NEXT_PUBLIC_TANGEM_RESELLERS_API_URI || 'https://api.tangem-tech.com/v1/resellers/',
  TANGEM_GEO_API_URI: process.env.NEXT_PUBLIC_TANGEM_GEO_API_URI || 'https://api.tangem-tech.com/v1/geo/',
  TANGEM_INSALES_API_URI: 'tangem.myinsales.ru/admin/products/318114475.json',
  TANGEM_INSALES_API_USER: process.env.NEXT_PUBLIC_TANGEM_INSALES_API_USER,
  TANGEM_INSALES_API_PASSWORD: process.env.NEXT_PUBLIC_TANGEM_INSALES_API_PASSWORD,
  TANGEM_EMAIL_URI: process.env.NEXT_PUBLIC_TANGEM_EMAIL_URI || 'https://api.tangem-tech.com/email/partner',
  TANGEM_CMS_TOKEN: process.env.NEXT_PUBLIC_TANGEM_CMS_TOKEN,
  TANGEM_CMS_URI: process.env.NEXT_PUBLIC_TANGEM_CMS_URI,
  ZENDESK_HELP_CENTER_API_URI: process.env.NEXT_PUBLIC_ZENDESK_HELP_CENTER_API_URI || 'https://tangem.zendesk.com/api/v2/help_center/',
}
