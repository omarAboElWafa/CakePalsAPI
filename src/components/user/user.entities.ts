import mongoose, {Schema} from "mongoose";
import  validator   from "validator";
import { IUser } from "@/contracts/user";
import { comparePassword, generateAuthToken} from "../../utils/helpers";
import { hashPassword } from "../../utils/hooks";

const UserSchema :Schema = new Schema({
    firstName: {
        type: String, 
        required: [true, 'First name is required'],
        maxlength: [50, 'First name should not be more than 50 characters long'],
        validate: [/^[a-zA-Z]+$/, 'First name should contain only letters']
    },
    lastName:  {
        type : String, 
        required: [true, 'Last name is required'],
        maxlength: [50, 'Last name should not be more than 50 characters long'],
        validate: [/^[a-zA-Z]+$/, 'Last name should contain only letters']
    },
    email: {
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    username: {
        type: String, 
        required: [true, 'Username is required'], 
        unique: true
    },
    password: {
        type: String, 
        required: [true, 'Password is required'], 
        minlength: [8, 'Password should be at least 8 characters long']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        unique: true,
    },
    address:{
        district: {
            type: String,
            required: [true, 'District is required'],
        },
        city: {
            type: String,
            required: [true, 'City is required'],
        },
        country: {
            type: String,
            required: [true, 'Country is required'],
        }
    },
    verifiedEmail: {
        type: Boolean, default: false
    },
   
    verifiedPhone: {
        type: Boolean, default: false
    },
    role: {
        type: String,
        enum: ['member', 'baker'],
        default: 'member'
    }, 
    inProgressOrder: {
        orderId:{
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: false
        },
        orderTime: {
            type: Date,
            required: false
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }

    },
    
    {timestamps: true}
);


// index for location
UserSchema.index({location: '2dsphere'});

//hash password before saving to database
UserSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await hashPassword(user.password);
    }
    next();
});


//compare password
UserSchema.methods.comparePassword = comparePassword;




export default mongoose.model<IUser>('User', UserSchema);