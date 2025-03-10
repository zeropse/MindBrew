const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
      <span className="ml-4 text-xl">Fetching your quote...</span>
    </div>
  );
};

export default Loading;
