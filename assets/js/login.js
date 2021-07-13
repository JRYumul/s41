const loginForm = document.querySelector("#logInUser")

loginForm.addEventListener("submit", (e) => {
	e.preventDefault()

	let email = document.querySelector("#userEmail").value
	let password = document.querySelector("#password").value

	if(email === "" || password === ""){
		alert("Please input your email and/or password")
	}else{
		fetch('http://localhost:3000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(data.access){
				localStorage.setItem('token', data.access)
				//send another fetch request to decode JWT and obtain user ID and role for storing in localStorage
				fetch('http://localhost:3000/users/details', {
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				})
				.then(res => res.json())
				.then(data => {
					// console.log(data)
					localStorage.setItem("id", data._id)
					localStorage.setItem("isAdmin", data.isAdmin)
					window.location.replace("./courses.html")
				})

			}else{
				alert("Authentication failed. Please check your details and try again.")
			}
		})
	}
})
