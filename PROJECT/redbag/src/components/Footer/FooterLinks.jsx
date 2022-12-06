import LinkList from "./LinkList";

const LINKLISTS = [
  {
    title: "Company",
    links: [
      {
        name: "RedBag",
        to: "/company/about",
      },
      {
        name: "Partners",
        to: "/company/partners",
      },
      {
        name: "Career",
        to: "/company/career",
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        name: "T&C for Sellers",
        to: "/legal/tac/sellers",
      },
      {
        name: "T&C for Buyers",
        to: "/legal/tac/buyers",
      },
      {
        name: "Privacy Policy",
        to: "/legal/privacy_policy",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        name: "Sitemap",
        to: "/resources/sitemap",
      },
      {
        name: "For Developers",
        to: "/resources/dev",
      },
      {
        name: "Catalogues",
        to: "/resources/catalogues",
      },
    ],
  },
];

export default function FooterLinks() {
  return (
    <div className="flex justify-around flex-wrap">
      {LINKLISTS.map((list, index) => (
        <LinkList {...list} key={index} />
      ))}
    </div>
  );
}
