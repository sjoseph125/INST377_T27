# README

## Transparency in Politics
- Our project uses the OpenSecrets API to get information regarding donations made to a selected legislator. We show the ten highest donors among individual organizations and industries. The scope of our application is to create more transparency between elected officials and their electors, i.e., the general public.

- This is the link to a live instance of the application: https://inst377-t27.herokuapp.com/

- Our application seems to work equally well on IOS and Android browsers.

- This is the link to the API we are using: https://www.opensecrets.org/open-data/api

- User Manual: https://github.com/sjoseph125/INST377_T27#user-manual
- Developer Manual: https://github.com/sjoseph125/INST377_T27#developer-manuel

# User Manual

1. Click on the state of your choosing. Once selected, the chosen state will appear below along with the number of representatives and senators it has.

2. You can choose which legislator to inspect by clicking on the dropdown menu. This might take a few seconds to update, so please be patient. Beside each name there is an R or D, refering to the party they are a member of.

3. The filter menu can help you fine-tune your options in the dropdown menu. Selecting a checkbox and hitting filter will reset the dropdown menu with options that fall under the selected filter. You can only select one box at a time though, we did not have the time to figure out multiple boxes. 

4. After selecting a legislator, you will see which organizations and industries have been their top contributors as of 2020, arranged in descending order. You can also see their contact information at the bottom, with links to their website and Twitter as well as their office address and phone number.

# Developer Manuel

1. The easiest way to install our application is by cloning our repository. This way you will get most of the necessary files and dependencies.

2. This application was built using the Node.js JavaScript runtime environment, which you must install. You will also need to install the Express Web framework as well as the nodemon module.

3. We are using three fetch requests from the OpenSecrets API.
    - The first fetch request uses the getLegislators method of the API. We pass in the state code as well as an API key to get the relevant data. This data from this method is also used to populate the Contact Info section.
        - The state code is obtained from the map. When a state is clicked, it automatically returns the right code.

    - Next, we use the candContrib method of the API to get information on the individual organizations who have contributed to the selected legislator. The API limits this to the 10 highest contributors.
        - For this, we pass in the ID of the specified legislator into the method. The ID is given by the getLegislators method.

    - The final fetch request uses the candIndustry method of the API and functions very similarly to the candContrib method. The candIndustry method returns the 10 highest contributors by industry.
        - For this, we pass in the ID of the specified legislator into the method. The ID is given by the getLegislators method.

4. The biggest issue one might come across while using the application is API call limits. We are using two different API keys just to have redundancy, but we highly suggest to get your own key from OpenSecrets to keep track of your usage. The three methods we use have a limit of 200 a day. This is a bit deceiving, as the number of calls for candContrib and candIndustry methods entirely depends on the number of legislators the selected state has. If there are 20 legislators, you call those two methods 20 times. The getLegislators method goes down by one every time a new state is selected.


