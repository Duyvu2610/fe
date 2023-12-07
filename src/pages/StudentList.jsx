import { FaCaretDown } from "react-icons/fa";
import Header from "../Header";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";
function StudentList() {
  const navigate = useNavigate();
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
          <tr className="even:bg-gray-300">
            <td className="border border-black">1</td>
            <td className="border border-black">ABC001</td>
            <td className="border border-black">John Doe</td>
            <td className="border border-black">1990-05-15</td>
            <td className="border border-black">123 Main St, City</td>
            <td className="border border-black">85</td>
            <td className="border border-black">
              <a href="#">Edit</a>
            </td>
          </tr>
          <tr className="even:bg-gray-300">
            <td>2</td>
            <td>XYZ002</td>
            <td>Jane Smith</td>
            <td>1985-08-22</td>
            <td>456 Oak St, Town</td>
            <td>92</td>
            <td>
              <a href="#">Edit</a>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>PQR003</td>
            <td>Sam Johnson</td>
            <td>1998-02-10</td>
            <td>789 Pine St, Village</td>
            <td>78</td>
            <td>
              <a href="#">Edit</a>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="pt-10 flex justify-center gap-8">
        <div>
          <MyButton>first</MyButton>
          <MyButton>pre</MyButton>
        </div>
        <div>
          <MyButton>1</MyButton>
          <MyButton>2</MyButton>
          <MyButton>3</MyButton>
          <MyButton>4</MyButton>
        </div>
        <div>
          <MyButton>next</MyButton>
          <MyButton>last</MyButton>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
