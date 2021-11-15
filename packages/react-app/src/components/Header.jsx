import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="http://ravinggoblins.io/" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="Raving Goblins"
        //subTitle="👩‍🔬 Buyer pays to mint NFT example"
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
