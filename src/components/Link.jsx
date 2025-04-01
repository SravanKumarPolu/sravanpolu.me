const Link = ({ page, selectedPage, setSelectedPage }) => {
  const isActive = selectedPage === page;

  return (
    <a
      href={`#${page.toLowerCase()}`}
      onClick={() => setSelectedPage(page)}
      className={`relative group py-2 px-4 text-lg transition duration-300 font-medium ${
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      }`}>
      {page}
      <span
        className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}></span>
    </a>
  );
};

export default Link;
