export default function manifest() {
  return {
    name: "Commerce Toolbase",
    short_name: "Toolbase",
    description: "Source-aware e-commerce software reviews, comparisons, rankings, and alternatives.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8fb",
    theme_color: "#0b6bcb",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
