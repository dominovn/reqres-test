import * as reporter from 'cucumber-html-reporter';
import { config } from './config';

const options = {
  theme: 'bootstrap',
  jsonDir: config.reportDir,
  output: `${config.reportDir}/cucumber-report.html`,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": process.env.NODE_ENV || "Development",
    "Browser": "Chrome 91.0",
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Remote"
  }
};

reporter.generate(options);
