/*Activity:

Create a fetch request for deleting a course.

If successful, redirect the user to the courses page. If not, show an alert.

Things to consider:
What kind of information does the API endpoint need? How do I pass that along?
*/

const params = new URLSearchParams(window.location.search);
const courseId = params.get('courseId');

let token = localStorage.getItem('token')

fetch(`http://localhost:3000/courses/${courseId}`, {
	method: 'DELETE',
	headers: {
		Authorization: `Bearer ${token}`
	}
})
.then(res => res.json())
.then(data => {
	if(data === true){
		alert("Course successfully archived")
		window.location.replace('./courses.html')
	}else{
		alert("Something went wrong.")
	}
})