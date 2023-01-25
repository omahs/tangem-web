import { TANGEM_API_URI} from "../config";

export async function getResellers(language) {
  const params = language ? `?defaultCode=${language}` : '';
  const response = await fetch(`${TANGEM_API_URI}/v1/resellers/${params}`);
  return response.json();
}

export async function getProducts(language) {
  const params = language ? `?defaultCode=${language}` : '';
  const response = await fetch(`${TANGEM_API_URI}/v1/products/${params}`);
  return response.json();
}
