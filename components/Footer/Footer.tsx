import React from "react";
import { footerList1, footerList2, footerList3 } from "../../utils/constants";
import ListFooter from "./ListFooter/ListFooter";

function Footer() {
  return (
    <div className="mt-6 hidden xl:block">
      <ListFooter items={footerList1} mt={false} />
      <ListFooter items={footerList2} mt />
      <ListFooter items={footerList3} mt />
      <p className="text-gray-400 text-sm mt-5">2020 Xander TikTik</p>
    </div>
  );
}

export default Footer;
