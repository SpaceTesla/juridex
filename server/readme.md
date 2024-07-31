# JURIDEX API Documentation

## Overview

This document provides detailed information about the API endpoints available in the JURIDEX Criminal Database Management System. 

## Authentication

All endpoints require authentication using Firebase. Ensure that you include the Firebase token in the `Authorization` header of your requests.

## Endpoints

### Crime Routes

#### GET /crimes
- **Description**: Retrieve a list of all crimes.
- **Request Headers**: 
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of crime objects.
  ```json
  [
    {
      "CrimeID": 1,
      "CrimeType": "Theft",
      "Description": "Stolen wallet",
      "DateOfCrime": "2024-01-15",
      "Location": "Main Street",
      "Latitude": 12.345678,
      "Longitude": 98.765432
    },
    ...
  ]
  ```

#### GET /crimes/:id
- **Description**: Retrieve a specific crime by its ID.
- **Request Parameters**:
  - `id` (path parameter): Crime ID (integer)
- **Request Headers**: 
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Crime object.
  ```json
  {
    "CrimeID": 1,
    "CrimeType": "Theft",
    "Description": "Stolen wallet",
    "DateOfCrime": "2024-01-15",
    "Location": "Main Street",
    "Latitude": 12.345678,
    "Longitude": 98.765432
  }
  ```
- **Errors**:
  - **404 Not Found**: Crime with the given ID not found.

### Person Routes

#### GET /persons
- **Description**: Retrieve a list of all persons.
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of person objects.
  ```json
  [
    {
      "PersonID": 1,
      "FirstName": "John",
      "LastName": "Doe",
      "DateOfBirth": "1990-05-20",
      "Gender": "Male",
      "Address": "123 Elm Street",
      "ContactInfo": "555-1234"
    },
    ...
  ]
  ```

#### GET /persons/:id
- **Description**: Retrieve a specific person by their ID.
- **Request Parameters**:
  - `id` (path parameter): Person ID (integer)
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Person object.
  ```json
  {
    "PersonID": 1,
    "FirstName": "John",
    "LastName": "Doe",
    "DateOfBirth": "1990-05-20",
    "Gender": "Male",
    "Address": "123 Elm Street",
    "ContactInfo": "555-1234"
  }
  ```
- **Errors**:
  - **404 Not Found**: Person with the given ID not found.

### Criminal Record Routes

#### GET /criminal-records
- **Description**: Retrieve a list of all criminal records.
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of criminal record objects.
  ```json
  [
    {
      "PersonID": 1,
      "CrimeID": 1,
      "DateOfRecord": "2024-02-01",
      "RecordStatus": "Open"
    },
    ...
  ]
  ```

#### GET /criminal-records/:personId/:crimeId
- **Description**: Retrieve a specific criminal record by person ID and crime ID.
- **Request Parameters**:
  - `personId` (path parameter): Person ID (integer)
  - `crimeId` (path parameter): Crime ID (integer)
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Criminal record object.
  ```json
  {
    "PersonID": 1,
    "CrimeID": 1,
    "DateOfRecord": "2024-02-01",
    "RecordStatus": "Open"
  }
  ```
- **Errors**:
  - **404 Not Found**: Criminal record with the given IDs not found.

### Police Officer Routes

#### GET /police-officers
- **Description**: Retrieve a list of all police officers.
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of police officer objects.
  ```json
  [
    {
      "OfficerID": 1,
      "FirstName": "Jane",
      "LastName": "Smith",
      "BadgeNumber": "1234",
      "Rank": "Sergeant",
      "Department": "Homicide"
    },
    ...
  ]
  ```

#### GET /police-officers/:id
- **Description**: Retrieve a specific police officer by their ID.
- **Request Parameters**:
  - `id` (path parameter): Officer ID (integer)
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Police officer object.
  ```json
  {
    "OfficerID": 1,
    "FirstName": "Jane",
    "LastName": "Smith",
    "BadgeNumber": "1234",
    "Rank": "Sergeant",
    "Department": "Homicide"
  }
  ```
- **Errors**:
  - **404 Not Found**: Police officer with the given ID not found.

### Court Case Routes

#### GET /court-cases
- **Description**: Retrieve a list of all court cases.
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of court case objects.
  ```json
  [
    {
      "CaseID": 1,
      "CrimeID": 1,
      "CourtDate": "2024-03-01",
      "JudgeName": "Judge Judy",
      "Verdict": "Guilty",
      "Sentence": "5 years imprisonment",
      "OfficerID": 1
    },
    ...
  ]
  ```

#### GET /court-cases/:id
- **Description**: Retrieve a specific court case by its ID.
- **Request Parameters**:
  - `id` (path parameter): Case ID (integer)
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Court case object.
  ```json
  {
    "CaseID": 1,
    "CrimeID": 1,
    "CourtDate": "2024-03-01",
    "JudgeName": "Judge Judy",
    "Verdict": "Guilty",
    "Sentence": "5 years imprisonment",
    "OfficerID": 1
  }
  ```
- **Errors**:
  - **404 Not Found**: Court case with the given ID not found.

### Witness Routes

#### GET /witnesses
- **Description**: Retrieve a list of all witnesses.
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Array of witness objects.
  ```json
  [
    {
      "WitnessID": 1,
      "CaseID": 1,
      "CrimeID": 1,
      "FirstName": "Alice",
      "LastName": "Johnson",
      "Statement": "Saw the suspect leaving the scene."
    },
    ...
  ]
  ```

#### GET /witnesses/:id
- **Description**: Retrieve a specific witness by their ID.
- **Request Parameters**:
  - `id` (path parameter): Witness ID (integer)
- **Request Headers**:
  - `Authorization`: Firebase token
- **Response**:
  - **Status**: 200 OK
  - **Body**: Witness object.
  ```json
  {
    "WitnessID": 1,
    "CaseID": 1,
    "CrimeID": 1,
    "FirstName": "Alice",
    "LastName": "Johnson",
    "Statement": "Saw the suspect leaving the scene."
  }
  ```
- **Errors**:
  - **404 Not Found**: Witness with the given ID not found.

## Error Codes

- **400 Bad Request**: The request was invalid or cannot be served.
- **401 Unauthorized**: Authentication is required and has failed or has not been provided.
- **403 Forbidden**: The server understood the request, but it refuses to authorize it.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: The server encountered an error and could not complete the request.

## Example Requests

###

 Fetch All Crimes

**Request:**
```bash
curl -X GET http://localhost:5000/crimes -H "Authorization: Bearer <your_firebase_token>"
```

**Response:**
```json
[
  {
    "CrimeID": 1,
    "CrimeType": "Theft",
    "Description": "Stolen wallet",
    "DateOfCrime": "2024-01-15",
    "Location": "Main Street",
    "Latitude": 12.345678,
    "Longitude": 98.765432
  },
  ...
]
```

### Fetch Specific Crime

**Request:**
```bash
curl -X GET http://localhost:5000/crimes/1 -H "Authorization: Bearer <your_firebase_token>"
```

**Response:**
```json
{
  "CrimeID": 1,
  "CrimeType": "Theft",
  "Description": "Stolen wallet",
  "DateOfCrime": "2024-01-15",
  "Location": "Main Street",
  "Latitude": 12.345678,
  "Longitude": 98.765432
}
```
