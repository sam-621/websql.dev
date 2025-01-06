export const MobileWarning = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-center text-4xl font-semibold">
          WebSQL is not supported on mobile devices
        </h1>
        <p className="text-center text-lg">Please use a desktop browser to access WebSQL</p>
      </div>
    </div>
  );
};
