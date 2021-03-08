import * as mongoose from 'mongoose';

const url = process.env.MONGODB_URI;
mongoose.connect(url , { useUnifiedTopology: true, useNewUrlParser: true });

const Schema = mongoose.Schema;
const employeeScheme = new Schema({
  cnumber: String,
  employee_id: String,
  data_hired: Number,
  email: String,
  extraEmails: Array,
  extraPhones: Array,
  first_name: String,
  first_native_name: String,
  gender: Number,
  internal_phone: String,
  is_active: Boolean,
  last_name: String,
  last_native_name: String,
  middle_native_name: String,
  other_info: String,
  phone: String,
  roles: Array,
  permissions: Object,
  room: String,
  skype: String,
  user_avatar: String,
  department: String,
  building: String,
  has_vacation_access: Boolean,
  employment_periods: Array,
  is_absent: Boolean,
  departmentIcon: String,
});
const Employee = mongoose.model("employee", employeeScheme);


const getList = () => {
    return Employee.find({}, function(err, collection){
        if(err) return console.log(err);

        return collection;
    });
};

const createEmployee = (employee) => {
    const employeeToDB = new Employee(employee);
 
    return employeeToDB.save(function(err){
        if(err) return console.log(err);
         
        return employeeToDB;
    });
}

const getEmployee = (id) => {
    return Employee.findOne({employee_id: id}, function(err, obj){
        if(err) return console.log(err);

        return obj;
    });
};

export {
    getList,
    createEmployee,
    getEmployee,
};