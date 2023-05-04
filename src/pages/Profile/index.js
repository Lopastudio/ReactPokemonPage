import '../bootstrap_css/bootstrap.min.css';
import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';

function Profile() {
  const name = localStorage.getItem("username") || "default";
  const avatar = useMemo(() => {
    try {
      return createAvatar(identicon, {
        size: 128,
        seed: name,
      }).toDataUriSync();
    } catch (error) {
      console.error(error);
      return createAvatar(identicon, {
        size: 128,
        seed: "default",
      }).toDataUriSync();
    }
  }, [name]);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Profile</h1>
        <br />
        <div>
          <img
            src={avatar}
            alt="Avatar"
            style={{ display: "inline-block" }}
          />
          <h4 style={{ display: "inline-block", marginLeft: "10px" }}>
            <bt></bt>{name}
          </h4>
        </div>
      </div>
    </>
  );
}


export default Profile;
