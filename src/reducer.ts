// reducer for use with redux

function initState () {
	return ({
		togglem: false
	})
}

function reducer(state: any, action: any) {
	if (state === undefined) state = initState();
	switch (action.type) {
		case 'SOME_ACTION':
			return ({
				...state,
				toggleme: !state.toggleme
			});
	}
	return state;
}
export default reducer;

