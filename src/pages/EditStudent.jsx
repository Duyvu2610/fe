import Header from "../Header";
import MyButton from "../MyButton";
import { useNavigate, useParams } from "react-router-dom";
import MyInput from "../MyInput";
import { useEffect, useState } from "react";
import axios from "axios";

function EditStudent() {
  const navigate = useNavigate();
  const [isAddHref, setIsAddHref] = useState(
    window.location.href === "http://localhost:3000/students/add"
  );
  const [stId, setStId] = useState("");
  const [stCode, setStCode] = useState("");
  const [stName, setStName] = useState("");
  const [stBirth, setStBirth] = useState("");
  const [stAddress, setStAddress] = useState("");
  const [stAvg, setStAvg] = useState("");
  const [student, setStudent] = useState();

  const { studentId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/students/${studentId}`
        );
        const data = response.data;
        setStudent(data);
        setStId(data.data.studentId);
        setStName(data.data.studentName);
        setStCode(data.data.studentCode);
        setStAddress(data.data.address);
        const date = new Date(data.data.dateOfBirth);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        setStBirth(`${year}-${month}-${day}`);

        setStAvg(data.data.averageScore);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (studentId !== undefined) {
      fetchData();
    }
  }, [studentId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (studentId !== undefined) {
      try {
        const student = {
          studentId: studentId,
          studentName: stName,
          studentCode: stCode,
          address: stAddress,
          averageScore: stAvg,
          dateOfBirth: stBirth,
        };
        const response = await axios.put(
          "http://localhost:8080/api/v1/students/" + studentId,
          student
        );
        alert("Sua thành công");
      } catch (error) {
        alert("Sua thất bại");
      }
    } else {
      try {
        const student = {
          studentName: stName,
          studentCode: stCode,
          address: stAddress,
          averageScore: stAvg,
          dateOfBirth: stBirth,
        };
        // Gửi yêu cầu POST đến API endpoint
        const response = await axios.post(
          "http://localhost:8080/api/v1/students",
          student
        );
        // Xử lý phản hồi từ server (response.data chứa dữ liệu từ server)
        alert("Thêm thành công");
      } catch (error) {
        // Xử lý lỗi nếu có
        alert("Thêm thất bại");
      }
    }
  };
  const handleGenerateCode = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/students/code")
      .then((response) => response.json())
      .then((data) => {
        setStCode(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  return (
    <div className="w-[700px] ">
      <Header />
      <h2 className="uppercase text-center py-10 text-xl font-bold">Student</h2>
      <form action="" className="flex flex-col gap-4">
        {!isAddHref && (
          <div className="flex w-full">
            <label htmlFor="" className="w-[20%]">
              Student Id:
            </label>
            <MyInput
              type="text"
              className=" w-[70px]"
              disable={isAddHref ? false : true}
              value={stId}
            />
          </div>
        )}
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Student Code:
          </label>
          <MyInput
            type="text"
            className={`w-[150px] ${isAddHref ? "cursor-not-allowed" : ""}`}
            value={stCode}
            disable={true}
            onChange={(e) => setStCode(e.target.value)}
          />
          <MyButton
            className={`ml-14`}
            disable={isAddHref ? false : true}
            onClick={(e) => handleGenerateCode(e)}
          >
            Generate Code
          </MyButton>
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Student Name:
          </label>
          <MyInput
            type="text"
            className="w-[150px]"
            value={stName}
            onChange={(e) => setStName(e.target.value)}
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Birth day:
          </label>
          <MyInput
            type="date"
            className="w-[150px]"
            value={stBirth}
            onChange={(e) => setStBirth(e.target.value)}
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Address:
          </label>
          <MyInput
            type="text"
            className="w-[300px]"
            value={stAddress}
            onChange={(e) => setStAddress(e.target.value)}
          />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Average:
          </label>
          <MyInput
            type="text"
            className="w-[70px]"
            value={stAvg}
            onChange={(e) => setStAvg(e.target.value)}
          />
        </div>
        <div className="flex justify-center gap-4">
          <MyButton onClick={() => navigate("/students")}>Back</MyButton>
          <MyButton onClick={(e) => handleSave(e)}>Save</MyButton>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
