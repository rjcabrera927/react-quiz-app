function AppLayout({ children }) {
  return (
    <div className='shadow bg-white rounded max-w-4xl mx-auto mt-5 p-5 text-black'>
      {children}
    </div>
  );
}

export default AppLayout;
