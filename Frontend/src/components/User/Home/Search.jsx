import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Search() {
  const [allUser, setAllUser] = useState([]);
  // const navigate = useNavigate();
  const { username } = useParams();

  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(`/API/${username}/search/alluser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user_data = response.data; // Extract data from the response
          setAllUser(user_data); // Log or process the data
        } catch (error) {
          // navigate("/pagenotfound");
        }
      }
    }
    getData();
  }, []);

  const searchChangeHandler = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const filter_data = allUser.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(filter_data);
    }
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* action="/API/signin" */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search
          </label>
          <div className="mt-2">
            <input
              onChange={searchChangeHandler}
              value={wordEntered}
              id="username"
              name="username"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      {filteredData
        ? filteredData.map((user, idx) => (
            <>
              <div key={idx}>
                <a href={`/${user.username}`}>{user.username}</a>
                <br />
              </div>
            </>
          ))
        : ""}
    </>
  );
}

export default Search;
