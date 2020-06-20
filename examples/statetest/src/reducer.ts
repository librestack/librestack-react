function initState () {
	return ({
		lighton: false
	})
}

function reducer(state: any, action: any) {
	if (state === undefined) state = initState();
	switch (action.type) {
		case 'TOGGLE_LIGHT':
			return ({
				...state,
				lighton: !state.lighton
			});
	}
	return state;
}
export default reducer;

