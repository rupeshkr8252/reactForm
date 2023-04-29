import React,{useState} from 'react';
import "./Form.css";
// import {useFormik} from "formik";
import { useForm } from 'react-hook-form';
import Submitted from './Submitted';
// import { enquiry } from '../repository/enquiry';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import {ErrorMessage} from '@hookform/error-message';

const signUpSchema = Yup.object().shape({
  name: Yup.string()
  .matches(/^[a-zA-Z]+$/, "Please enter a valid first name")
  .min(2, "Name must be at least 2 characters long")
  .max(35, "Name must be no more than 25 characters long")
  .required("Please enter a first name"),

  age: Yup.string()
  .required("Please select any of the following"),

  sex:  Yup.string()
  .required("Please select any of the following"),

  mobile: Yup.string()
  .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit phone number")
  .required("Please enter a phone number"),

  emer_contact: Yup.string()
  .matches(/^[0-9]{10}$/, "Please enter a valid 10-digit number")
  .required("Please enter a number"),

  govt_type: Yup.string().required(),
  id_num: Yup
    .string()
    .required()
    .when("govt_type", {
      is: "Aadhar",
      then: Yup
        .string()
        .matches(/^\d{12}$/, "Must be a valid 12-digit numeric string"),
      otherwise: Yup
        .string()
        .matches(
          /^[A-Za-z]{5}\d{4}[A-Za-z]$/,
          "Must be a valid 10-digit alpha-numeric string"
        ),
    }),

});

const initialValues = {
    name:"",
    age:"",
    sex:"",
    mobile:"",
    emer_contact:"",
    govt_type:"",
    id_num:"",
};



const Form = () => {
  const [openModal, setOpenModal] = useState(false);

  // const { errors , handleSubmit} = useFormik({
  //   initialValues: initialValues,
  //   validationSchema: signUpSchema,
  //   onSubmit: (userData) =>{
  //     console.log(userData);
  //   }
  // })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
    initialValues: initialValues,
    onSubmit: (userData) => {
      console.log(userData);
    }
  });

  

  
  // const [error, setErrors] = useState({});
    const [userData, setUserData] = useState({
      name: '',
      dob: '',
      sex: '',
      govt_type: '',
      id_num: '',
      guardian_title:"",
      mobile:"",
      guardian_name:"",
      email:"",
      emer_contact:"",
      address:"",
      state:"",
      city:"",
      country:"",
      pincode:"",
      occupation:"",
      religion:"",
      marital:"",
      blood:"",
      nationality:"",

    })
    
     
     let name ,value;
     const postUserData = async(event) => {
      name=event.target.name
      value=event.target.value
      setUserData({...userData, [name] : value})
      const isValid = await signUpSchema.isValid(value)
      console.log(isValid)
     }
     
      
    const submitData = async(event) =>{
         event.preventDefault();
         const {name,dob,sex,govt_type,id_num,guardian_title,mobile,guardian_name,email,emer_contact,address,state,city,country,pincode,occupation,religion,marital,blood,nationality} =userData;

         if(name && dob && sex && govt_type){
          
        const res =  fetch('https://formtask-bf787-default-rtdb.europe-west1.firebasedatabase.app/formTask.json',
        { method: "POST",
        headers: {
          "Content-type": "application/json",

        },
        body: JSON.stringify({
          name,dob,sex,govt_type,id_num,guardian_title,mobile,guardian_name,email,emer_contact,address,state,city,country,pincode,occupation,religion,marital,blood,nationality

        })
      }
       
       );
        if(res) {
          setUserData({
            name: '',
            dob: '',
            sex: '',
            govt_type: '',
            id_num: '',
            guardian_title:"",
            mobile:"",
            guardian_name:"",
            email:"",
            emer_contact:"",
            address:"",
            state:"",
            city:"",
            country:"",
            pincode:"",
            occupation:"",
            religion:"",
            marital:"",
            blood:"",
            nationality:"",
          })
          alert("Data Stored");
        }
      }else{
        alert("Please fill Name , Date of Birth & Sex field.")
      }

    }
  
  return (
   <>
        <div className='p-md-5 paddingsm'>
        <form 
           onSubmit= {() => {submitData()
            handleSubmit()}}
        >
           <h1 className='p-details text-md-start text-sm-center'>Personal Details</h1>
           <div className='row'>
            <div className='col-md-5 col-sm-12 d-flex gap-4'>
            <label className="">Name<span className="star-sym">*</span></label>
                <input
                  type="text"
                  className="form-control w-100"
                  id="Enter Name"
                  placeholder="Enter Name"
                  {...register("name" , {required: true})}
                  name="name"
                  onChange={postUserData}
                  value={userData.name}
                  
                />
                <p className="form-error">{errors.name}</p>
            </div>

            <div className='col-md-4 col-sm-12 d-flex gap-4'> <label className="">Date of Birth or Age<span className="star-sym">*</span></label>
                <input
                  type="date"
                  className="form-control w-100"
                  id="dob"
                  placeholder="DD/MM/YYYY or Age in Years"
                  // {...register("dob", {
                  //         required: "true", })}
                  name="dob"
                  value={userData.dob}
                  onChange={postUserData}
                />
                 <p className="form-error">{errors.date}</p>
                </div>

            <div className='col-md-3 col-sm-12 d-flex gap-4'>
            <label className="">Sex<span className="star-sym">*</span></label>
                <select className="form-select"
                 id="disabledSelect"
                  defaultValue=""
                  {...register("sex", { required: true })}
                  name="sex"
                  value={userData.sex}
                  onChange={postUserData}
                >
                <option value="" disabled hidden>
                    Enter Sex
                  </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <p className="form-error">{errors.sex}</p>
            </div>
           </div>

           <div className='row mt-3'>
            <div className='col-md-5 col-sm-12 d-flex gap-4'>
            <label className="">Mobile</label>
                <input
                  type="number"
                  className="form-control w-75"
                  id="mobile"
                  placeholder="Enter Mobile"
                  {...register("mobile",{required: true})}
                  name="mobile"
                  value={userData.mobile}
                  onChange={postUserData}
                />
                <p className="form-error">{errors.mobile}</p>
            </div>

            <div className='col-md-7 col-sm-12 d-flex'>  <label htmlFor="govt_type" className="text-nowrap">
        Govt Issued ID
      </label>
      <select
        className="ms-3 form-select w-25"
        id="disabledSelect"
         defaultValue=""
        {...register("govt_type", { required: true })}
                  name="govt_type"
                  value={userData.govt_type}
                  onChange={postUserData}
      >
        <option value="" disabled hidden>
          ID TYPE
        </option>
        <option value="Aadhar">Aadhar</option>
        <option value="PAN">PAN</option>
      </select>
      <p className="form-error">
        <p className='form-error'>{errors.govt_type}</p>
      </p>
      <input
        type="text"
        className="form-control w-100 ms-3"
        id="id_num"
        placeholder="Enter Govt ID"
        {...register("id_num",{required: true})}
        name="id_num"
                  value={userData.id_num}
                  onChange={postUserData}
      />
      <p className="form-error">
       {errors.id_num}
      </p>
           </div>

        </div>

        <h1 className='p-details text-md-start text-sm-center mt-3'>Contact Details</h1>
        <div className='row mt-3'>

        <div className='col-md-5 col-sm-12 d-flex'> <label className="text-nowrap">Guardian Details</label>
               <select className='ms-3 form-select w-25'
               {...register("guardian_title",{required: true})}
               name="guardian_title"
                  value={userData.guardian_title}
                  onChange={postUserData}>
              <option value="" disabled hidden>
                    Enter Label
                  </option>
                <option value="Mr">Mr.</option>
                <option value="Mrs.">Mrs.</option>
               </select>
               <input
                  type="text"
                  className="form-control w-100 ms-3"
                  id="Enter Govt ID"
                  placeholder="Enter Guardian name"
                  {...register("guardian_name")}
                  name="guardian_name"
                  value={userData.guardian_name}
                  onChange={postUserData}
                />
                {/* <p className="form-error"><ErrorMessage errors={errors} name="guardian_name"/></p> */}
           </div>

           <div className='col-md-3 col-sm-12 d-flex'>
           <label className="">Email</label>
           <input
                  type="email"
                  className="form-control w-100 ms-3"
                  id="email"
                  placeholder="Enter Email"
                  {...register("email",{required: true})}
                  name="email"
                  value={userData.email}
                  onChange={postUserData}
                />
                 {/* <p className="form-error"><ErrorMessage errors={errors} name="email"/></p> */}

           </div>

           <div className='col-md-4 col-sm-12 d-flex'>
           <label className="">Emergency Contact Number</label>
           <input
                  type="number"
                  className="form-control w-75 ms-3"
                  id="emer_contact"
                  placeholder="Enter Emergency No"
                  {...register("emer_contact",{required: true})}
                  name="emer_contact"
                  value={userData.emer_contact}
                  onChange={postUserData}
                />
                 <p className="form-error">{errors.emer_contact}</p>
            </div>

           </div>

           <h1 className='p-details text-md-start text-sm-center mt-3'>Address Details</h1>

           <div className='row mt-3'>

                <div className='col-md-5 col-sm-12 d-flex gap-3'>
                <label className="">Address</label>
                <input
                  type="text"
                  className="form-control w-100"
                  id="address"
                  placeholder="Enter Address"
                  {...register("address",{required: true})}
                  name="address"
                  value={userData.address}
                  onChange={postUserData}
                />
                {/* <p className="form-error"><ErrorMessage errors={errors} name="address"/></p> */}

                </div>

                <div className='col-md-4 col-sm-12 d-flex gap-3'>
                <label className="">State</label>
                <select className='form-select'
                 id="disabledSelect"
                  defaultValue=""
                  {...register("state",{required: true})}
                  name="state"
                  value={userData.state}
                  onChange={postUserData}>
                <option value="" disabled hidden>
                    Enter State
                  </option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Assam">Assam</option>
                  <option value="Nagaland">Nagaland</option>
                </select>
                {/* <p className="form-error"><ErrorMessage errors={errors} name="state"/></p> */}
                </div>

                <div className='col-md-3 col-sm-12 d-flex gap-3'>
                <label className="">City</label>
                <input
                  type="text"
                  className="form-control w-100"
                  id="city"
                  placeholder="Enter City/Town/Village"
                   {...register("city",{required: true})}
                   name="city"
                  value={userData.city}
                  onChange={postUserData}
                />
                 {/* <p className="form-error"><ErrorMessage errors={errors} name="state"/></p> */}
                </div>
           </div>

          <div className='row mt-3'>
            <div className="col-md-5 col-sm-12 d-flex gap-3">
            <label className="">Country</label>
                <select className='form-select w-75'
                 id="disabledSelect"
                  defaultValue=""
                  {...register("country",{required: true})}
                  name="country"
                  value={userData.country}
                  onChange={postUserData}>
                <option value="" disabled hidden>
                    Select Country
                  </option>
                  <option value="India">India</option>
                  <option value="Nepal">Nepal</option>
                  <option value="America">America</option>
                  <option value="Australia">Australia</option>
                </select> 
                {/* <p className="form-error"><ErrorMessage errors={errors} name="country"/></p>   */}
            </div>


            <div className="col-md-4 col-sm-12 d-flex gap-3">
            <label className="">Pincode</label>
           <input
                  type="number"
                  className="form-control w-75 ms-3"
                  id="pincode"
                  placeholder="Enter pincode"
                  {...register("pincode",{required: true})}
                  name="pincode"
                  value={userData.pincode}
                  onChange={postUserData}
                />
                 {/* <p className="form-error"><ErrorMessage errors={errors} name="pincode"/></p> */}
            </div>
          </div>

          <h1 className='p-details text-md-start text-sm-center mt-3'>Other Details</h1>
                <div className='row mt-3'>

                    <div className='col-md-3 col-sm-12 d-flex gap-3'>
                    <label className="">Occupation</label>
                <input
                  type="text"
                  className="form-control w-100"
                  id="occupation"
                  placeholder="Enter Occupation"
                  {...register("occupation",{required: true})}
                  name="occupation"
                  value={userData.occupation}
                  onChange={postUserData}
                />
                {/* <p className="form-error"><ErrorMessage errors={errors} name="occupation"/></p> */}
                </div>

                    <div className='col-md-3 col-sm-12 d-flex gap-3'>
                    <label className="">Religion</label>
                <select className='form-select w-75'
                 id="disabledSelect"
                  defaultValue=""
                  {...register("religion",{required: true})}
                  name="religion"
                  value={userData.religion}
                  onChange={postUserData}>
                <option value="" disabled hidden>
                    Enter Religion
                  </option>
                  <option value="Hindu">Hindu</option>
                  <option value="Christian">Christian</option>
                  <option value="Muslim">Muslim</option>
                </select> 
                {/* <p className="form-error"><ErrorMessage errors={errors} name="religion"/></p> */}
                    </div>

                    <div className='col-md-3 col-sm-12 d-flex gap-3'>
                    <label className="text-nowrap">Marital Status</label>
                <select className='form-select w-75'
                 id="disabledSelect"
                  defaultValue=""
                  {...register("marital",{required: true})}
                  name="marital"
                  value={userData.marital}
                  onChange={postUserData}>
                <option value="" disabled hidden>
                    Enter Marital Status
                  </option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="UnMarried">UnMarried</option>
                </select> 
                {/* <p className="form-error"><ErrorMessage errors={errors} name="marital"/></p> */}
                    </div>

                    <div className='col-md-3 col-sm-12 d-flex gap-3'>
                    <label className="text-nowrap">Blood Group</label>
                <select className='form-select w-75'
                id="disabledSelect"
                  defaultValue=""
                  {...register("blood",{required: true})}
                  name="blood"
                  value={userData.blood}
                  onChange={postUserData}>
                <option value="" disabled hidden>
                    Group
                  </option>
                  <option value="O+<">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                </select> 
                {/* <p className="form-error"><ErrorMessage errors={errors} name="blood"/></p> */}
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col-md-3 col-sm-12 d-flex gap-3'>
                    <label className="">Nationality</label>
                <select className='form-select w-75'
                 id="disabledSelect"
                  defaultValue=""
                  {...register("nationality",{required: true})}
                  name="nationality"
                  value={userData.nationality}
                  onChange={postUserData}>
                <option value="" disabled hidden>
                    Select Country
                  </option>
                  <option value="Indian">Indian</option>
                  <option value="Nepal">Nepal</option>
                  <option value="American">American</option>
                  <option value="Australia">Australia</option>
                </select>
                {/* <p className="form-error"><ErrorMessage errors={errors} name="nationality"/></p> */}
                    </div>
                </div>

            <div className='two-btn gap-5 mt-3'>
            <button type="submit" class="cancel-btn btn btn-light" >CANCEL<br/>.(ESC).</button>

              

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // marginTop: "16px",
              }}
            >
            <button type="submit" class="submit-btn btn  btn-success ms-5" onClick={submitData} 
           >SUBMIT<br/>.(S).</button>
           </div>

            </div>

            </form>

            {openModal && <Submitted closeModal={setOpenModal} />}
        </div>
       
   </>
  )
}

export default Form;


