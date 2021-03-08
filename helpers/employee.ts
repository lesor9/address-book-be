function sortEmployeesByName(employers) {
    employers.sort((obj1, obj2) => {
        const name1 = obj1.first_name + obj1.last_name;
        const name2 = obj2.first_name + obj2.last_name;

        if (name1 > name2) return 1;
        if (name1 < name2) return -1;
        return 0;
    });
};
  
function filterEmployees(employees, query) {
    return employees.filter((employee) => {
        const name = `${employee.first_name} ${employee.last_name}`;
        const nativeName = `${employee.first_native_name} ${employee.last_native_name}`;

        return(
            name.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim()) ||
            nativeName.toLocaleLowerCase().includes(query.toLocaleLowerCase().trim())
        );
    });
}

export {
    sortEmployeesByName,
    filterEmployees,
};