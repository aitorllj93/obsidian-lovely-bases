import React from "react";

import Github from "./assets/github.svg";

export const RightArrow = () => (
  <svg
    viewBox="0 0 14 14"
    width="8px"
    height="14px"
    style={{
      marginLeft: "4px",
      display: "inline-block",
      shapeRendering: "inherit",
      verticalAlign: "middle",
      fill: "currentColor",
      "path fill": "currentColor",
    }}
  >
    <title>Right</title>
    <path d="m11.1 7.35-5.5 5.5a.5.5 0 0 1-.7-.7L10.04 7 4.9 1.85a.5.5 0 1 1 .7-.7l5.5 5.5c.2.2.2.5 0 .7Z" />
  </svg>
);

export default function () {
  return (
    <>
      <hr className="sb-separator" />
      <div className="sb-section sb-socials">
        <div className="sb-section-item">
          <img src={Github} alt="Github logo" className="sb-explore-image" />
          <p>Join our contributors building the future of Obsidian Bases.</p>
          <a
            href="https://github.com/aitorllj93/obsidian-lovely-bases"
            rel="noopener"
            target="_blank"
          >
            Star on GitHub
            <RightArrow />
          </a>
        </div>
        {/*<div cla ssName="sb-section-item">
          <img src={Discord} alt="Discord logo" className="sb-explore-image"/>
          <div>
            <p>Get support and chat with frontend developers.</p>
            <a
              href="https://discord.gg/storybook"
              target="_blank"
            >Join Discord server<RightArrow /></a>
          </div>
        </div> */}
      </div>
    </>
  );
}
