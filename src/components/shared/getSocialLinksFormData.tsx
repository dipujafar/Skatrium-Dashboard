
import { FaFacebook, FaInstagram, FaLink, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa6";

const socialMediaLink = {
  facebook: <FaFacebook size={28} />,
  instagram: <FaInstagram size={28} />,
  linkedin: <FaLinkedin size={28}/>,
  twitter: <FaTwitter size={28}/>,
  youtube: <FaYoutube size={28}/>,
  tiktok: <FaTiktok size={28}/>,
}
export const getSocialLinks = (socialLink: Record<string, string>) => {
  return Object.entries(socialMediaLink)
    .filter(([key]) => socialLink?.[key])
    .map(([key, icon]) => ({
      icon,
      link: socialLink[key],
    }))
}