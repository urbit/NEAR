import { Widget } from "near-social-vm";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SESSION_STORAGE_REDIRECT_MAP_KEY = "nearSocialVMredirectMap";

function Viewer({ code }) {
  const { path } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value;
      return props;
    }, {});
  }, [location]);

  const src = useMemo(() => {
    const defaultSrc = "urbit.near/widget/app"; // default widget to load
    const pathSrc = path || defaultSrc; // if no path, load default widget
    return pathSrc;
  }, [path]);

  const [redirectMap, setRedirectMap] = useState(null);

  useEffect(() => {
    const fetchRedirectMap = async () => {
      try {
        const localStorageFlags = JSON.parse(
          localStorage.getItem("flags") || "{}"
        );
        let redirectMapData;

        if (localStorageFlags.bosLoaderUrl) {
          const response = await fetch(localStorageFlags.bosLoaderUrl);
          const data = await response.json();
          redirectMapData = data.components;
        } else {
          redirectMapData = JSON.parse(
            sessionStorage.getItem(SESSION_STORAGE_REDIRECT_MAP_KEY) || "{}"
          );
        }
        setRedirectMap(redirectMapData);
      } catch (error) {
        console.error("Error fetching redirect map:", error);
      }
    };
    fetchRedirectMap();
  }, []);

  return (
    <Widget
      src={!code && src}
      code={code} // prioritize code
      props={passProps}
      config={{ redirectMap }}
    />
  );
}

export default Viewer;
