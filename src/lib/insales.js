import {TANGEM_INSALES_API_PASSWORD, TANGEM_INSALES_API_URI, TANGEM_INSALES_API_USER} from "../config";

let result;
export async function loadInsalesProducts() {
  if (result) {
    return result;
  }
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const res = await fetch(`https://${TANGEM_INSALES_API_USER}:${TANGEM_INSALES_API_PASSWORD}@${TANGEM_INSALES_API_URI}`, requestOptions)
    const data = await res.json();
    result = data.variants.map(({id, price,old_price})  => {
      return {
        id, price, old_price,
      }
    }).reduce((acc, item) => {
      const key = item.id === 546677567 ? 'pack3' : 'pack2';
      acc[key] = {...item};
      return acc;
    }, { currency: 'RUB', fractionDigits: 0, locale: 'ru-RU' })
    return result;
  } catch (e) {
    console.error(e);
    return undefined;
  }

}
