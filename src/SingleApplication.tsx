import React from "react";
import styles from "./SingleApplication.module.css";

const SingleApplication = ({ application }) => {
  return (
    <div className={styles.SingleApplication}>
      <div className={styles.cell}>
        <sub>Company</sub>
        {application.company}
      </div>
      <div className={styles.cell}>
        <sub>Name</sub>
        {application.first_name} {application.last_name}
      </div>
      <div className={styles.cell}>
        <sub>Email</sub>
        {application.email ? (
          <a href={`mailto:${application.email}`} style={{ color: '#169cc5ff', textDecoration: 'none' }}>
            {application.email}
          </a>
        ) : ''}
      </div>
      <div className={styles.cell}>
        <sub>Loan Amount</sub>
        {application.loan_amount ? application.loan_amount.toLocaleString('en-GB', {
          style: 'currency',
          currency: 'GBP',
        }) : ''}
      </div>
      <div className={styles.cell}>
        <sub>Application Date</sub>
        {application.date_created ? new Date(application.date_created).toLocaleDateString('en-GB').replace(/\//g, '-') : ''}
      </div>
      <div className={styles.cell}>
        <sub>Expiry date</sub>
        {application.expiry_date ? new Date(application.expiry_date).toLocaleDateString('en-GB').replace(/\//g, '-') : ''}
      </div>
    </div>
  );
};

export default SingleApplication;
