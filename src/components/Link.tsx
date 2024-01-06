// Link.tsx

import AnchorLink from "react-anchor-link-smooth-scroll";
import { SelectedPage } from "../shared/types";
import React from "react";

type Props = {
  page?: string;
  src?: string;
  width?: number;
  className?: string;
  height?: number;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Link = ({
  page,
  src,
  width,
  className,
  height,
  selectedPage,
  setSelectedPage,
}: Props) => {
  const lowerCasePage = page
    ? (page.toLowerCase().replace(/ /g, "") as SelectedPage)
    : "";

  const handleClick = () => {
    if (src) {
      setSelectedPage(src as SelectedPage);
    } else {
      setSelectedPage(lowerCasePage as SelectedPage);
    }
  };

  return (
    <AnchorLink
      className={`flex flex-row  items-center  ${
        selectedPage === (src || lowerCasePage) ? "text-white " : "text-white "
      }
         transition duration-500   py-1 px-[.5px]
          `}
      href={`#${src || lowerCasePage}`}
      onClick={handleClick}>
      {src ? (
        <img
          src={src}
          className={className}
          alt=""
          width={width}
          height={height}
        />
      ) : (
        page
      )}
    </AnchorLink>
  );
};

export default Link;
