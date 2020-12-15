# User Manual

1. Click on the state of your choosing. Once selected, the chose state will appear below along with the number of representatives and senators it has.

2. You can choose which legislator to inspect by clicking on the dropdown menu. This might take a few seconds to update, so please be patient.

3. The filter menu can help you fine tune your options in the dropdown menu. Selecting a checkbox and hitting filter will reset the dropdown menu with options that fall under the seleted filter. You can only select one box at a time though, we did not have the time to figure out multiple boxes. 

4. After selecting a legislator, you will see which organizations and industries have been their top contributors as of 2020 arranged in decending order. You can also see their contact information at the bottom, with links to their website and twitter as well as their office address and phone number.

# Developer Manuel

1. The easiest way to install our application is by cloning our repository. This way you will get most of the necessary files and dependencies.

2. This application was built using the Node.js JavaScript runtime environment, which you must install. You will also need to install the Express Web framework as well as the nodemon module.

3. We are using three fetch requests from the OpenSecrets API.
    - The first fetch request uses the getLegislators method of the API. We pass in the state code as well as an API key to get the relevant data.

    - Next we use the candContrib method of the API to get information on the individual organizations who have contributed to the selected legislator. The API limits this to the 10 highest contributors.

    - The final fetch request uses the candIndustry method of the API and functions very similarly to the candContrib method. The candIndustry method returns the 10 highest contributors by industry.


