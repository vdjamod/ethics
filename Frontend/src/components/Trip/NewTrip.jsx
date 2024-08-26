import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/Ethics_Logo.png";

export default function NewTrip() {
  const { username } = useParams();
  const [visitedPlace, setVisitedPlace] = useState(1);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // <div className="place">
  //   <input
  //     id="destination"
  //     name="destination"
  //     type="text"
  //     required
  //     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  //   />
  // </div>;
  const clickHandlerPlace = () => {
    setVisitedPlace(visitedPlace + 1);
    let placeDiv = document.getElementById("place");
    let newInput = document.createElement("input");
    newInput.id = "destination";
    newInput.name = `destination${visitedPlace}`;
    newInput.required = true;
    newInput.className +=
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    placeDiv.appendChild(newInput);
  };

  // const handelChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handelSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log(formData);

  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (token) {
  //     try {
  //       const response = await axios
  //         .post(`/API/${username}/newtrip`, formData, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         })
  //         .then(() => {
  //           navigate(`/${formData.username}/home`);
  //         })
  //         .catch((error) => {
  //           alert(error);
  //         });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }
  // };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-24 w-auto " src={Logo} alt="Your Company" />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            New Trip
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action={`http://127.0.0.1:8000/API/${username}/newtrip`}
            // onSubmit={handelSubmit}
            method="post"
          >
            <div>
              <label
                htmlFor="Trip_Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Trip Name
              </label>
              <div className="mt-2">
                <input
                  // onChange={handelChange}
                  id="Trip_Name"
                  name="Trip_Name"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date
              </label>
              <div className="mt-2">
                <input
                  // onChange={handelChange}
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="status"
                className=" text-sm font-medium leading-6 text-gray-900 mr-4"
              >
                Status :
              </label>
              <input
                // onChange={handelChange}
                id="status"
                name="status"
                type="radio"
                value={"future"}
                required
                className=" rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              Future
              <input
                // onChange={handelChange}
                id="status"
                name="status"
                type="radio"
                value={"current"}
                required
                className="ml-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              Current
              <input
                // onChange={handelChange}
                id="status"
                name="status"
                type="radio"
                value={"past"}
                required
                className="ml-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              Past
            </div>

            <div>
              <label
                htmlFor="source"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Source
              </label>
              <div className="mt-2">
                <input
                  // onChange={handelChange}
                  id="source"
                  name="source"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="destination1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Visit Place
                </label>
              </div>
              <div className="mt-2">
                <div id="place">
                  <input
                    // onChange={handelChange}
                    id="destination"
                    name="destination"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <button
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  type="button"
                  onClick={clickHandlerPlace}
                >
                  Add Place
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="discription"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discription
              </label>
              <div className="mt-2">
                <textarea
                  // onChange={handelChange}
                  id="discription"
                  name="discription"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="friends"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Friends
              </label>
              <div className="mt-2">
                <input
                  // onChange={handelChange}
                  id="friends"
                  name="friends"
                  type="text"
                  autoComplete="friends"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a Photos</span>
                <input
                  // onChange={handelChange}
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                />
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
