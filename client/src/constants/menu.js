const data = [
  {
    id: "dash",
    icon: "iconsminds-data-cloud",
    label: "menu.dashboard",
    to: "/app/dashboard",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.show-dataset",
        to: "/app/dashboard/show-dataset",
      },
      {
        icon: "simple-icon-paper-plane",
        label: "menu.show-stats",
        to: "/app/dashboard/show-stats",
      },
    ],
  },
  {
    id: "secondmenu",
    icon: "iconsminds-three-arrow-fork",
    label: "menu.second-menu",
    to: "/app/second-menu",
    subs: [
      {
        icon: "simple-icon-paper-plane",
        label: "menu.second",
        to: "/app/second-menu/second",
      },
    ],
  },
  {
    id: "blankpage",
    icon: "iconsminds-bucket",
    label: "menu.blank-page",
    to: "/app/blank-page",
  },
  {
    id: "docs",
    icon: "iconsminds-library",
    label: "menu.docs",
    to: "https://gogo-react-docs.coloredstrategies.com/",
    newWindow: true,
  },
];
export default data;
