import React, { useState, useEffect } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Button } from "./ui/Button/Button";

const Applications = ({ pageNumber, setPageNumber }) => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    fetch(`http://localhost:3001/api/applications?_page=${pageNumber}&_limit=5`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then((data) => {
      setApplications(data);
      if (data.length === 0) {
        setPageNumber(1);
      }
    }).catch((err) => {
      console.error(err.message);
      setTimeout(fetchApplications, 500); // Retry after 500 milliseconds
    });
  };

  useEffect(() => {
    fetchApplications();
  }, [pageNumber]);

  return (
    <div className={styles.Applications}>
      {applications.length == 0 && <SingleApplication application={{}} />}
      {applications.length > 0 && applications.map((app) => (
        <SingleApplication key={app.guid} application={app} />
      ))}
      <Button onClick={(event) => {
        event.preventDefault();
        setPageNumber((prev: number) => prev + 1);
      }} className={styles.submitButton}>
        Load More
      </Button>
    </div>
  );
};

export default Applications;
