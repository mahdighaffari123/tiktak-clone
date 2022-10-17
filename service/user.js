import { API } from "./apiConfig";
import { schemaQueries } from "./schema/schemaQueries";

const { auth } = schemaQueries;

export const authLogin = (user) => API.post(auth.AUTH_GOOGLE, user);
