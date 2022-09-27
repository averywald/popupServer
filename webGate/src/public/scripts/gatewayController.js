const PageState = new Proxy(
	{
		username: {
			value: '',
			isValid: false,
		},
		password: {
			value: '',
			isValid: false,
		},
		inputsAreValid: false, // Only allow submit if true
	},
	{
		get: (obj, prop) =>
			prop in obj
				? prop === 'inputsAreValid'
					? obj.username.isValid && obj.password.isValid
					: obj[prop]
				: 'not implemented', // If prop doesn't exist
		set(obj, prop, value) {
			obj[prop].value = cleanInput(value) // Assign val to object prop
			obj[prop].isValid = validate(obj[prop].value)

			obj.inputsAreValid = obj.username.isValid && obj.password.isValid

			return true
		},
	}
)

function cleanInput(input) {
	return input.trim()
}

function validate(input) {
	return input.length >= 5
}

// Function validatePasswordInput(input) {
//     return input.length > 5;
// }

window.onload = (e) => {
	Array.from(document.getElementsByClassName('input-field')).forEach(
		(element) => {
			element.addEventListener('keyup', (e) => {
				// console.log(Object.entries(PageState))

				PageState[e.target.id] = e.target.value

				PageState.inputsAreValid
					? document.getElementById('submit').removeAttribute('disabled')
					: document.getElementById('submit').setAttribute('disabled', true)
			})
		}
	)

	document.getElementById('submit').addEventListener('click', (e) => {
		// Send off request if inputs are valid
		if (PageState.isValidInput) {
			fetch('/account/login', {
				method: 'POST',
				body: JSON.stringify({
					username: PageState.username.value,
					password: PageState.password.value,
				}),
				headers: { 'Content-Type': 'application/json' },
			}).then((response) => {
				console.log(response)
				handleRedirect(response)
			})
		}
	})
}
