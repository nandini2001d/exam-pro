import React from "react";
import { BiPlus } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row text-center">
          <div className="col-12">
            <h4 style={{ color: "red" }}>400 : Errer</h4>
            <h4>Page Not Found</h4>
            <Link to={"/"}>
              Go To Add Page <BiPlus />
            </Link>
            <br />
            <Link to={"/view"}>
              Go To View Page <BsEye />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
