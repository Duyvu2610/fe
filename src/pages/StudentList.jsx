import { FaCaretDown } from "react-icons/fa";
import Header from "../Header";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MyInput from "../MyInput";
import axios from "axios";
function StudentList() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [asc, setAsc] = useState(true);
  const [stName, setStName] = useState("");
  const [stCode, setStCode] = useState("");
  const [stBirth, setStBirth] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState(false);

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/v1/students?name=${stName}&stCode=${stCode}&dob=${stBirth}&page=${currentPage}&sortBy=${sortBy}&sortOrder=${
        asc ? "asc" : "desc"
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.data.content);
        setTotalPages(data.data.totalPages);
        setSize(data.data.size);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [currentPage, sortBy, asc, isSearch]);
  const handlePageChange = (newPage) => {
    // Xử lý sự kiện chuyển trang
    setCurrentPage(newPage);
  };
  const handleSort = (e, sort) => {
    e.preventDefault();
    setSortBy(sort);
    setAsc(!asc);
  };
  const handleFindStudent = (e) => {
    e.preventDefault();
    const selectedDate = new Date(stBirth);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      alert("Ngày không hợp lệ");
    } else {
      setIsSearch(() => !isSearch);
      setCurrentPage(0);
    }
  };
  const handleEditStudent = (e) => {};
  const handleDeleteStudent = async (studentId) => {
    console.log("hihi");
    try {
      await axios.delete(`http://localhost:8080/api/v1/students/${studentId}`);
      alert("Delete Success");
      setIsShowPopup(false);
      setIsSearch(() => !isSearch);
    } catch (error) {
      alert("Delete Failed");
    }
  };

  return (
    <div className="w-[1000px] ">
      {/* pop up */}
      {isShowPopup && (
        <div className="transition-all duration-200 ">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        class="h-6 w-6 text-red-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <button
                        class="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Deactivate account
                      </button>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500">
                          Are you sure you want to deactivate your account? All
                          of your data will be permanently removed. This action
                          cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() =>
                      handleDeleteStudent(localStorage.getItem("removeId"))
                    }
                  >
                    Deactivate
                  </button>
                  <button
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header />
      <form className="py-20 px-10 flex gap-8">
        <div className="w-[50%]  flex flex-col gap-5">
          <div className="flex justify-between">
            <label htmlFor="stCode">Student Code:</label>
            <MyInput
              type="text"
              id="stCode"
              value={stCode}
              onChange={(e) => setStCode(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="stName">Student Name:</label>
            <MyInput
              type="text"
              id="stName"
              value={stName}
              onChange={(e) => setStName(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="bd">Birthday:</label>
            <MyInput
              type="date"
              id="bd"
              value={stBirth}
              onChange={(e) => setStBirth(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col justify-end gap-3">
          <MyButton onClick={(e) => handleFindStudent(e)}>Search</MyButton>
          <MyButton onClick={() => navigate("/students/add")}>
            Add Student
          </MyButton>
        </div>
      </form>

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 border  overflow-scroll">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              <button
                className="flex items-center"
                onClick={(e) => handleSort(e, "studentStudentId")}
              >
                No
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                className="flex items-center"
                onClick={(e) => handleSort(e, "studentStudentCode")}
              >
                Code
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                className="flex items-center"
                onClick={(e) => handleSort(e, "studentStudentName")}
              >
                Name
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                className="flex items-center"
                onClick={(e) => handleSort(e, "dateOfBirth")}
              >
                Birthday
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button className="flex items-center">
                Address
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button
                className="flex items-center"
                onClick={(e) => handleSort(e, "averageScore")}
              >
                Score
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
            <th scope="col" className="px-6 py-3">
              <button className="flex items-center">
                Edit
                <div href="#">
                  <svg
                    className="w-3 h-3 ms-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </div>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={index}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {student.studentId}
              </th>
              <td className="px-6 py-4">{student.studentCode}</td>
              <td className="px-6 py-4">{student.studentName}</td>
              <td className="px-6 py-4">
                {new Date(student.dateOfBirth).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{student.address}</td>
              <td className="px-6 py-4">{student.averageScore}</td>
              <td className="px-6 py-4 ">
                <a
                  href={`/students/edit/${student.studentId}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
                <button
                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  onClick={() => {
                    localStorage.setItem("removeId", student.studentId);
                    setIsShowPopup(true);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pt-10 flex justify-center gap-8">
        <div>
          <MyButton onClick={() => handlePageChange(0)}>first</MyButton>
          <MyButton
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage > 0 ? "" : "pointer-events-none opacity-50"}
          >
            pre
          </MyButton>
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <MyButton
              key={index}
              onClick={() => handlePageChange(index)}
              className={index === currentPage ? "text-white bg-blue-800" : ""}
            >
              {index + 1}
            </MyButton>
          ))}
        </div>
        <div>
          <MyButton
            onClick={() => handlePageChange(currentPage + 1)}
            className={
              currentPage < totalPages - 1
                ? ""
                : "pointer-events-none opacity-50"
            }
          >
            next
          </MyButton>
          <MyButton onClick={() => handlePageChange(totalPages - 1)}>
            last
          </MyButton>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
