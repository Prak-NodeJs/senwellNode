
### Quick Start

**Step 1.**
Clone senwellNode repo

```bash
git clone https://github.com/Prak-NodeJs/senwellNode.git
```

**Step 2.**
Navigate into the project directory

```bash
cd senwellNode
```
**Step 3.**
Install dependencies

```bash
npm install
```

**Step 4.**
Create .env file and set the environment variables

```bash
cp example.env .env
# open .env and modify the environment variables (if needed)
```

## Usage
To run the server, use the following command:

```bash
npm start
```
This will start the server at http://localhost:port.

### Endpoints

**POST /v1/employee/create:**
   - Create new employee.
      Accepts the following data in request body:
      - name: Name of the employee 
      - email: Email of the employee
      - salary: salary of the employee
      - department: department of employee

**GET /v1/employee/:id :**
- Fetches the details of employee 
  - Accepts the following request params:
    - id: id of employee (Database Id)
     

**PATCH /v1/employee/:id :**
- update employee name.
    - Accepts the following data in request body:
      - name: new name
    - Accepts the following request params:
      - id: id of employee (Database Id)
     

**DELETE /v1/employee/:id :**
- delete employee record.
    - Accepts the following request params:
      - id: id of employee (Database Id)


**GET /v1/employee/search/:empId :**
- fetches employee record.
    - Accepts the following request params:
      - empId: empId of employee 
     
**GET /v1/employee/filter/dept/:id :**
- filter employee records based on department name.
- Accepts the following data in request body:
  - department: name of the department
- Accepts the following request params:
    - id: id of employee (Database Id)

    
**GET /v1/employee/sort/salary/:id :**
- sort employee records based on salary.
 - Accepts the following request params:
    - id: id of employee (Database Id)
- Accepts the following query params:
    - sort: 'asc' or 'desc'