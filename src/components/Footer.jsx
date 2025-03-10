const Footer = () => {
  return (
    <footer className="flex justify-between items-center p-5 text-white relative z-10">
      <p className="text-sm">@{new Date().getFullYear()} motivatecore</p>
      <p className="text-sm">
        Made by{" "}
        <span
          className="font-bold cursor-pointer hover:text-gray-300 underline"
          onClick={() => window.open("https://zeropse.xyz/", "_blank")}
        >
          zeropse
        </span>
      </p>
      <p className="flex gap-4 text-sm">
        <a
          href="https://github.com/zeropse/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/zeropse/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-300"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
