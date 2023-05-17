import { getRequest } from "../utils/httpsUtils";

export async function getData() {
  return await getRequest("http://www.mocky.io/v2/5ba8efb23100007200c2750c");
}
