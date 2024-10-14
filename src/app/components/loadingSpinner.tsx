export default function LoadingSpinner(): JSX.Element {
  return ( //displays loading spinner when data is loading on screen
    <div className="flex items-center justify-center h-screen">
      <div className="border-solid bg-cyan-900 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full border-8 border-t-8 border-cyan-700 border-t-cyan-200 w-16 h-16 m-4"></div>
        <span className="text-xl font-bold text-white  m-2">Loading...</span>
      </div>
    </div>
  );
}
