import React from "react";
import "./Submitted.css";
import Success from "../Images/success icon component.png";
import { GrNext } from "react-icons/gr";
import Close from "../Images/close (2).png";

const Submitted = ({ closeModal }) => {
  return (
    <>
      <div className=" modalBackground ">
        <div className="success-container">
          <div className="h-div p-3 ">
            <h1 className="submit-h">Enquiry Form Submitted Successfully!</h1>
            <button className='closebtn' onClick={()=>closeModal(false)} type="button">X</button>
            <img
              src={Close}
              onClick={() => closeModal(false)}
              alt="close"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
          <div className=" text-center img-cont">
            <img
              src={Success}
              alt="success"
              className="img-responsive success-image"
            />
          </div>
          <div className="h-p-b text-center ">
            <h1>Details Sent Successfully!</h1>
            <p className="text-center">
              Our team will reach out to you about your requirements soon!
            </p>
            <button type="button" class="btn-success ">
              Fill Out Other Form
              <span>
                <GrNext />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Submitted;
