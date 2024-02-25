const { page, tab, ...passProps } = props;

const routes = {
  // Add new routes below
  home: {
    path: "urbit.near/widget/page.home", // notice how this coincides with apps/urbit/widget/page/home.js
    blockHeight: "final",
    init: {
      name: "Home",
    },
  },
  playground: {
    path: "urbit.near/widget/page.playground",
    blockHeight: "final",
    init: {
      name: "Playground",
    },
  },
};

const { AppLayout } = VM.require("urbit.near/widget/template.AppLayout") || {
  AppLayout: () => <></>
};

if (!page) page = Object.keys(routes)[0] || "home";

const Root = styled.div``;

function Router({ active, routes }) {
  const routeParts = active.split(".");

  console.log('active', active)

  let currentRoute = routes;
  let src = "";
  let defaultProps = {};

  for (let part of routeParts) {
    if (currentRoute[part]) {
      currentRoute = currentRoute[part];
      src = currentRoute.path;

      if (currentRoute.init) {
        defaultProps = { ...defaultProps, ...currentRoute.init };
      }
    } else {
      // Handle 404 or default case for unknown routes
      return <p>404 Not Found</p>;
    }
  }
  const urbitCode = "const { page, tab, ...passProps } = props;\n\nconst routes = {\n  // Add new routes below\n  home: {\n    path: \"urbit.near/widget/page.home\", // notice how this coincides with apps/urbit/widget/page/home.js\n    blockHeight: \"final\",\n    init: {\n      name: \"Home\",\n    },\n  },\n  playground: {\n    path: \"urbit.near/widget/page.playground\",\n    blockHeight: \"final\",\n    init: {\n      name: \"Playground\",\n    },\n  },\n};\n\nconst { AppLayout } = VM.require(\"urbit.near/widget/template.AppLayout\") || {\n  AppLayout: () => <></>\n};\n\nif (!page) page = Object.keys(routes)[0] || \"home\";\n\nconst Root = styled.div``;\n\nfunction Router({ active, routes }) {\n  const routeParts = active.split(\".\");\n\n  let currentRoute = routes;\n  let src = \"\";\n  let defaultProps = {};\n\n  for (let part of routeParts) {\n    if (currentRoute[part]) {\n      currentRoute = currentRoute[part];\n      src = currentRoute.path;\n\n      if (currentRoute.init) {\n        defaultProps = { ...defaultProps, ...currentRoute.init };\n      }\n    } else {\n      // Handle 404 or default case for unknown routes\n      return <p>404 Not Found</p>;\n    }\n  }\n\n  return (\n    <div key={active}>\n      <Widget\n        src={src}\n        props={{\n          currentPath: `/urbit.near/widget/app?page=${page}`,\n          page: tab,\n          ...passProps,\n          ...defaultProps,\n        }}\n      />\n    </div>\n  );\n}\n\nconst Container = styled.div`\n  display: flex;\n  height: 100%;\n`;\n\nconst Content = styled.div`\n  width: 100%;\n  height: 100%;\n`;\n\nreturn (\n  <Root>\n    <Container>\n      <AppLayout page={page} routes={routes} {...props}>\n        <Content>\n          <Router active={page} routes={routes} />\n        </Content>\n      </AppLayout>\n    </Container>\n  </Root>\n);\n"
  //VM COnfigure
  //= "const { page, tab, ...passProps } = props;\n\nconst routes = {\n  // Add new routes below\n  home: {\n    path: \"urbit.near/widget/page.home\", // notice how this coincides with apps/urbit/widget/page/home.js\n    blockHeight: \"final\",\n    init: {\n      name: \"Home\",\n    },\n  },\n  playground: {\n    path: \"urbit.near/widget/page.playground\",\n    blockHeight: \"final\",\n    init: {\n      name: \"Playground\",\n    },\n  },\n};\n\nconst { AppLayout } = VM.require(\"urbit.near/widget/template.AppLayout\") || {\n  AppLayout: () => <></>\n};\n\nif (!page) page = Object.keys(routes)[0] || \"home\";\n\nconst Root = styled.div``;\n\nfunction Router({ active, routes }) {\n  const routeParts = active.split(\".\");\n\n  let currentRoute = routes;\n  let src = \"\";\n  let defaultProps = {};\n\n  for (let part of routeParts) {\n    if (currentRoute[part]) {\n      currentRoute = currentRoute[part];\n      src = currentRoute.path;\n\n      if (currentRoute.init) {\n        defaultProps = { ...defaultProps, ...currentRoute.init };\n      }\n    } else {\n      // Handle 404 or default case for unknown routes\n      return <p>404 Not Found</p>;\n    }\n  }\n\n  return (\n    <div key={active}>\n      <Widget\n        src={src}\n        props={{\n          currentPath: `/urbit.near/widget/app?page=${page}`,\n          page: tab,\n          ...passProps,\n          ...defaultProps,\n        }}\n      />\n    </div>\n  );\n}\n\nconst Container = styled.div`\n  display: flex;\n  height: 100%;\n`;\n\nconst Content = styled.div`\n  width: 100%;\n  height: 100%;\n`;\n\nreturn (\n  <Root>\n    <Container>\n      <AppLayout page={page} routes={routes} {...props}>\n        <Content>\n          <Router active={page} routes={routes} />\n        </Content>\n      </AppLayout>\n    </Container>\n  </Root>\n);\n"

  return (
    <div key={active}>
      {/* <Widget
        src={src}
        props={{
          currentPath: `/urbit.near/widget/app?page=${page}`,
          page: tab,
          ...passProps,
          ...defaultProps,
        }}
      /> */}
      <Widget
      code={urbitCode}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Root>
    <Container>
      <AppLayout page={page} routes={routes} {...props}>
        <Content>
          <Router active={page} routes={routes} />
        </Content>
      </AppLayout>
    </Container>
  </Root>
);
