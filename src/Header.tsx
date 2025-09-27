import React, { useState } from "react";
import LogoSvg from "./logo.svg";
import styles from "./Header.module.css";

const Header = ({ pageNumber }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const metaData = `Page Number = ${pageNumber} Limit = 5`;

  return (
    <div className={styles.Header}>
      <div 
        className={styles.logoContainer}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <LogoSvg className={styles.logo} />
        {showTooltip && (
          <div className={styles.tooltip}>
            {metaData}
          </div>
        )}
      </div>
      <h1>Application Portal</h1>
    </div>
  );
};

export default Header;
