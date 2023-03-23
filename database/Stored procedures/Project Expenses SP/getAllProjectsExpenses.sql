create
or alter procedure getAllProjectsExpenses AS BEGIN
select
    id,
    projectId,
    expenseTitle,
    expenseDescription
from
    expenses
where
    isDeleted = 0
END