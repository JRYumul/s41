let token = localStorage.getItem("token")

let profileContainer = document.querySelector("#profileContainer")

if(!token || token === null){
	alert("You must log in first.")
	window.location.replace("./login.html")
}else{
	fetch('http://localhost:3000/users/details', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	.then(res => res.json())
	.then(data => {
		// console.log(data)

		profileContainer.innerHTML =
		`
		<div class="col-md-12">
			<section class="jumbotron my-5">
				<h3 class="text-center">First Name: ${data.firstName}</h3>
				<h3 class="text-center">Last Name: ${data.lastName}</h3>
				<h3 class="text-center">Email: ${data.email}</h3>
				<h3 class="text-center">Contact Number: ${data.mobileNo}</h3>
				<h3 class="mt-5">Class History</h3>

				<table class="table">
					<thead>
						<tr>
							<th>Course ID</th>
							<th>Enrolled On</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody id="coursesContainer"></tbody>
				</table>
				
			</section>	
		</div>
		`
	})
}