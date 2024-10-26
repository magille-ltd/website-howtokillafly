export default function PageContainer({ children }) {
  return (
    <div className="flex flex-col items-center justify-start text-white pb-12 max-w-7xl mx-auto px-4">
      {children}
    </div>
  );
}
