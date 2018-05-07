export const toggle_menu = show => {
	return {
		type: 'TOGGLE_MENU',
		show
	}
}

export const show_maps = number_to_show => {
	return {
		type: 'SHOW_MAPS',
		number_to_show
	}
}