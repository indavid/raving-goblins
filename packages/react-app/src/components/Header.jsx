import { PageHeader } from "antd";
import React from "react";
import logo from '../static/assets/home-menu.png';

// displays a page header
export default function Header() {
  return (
    <a href="http://ravinggoblins.io/" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title=" "
        avatar={{ logo }}
        //subTitle="👩‍🔬 Buyer pays to mint NFT example"
        style={{ cursor: "pointer" }}
      />
      <img className='logo-img' src={logo} alt="logo" align="left"/>
    </a>
  );
}
