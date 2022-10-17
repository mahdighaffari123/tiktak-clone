import { API } from "./apiConfig";
import { schemaQueries } from "./schema/schemaQueries";

const { post: postQuery } = schemaQueries;

export const getAllPost = () => API.get(postQuery.GET_ALL_POST);

export const addPost = (document) => API.post(postQuery.INSERT_POST, document);
