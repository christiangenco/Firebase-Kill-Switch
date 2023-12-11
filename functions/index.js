/*
 * This template contains a HTTP function that
 * responds with a greeting when called
 *
 * Reference PARAMETERS in your functions code with:
 * `process.env.<parameter-name>`
 * Learn more about building extensions in the docs:
 * https://firebase.google.com/docs/extensions/publishers
 */

const functions = require("firebase-functions");
const { GoogleAuth } = require("google-auth-library");
const { google } = require("googleapis");
const billing = google.cloudbilling("v1").projects;

const PROJECT_ID = process.env.GCLOUD_PROJECT;
const PROJECT_NAME = `projects/${PROJECT_ID}`;

exports.receiveBillingNotice = functions.pubsub
  .topic("billing")
  .onPublish((message) => {
    const data = message.json;
    console.log("Received pubsub notification");
    console.log(data);
    // {
    //     "budgetDisplayName": "name-of-budget",
    //     "alertThresholdExceeded": 1.0,
    //     "costAmount": 100.01,
    //     "costIntervalStart": "2019-01-01T00:00:00Z",
    //     "budgetAmount": 100.00,
    //     "budgetAmountType": "SPECIFIED_AMOUNT",
    //     "currencyCode": "USD"
    // }
  });

exports.checkBillingUse = functions.https.onRequest(async (req, res) => {
  const client = new GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/cloud-billing",
      "https://www.googleapis.com/auth/cloud-platform",
    ],
  });
  // set credentials globally for all requests
  google.options({ auth: client });

  const billingInfo = await billing.getBillingInfo({ name: PROJECT_NAME });
  console.log({ billingInfo });

  // pubsubData.costAmount <= pubsubData.budgetAmount
  // billingInfo.data.billingEnabled
  // if (spentSoFar >= killingProjectAmount) {
  //   const response = await disableBilling();
  //   console.log(response);
  // }
  res.send({ billingInfo });
});

// projects/broccolitime/topics/billing

async function disableBilling() {
  // if (billingInfo.data.billingEnabled) {
  //   const res = await
  return billing.updateBillingInfo({
    name: PROJECT_NAME,
    resource: {
      billingAccountName: "",
    },
  });
  //   console.log("Billing disabled");
  //   console.log(res);
  // } else {
  //   console.error("Tried to disable billing but it's already disabled.");
  // }
}

// exports.greetTheWorld = functions.https.onRequest((req, res) => {
//   // Here we reference a user-provided parameter
//   // (its value is provided by the user during installation)
//   const consumerProvidedGreeting = process.env.GREETING;

//   // And here we reference an auto-populated parameter
//   // (its value is provided by Firebase after installation)
//   const instanceId = process.env.EXT_INSTANCE_ID;

//   const greeting = `${consumerProvidedGreeting} World from ${instanceId}`;

//   res.send(greeting);
// });
