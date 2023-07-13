import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Home = ({ setResult }) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      currentPosition: "",
      currentLength: "",
      currentTechnologies: "",
      terms: "",
    },

    validationSchema: Yup.object({
      fullName: Yup.string()
        .max(20, "Name must be 20 Character or less")
        .required("Name is required"),
      currentPosition: Yup.string().required("Current Position is required"),
      currentLength: Yup.string().required("how many years is required"),
      currentTechnologies: Yup.string().required(
        "Current Technologies is required"
      ),
      terms: Yup.array().required("Terms of service must be checked"),
    }),
  });
  console.log(formik.values);

  const [headshot, setHeadshot] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddCompany = () =>
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);

  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const {
      fullName,
      currentPosition,
      currentLength,
      currentTechnologies,
      terms,
    } = formik.values;

    const formData = new FormData();
    formData.append("headshotImage", headshot, headshot.name);
    formData.append("fullName", fullName);
    formData.append("currentPosition", currentPosition);
    formData.append("currentLength", currentLength);
    formData.append("currentTechnologies", currentTechnologies);
    formData.append("workHistory", JSON.stringify(companyInfo));

    axios
      .post("http://localhost:4000/resume/create", formData, {})
      .then((res) => {
        if (res.data.message) {
          setResult(res.data.data);
          navigate("/resume");
        }
      })
      .catch((err) => console.error(err));

    setLoading(true);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <div className="bg-white flex flex-col items-center rounded-lg w-1/2 font-latoRegular overflow-scroll	">
        <h1 className="text-4xl font-bold items-center underline p-3 tracking-tighter text-gray-700">
          RESUME - BUILDER
        </h1>
        <p>Generate a resume with ChatGPT in few seconds</p>
        <form
          onSubmit={handleFormSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <label
            className={`text-lg font-bold text-gray-900 ${
              formik.touched.fullName && formik.errors.fullName
                ? "text-red-400"
                : ""
            }`}
            htmlFor="fullName"
          >
            {formik.touched.fullName && formik.errors.fullName
              ? formik.errors.fullName
              : "Full Name"}
          </label>
          <input
            className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
            type="text"
            required
            name="fullName"
            id="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="enter your full name"
          />
          <div>
            <div>
              <label
                className={`text-lg font-bold text-gray-900 ${
                  formik.touched.currentPosition &&
                  formik.errors.currentPosition
                    ? "text-red-400"
                    : ""
                }`}
                htmlFor="currentPosition"
              >
                {formik.touched.currentPosition && formik.errors.currentPosition
                  ? formik.errors.currentPosition
                  : "Current Position"}
              </label>
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                type="text"
                required
                name="currentPosition"
                value={formik.values.currentPosition}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="enter your current position"
              />
            </div>
            <div>
              <label
                className={`text-lg font-bold text-gray-900 ${
                  formik.touched.currentLength && formik.errors.currentLength
                    ? "text-red-400"
                    : ""
                }`}
                htmlFor="currentLength"
              >
                {formik.touched.currentLength && formik.errors.currentLength
                  ? formik.errors.currentLength
                  : "Years of Experience"}
              </label>
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                type="text"
                required
                name="currentLength"
                value={formik.values.currentLength}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="enter your experience for how long ?"
              />
            </div>
            <div>
              <label
                className={`text-lg font-bold text-gray-900 ${
                  formik.touched.currentTechnologies &&
                  formik.errors.currentTechnologies
                    ? "text-red-400"
                    : ""
                }`}
                htmlFor="currentTechnologies"
              >
                {formik.touched.currentTechnologies &&
                formik.errors.currentTechnologies
                  ? formik.errors.currentTechnologies
                  : "Technologies Used"}
              </label>
              <input
                className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                type="text"
                required
                name="currentTechnologies"
                value={formik.values.currentTechnologies}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="enter technologies used"
              />
            </div>
          </div>
          <label className="text-sm font-bold text-gray-900" htmlFor="photo">
            Upload your headshot image
          </label>
          <input
            className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
            type="file"
            name="photo"
            required
            id="photo"
            accept="image/x-png,image/jpeg"
            // value={formik.values.photo}
            onChange={(e) => setHeadshot(e.target.files[0])}
          />

          <h3 className="text-lg font-bold text-gray-900">
            Companies you've worked at
          </h3>

          {companyInfo.map((company, index) => (
            <div className="nestedContainer" key={index}>
              <div className="companies">
                <label
                  className={`text-lg font-bold text-gray-900 ${
                    formik.touched.companyName && formik.errors.companyName
                      ? "text-red-400"
                      : ""
                  }`}
                  htmlFor="companyName"
                >
                  {formik.touched.companyName && formik.errors.companyName
                    ? formik.errors.companyName
                    : "Company Name"}
                </label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                  type="text"
                  name="companyName"
                  required
                  value={companyInfo[index].companyName}
                  onChange={(e) => handleUpdateCompany(e, index)}
                  onBlur={formik.handleBlur}
                  placeholder="enter company name"
                />
              </div>
              <div className="companies">
                <label
                  className={`text-lg font-bold text-gray-900 ${
                    formik.touched.position && formik.errors.position
                      ? "text-red-400"
                      : ""
                  }`}
                  htmlFor="position"
                >
                  {formik.touched.position && formik.errors.position
                    ? formik.errors.position
                    : "Position Held"}
                </label>
                <input
                  className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                  type="text"
                  name="position"
                  required
                  value={companyInfo[index].position}
                  onChange={(e) => handleUpdateCompany(e, index)}
                  onBlur={formik.handleBlur}
                  placeholder="enter position"
                />
              </div>

              <div className="btn__group">
                {companyInfo.length - 1 === index && companyInfo.length < 4 && (
                  <button id="addBtn" onClick={handleAddCompany}>
                    Add
                  </button>
                )}
                {companyInfo.length > 1 && (
                  <button
                    id="deleteBtn"
                    onClick={() => handleRemoveCompany(index)}
                  >
                    Del
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex gap-2 pt-2">
            <input
              onChange={formik.handleChange}
              type="checkbox"
              name="terms"
              value="checked"
              className="h-5 w-5 text-teal-500 border-2 focus:border-teal-500 focus:ring-teal-500"
            />
            <p className="text-sm font-latoBold text-gray-500">
              I agree to the terms and given details are all valid !
            </p>
          </div>

          <button className="bg-teal-600 font-latoBold text-lg text-white py-5 mt-6 rounded-lg w-full">
            CREATE RESUME
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
