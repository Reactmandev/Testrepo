import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserForm() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

 const onSubmit = async (data) => {
  try {
    await axios.post("http://localhost:3001/api/user", data);
    localStorage.setItem("user", JSON.stringify(data)); // also save locally
    nav("/display");
  } catch (err) {
    // If our ruuning server is fails then fallback to localStorage
    localStorage.setItem("user", JSON.stringify(data));
    nav("/display");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Employee</h2>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            {...register("firstName", { required: "First name is mandatory", minLength: {value: 2, message: "Min length is 2"} })}
            className={`form-input w-full px-4 py-2 border rounded-md focus:ring ${
              errors.firstName ? "border-red-500 ring-red-200" : "border-gray-300 ring-blue-200"
            }`}
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            {...register("lastName", { required: "Last name is mandatory", minLength: {value: 2, message: "Min length is 2"} })}
            className={`form-input w-full px-4 py-2 border rounded-md focus:ring ${
              errors.lastName ? "border-red-500 ring-red-200" : "border-gray-300 ring-blue-200"
            }`}
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="dob" className="block text-gray-700 mb-1">
            DOB
          </label>
          <input
            id="dob"
            type="date"
            {...register("dob", {
              required: "Date of birth is mandatory",
              validate: value => {
                const dob = new Date(value);
                const now = new Date();
                return dob < now || "DOB must be in the past";
              }
            })}
            className={`form-input w-full px-4 py-2 border rounded-md focus:ring ${
              errors.dob ? "border-red-500 ring-red-200" : "border-gray-300 ring-blue-200"
            }`}
          />
          {errors.dob && <p className="text-red-600 text-sm mt-1">{errors.dob.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 active:scale-95 transition"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
