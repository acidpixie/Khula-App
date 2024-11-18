/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from 'react-redux';
import { setView, setCurrentPage } from '../store/progressSlice';
import ProgressTracker from "./ProgressTracker";

const Dashboard = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.progress.view);
  const formData = useSelector((state) => state.progress.formData);
  const isDetailed = view === 'detailed';

  const hasStarted = formData?.applicationStarted === true;

  //console.log('formData:', formData);
  //console.log('hasStarted:', hasStarted);


  const sections = [
    {
      status: "complete",
      title: "Credit Check",
      subtitle: "Check if you qualify",
      items: [
        {
          label: "Score",
          value: "642",
          status: "complete",
        },
      ],
      issues: [
        { label: "Issue 1", value: "Too many enquiries" },
        { label: "Issue 2", value: "Overdrawn Accounts" },
        { label: "Issue 3", value: "2 Judgements" },
      ],
    },
    {
      status: "complete",
      title: "KYC",
      subtitle: "Check if you qualify",
      items: [
        { label: "Applicant Details", status: "complete" },
        { label: "Company Details", status: "complete" },
        { label: "Director Details", status: "complete" },
        { label: "Banking Details", status: "complete" },
        { label: "3-year Production History", status: "complete" },
      ],
    },
    {
      status: "in-progress",
      title: "Farm Profile",
      subtitle: "Check if you qualify",
      items: [
        { label: "Farm / Company Overview", status: "complete" },
        { label: "Farm Description", status: "in-progress" },
        { label: "Machinery and equipment", status: "in-progress" },
        { label: "3-year Production History", status: "in-progress" },
        { label: "Production Plan 2024", status: "in-progress" },
        { label: "Risks", status: "in-progress" },
        { label: "Irrigation", status: "in-progress" },
        { label: "Customers & Suppliers", status: "in-progress" },
      ],
    },
    {
      status: "up-next",
      title: "Financial Information",
      subtitle: "Check if you qualify",
      items: [
        { label: "Historical Performance", status: "pending" },
        { label: "Cashflow - Revenue", status: "pending" },
        { label: "Cashflow - Production", status: "pending" },
        { label: "Cashflow - Operational", status: "pending" },
        { label: "Assets", status: "pending" },
        { label: "Liabilities", status: "pending" },
        { label: "CAPEX", status: "pending" },
        { label: "Funding Ask", status: "pending" },
      ],
    },
    {
      status: "last-step",
      title: "Uploads",
      subtitle: "Supporting Documents",
      items: [
        { label: "COR 14.3", status: "pending" },
        { label: "2022 AFS", status: "pending" },
        { label: "2023 AFS", status: "pending" },
        { label: "2024 AFS", status: "pending" },
        { label: "6 months bank statements", status: "pending" },
        { label: "Directors ID's", status: "pending" },
        { label: "Applicant ID", status: "pending" },
        { label: "Water Rights", status: "pending" },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Layout */}
      <div className="block md:hidden p-4 mx-5 text-[#3E3E3E] space-y-4">
        <div>
          <div className="text-2xl font-bold">Your Application Checklist</div>
          <p>Complete the following to submit an application</p>
        </div>

        <div>
          <button 
            onClick={() => dispatch(setCurrentPage('farmProfile'))}
            className="w-full bg-[#3A7D3E] text-white py-2 px-4 text-base rounded-md hover:bg-[#2ea268] transition duration-300 shadow-md"
          >
            {hasStarted ? "Continue Application" : "Start Application"}
          </button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center p-4 mx-5 text-[#3E3E3E]">
        <div>
          <div className="text-2xl font-bold">Your Application Checklist</div>
          <p>Complete the following to submit an application</p>
        </div>

        <div className="flex gap-4">         
          <button 
            onClick={() => dispatch(setCurrentPage('farmProfile'))}
            className="bg-[#3A7D3E] text-white py-4 px-6 text-xl rounded-md hover:bg-[#2ea268] transition duration-300 shadow-md"
          >
            {hasStarted ? "Continue Application" : "Start Application"}
          </button>
        </div>
      </div>

      <ProgressTracker 
        sections={sections} 
        variant={isDetailed ? "detailed" : "default"} 
      />
    </>
  );
};

export default Dashboard;