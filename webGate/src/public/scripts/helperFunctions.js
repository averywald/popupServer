function handleRedirect(response) {
	if (response.ok && response.status == 200) {
		window.location.assign(response.url)
	}
}
