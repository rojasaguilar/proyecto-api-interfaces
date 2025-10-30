import { User, User2 } from 'lucide-react';
import React from 'react';

function TabErrorSummary({ error }) {
  const platformDic = {
    windows:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows11/windows11-original.svg',
    ubuntu:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-original.svg',
  };

  const browserDic = {
    chrome:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg',
    safari:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/safari/safari-original.svg',
    firefox:
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firefox/firefox-original.svg',
  };

  return (
    <>
      <div className="user-err">
        <p>{error.USER}</p>
        <p>{error.ERRORCODE}</p>
        <p>{error.STATUS}</p>
      </div>

      <div className="error-message">
        <p>{error.ERRORMESSAGE}</p>
        <p>{error.ERRORDATETIME}</p>
      </div>

      <div className="error-more-details">
        <p>Details</p>
        <div className="details">
          <div className="stack">
            <p>Error Stack</p>
            <p>{error.CONTEXT?.stack || 'no especificado'}</p>
          </div>

          <p>Request info</p>
          <div className="req-info">
            <p>End Point</p>
            <p>{error.CONTEXT?.endpoint || 'no especificado'}</p>
          </div>
        </div>
      </div>

      <div className="platform-so">
        <p>Platform</p>
        <div className="so-container">
          <img style={{ width: '30px' }} src={platformDic['windows']} alt="" />
          <p>SO</p>
          <p>{error.CONTEXT?.os || 'No especificado'}</p>
        </div>

        <div className="browser-container">
          <img style={{ width: '30px' }} src={browserDic['safari']} alt="" />
          <p>SO</p>
          <p>{error.CONTEXT?.browser || 'No especificado'}</p>
        </div>
      </div>

      <div id="coming-from">
        <p>Coming from</p>
        <p>{error.ERRORSOURCE}</p>

        <div className="application-module-user">
          <div className="application">
            <p>Application Name</p>
            <p>{error.APPLICATION}</p>
          </div>

          <div className="module">
            <p>Module</p>
            <p>{error.MODULE}</p>
          </div>

          <div className="user">
            <p>User</p>
            <div className="">
              {/* <User/> */}
              {/* <User2 size={10}/> */}
              <p>{error.USER}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabErrorSummary;
