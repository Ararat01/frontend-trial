import { useEffect, useRef, useState } from "react";
import "./Header.css";
import ArrowIcon from "../../icons/ArrowIcon";
import SearchIcon from "./../../icons/SearchIcon";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import CloseIcon from "../../icons/CloseIcon";
import BurgerIcon from "./../../icons/BurgerIcon";

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
  const [searchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const query = searchParams.get("q");
  const [searchText, setSearchText] = useState(query || "");
  const [openIndex, setOpenIndex] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputState) {
      navigate(`/?q=${encodeURIComponent(searchText)}`);
    }
  };

  return (
    <header className={`header ${hidden ? "header--hidden" : ""}`}>
      <div
        className={`header-top container ${inputState ? "search-active" : ""}`}
      >
        <div className="mobile">
          <div className="mobile-menu">
            <button
              className="burger-button"
              onClick={() => setMobileMenuOpen(true)}
            >
              <BurgerIcon />
            </button>
            <div
              className={`overlay ${mobileMenuOpen ? "open" : ""}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}
              >
                <div className="mobile-nav-header">
                  <Link
                    to="/"
                    className="logo-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img src="/logo.png" alt="Logo" className="logo" />
                  </Link>
                  <button
                    className="close-button"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
                <div className="mobile-nav-content">
                  <div className="mobile-nav-content">
                    {dropDownItems.map((item, index) => (
                      <div key={index} className="mobile-nav-item">
                        <button
                          className="mobile-nav-item-button"
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                        >
                          <span>{item.label}</span>
                          <ArrowIcon
                            size={10}
                            rotate={openIndex === index ? 180 : 0}
                          />
                        </button>

                        <div
                          className={`mobile-dropDown ${
                            openIndex === index ? "opened" : ""
                          }`}
                        >
                          {item.dropDown.map((dropItem, dropIndex) => (
                            <Link
                              key={dropIndex}
                              to={dropItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {dropItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <a className="mobile-nav-item-button" href="/buy">
                      <span>Buy Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Logo" className="logo" />
        </Link>
        <form
          className="search"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className={inputState || searchText ? "visible" : "hidden"}
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              if (inputState) {
                setSearchText("");
                navigate("/");
              } else {
                setInputState(true);
              }
            }}
          >
            {searchText ? (
              <CloseIcon size={"16px"} />
            ) : (
              <SearchIcon size={"16px"} />
            )}
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
                      <Link to={dropItem.href}>{dropItem.label}</Link>
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
