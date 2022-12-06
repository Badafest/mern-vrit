import FooterLinks from "./Footer/FooterLinks";
import Newsletter from "./Footer/Newsletter";

export default function () {
  return (
    <footer className="bg-primary text-light p-4 pb-24 flex flex-col  gap-4 items-stretch md:pb-4">
      <Newsletter />
      <FooterLinks />
    </footer>
  );
}
