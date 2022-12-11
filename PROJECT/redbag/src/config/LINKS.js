export default function LINKS(user) {
  return [
    {
      to: "/products",
      name: "Products",
      icon: "shopping_bag",
      classes: "btn btn-primary",
    },
    {
      to: "/vendors",
      name: "Vendors",
      icon: "storefront",
      classes: "btn btn-primary",
    },
    {
      to: "/help",
      name: "Help",
      icon: "support",
    },
    {
      to: "/contact",
      name: "Contact",
      icon: "phone_in_talk",
    },
    user && user._id && user.username
      ? {
          to: "/app/account/" + user._id,
          name: user.username,
          icon: "account_circle",
          classes: "btn btn-contrast",
        }
      : {
          to: "/login",
          name: "Login",
          icon: "account_circle",
          classes: "btn btn-contrast",
        },
  ];
}
