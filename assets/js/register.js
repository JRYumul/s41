let registerForm = document.querySelector('#registerUser');

registerForm.addEventListener("submit", (e)=> {
	//since forms have a default behavior of trying to send the page elsewhere, we use the event's (e) preventDefault() method to stop that
	e.preventDefault()

	let firstName = document.querySelector("#firstName").value
	let lastName = document.querySelector("#lastName").value
	let mobileNo = document.querySelector("#mobileNumber").value
	let email = document.querySelector("#userEmail").value
	let password1 = document.querySelector("#password1").value
	let password2 = document.querySelector("#password2").value

	//validation to only enable the submit button when all fields are populated, passwords match, and mobile number is exactly 11 numbers
	if((password1 !== '' && password2 !== '') && (password1 === password2) && (mobileNo.length === 11)){

		fetch('http://localhost:3000/users/checkEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			if(data === false){
				fetch('http://localhost:3000/users/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						password: password1,
						mobileNo: mobileNo
					})
				})
				.then(res => res.json())
				.then(data => {
					if(data === true){
						alert("Registration successful.")
						window.location.replace("./login.html")
					}else{
						alert("Something went wrong.")
					}
				})

			}else{
				alert("Duplicate email found.")
			}
		})

	}else{
		alert("Something went wrong. Please check your registration details.")
	}
})