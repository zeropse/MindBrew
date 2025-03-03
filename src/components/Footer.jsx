const Footer = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <p className="text-sm">
        @{new Date().getFullYear()} motivatecore. All rights reserved.
      </p>
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
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/zeropse/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </div>
  );
};

export default Footer;
