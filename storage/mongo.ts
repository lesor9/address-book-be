import * as mongoose from 'mongoose';
import Employee from '../models/employeeScheme';

const getList = (): mongoose.Query<any[], any, {}> => {
    return Employee.find({}, function(err, collection){
        if(err) return console.log(err);

        return collection;
    });
};

const getEmployee = (id: string) => {
    return Employee.findOne({_id: id}, function(err, obj){
        if(err) return console.log(err);

        return obj;
    });
};

export {
    getList,
    getEmployee,
};