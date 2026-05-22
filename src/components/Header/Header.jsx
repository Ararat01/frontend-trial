import { useEffect, useRef, useState } from "react";
import "./Header.css";
import ArrowIcon from "../../icons/ArrowIcon";

const Header = () => {
  const [hidden, setHidden] = useState(false);

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

  return (
    <header className={`header ${hidden ? "header--hidden" : ""}`}>
      <div className="header-top container">
        <div style={{ flex: 1 }}></div>
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="search"></div>
      </div>

      <div className="border">
        <nav className="nav container">
          <button>
            <span>Demos</span>
            <ArrowIcon size={10} />
            <div className="dropDown">
              <ul>
                <li>
                  <a href="/post/header">Post Header</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/layout">Post Layout</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/share">Share Buttons</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/gallery">Gallery Post</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/video">Video Post</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
              </ul>
            </div>
          </button>
          <button>
            <span>Post</span>
            <ArrowIcon size={10} />
            <div className="dropDown">
              <ul>
                <li>
                  <a href="/post/header">Post Header</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/layout">Post Layout</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/share">Share Buttons</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/gallery">Gallery Post</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/video">Video Post</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
              </ul>
            </div>
          </button>
          <button>
            <span>Features</span>
            <ArrowIcon size={10} />
            <div className="dropDown">
              <ul>
                <li>
                  <a href="/post/header">Post Header</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/layout">Post Layout</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/share">Share Buttons</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/gallery">Gallery Post</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
                <li>
                  <a href="/post/video">Video Post</a>
                  <ArrowIcon size={8} rotate={-90} />
                </li>
              </ul>
            </div>
          </button>
          <button>
            <span>Categories</span>
            <ArrowIcon size={10} />
            <div className="dropDown">
              <ul>
                <li>
                  <a href="/post/header">Post Header</a>
                </li>
                <li>
                  <a href="/post/layout">Post Layout</a>
                </li>
                <li>
                  <a href="/post/share">Share Buttons</a>
                </li>
                <li>
                  <a href="/post/gallery">Gallery Post</a>
                </li>
                <li>
                  <a href="/post/video">Video Post</a>
                </li>
              </ul>
            </div>
          </button>
          <button>
            <span>Shop</span>
            <ArrowIcon size={10} />
            <div className="dropDown">
              <ul>
                <li>
                  <a href="/post/header">Post Header</a>
                </li>
                <li>
                  <a href="/post/layout">Post Layout</a>
                </li>
                <li>
                  <a href="/post/share">Share Buttons</a>
                </li>
                <li>
                  <a href="/post/gallery">Gallery Post</a>
                </li>
                <li>
                  <a href="/post/video">Video Post</a>
                </li>
              </ul>
            </div>
          </button>
          <a href="/buy">Buy Now</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
