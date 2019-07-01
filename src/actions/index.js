import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	//using normal approach
	// const ids = _.uniq(_.map(getState().posts, "userId"));
	// ids.forEach(id => dispatch(fetchUser(id)));

	//using chain function from lodash
	_.chain(getState().posts)
		.map("userId")
		.uniq()
		.forEach(id => dispatch(fetchUser(id)))
		.value();
};

export const fetchPosts = () => async dispatch => {
	const res = await jsonPlaceholder.get("/posts");

	dispatch({ type: "FETCH_POSTS", payload: res.data });
};

export const fetchUser = id => async dispatch => {
	const res = await jsonPlaceholder.get(`/users/${id}`);

	dispatch({ type: "FETCH_USER", payload: res.data });
};
