const CreditCheck = () => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Score</span>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-red-600">642</span>
            <span className="text-sm text-gray-500">Low Score</span>
          </div>
        </div>
  
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Status</span>
          <span className="text-xl font-bold text-red-600">High Risk</span>
        </div>
  
        <div className="flex flex-col gap-2 mt-2">
          <span className="text-sm font-medium">Issues</span>
          <ul className="space-y-2">
            <li className="text-sm text-gray-700">Too many enquiries</li>
            <li className="text-sm text-gray-700">Overdrawn Accounts</li>
            <li className="text-sm text-gray-700">2 Judgements</li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default CreditCheck;