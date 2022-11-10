import {TANGEM_GEO_API_URI, TANGEM_RESELLERS_API_URI} from "../config";

export async function getResellers(language) {
  const params = language ? `?defaultCode=${language}` : '';
  const response = await fetch(`${TANGEM_RESELLERS_API_URI}${params}`);
  const {resellers} = await response.json();
  return resellers;
}

export async function getGeoCode() {
  try {
    const response = await fetch(TANGEM_GEO_API_URI);
    const { code } = await response.json();
    return code;
  } catch (e) {
    return ''
  }
}
