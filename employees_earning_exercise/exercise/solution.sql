-- BEGIN
SELECT Employee.Name FROM  Employee JOIN Employee AS Manager ON (Employee.ManagerId = Manager.Id ) WHERE Employee.Salary > Manager.Salary;
-- END
