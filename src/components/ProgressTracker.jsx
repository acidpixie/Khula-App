import PropTypes from 'prop-types';
import CreditCheck from './CreditCheck';

const ProgressTracker = ({ sections, variant = 'default' }) => {
  const getCircleStyle = (status) => {
    if (variant === 'default') return 'border-gray-300 bg-white';
    
    switch (status) {
      case 'complete':
        return 'border-green-600 bg-green-600';
      case 'in-progress':
        return 'border-gray-300 bg-white';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  const getSectionStatus = (status) => {
    if (variant === 'default') return null; 
    
    switch (status) {
      case 'complete':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <span className="font-medium">Complete</span>
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <div className="w-2 h-2 rounded-full bg-green-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <span>In Progress</span>
          </div>
        );
      case 'up-next':
        return (
          <div className="text-gray-600">
            <span>Up Next</span>
          </div>
        );
      case 'last-step':
        return (
          <div className="text-gray-600">
            <span>Last Step</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-2 md:p-6 overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between min-w-[768px] md:min-w-0 gap-4">
        {sections.map((section, index) => (
          <div key={index} className="w-full md:w-1/5 border p-4 rounded-lg">
            <div className="flex flex-col">
              {variant === 'detailed' && getSectionStatus(section.status)}
              <h3 className="text-lg font-semibold mb-2">
                {index + 1}. {section.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{section.subtitle}</p>
              
              {section.items && (
                <div className="relative">
                  <div className="absolute left-[1.15rem] top-0 w-[2px] h-full bg-gray-300 -z-10"></div>
                  <div className="space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-[2.3rem] h-[2.3rem] border-2 rounded-full ${getCircleStyle(item.status)}`}>
                          {variant === 'detailed' && item.status === 'complete' && (
                            <div className="flex items-center justify-center h-full">
                              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate">{item.label}</span>
                          {variant === 'detailed' && item.status === 'complete' && (
                            <span className="text-sm text-green-600">Complete</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {section.title === "Credit Check" && variant === "detailed" && (
                <div className="mt-4">
                  <CreditCheck />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressTracker.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['complete', 'in-progress', 'up-next', 'last-step']).isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          status: PropTypes.oneOf(['complete', 'in-progress', 'pending']).isRequired,
          value: PropTypes.string
        })
      )
    })
  ).isRequired,
  variant: PropTypes.oneOf(['default', 'detailed'])
};

export default ProgressTracker;