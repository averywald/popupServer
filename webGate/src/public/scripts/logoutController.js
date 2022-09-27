window.onload = (e) => {
	document.getElementById('logout').addEventListener('click', (e) => {
		fetch('/account/logout').then((response) => {
			handleRedirect(response)
		})
	})
}
