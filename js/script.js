document.addEventListener("DOMContentLoaded", function() {
    let searchInput = document.getElementById("search");

    if (searchInput) {
        searchInput.addEventListener("input", filterEmployees);
    }
});

function filterEmployees() {
    let input = document.getElementById("search").value.toLowerCase();
    let employees = document.querySelectorAll("#employeeList li");

    employees.forEach(employee => {
        let name = employee.getAttribute("data-name").toLowerCase();
        let designation = employee.getAttribute("data-designation").toLowerCase();

        if (name.includes(input) || designation.includes(input)) {
            employee.style.display = "block"; 
        } else {
            employee.style.display = "none";
        }
    });
}
