let formSubmit = document.querySelector("#createCourse")

formSubmit.addEventListener("submit", (e)=> {
	e.preventDefault()

	let courseName = document.querySelector("#courseName").value
	let description = document.querySelector("#courseDescription").value
	let price = document.querySelector("#coursePrice").value
	let token = localStorage.getItem('token')

	//ACTIVITY:
	/*
	Create a fetch request to the localhost:3000/courses endpoint to create a new course

	If succesful, redirect the user to the courses page. If there is an error in the response, show an alert with an error message.

	Things to consider:
	What kind of information do I need to pass to this endpoint? Check the API code/Postman
	*/

	fetch('http://localhost:3000/courses', {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			name: courseName,
			description:description,
			price: price
		})
	})
	.then(res => res.json())
	.then(data => {
		if(data === true){
			alert("Course successfully added.")
			window.location.replace("./courses.html")
		}else{
			alert("Something went wrong.")
		}
	})
})