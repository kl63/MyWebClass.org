import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect } from "react";

const Footer = () => {
  const { copyright, footer_content } = config.params;

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_element"
      );
    };
  }, []);

  return (
    <footer className="section relative mt-12 pt-[70px] pb-[50px]">
      <ImageFallback
        className="-z-[1] object-cover object-left  md:object-top"
        src="https://njit-wis.github.io/project-2-future-ceos/images/footer-bg-shape.png"
        alt="footer background"
        fill={true}
      />
      <div className="container text-center">
        <div className="mb-6 inline-flex">
          <Logo />
        </div>
        {markdownify(footer_content, "p", "max-w-[638px] mx-auto")}

        {/* footer menu */}
        <ul className="mb-12 mt-6 flex-wrap space-x-2 lg:space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block" key={menu.name}>
              <Link
                href={menu.url}
                className="p-2 font-bold text-dark hover:text-primary dark:text-darkmode-light lg:p-4"
              >
                {menu.name}
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <div className="inline-flex">
          <Social source={social} className="socials mb-12 justify-center" />
        </div>
        {/* google translate bar */}
        <div id="google_element"></div>

        {/* copyright */}
        {markdownify(copyright, "p")}
      </div>
    </footer>
  );
};

export default Footer;
