import './LoadingPage.css';

function LoadingPage(){
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-center">
        {/* Modern Logo/Icon */}
        <div className="mb-8">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md animate-spin-slow"></div>
            </div>
          </div>
        </div>

        {/* Clean Typography */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Blog
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Loading content...
          </p>
        </div>

        {/* Minimal Progress Indicator */}
        <div className="w-48 mx-auto mb-6">
          <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-progress"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoadingPage;