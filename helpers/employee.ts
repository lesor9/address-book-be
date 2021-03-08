import IEmployee from '../interfaces/employeeInterfaces';

function sortEmployeesByName(employers: IEmployee[]): void {
    employers.sort((obj1, obj2) => {
        const name1: string = `${obj1.first_name} ${obj1.last_name}`;
        const name2: string = `${obj2.first_name} ${obj2.last_name}`;

        if (name1 > name2) return 1;
        if (name1 < name2) return -1;
        return 0;
    });
};
  
function filterEmployees(employees: IEmployee[], query: string): IEmployee[] {
    return employees.filter((employee) => {
        const name: string = `${employee.first_name} ${employee.last_name}`;
        const nativeName: string = `${employee.first_native_name} ${employee.last_native_name}`;

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