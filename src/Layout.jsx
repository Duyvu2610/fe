function Layout({ children }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border  px-8 py-6 max-h-screen overflow-auto">
      {children}
    </div>
  );
}

export default Layout;
