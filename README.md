# BloodBank API
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fvivekiet22%2Fbloodbank_api&count_bg=%2379C83D&title_bg=%23555555&icon=bilibili.svg&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## Summary

- ExpressJS REST API server with the following requirements
- [x] The app should handle 2 types of users - Hospital, Receiver
- [x] Hospital and Receiver should be able to create an account and sign in
- [x] The hospital should be able to add all the blood samples info available
- [x] Receivers can be able to request blood samples from hospitals. Make sure that only those receivers who are eligible for the blood sample are allowed to request samples.
- [x] The hospital should be able to see the list of all receivers who have requested a particular blood group from its blood bank.


## Getting Started

### Install Dependencies
<code>npm install</code>

- create an .env file and store `JWT_SECRET="any_string"`

### Run The Backend from Root Directory
<code>node server.js</code>

### Build With
- Express.js
- jsonwebtoken
- bcrypt
- mongoose
- validator






## End Points


<code>/api/hospitals/getall</code>: GET endpoint to get the list of all blood samples available in all hospitals


### For receivers

<code>/api/receiver/register </code> : Create an account as receiver

<code>/api/receiver/login </code> : Login as receiver

<code>/api/receiver/request </code> : Request blood from a certain hospital



### For hospitals

<code>/api/hospitals/register </code>: Create new hospital

<code>/api/hospitals/login</code>: Login as hospital

<code>/api/hospitals/update </code>: Update blood sample info

<code>/api/hospitals/delete</code>: Delete blood sample

<code>/api/hospitals/getblood</code>: Get all blood sample of current hospital

<code>/api/hospitals/getreceiver</code>: Get the list of all receivers who have requested a particular blood group from its blood bank


## Contributing

Everyone is welcomed to contribute to this project. You can contribute either by submitting bugs or suggesting improvements by opening an issue on GitHub. Please see the [CONTRIBUTING](CONTRIBUTING.md) guidelines for more information.

