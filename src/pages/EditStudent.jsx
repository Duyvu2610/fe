import Header from "../Header";
import MyButton from "../MyButton";
import { useNavigate } from "react-router-dom";

function EditStudent() {
  const navigate = useNavigate();
  return (
    <div className="w-[700px] ">
      <Header />
      <h2 className="uppercase text-center py-10 text-xl font-bold">Student</h2>
      <form action="" className="flex flex-col gap-4">
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Student Id:
          </label>
          <input type="text" className="border border-black w-[70px]" />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Student Code:
          </label>
          <input type="text" className="border border-black w-[150px]" />
          <MyButton className={`ml-14`}>Generate Code</MyButton>
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Student Name:
          </label>
          <input type="text" className="border border-black w-[150px]" />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Birth day:
          </label>
          <input type="date" className="border border-black w-[150px]" />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Address:
          </label>
          <input type="text" className="border border-black w-[300px]" />
        </div>
        <div className="flex w-full">
          <label htmlFor="" className="w-[20%]">
            Average:
          </label>
          <input type="text" className="border border-black w-[70px]" />
        </div>
        <div className="flex justify-center gap-4">
          <MyButton onClick={() => navigate("/students")}>Back</MyButton>
          <MyButton>Save</MyButton>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
