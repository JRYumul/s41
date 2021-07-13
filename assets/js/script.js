let navItems1 = document.querySelector("#navSession1")
let navItems2 = document.querySelector("#navSession2")

let userToken = localStorage.getItem("token")

// console.log(userToken)

if(!userToken){
	navItems1.innerHTML =
	`
	<li class="nav-item">
		<a href="./register.html" class="nav-link">Register</a>	
	</li>
	`
	navItems2.innerHTML =
	`
	<li class="nav-item">
		<a href="./login.html" class="nav-link">Log In</a>	
	</li>
	`
}else{
	navItems1.innerHTML =
	`
	<li class="nav-item">
		<a href="./logout.html" class="nav-link">Log Out</a>	
	</li>
	`
}