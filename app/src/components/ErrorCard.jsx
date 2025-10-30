import React from "react";
import { Link } from "react-router-dom";
import "../styles/errorlog.css";

const ErrorCard = ({ error }) => {
  return (
    <div className="error-item">
      <div className="dot"></div>
      <div className="error-card">
        <Link to={`/errors/${error._id}`} className="error-link" state={error}>
          <div className="error-card-header">
            <img
              src={`https://i.pravatar.cc/50?u=${error._id}`}
              alt={error.USER || "User"}
              className="error-avatar"
            />
            <div>
              <h3 className="error-title">
                Error {error.ERRORCODE || "Codigo de error"}
              </h3>
              <p className="error-user">
                Usuario {error.USER || "Unknown User"} — Task ID #{error._id}
              </p>
            </div>
            <span className="status resolved">{error.STATUS}</span>
          </div>

          <p className="error-message">
            {error.ERRORMESSAGE ||
              "No message available, this is a simulated example..."}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ErrorCard;
