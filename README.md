## RPlay Token API Guide

### Introduction

Welcome to the RPlay Token API! This service allows you to easily access real-time information about the RPlay Token, such as the token's total supply, circulating supply, and other essential details.

### How to Use the API

To use the API, you simply need to make HTTP GET requests to specific URLs. Below you'll find the URLs and a brief explanation of the information each one provides.

### API Endpoints

#### 1. Token Details
- **URL**: `http://localhost:3000/token`
- **Description**: Retrieves comprehensive details about the RPlay Token, including its name, symbol, circulating supply, and maximum supply.
- **Example Usage**: Open this URL in your web browser or use a tool like `curl`:
  ```bash
  curl http://localhost:3000/token
  ```

#### 2. Circulating Supply
- **URL**: `http://localhost:3000/token/circulating-supply`
- **Description**: Provides the current circulating supply of the RPlay Token.
- **Example Usage**:
  ```bash
  curl http://localhost:3000/token/circulating-supply
  ```

#### 3. Maximum Supply
- **URL**: `http://localhost:3000/token/max-supply`
- **Description**: Provides the maximum supply of the RPlay Token that will ever be available.
- **Example Usage**:
  ```bash
  curl http://localhost:3000/token/max-supply
  ```

### Getting Started

To get started, you don't need any special software or setup. You can simply use your web browser to navigate to the URLs listed above. For a more technical approach, tools like `curl` or Postman can be used to make the API calls and view responses directly from your command line or through a GUI.

### Example Call:

Here's a quick example on how to use `curl` to get the token details:

```bash
curl http://localhost:3000/token
```

This will return a JSON object with the token information such as its name, circulating supply, symbol, and maximum supply.

### Conclusion

The RPlay Token API is designed to be simple and easy to use, providing key data that can be helpful for anyone interested in the real-time aspects of the RPlay Token. Whether you are an investor, developer, or just curious about the token, this API gives you the information you need in a straightforward manner.