import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";
import { getDatabase, ref, set, push, get } from "firebase/database";
import { toast } from "react-toastify";
import { BiPlus } from "react-icons/bi";
import { FaRegQuestionCircle, FaRegThumbsUp, FaTrophy } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { PiNotepadLight, PiQuestionFill } from "react-icons/pi";
import { CiLight } from "react-icons/ci";
import { CgTrophy } from "react-icons/cg";
import { GrStatusGood } from "react-icons/gr";

export default function Add() {
  const [score, setscore] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [attempted, setAttemted] = useState("");
  const [correct, setCorrect] = useState("");
  const [incorrect, setInCorrect] = useState(0);
  const [unattemted, setUnattempted] = useState(100);

  const [showBtn, setShowBtn] = useState(true);

  const navigate = useNavigate();
  
  useEffect(() => {
    setUnattempted(100 - attempted);
    setInCorrect(attempted - correct);
  },[attempted, correct]);

  const storedata = async (e) => {

    e.preventDefault();
    toast.promise(storedata,{
      pending:"Please wait recored is adding!"
    },{
      toastId:"pending1"
    })
    setShowBtn(false);

    const db = getDatabase(app);
    const refvalue = push(ref(db, "sonu/score"));
    await set(refvalue, {
      score: score,
      accuracy: accuracy,
      attempted: attempted,
      correct: correct,
      incorrect: incorrect,
      unattemted: unattemted,
    }).then(() => {
        // toast.promise(
        //   storedata,
        //   {
        //     pending: "Adding record",
        //   },
        //   {
        //     toastId: "sucess1",
        //   }
        // );
     
        //  toast.success("Record added!", {
        //    toastId: "sucess1",
        //  });

        setscore("");
        setAccuracy("");
        setInCorrect("");
        setCorrect("");
        setAttemted("");
        setUnattempted(100);
        navigate("/view");
      })
      .catch((errer) => {
        toast.error("Somthing wetnts wrong!", {
          toastId: "errer1",
        });
      });
  };


  return (
    <>
      {/* Navbar starts */}
      <Navigation />
      {/* navbar ends */}

      <div className="container mt-5">
        <div className="row mt-5">
          <div
            className="col-12 col-sm-8 offset-sm-2 p-4"
            style={{
              boxShadow: "20px 20px 200px gray",
              marginTop: "100px",
              backgroundColor: "var(--background-color)",
            }}
          >
            <form onSubmit={storedata}>
              <h5
                className="text-center mb-4 bb-1-dark"
                style={{ fontWeight: "bold", color: "var(--text-color)" }}
              >
                <BiPlus /> Add Result
              </h5>
              <div className="row">
                <div className="col-md-3 col-4">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label text-primary"
                    >
                      <CgTrophy /> Score{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control bg-primary text-white"
                      onChange={(e) => {
                        setscore(e.target.value);
                      }}
                      value={score}
                      name="score"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3 col-4">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label text-warning"
                    >
                      <CiLight /> Accuracy{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control text-white bg-warning"
                      onChange={(e) => {
                        setAccuracy(e.target.value);
                      }}
                      value={accuracy}
                      name="accuracy"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3 col-4">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label text-info"
                    >
                      <PiNotepadLight /> Attempt{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control text-white bg-info"
                      onChange={(e) => {
                        setAttemted(e.target.value);
                      }}
                      value={attempted}
                      name="attempted"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3 col-4">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label text-success"
                    >
                      <GrStatusGood /> Correct{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control text-white bg-success"
                      onChange={(e) => {
                        setCorrect(e.target.value);
                      }}
                      value={correct}
                      name="correct"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-3 col-4">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label text-danger"
                    >
                      <RxCross2 /> Incorrect{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control bg-danger text-white"
                      // onChange={(e)=>{setInCorrect(e.target.value)}}
                      value={incorrect}
                      name="incorrect"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-3 col-4">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label text-secondary"
                    >
                      <FaRegQuestionCircle /> Unattemt{" "}
                    </label>
                    <input
                      type="number"
                      className="form-control bg-secondary text-white"
                      value={unattemted}
                      name="unattemted"
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label"
                      style={{ color: "var(--text-color)" }}
                    >
                      <PiQuestionFill /> Total que.
                    </label>
                    <input
                      style={{
                        backgroundColor: "var(--background-color)",
                        color: "var(--text-color)",
                      }}
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      readOnly
                      value={100}
                    />
                  </div>
                </div>
                <div className="col-md-3 col-6">
                  <div className="mb-3">
                    <label
                      for="exampleInputPassword1"
                      className="form-label"
                      style={{ color: "var(--text-color)" }}
                    >
                      <FaTrophy /> Total score
                    </label>
                    <input
                      style={{
                        backgroundColor: "var(--background-color)",
                        color: "var(--text-color)",
                      }}
                      type="number"
                      className="form-control"
                      id="exampleInputPassword1"
                      value={200}
                      readOnly
                    />
                  </div>
                </div>

                {showBtn === true ? (
                  <button type="submit" className="btn mt-4 main-btn">
                    <BiPlus /> Add
                  </button>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
