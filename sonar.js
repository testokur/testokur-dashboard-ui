const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "https://sonarcloud.io",
    token :  process.env.SONAR_TOKEN,
    options: {
      "sonar.organization": "nazmialtun-github",
      "sonar.projectKey": "NazmiAltun_testokur-dashboard-ui"
    },
  },
  () => {
  }
);
