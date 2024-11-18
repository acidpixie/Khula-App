/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  updateFormData,
  setCurrentPage,
  setView,
} from "../store/progressSlice";

const api = axios.create({
  baseURL: 'https://graph.khuladev.co.za/graphql',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0NiwidXNlclJvbGVzIjpbeyJpZCI6MSwibmFtZSI6ImZhcm1lciJ9XSwiX19fX2todWxhX19zZWNyZXRfX19fIjoiNjIyMjIzMzM2NjQtMTY5ODI0ODI4MDYzNyIsImlhdCI6MTY5ODI0ODI4MH0.KH1SO9KpCveqI5sYKTBesoyjuce69ZKCbitdXChZTR0'
  }
});

const ProgressStep = ({
  number,
  title,
  status,
  subtitle = "Check if you qualify",
  className = "",
}) => {
  const getStatusDisplay = () => {
    if (status === "in-progress") {
      return (
        <div className="flex gap-0.5">
          <span className="text-green-600">●</span>
          <span className="text-green-600">●</span>
          <span className="text-green-600">●</span>
          <span className="text-gray-300">○</span>
          <span className="text-gray-300">○</span>
        </div>
      );
    }
    return null;
  };

  const getStatusText = () => {
    switch (status) {
      case "complete":
        return "Complete";
      case "in-progress":
        return "In Progress";
      case "up-next":
        return "Up Next";
      default:
        return "Last Step";
    }
  };

  return (
    <div className={`border-l ${status === "in-progress" ? "border-b-2 border-b-green-600" : ""} p-4 ${
      status === "up-next" || status === "pending" ? "bg-[#F7F7F7]" : ""
    } ${className}`}>
      <div
        className={`text-sm ${
          status === "complete" || status === "in-progress"
            ? "text-green-600"
            : "text-gray-400"
        }`}
      >
        {getStatusDisplay()}
        {getStatusText()}
      </div>
      <div className="font-medium">
        {number}. {title}
      </div>
      <div className="text-sm text-gray-500">{subtitle}</div>
    </div>
  );
};

const SidebarStep = ({ title, isComplete }) => (
  <div className="relative">
    <div className="flex items-center gap-3 py-2">
      <div
        className={`relative z-10 rounded-full w-[2.3rem] h-[2.3rem] border-2 flex items-center justify-center ${
          isComplete
            ? "border-green-600 bg-green-600"
            : "border-gray-300 bg-white"
        }`}
      >
        {isComplete && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <div>
        <div className="font-medium">{title}</div>
        {isComplete && <div className="text-sm text-green-600">Complete</div>}
      </div>
    </div>
    <div className="absolute left-[1.15rem] top-8 w-[2px] h-full bg-gray-300 -z-10" />
  </div>
);

const Input = ({ label, ...props }) => (
  <div className="relative">
    <input
      {...props}
      placeholder=" "
      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 peer"
    />
    <label className="absolute text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-placeholder-shown:px-4 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
      {label}
    </label>
  </div>
);

const FarmProfile = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.progress?.formData) || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.post('', {
          query: `
            query GetUserProfile {
              user {
                name
                surname
                farmer {
                  farm {
                    name
                  }
                }
              }
            }
          `
        });

        if (response.data.errors) {
          throw new Error(response.data.errors[0].message);
        }

        const userData = response.data.data.user;
        const farmData = {
          farmName: userData.farmer?.farm?.name || '',
          ownerName: `${userData.name} ${userData.surname}`,
        };
        dispatch(updateFormData(farmData));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await api.post('', {
        query: `
          mutation UpdateFarmProfile($input: UpdateFarmProfileInput!) {
            updateFarmProfile(input: $input) {
              success
              message
              farm {
                name
              }
            }
          }
        `,
        variables: {
          input: {
            farmName: formData.farmName,
            farmLocation: formData.farmLocation,
            isFullTime: formData.isFullTime,
            farmBackground: formData.farmBackground,
            farmOwnership: formData.farmOwnership,
            hectaresLeased: parseFloat(formData.hectaresLeased),
            leaseLength: formData.leaseLength,
            hectaresOwned: parseFloat(formData.hectaresOwned),
            irrigatedHectares: parseFloat(formData.irrigatedHectares),
            drylandHectares: parseFloat(formData.drylandHectares),
          }
        }
      });

      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }

      handleSaveAndClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndClose = () => {
    dispatch(updateFormData({ ...formData, applicationStarted: true }));
    dispatch(setCurrentPage("dashboard"));
    dispatch(setView("detailed"));
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50">
      {/* Progress Header - Scrollable on mobile */}
      <div className="bg-white border-b">
        <div className="container-fluid overflow-x-auto">
          <div className="flex min-w-[768px]">
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="p-4 border w-24 flex-shrink-0 flex flex-col items-center"
            >
              <span className="text-2xl font-light mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
              <span className="text-sm text-center">
                Save
                <br />
                and close
              </span>
            </button>
            <div className="flex-1 grid grid-cols-5 border">
              <ProgressStep status="complete" number="1" title="Credit Check" />
              <ProgressStep status="complete" number="2" title="KYC" />
              <ProgressStep status="in-progress" number="3" title="Farm Profile" />
              <ProgressStep status="up-next" number="4" title="Financial Information" />
              <ProgressStep status="pending" number="5" title="Uploads" subtitle="Supporting Documents" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-fluid mx-1 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-80 bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">3. Farm Profile</h2>
            <p className="text-gray-600 mb-6">
              Give us some basic farm details
            </p>
            <div className="relative">
              <div className="absolute left-[1.15rem] top-0 w-[2px] h-full bg-gray-300"></div>
              <div className="relative space-y-4">
                <SidebarStep title="Farm / Company Overview" isComplete={true} />
                <SidebarStep title="3-year Production History" isComplete={false} />
                <SidebarStep title="Production Plan 2024" isComplete={false} />
                <SidebarStep title="Risks" isComplete={false} />
                <SidebarStep title="Customers & Suppliers" isComplete={false} />
                <SidebarStep title="Your Team" isComplete={false} />
              </div>
            </div>
          </div>

          {/* Main Form Content */}
          <div className="flex-1 bg-white p-6 rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-600 text-sm">Loading profile...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">Error loading profile</p>
                <p className="text-sm text-red-500 mt-1">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-sm text-red-600 hover:text-red-700 underline"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl mb-6">Farm / Company Overview</h3>

                <div className="space-y-6 mb-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      name="farmName"
                      label="Farm Name"
                      value={formData.farmName || ""}
                      onChange={handleChange}
                    />
                    <Input
                      name="farmLocation"
                      label="Farm Location"
                      value={formData.farmLocation || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Are you a full-time farmer?
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={() => dispatch(updateFormData({ isFullTime: "yes" }))}
                      className={`px-6 py-2 rounded-md ${
                        formData.isFullTime === "yes"
                          ? "bg-green-600 text-white"
                          : "border border-gray-300"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => dispatch(updateFormData({ isFullTime: "no" }))}
                      className={`px-6 py-2 rounded-md ${
                        formData.isFullTime === "no"
                          ? "bg-green-600 text-white"
                          : "border border-gray-300"
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Describe your farm background
                  </label>
                  <textarea
                    name="farmBackground"
                    value={formData.farmBackground || ""}
                    onChange={handleChange}
                    rows={6}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>

                <div>
                  <label className="text-gray-600">
                    Is your farm owned or leased?
                  </label>
                  <div className="flex flex-wrap gap-4 mt-2 mb-2">
                    {["Leased", "Owned", "Both"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          dispatch(updateFormData({ farmOwnership: option.toLowerCase() }))
                        }
                        className={`px-8 py-2 rounded-lg ${
                          formData.farmOwnership === option.toLowerCase()
                            ? "bg-green-600 text-white"
                            : "border border-gray-300 text-gray-600"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {(formData.farmOwnership === "leased" || formData.farmOwnership === "both") && (
                  <div className="space-y-3 mb-2">
                    <h4 className="text-gray-600">Leasing information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        type="number"
                        name="hectaresLeased"
                        label="Hectares Leased"
                        value={formData.hectaresLeased || ""}
                        onChange={handleChange}
                      />
                      <Input
                        type="text"
                        name="leaseLength"
                        label="Length of Lease"
                        value={formData.leaseLength || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                )}

                {(formData.farmOwnership === "owned" || formData.farmOwnership === "both") && (
                  <div className="space-y-3 mb-2">
                    <h4 className="text-gray-600">Owned land information</h4>
                    <Input
                      type="number"
                      name="hectaresOwned"
                      label="Hectares Owned"
                      value={formData.hectaresOwned || ""}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-gray-600">Irrigation Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-2">
                    <Input
                      type="number"
                      name="irrigatedHectares"
                      label="Irrigated Hectares"
                      value={formData.irrigatedHectares || ""}
                      onChange={handleChange}
                    />
                    <Input
                      type="number"
                      name="drylandHectares"
                      label="Dryland Hectares"
                      value={formData.drylandHectares || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleSaveAndClose}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded w-full sm:w-auto"
                    disabled={loading}
                  >
                    Save and Close
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full sm:w-auto ${
                      loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {loading ? 'Saving...' : 'Next'}
                  </button>
                </div>
                
                {error && (
                  <div className="mt-4 text-red-600 text-sm">
                    Error: {error}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FarmProfile;