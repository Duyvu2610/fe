import { FaCaretDown } from "react-icons/fa";
import Header from "../Header";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    // Gọi API để lấy danh sách sinh viên khi component được tải
    // Lưu ý: Thay thế `YOUR_API_ENDPOINT` bằng địa chỉ thực tế của API của bạn
    fetch("http://localhost:8080/api/v1/students?page=" + currentPage)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage]);
  const handlePageChange = (newPage) => {
    // Xử lý sự kiện chuyển trang
    setCurrentPage(newPage);
  };

  return (
    <div className="w-[700px] ">
      <Header />
      <form className="py-20 px-10 flex gap-8">
        <div className="w-[50%]  flex flex-col gap-5">
          <div className="flex justify-between">
            <label htmlFor="stCode">Student Code:</label>
            <input type="text" id="stCode" className="border border-black" />
          </div>
          <div className="flex justify-between">
            <label htmlFor="stName">Student Name:</label>
            <input type="text" id="stName" className="border border-black" />
          </div>
          <div className="flex justify-between">
            <label htmlFor="bd">Birthday:</label>
            <input type="date" id="bd" className="border border-black" />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <MyButton>Search</MyButton>
          <MyButton onClick={() => navigate("/students/edit")}>
            Add Student
          </MyButton>
        </div>
      </form>
      <table className="w-full border border-black">
        <thead className="bg-gray-400 border text-left h-10">
          <tr>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                No
              </button>
            </th>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                Code
              </button>
            </th>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                Name
              </button>
            </th>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                Birthday
              </button>
            </th>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                Address
              </button>
            </th>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                Score
              </button>
            </th>
            <th className="border border-black">
              <button>
                <FaCaretDown className="inline mr-1" />
                Edit
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index} className={"even:bg-gray-300"}>
              <td className="border border-black">{index + 1}</td>
              <td className="border border-black">{student.studentCode}</td>
              <td className="border border-black">{student.studentName}</td>
              <td className="border border-black">
                {new Date(student.dateOfBirth).toLocaleDateString()}
              </td>
              <td className="border border-black">{student.address}</td>
              <td className="border border-black">{student.averageScore}</td>
              <td className="border border-black">
                <a href="#">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pt-10 flex justify-center gap-8">
        <div>
          <MyButton>first</MyButton>
          <MyButton
            onClick={() => {
              if (currentPage > 0) handlePageChange(currentPage - 1);
            }}
          >
            pre
          </MyButton>
        </div>
        <div>
          <MyButton>1</MyButton>
          <MyButton>2</MyButton>
          <MyButton>3</MyButton>
          <MyButton>4</MyButton>
        </div>
        <div>
          <MyButton onClick={() => handlePageChange(currentPage + 1)}>
            next
          </MyButton>
          <MyButton>last</MyButton>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
