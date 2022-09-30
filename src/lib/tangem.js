import {TANGEM_GEO_API_URI, TANGEM_RESELLERS_API_URI} from "../config";

export async function getResellers(language) {
  const response = await fetch(`${TANGEM_RESELLERS_API_URI}?defaultCode=${language}`);
  const {resellers} = await response.json();
  return resellers;
}

export async function getGeoCode() {
  const response = await fetch(TANGEM_GEO_API_URI);
  const { code } = await response.json();
  return code;
}
