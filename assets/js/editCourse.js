const params = new URLSearchParams(window.location.search);
const courseId = params.get('courseId');

// console.log(courseId)

let name = document.querySelector("#courseName")
let price = document.querySelector("#coursePrice")
let description = document.querySelector("#courseDescription")
let editForm = document.querySelector("#editCourse")

// console.dir(name)

fetch(`http://localhost:3000/courses/${courseId}`)
.then(res => res.json())
.then(data => {
	// console.log(data)
	name.placeholder = data.name
	price.placeholder = data.price
	description.placeholder = data.description

	editForm.addEventListener("submit", (e) => {
		e.preventDefault()

		let token = localStorage.getItem('token')

		fetch(`http://localhost:3000/courses/${courseId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name.value,
				description: description.value,
				price: price.value
			})
		})
		.then(res => res.json())
		.then(data => {
			if(data === true){
				alert("Course successfully updated.")
				window.location.replace("./courses.html")
			}else{
				alert("Something went wrong.")
			}
		})
	})
})