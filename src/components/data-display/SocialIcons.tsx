import { SocialIcon } from "react-social-icons";
import { usePortfolio } from "@/hooks/usePortfolio";

const SocialIcons = () => {
  const { socialLinks } = usePortfolio();

  return (
    <div className="flex gap-4">
      {socialLinks.map((socialLink, index) => (
        <a
          key={index}
          href={socialLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-110"
        >
          <SocialIcon
            url={socialLink.url}
            fgColor="currentColor"
            bgColor="transparent"
            style={{
              width: "40px",
              height: "40px",
              color: "currentColor",
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
