import {TANGEM_RESELLERS_API_URI} from "../config";

export async function getResellers(language) {
  const response = await fetch(`${TANGEM_RESELLERS_API_URI}?defaultCode=${language}`);
  const {resellers} = await response.json();
  return resellers;
}
