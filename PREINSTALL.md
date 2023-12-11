<!--
This file provides your users an overview of your extension. All content is optional, but this is the recommended format. Your users will see the contents of this file when they run the `firebase ext:info` command.

Include any important functional details as well as a brief description for any additional setup required by the user (both pre- and post-installation).

Learn more about writing a PREINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-preinstall
-->

https://youtu.be/xRj0RRAxYX8

Warning: This example removes Cloud Billing from your project, shutting down all resources. Resources might not shut down gracefully, and might be irretrievably deleted. There is no graceful recovery if you disable Cloud Billing.
You can [re-enable Cloud Billing](https://cloud.google.com/billing/docs/how-to/modify-project#enable_billing_for_a_new_project), but there is no guarantee of service recovery and manual configuration is required.

<!-- We recommend keeping the following section to explain how billing for Firebase Extensions works -->

# Billing

This extension uses other Firebase or Google Cloud Platform services which may have associated charges:

- Cloud Functions

When you use Firebase Extensions, you're only charged for the underlying resources that you use. A paid-tier billing plan is only required if the extension uses a service that requires a paid-tier plan, for example calling to a Google Cloud Platform API or making outbound network requests to non-Google services. All Firebase services offer a free tier of usage. [Learn more about Firebase billing.](https://firebase.google.com/pricing)
