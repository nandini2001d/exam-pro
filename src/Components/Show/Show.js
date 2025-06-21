import React, { useEffect, useState } from "react";
import Navigation from "../Navigation/Navigation";
import { get, getDatabase, orderByChild, query, ref } from "firebase/database";
import app from "../../firebase";
import { toast } from "react-toastify";
import { CiLight, CiTrophy } from "react-icons/ci";
import { PiNotepadLight, PiQuestionFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { FaRegQuestionCircle, FaRegThumbsUp, FaTrophy } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { BiCalendar } from "react-icons/bi";

export default function Show() {
  const [data, setData] = useState([]);
    const total=data.length; // this is thw way we can used the the fech the data by reverce order and number also 
   // {data.slice().reverse().map((value, id) => (

    useEffect(() => {
    toast.promise(
      getAllData(),
      {
        pending: "Please wait!",
        success: "Your progress report!",
      },
      {
        toastId: "sucess1",
      }
    );
  }, []);

  const getAllData = async () => {
    const db = getDatabase(app);
    const refValue = ref(db, "sonu/score");
    //const q= query(refValue,orderByChild(''))
    const snaPic = await get(refValue);
    if (snaPic.exists()) {
      const mayData = snaPic.val();
      const newArry = Object.keys(mayData).map((mayid) => {
        return {
          ...mayData[mayid],
          id: mayid,
        };
      });
      setData(newArry);
    }
  };

  return (
    <>
      <Navigation />

      <div
        className="container-fluid text-center"
        style={{ marginTop: "100px" }}
      >
     <div style={{zIndex:"10",top:"90px",position:"fixed",left:"0",right:"0", backgroundColor: "var(--background-color)"}}>
         <div className="d-flex mt-3 mb-4 ">
          <div
            className="card p-1"
            style={{
              backgroundColor: "var(--background-color)",
              border: "1px solid var(--text-color)",
            }}
          >
            <h6 style={{ fontWeight: "bold", color: "var(--text-color)" }}>
              {" "}
              <PiQuestionFill /> Total que.=100
            </h6>
          </div>
          <div
            className="card mx-2 p-1"
            style={{
              backgroundColor: "var(--background-color)",
              border: "1px solid var(--text-color)",
            }}
          >
            <h6 style={{ fontWeight: "bold", color: "var(--text-color)" }}>
              <FaTrophy /> Total score=200
            </h6>
          </div>
        </div>
     </div>
        <div className="row" style={{marginTop:"160px"}}>
          <div className="col-12">
            <table className="table">
              <thead>
                <tr style={{}}>
                  <th
                    scope="col"
                    style={{ 
                      backgroundColor: "var(--background-color)",
                      color: "var(--text-color)",position:"sticky",zIndex:"1",top:"160px"
                    }}
                  >
                    Sr No.
                  </th>
                  <th scope="col" className="bg-primary text-white"style={{position:"sticky",zIndex:"1",top:"160px"}}>
                    <CiTrophy /> Sc.
                  </th>

                  <th scope="col-2" className="bg-warning text-white" style={{position:"sticky",zIndex:"1",top:"160px"}}>
                    <CiLight /> Ac.
                  </th>

                  <th scope="col-2" className="bg-info text-white" style={{position:"sticky",zIndex:"1",top:"160px"}}>
                    <PiNotepadLight /> At.
                  </th>

                  <th scope="col" className="bg-success text-white" style={{position:"sticky",zIndex:"1",top:"160px"}}>
                    <GrStatusGood /> Co.
                  </th>

                  <th scope="col" className="bg-danger text-white" style={{position:"sticky",zIndex:"1",top:"160px"}}>
                    <RxCross2 /> Inc.
                  </th>

                  <th scope="col" className="bg-secondary text-white" style={{position:"sticky",zIndex:"1",top:"160px"}}>
                    <FaRegQuestionCircle /> Unat.
                  </th>
                  <th scope="col" className=" text-white" style={{backgroundColor:"purple",position:"sticky",zIndex:"1",top:"160px"}}>
                   <BiCalendar /> Date
                  </th>
                </tr>
              </thead>
              <tbody>
             
                {data.slice().reverse().map((value, id) => (
                  <tr>
                    <th
                      style={{
                        backgroundColor: "var(--background-color)",
                        color: "var(--text-color)",
                      }}
                    >
                      {total - id}
                    </th>
                    <td className="text-white bg-primary">{value.score}</td>
                    <td
                      className="text-warning"
                      style={{ backgroundColor: "var(--background-color)" }}
                    >
                      {value.accuracy}
                    </td>
                    <td className="text-white bg-info">{value.attempted}</td>
                    <td className="text-white bg-success">{value.correct}</td>
                    <td className="text-white bg-danger">{value.incorrect}</td>
                    <td
                      className=""
                      style={{ backgroundColor: "var(--background-color)" ,color: "var(--text-color)" }}
                    >
                      {value.unattemted}
                    </td>
                    <td className="text-white" style={{fontSize:"10px", backgroundColor:"purple"}}>{value.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
