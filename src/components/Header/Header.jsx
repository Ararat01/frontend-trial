import { useEffect, useRef, useState } from "react";
import "./Header.css";
import ArrowIcon from "../../icons/ArrowIcon";
import SearchIcon from "./../../icons/SearchIcon";
import { useNavigate } from "react-router-dom";

const dropDownItems = [
  {
    label: "Demos",
    href: "/demos",
    dropDown: [
      { label: "Demo 1", href: "/demos/1" },
      { label: "Demo 2", href: "/demos/2" },
      { label: "Demo 3", href: "/demos/3" },
    ],
  },
  {
    label: "Post",
    href: "/post",
    dropDown: [
      { label: "Post Header", href: "/post/header" },
      { label: "Post Layout", href: "/post/layout" },
      { label: "Share Buttons", href: "/post/share" },
      { label: "Gallery Post", href: "/post/gallery" },
      { label: "Video Post", href: "/post/video" },
    ],
  },
  {
    label: "Features",
    href: "/features",
    dropDown: [
      { label: "Feature 1", href: "/features/1" },
      { label: "Feature 2", href: "/features/2" },
      { label: "Feature 3", href: "/features/3" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    dropDown: [
      { label: "Email", href: "/contact/email" },
      { label: "Phone", href: "/contact/phone" },
    ],
  },
  {
    label: "Shop",
    href: "/shop",
    dropDown: [
      {
        label: "Shop Home",
        href: "/shop",
      },
      { label: "Cart", href: "/shop/cart" },
    ],
  },
];

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [inputState, setInputState] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const lastScrollY = useRef(0);
  const scrollDistance = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      if (currentScrollY <= 0) {
        setHidden(false);
        scrollDistance.current = 0;
      }
      if (isScrollingDown) {
        scrollDistance.current += currentScrollY - lastScrollY.current;

        if (scrollDistance.current >= 200) {
          setHidden(true);
        }
      } else {
        scrollDistance.current = 0;
        setHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = () => {
    if (inputState) {
      setInputState(false);
      navigate(`/?q=${encodeURIComponent(searchText)}`);
    } else {
      setInputState(true);
    }
  };

  return (
    <header className={`header ${hidden ? "header--hidden" : ""}`}>
      <div className="header-top container">
        <div style={{ flex: 1 }}></div>
        <img src="/logo.png" alt="Logo" className="logo" />
        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            style={{ visibility: inputState ? "visible" : "hidden" }}
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <SearchIcon size={16} />
          </button>
        </form>
      </div>

      <div className="border">
        <nav className="nav container">
          {dropDownItems.map((item, index) => (
            <button key={index}>
              <span>{item.label}</span>
              <ArrowIcon size={10} />
              <div className="dropDown">
                <ul>
                  {item.dropDown.map((dropItem, dropIndex) => (
                    <li key={dropIndex}>
                      <a href={dropItem.href}>{dropItem.label}</a>
                      <ArrowIcon size={8} rotate={-90} />
                    </li>
                  ))}
                </ul>
              </div>
            </button>
          ))}

          <a href="/buy">Buy Now</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
