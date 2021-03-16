import * as mongoose from 'mongoose';

const employeeScheme = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: { type: String, default: 'user' },
    cnumber: { type: String, default: '1231321' },
    data_hired: Number,
    email: { type: String, required: true },
    password: { type: String, required: true },
    extraEmails: Array,
    extraPhones: Array,
    first_name: { type: String, default: 'none' },
    first_native_name: { type: String, default: 'none' },
    gender: { type: Number, default: 1},
    internal_phone: { type: String, default: '111' },
    is_active: { type: Boolean, default: true },
    last_name: { type: String, default: 'none' },
    last_native_name: { type: String, default: 'none' },
    middle_native_name: { type: String, default: 'none' },
    other_info: String,
    phone: { type: String, default: '+31231222' },
    addrRoles: { type: Object, default:       {
      type: 'adressbook',
      name: 'employee'
    }},
    vacRoles: { type: Object, default: {
      type: 'vacation',
      name: 'employee'
    }},
    permissions: Object,
    room: { type: String, default: '100'},
    skype: { type: String, default: "live:skype" },
    user_avatar: {type: String, default: 'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png'},
    department: { type: String, default: 'Junior' },
    building: { type: String, default: 'a1c' },
    has_vacation_access: Boolean,
    employment_periods: Array,
    is_absent: { type: Boolean, default: true },
    departmentIcon: { type: String, default: 'supervisor_account'},
  });

export default mongoose.model("employee", employeeScheme);