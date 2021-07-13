// console.log(window.location.search)

//make the URL params into an object with various methods that we can use
const params = new URLSearchParams(window.location.search);

//use the get method to get the value of the courseId being passed via the URL
const courseId = params.get('courseId');

const token = localStorage.getItem('token');

const courseName = document.querySelector("#courseName");
const courseDesc = document.querySelector("#courseDesc");
const coursePrice = document.querySelector("#coursePrice");
const enrollContainer = document.querySelector("#enrollContainer");

fetch(`http://localhost:3000/courses/${courseId}`)
.then(res => res.json())
.then(data => {
	// console.log(data)

	courseName.innerHTML = data.name;
	courseDesc.innerHTML = data.description;
	coursePrice.innerHTML = data.price;
	enrollContainer.innerHTML = `<button id="enrollButton" class="btn btn-block btn-primary">Enroll</button>`

	const enrollBtn = document.querySelector("#enrollButton");

	enrollBtn.addEventListener('click', ()=> {
		//enroll user to course
		fetch("http://localhost:3000/users/enroll", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				courseId: courseId
			})
		})
		.then(res => res.json())
		.then(data => {
			//user successfully enrolled
			if(data === true){
				alert("Thank you for enrolling! See you soon!")
				window.location.replace("./courses.html")
			}else{ //user did not successfully enroll
				alert("Something went wrong.")
			}
		})
	})
})