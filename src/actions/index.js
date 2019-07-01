import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPosts = () => async dispatch => {
	const res = await jsonPlaceholder.get("/posts");

	dispatch({ type: "FETCH_POSTS", payload: res.data });
};

// export const fetchUser = id => async dispatch => {
// 	const res = await jsonPlaceholder.get(`/users/${id}`);

// 	dispatch({ type: "FETCH_USER", payload: res.data });
// };

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {
	const res = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: "FETCH_USER", payload: res.data });
});
