let adminUser = localStorage.getItem("isAdmin")
let modalButton = document.querySelector("#adminButton")
let cardFooter;

if(adminUser == "false" || !adminUser){
	modalButton.innerHTML = null

}else{
	modalButton.innerHTML =
	`
	<div class="col-md-2 offset-md-10">
		<a href="./addCourse.html" class="btn btn-block btn-primary">Add Course</a>	
	</div>
	`
}

fetch('http://localhost:3000/courses/all')
.then(res => res.json())
.then(data => {
	let courseData;

	if(data.length < 1){
		courseData = "No courses available"
	}else{
		courseData = data.map((course) => {

			if(adminUser == "false" || !adminUser){
				cardFooter =
				`
				<a href="./course.html?courseId=${course._id}" class="btn btn-primary text-white btn-block editButton">Select Course</a>
				`
			}else{
				cardFooter =
				`
				<a href="./editCourse.html?courseId=${course._id}" class="btn btn-primary text-white btn-block editButton">Edit Course</a>
				<a href="./deleteCourse.html?courseId=${course._id}" class="btn btn-primary text-white btn-block dangerButton">Disable Course</a>
				`
			}

			return(
				`
				<div class="col-md-6 my-3">
					<div class="card">
						<div class="card-body">
							<h5 class="card-title">${course.name}</h5>
							<p class="card-text text-left">
								${course.description}
							</p>
							<p class="card-text text-right">
								${course.price}
							</p>
						</div>
						<div class="card-footer">
							${cardFooter}
						</div>
					</div>	
				</div>
				`
			)

		}).join("")
	}

	const container = document.querySelector('#coursesContainer')

	container.innerHTML = courseData
})