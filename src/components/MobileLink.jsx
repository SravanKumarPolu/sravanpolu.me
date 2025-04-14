const MobileLink = ({ page, selectedPage, setSelectedPage }) => {
  const isActive = selectedPage === page;

  return (
    <a
      href={`#${page.toLowerCase()}`}
      onClick={() => setSelectedPage(page)}
      className={`block w-full text-center py-2 px-4 text-base rounded-md transition duration-300 font-medium ${
        isActive
          ? "text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-md"
          : "text-gray-700 hover:text-white hover:bg-gray-700"
      }`}>
      {page}
    </a>
  );
};

export default MobileLink;
