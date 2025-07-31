import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-8 text-white z-10">
      <p className="text-md">@{new Date().getFullYear()} MindBrew</p>
      <p className="text-md">
        Made by{" "}
        <span
          className="font-bold cursor-pointer hover:text-gray-300 hover:underline"
          onClick={() => window.open("https://zeropse.org/", "_blank")}
        >
          zeropse
        </span>
      </p>
      <div className="flex gap-4 text-md">
        <a
          href="https://github.com/zeropse/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
          aria-label="GitHub"
        >
          <Github size={25} />
        </a>
        <a
          href="https://www.linkedin.com/in/zeropse/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
          aria-label="LinkedIn"
        >
          <Linkedin size={25} />
        </a>
        <a
          href="https://twitter.com/zeropse"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
          aria-label="Twitter"
        >
          <Twitter size={25} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
